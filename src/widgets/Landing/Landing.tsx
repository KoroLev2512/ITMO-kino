import React, {useRef} from 'react';
import {Title} from "../../shared/ui/Title";
import PlayIcon from "../../shared/icons/PlayIcon";
import { Link } from 'react-router-dom';
import styles from "./styles.module.scss";

export const Landing = () => {
    const soonRef = useRef<HTMLDivElement>(null);

    const handleScrollToSoon = () => {
        soonRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.wrapper}>
            <img
                className={styles.logo}
                src="/icons/logo_horizontal.svg"
                alt="logo"
            />
            <Title className={styles.title}>
                <span className={styles.highlight}>Мы сделали кино</span><br/>
                и приглашаем вас <br/>
                его посмотреть
            </Title>
            <div className={styles.description}>
                В уютном пространстве Люмьер-Холла на набережной Обводного канала регулярно собираются любители
                научной фантастики и качественного кино. ИТМО запустил замечательную традицию - показы
                научно-популярных фильмов в теплой компании ITMO Family
            </div>
            <img
                src="/images/header.png"
                alt="header"
                className={styles.image}
            />
            <button className={styles.button} onClick={handleScrollToSoon}>
                Зарегистрироваться
            </button>
            <div className={styles.movies}>
                <div className={styles.movie}>
                    <img
                        src="/images/pink_slide.png"
                        alt="Pink Slide"
                        className={styles.card_image}
                    />
                    <div className={styles.card_info}>
                        <div className={styles.card_title}>Вкус</div>
                        <div className={styles.card_description}>Каждое утро Романа Ивановича начиналось с чашки
                            идеального кофе в любимой кофейне. Его жизнь была простой и предсказуемой, пока однажды
                            этот утренний ритуал не обернулся мучительной пыткой, перевернув его мир с ног на
                            голову. Что теперь делать? Принять изменения, попытаться вернуть прежний кофе или искать
                            истину, которая может разрушить все?
                        </div>
                        <div className={styles.card_director}>Режиссер: <span className={styles.director_name}>Игорь Гомжин</span>
                        </div>
                        <button className={styles.card_button}>Трейлер <PlayIcon/></button>
                    </div>
                </div>
                <div className={styles.movie}>
                    <img
                        src="/images/blue_slide.png"
                        alt="Pink Slide"
                        className={styles.card_image}
                    />
                    <div className={styles.card_info}>
                        <div className={styles.card_title}>В темноте</div>
                        <div className={styles.card_description}>
                            Взять ли за руку или отступить? Сделать шаг навстречу или дать приоритет чему-то другому? Их история — это эксперимент, в котором два человека проживают возможное будущее, прежде чем рискнуть и сделать первый шаг. В череде бытовых сцен — размышления, сомнения, кризисы, знакомые каждому, кто когда-то выбирал между чувствами и амбициями
                        </div>
                        <div className={styles.card_director}>Режиссер: <span className={styles.director_name}>Владислав Шиль</span>
                        </div>
                        <button className={styles.card_button}>Трейлер <PlayIcon/></button>
                    </div>
                </div>
                <div className={styles.movie}>
                    <img
                        src="/images/red_slide.png"
                        alt="Pink Slide"
                        className={styles.card_image}
                    />
                    <div className={styles.card_info}>
                        <div className={styles.card_title}>Птичка</div>
                        <div className={styles.card_description}>
                            Как долго можно прятаться в мире грез, где краски ложатся так, как хочется, а линии реальности размыты? В этой истории – противоречие между "хочу" и "надо", мечтой и неизбежностью взросления. Герой прокладывает путь сквозь свои фантазии, пока окружающие не требуют от него настоящего решения. В фильме переживания художника, чья история становится зеркалом для каждого из нас
                        </div>
                        <div className={styles.card_director}>Режиссер: <span className={styles.director_name}>Арсений Колесник</span>
                        </div>
                        <button className={styles.card_button}>Трейлер <PlayIcon/></button>
                    </div>
                </div>
            </div>
            <div className={styles.glasses}>
                <Title className={styles.title}>
                    Расписание
                </Title>
                <div className={styles.date}>
                    <h3 className={styles.date_title}>Дата</h3>
                    <div className={styles.date_value}>28.03.2025</div>
                </div>
                <div className={styles.time}>
                    <h3 className={styles.time_title}>Время</h3>
                    <div className={styles.sessionTimesList}>
                        <div className={styles.sessionTime}>17:00</div>
                        <div className={styles.sessionTime}>19:30</div>
                    </div>
                    <div className={styles.time_description}>
                        Будет 2 сеанса, и ты можешь выбрать удобный для себя
                    </div>
                </div>
                <div className={styles.place}>
                    <h3 className={styles.place_title}>Место</h3>
                    <div className={styles.place_value}>Кинолофт «Москва»,<br/>пл. Александра Невского, 2</div>
                </div>
                <img
                    src="/images/glasses.png"
                    alt="header"
                    className={styles.k}
                />
            </div>
            <div ref={soonRef}>
                <Title className={styles.soon}>
                    Ждём на премьере!
                </Title>
                <Link to='https://itmo.events/' className={styles.registration_button} target="_blank" rel="noopener noreferrer">
                    Зарегистрироваться
                </Link>
                <img
                    src="/images/landing.png"
                    alt="header"
                    className={styles.land}
                />
            </div>
        </div>
    )
};
