import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './regitration.styles.module.scss';
import { Link } from 'react-router-dom';

export const RegistrationPage = () => {
    const location = useLocation();
    const premier = location.state?.premier;

    const clearOrderInStore = () => {
        console.log('clearOrderInStore');
    };

    return (
        <div className={style.bg}>
            <div className={style.wrapper}>
                <Link to='/movie/1' className={style.backButton} onClick={clearOrderInStore}>
                    <img src='/icons/arrow-icon.svg' alt='back' className={style.icon} />
                    Назад
                </Link>
                <div className={style.content}>
                    <div className={style.title}>Регистрация</div>
                    <div className={style.description}>
                        После подтверждения регистрации билет придёт на почту, привязанную к ITMO ID. Если не придет, обратитесь к @vlkvmshh в телеграмм
                    </div>
                    <div className={style.date}>
                        {premier && <p>Дата премьеры: {premier}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};