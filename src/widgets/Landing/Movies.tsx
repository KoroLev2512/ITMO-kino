import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StyledPlayIcon from "../../shared/icons/PlayIcon";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const Movies = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
        <motion.div
            className={styles.movies}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
        >
            {[
                {
                    img: "/images/red_slide.png",
                    title: "Птичка",
                    description: "Как долго можно прятаться в мире грез, где краски ложатся так, как хочется, а линии реальности размыты? В этой истории – противоречие между хочу и надо, мечтой и неизбежностью взросления. Герой прокладывает путь сквозь свои фантазии, пока окружающие не требуют от него настоящего решения. В фильме переживания художника, чья история становится зеркалом для каждого из нас",
                    director: "Арсений Колесник",
                    link: "https://t.me/cgitmo/54"
                },
                {
                    img: "/images/pink_slide.png",
                    title: "Вкус",
                    description: "Каждое утро Романа Ивановича начиналось с чашки идеального кофе в любимой кофейне. Его жизнь была простой и предсказуемой, пока однажды этот утренний ритуал не обернулся мучительной пыткой, перевернув его мир с ног на голову. Что теперь делать? Принять изменения, попытаться вернуть прежний кофе или искать истину, которая может разрушить все?",
                    director: "Игорь Гомжин"
                },
                {
                    img: "/images/blue_slide.png",
                    title: "В темноте",
                    description: "Взять ли за руку или отступить? Сделать шаг навстречу или дать приоритет чему-то другому? Их история — это эксперимент, в котором два человека проживают возможное будущее, прежде чем рискнуть и сделать первый шаг. В череде бытовых сцен — размышления, сомнения, кризисы, знакомые каждому, кто когда-то выбирал между чувствами и амбициями",
                    director: "Владислав Шиль"
                }
            ].map((movie, index) => (
                <motion.div
                    className={styles.movie}
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: index * 0.3 }}
                >
                    <motion.img
                        src={movie.img}
                        alt={movie.title}
                        className={styles.card_image}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                    />
                    <motion.div
                        className={styles.card_info}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className={styles.card_title}>{movie.title}</div>
                        <div className={styles.card_description}>{movie.description}</div>
                        <div className={styles.card_director}>Режиссер: <span className={styles.director_name}>{movie.director}</span></div>
                        {movie.link ? (
                            <Link to={movie.link}>
                                <motion.button
                                    className={styles.card_button}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 1, delay: 0.7 }}
                                >
                                    Тизер <StyledPlayIcon />
                                </motion.button>
                            </Link>
                        ) : (
                            <motion.img
                                src="/icons/button.svg"
                                alt="button"
                                className={styles.card_soon}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1, delay: 0.7 }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
};
