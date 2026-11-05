import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import styles from './styles.module.scss'

interface ErrorAction {
    label: string
    /** Internal route; omit and pass `onClick` for a button. */
    to?: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
}

interface ErrorScreenProps {
    /** Three-character status code; the middle character is replaced by the glasses mascot. */
    code: string
    title: ReactNode
    text: ReactNode
    actions: ErrorAction[]
}

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay },
})

export const ErrorScreen = ({ code, title, text, actions }: ErrorScreenProps) => {
    const [first, , last] = code.split('')

    return (
        <main className={styles.ErrorScreen}>
            <Link to="/" className={styles.logo} aria-label="ИТМО КИНО — на главную">
                <img src="/icons/logo_horizontal.webp" alt="ИТМО КИНО"/>
            </Link>

            <div className={styles.content}>
                <motion.p className={styles.code} aria-label={`Ошибка ${code}`} {...fadeUp(0)}>
                    <span aria-hidden="true">{first}</span>
                    <img src="/images/glasses.webp" alt="" aria-hidden="true" className={styles.mascot}/>
                    <span aria-hidden="true">{last}</span>
                </motion.p>

                <motion.h1 className={styles.title} {...fadeUp(0.2)}>{title}</motion.h1>
                <motion.p className={styles.text} {...fadeUp(0.35)}>{text}</motion.p>

                <motion.div className={styles.actions} {...fadeUp(0.5)}>
                    {actions.map(({ label, to, onClick, variant = 'primary' }) => {
                        const className = variant === 'primary' ? styles.primary : styles.secondary
                        return to ? (
                            <Link key={label} to={to} className={className} onClick={onClick}>{label}</Link>
                        ) : (
                            <button key={label} type="button" className={className} onClick={onClick}>{label}</button>
                        )
                    })}
                </motion.div>
            </div>

            <div className={styles.chairs} aria-hidden="true"/>
        </main>
    )
}
