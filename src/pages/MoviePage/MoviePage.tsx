import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Text } from '../../shared/ui/Text';
import { useGetMovieByIdQuery } from '../../shared/api';
import { SessionTime } from '../../widgets/SessionTime';
import { Session } from '../../shared/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import style from './movie.styles.module.scss';

// import { helpers } from './helpers'

export const MoviePage = () => {
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [error, setError] = useState('');
    const params = useParams();
    const { isLoading, data } = useGetMovieByIdQuery(params.id!);

    const correctPassword = 'kino-2512';

    useEffect(() => {
        const isAuthorized = localStorage.getItem('isAuthorized');
        if (isAuthorized === 'true') {
            setIsAuthorized(true);
        }
    }, []);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthorized(true);
            setError('');
            localStorage.setItem('isAuthorized', 'true'); // Сохраняем авторизацию
        } else {
            setError('Неверный пароль');
        }
    };

    const renderSessionTimes = (sessions: Session[]) => {
        if (!data) return null;
        return sessions.map(({ id, time }) => {
            return <SessionTime key={id} id={id} movieId={data.id!} time={time} />;
        });
    };

    if (!isAuthorized) {
        return (
            <div className={style.auth}>
                <form onSubmit={handlePasswordSubmit} className={style.authForm}>
                    <Text center className={style.title}>
                        Введите пароль для доступа
                    </Text>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${style.authInput} ${error ? style.authInputError : ''}`}
                        placeholder="Пароль"
                    />
                    {error && <div className={style.error}>{error}</div>}
                    <button type="submit" className={style.authButton}>
                        Войти
                    </button>
                </form>
            </div>
        );
    }

    if (isLoading) return <h1>Загрузка...</h1>;
    if (!data) return (
        <div className={style.error}>
            <Text center className={style.title}>Фильм не найден</Text>
            <Link to={'/'}><button className={style.errorButton}>На главную</button></Link>
        </div>
    );

    return (
        <div className={style.bg}>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <Text center className={style.title}>Выбор сеанса</Text>
                    <div className={style.session}>
                        <div className={style.date}>
                            <h3 className={style.date_title}>Дата</h3>
                            <div className={style.date_value}>{data.premier}</div>
                        </div>
                        <div className={style.sessionTimesList}>
                            {renderSessionTimes(data.sessions)}
                        </div>
                    </div>
                </div>
                <Swiper
                    className={style.carousel}
                    slidesPerView={3}
                    loop={true}
                >
                    <SwiperSlide>
                        <img src="/images/blue-slide.webp" alt="Blue Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/pink-slide.webp" alt="Pink Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/red-slide.webp" alt="Red Slide" className={style.slide} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};