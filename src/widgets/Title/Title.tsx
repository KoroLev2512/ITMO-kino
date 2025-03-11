import { ReactNode } from "react"
import classNames from 'classnames'
import style from './styles.module.scss'

interface TitleProps {
    children: ReactNode
    center?: boolean
    className?: string
}

export const Title = (props: TitleProps) => {
    const {
        children,
        center,
        className
    } = props
    const classes = classNames(
        {
            [style.center]: center,
        },
        className
    )

    return (
        <h1 className={classes}>{children}</h1>
    )
}
