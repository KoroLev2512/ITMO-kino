import { useCallback, useState } from 'react'
import { Header } from '../../widgets/Header'
import { SeatSelect } from '../../widgets/SeatsSelect'
import { RegistrationModal } from './RegistrationModal'
import { HallScroller } from './HallScroller'
import { LandscapeHall } from './LandscapeHall'

import sessionStyle from '../SessionPage/session.styles.module.scss'
import style from './demoHall.styles.module.scss'

const REGISTERED_KEY = 'itmokino:registered'

// localStorage can throw (private mode, blocked storage) — the modal then just keeps showing.
const readRegistered = () => {
    try {
        return localStorage.getItem(REGISTERED_KEY) === 'true'
    } catch {
        return false
    }
}

const saveRegistered = () => {
    try {
        localStorage.setItem(REGISTERED_KEY, 'true')
    } catch {
        /* ignore */
    }
}

const RotateIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 3h5a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 6l2 2 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const DemoHallPage = () => {
    const [registered, setRegistered] = useState(readRegistered)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLandscape, setIsLandscape] = useState(false)

    const onSeatClick = useCallback(() => {
        if (!registered) setIsModalOpen(true)
    }, [registered])

    const closeModal = useCallback(() => setIsModalOpen(false), [])
    const closeLandscape = useCallback(() => setIsLandscape(false), [])

    const markRegistered = useCallback(() => {
        saveRegistered()
        setRegistered(true)
        setIsModalOpen(false)
    }, [])

    const modal = isModalOpen && (
        <RegistrationModal onClose={closeModal} onAlreadyRegistered={markRegistered}/>
    )

    return (
        <div className={sessionStyle.bg}>
            <div className={sessionStyle.wrapper}>
                <Header title="Схема зала" backTo="/"/>
                <div className={sessionStyle.content}>
                    <p className={style.note}>
                        Наведите на место, чтобы увидеть ряд и номер места.
                        <br/>
                        Выбор мест в демо отключён — бронирование доступно только кассирам перед показом — приходите пораньше.
                    </p>
                    {/* Demo shows an empty hall: no backend, every seat is free. */}
                    <HallScroller>
                        <SeatSelect buySeats={[]} readOnly onReadOnlyClick={onSeatClick} variant="scroll"/>
                    </HallScroller>
                    <button type="button" className={style.rotate} onClick={() => setIsLandscape(true)}>
                        <RotateIcon/>
                        Повернуть горизонтально
                    </button>
                </div>
            </div>
            {isLandscape ? (
                <LandscapeHall onClose={closeLandscape}>
                    <SeatSelect buySeats={[]} readOnly onReadOnlyClick={onSeatClick} variant="landscape"/>
                    {/* Rendered inside the rotated box so it is rotated with the hall. */}
                    {modal}
                </LandscapeHall>
            ) : modal}
        </div>
    )
}
