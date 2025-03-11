import {Link} from 'react-router-dom'
import {Text} from '../../../shared/ui/Text'
import {IMovieCard} from '../../../shared/types'
import classNames from "classnames";
import styles from '../styles.module.scss'

interface MovieCardProps {
    data: IMovieCard
}

export const MovieCard = ({data}: MovieCardProps) => {
    return (
        <Link to={`/movie/${data.id}`} className={classNames(styles.card, data.className)}>
            <div className={styles.image}>
                <img src={data.img} alt={data.title}/>
            </div>
            <Text className={styles.title}>{data.title}</Text>
            <Text className={styles.description}>{data.genre}</Text>
        </Link>
    )
}
