import { Link } from 'react-router-dom'
import { Title } from '../Title'
import classNames from 'classnames'
import style from './styles.module.scss'

interface HeaderProps {
    title: string
    onClick?: () => void
}

export const Header = (props: HeaderProps) => {
    const { title, onClick } = props

    return (
        <div className={style.Header}>
            <Link to='/movie/1' className={classNames('hover', style.backBtn)} onClick={onClick}>
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
