import { ReactNode, useEffect } from 'react'

import style from './landscapeHall.styles.module.scss'

interface LandscapeHallProps {
    onClose: () => void
    children: ReactNode
}

/**
 * Full-screen hall view for phones. In portrait it is rotated 90° with CSS so the hall
 * fills the long side (Screen Orientation lock is unsupported on iOS); if the phone is
 * physically turned to landscape, the rotation is dropped. Fixed-position children
 * (the registration modal) are positioned inside the rotated box.
 */
export const LandscapeHall = ({ onClose, children }: LandscapeHallProps) => {
    useEffect(() => {
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.body.style.overflow = overflow
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [onClose])

    return (
        <div className={style.LandscapeHall} role="dialog" aria-modal="true" aria-label="Схема зала, горизонтальный вид">
            <button type="button" className={style.close} onClick={onClose} aria-label="Закрыть горизонтальный вид">
                <img src="/icons/close.webp" alt=""/>
            </button>
            <div className={style.stage}>{children}</div>
        </div>
    )
}
