import React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";
import styles from "./styles.module.scss";

interface SessionTimeProps {
    id: number
    time: string
    movieId: number
}

export const SessionTime = ({ id, time, movieId }: SessionTimeProps) => (
    <Link to={`/movie/${movieId}/sessions/${id}`} className={classNames(styles.SessionTime, 'hover')}>
        {time}
    </Link>
)