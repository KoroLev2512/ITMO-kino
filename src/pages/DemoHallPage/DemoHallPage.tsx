import { useCallback, useState } from 'react'
import { Header } from '../../widgets/Header'
import { SeatSelect } from '../../widgets/SeatsSelect'
import { RegistrationModal } from './RegistrationModal'

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

export const DemoHallPage = () => {
    const [registered, setRegistered] = useState(readRegistered)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onSeatClick = useCallback(() => {
        if (!registered) setIsModalOpen(true)
    }, [registered])

    const closeModal = useCallback(() => setIsModalOpen(false), [])

    const markRegistered = useCallback(() => {
        saveRegistered()
        setRegistered(true)
        setIsModalOpen(false)
    }, [])

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
                    <SeatSelect buySeats={[]} readOnly onReadOnlyClick={onSeatClick}/>
                </div>
            </div>
            {isModalOpen && (
                <RegistrationModal
                    onClose={closeModal}
                    onAlreadyRegistered={markRegistered}
                />
            )}
        </div>
    )
}
