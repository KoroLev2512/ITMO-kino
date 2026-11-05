import { useEffect } from 'react'
import { REGISTRATION_SESSIONS } from '../../shared/config'
import { Seat } from '../../shared/types'

import style from './registrationModal.styles.module.scss'

interface RegistrationModalProps {
    /** Tapped seat; shown only on touch devices, where there is no hover tooltip. */
    seat: Seat
    onClose: () => void
    /** "Я уже зарегистрировался": close; from then on desktop shows no modal, touch shows only the seat. */
    onAlreadyRegistered: () => void
    /** Already registered (touch devices only): show just the seat. */
    registered?: boolean
}

export const RegistrationModal = ({ seat, onClose, onAlreadyRegistered, registered }: RegistrationModalProps) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onClose])

    return (
        <div className={style.overlay} onClick={onClose}>
            <div
                className={style.content}
                role="dialog"
                aria-modal="true"
                aria-labelledby="registration-modal-title"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={style.close} onClick={onClose} aria-label="Закрыть">
                    <img src="/icons/close.webp" alt=""/>
                </button>
                {registered ? (
                    <p id="registration-modal-title" className={style.seatTitle}>
                        Ряд {seat.row}, место {seat.seat}
                    </p>
                ) : (
                    <>
                        <p id="registration-modal-title" className={style.title}>Регистрация на показ</p>
                        <p className={style.seat}>Ряд {seat.row}, место {seat.seat}</p>
                        <p className={style.text}>
                            Выберите удобный сеанс и зарегистрируйтесь. Место выберете у кассира перед показом.
                        </p>
                        <div className={style.times}>
                            {REGISTRATION_SESSIONS.map(({ time, url }) => (
                                <a
                                    key={time}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={style.time}
                                    onClick={onClose}
                                >
                                    {time}
                                </a>
                            ))}
                        </div>
                        <button className={style.registered} onClick={onAlreadyRegistered}>
                            Я уже зарегистрировался
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
