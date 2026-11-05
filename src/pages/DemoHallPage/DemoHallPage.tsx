import { useCallback, useState } from 'react'
import { Header } from '../../widgets/Header'
import { SeatSelect } from '../../widgets/SeatsSelect'
import { Seat } from '../../shared/types'
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
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)

    const onSeatClick = useCallback((seat: Seat) => {
        if (!registered) setSelectedSeat(seat)
    }, [registered])

    const closeModal = useCallback(() => setSelectedSeat(null), [])

    const markRegistered = useCallback(() => {
        saveRegistered()
        setRegistered(true)
        setSelectedSeat(null)
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
            {selectedSeat && (
                <RegistrationModal
                    seat={selectedSeat}
                    onClose={closeModal}
                    onAlreadyRegistered={markRegistered}
                />
            )}
        </div>
    )
}
