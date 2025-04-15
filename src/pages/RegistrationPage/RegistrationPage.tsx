import React from 'react';
// import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './registration.styles.module.scss';


export const RegistrationPage = () => {
    // const location = useLocation();
    // const premier = location.state?.premier;

    const clearOrderInStore = () => {
        console.log('clearOrderInStore');
    };

    return (
        <div className={style.bg}>
            <div className={style.wrapper}>
                <Link to='/movie/1' className={style.backButton} onClick={clearOrderInStore}>
                    <img src='/icons/arrow-icon.webp' alt='back' className={style.icon} />
                    Назад
                </Link>
                <div className={style.content}>
                    <div className={style.title}>Регистрация</div>
                    <div className={style.description}>
                        После подтверждения регистрации билет придёт на почту, привязанную к ITMO ID. Если не придет, обратитесь к @vlkvmshh в телеграмм
                    </div>
                    <div className={style.info}>
                        <div className={style.date}>
                            <div className={style.date_title}>Дата</div>
                            <div className={style.date_value}>28.03.2025</div>
                        </div>
                        <div className={style.place}>
                            <div className={style.place_title}>Время</div>
                            <div className={style.date_value}>17:00</div>
                        </div>
                    </div>
                    <img
                        src="/images/landing.webp"
                        alt="header"
                        className={style.land}
                    />
                </div>
            </div>
        </div>
    );
};