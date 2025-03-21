import classNames from 'classnames';
import {Text} from "../../../shared/ui/Text";
import {Link} from "react-router-dom";

import styles from './NotFoundPage.module.scss';

import style from "../../MoviePage/movie.styles.module.scss";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({className}: NotFoundPageProps) => {
    return (
        <div className={classNames(styles.NotFoundPage, {}, [className])}>
            <Text center className={style.title}>Страница не найдена</Text>
            <Link to={'/'}><button className={styles.errorButton}>На главную</button></Link>
        </div>
    );
};
