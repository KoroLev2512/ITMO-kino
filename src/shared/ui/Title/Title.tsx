import { ReactNode } from "react"
import classNames from 'classnames'
import style from './styles.module.scss'

interface TitleProps {
    children: ReactNode
    center?: boolean
    className?: string
    as?: 'h1' | 'h2' | 'h3'
}

export const Title = (props: TitleProps) => {
    const {
        children,
        center,
        className,
        as: Tag = 'h1',
    } = props
    const classes = classNames(
        {
            [style.center]: center,
        },
        className
    )

    return (
        <Tag className={classes}>{children}</Tag>
    )
}
