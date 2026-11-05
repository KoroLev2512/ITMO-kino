import { Link } from 'react-router-dom'
import { Title } from '../Title'
import classNames from 'classnames'
import style from './styles.module.scss'

interface HeaderProps {
    title: string
    onClick?: () => void
    backTo?: string
}

export const Header = (props: HeaderProps) => {
    const { title, onClick, backTo = '/movie/1' } = props

    return (
        <div className={style.Header}>
            <Link to={backTo} className={classNames('hover', style.backBtn)} onClick={onClick}>
                <img
                    src="/icons/arrow-icon.webp"
                    alt="arrow"
                    className={style.arrow}
                />
                Назад
            </Link>
            <Title center className={style.title}>{title}</Title>
        </div>
    )
}
