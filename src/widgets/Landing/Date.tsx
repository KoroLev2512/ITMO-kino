import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Title } from "../../shared/ui/Title";
import styles from "./styles.module.scss";

export const Date = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.25 });

    return (
        <motion.div
            className={styles.glasses}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <Title className={styles.title}>Расписание</Title>
            </motion.div>

            <motion.div
                className={styles.date}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <h3 className={styles.date_title}>Дата</h3>
                <div className={styles.date_value}>28.03.2025</div>
            </motion.div>

            <motion.div
                className={styles.time}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <h3 className={styles.time_title}>Время</h3>
                <div className={styles.sessionTimesList}>
                    <motion.div
                        className={styles.sessionTime}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.8 }}
                    >16:30</motion.div>
                    <motion.div
                        className={styles.sessionTime}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 1 }}
                    >19:00</motion.div>
                </div>
                <motion.div
                    className={styles.time_description}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    Будет 2 сеанса, и ты можешь выбрать удобный для себя
                </motion.div>
            </motion.div>

            <motion.div
                className={styles.place}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 1.4 }}
            >
                <h3 className={styles.place_title}>Место</h3>
                <div className={styles.place_value}>Кинотеатр отеля «Москва»<br/>пл. Александра Невского 2</div>
            </motion.div>

            <motion.img
                src="/images/glasses.png"
                alt="header"
                className={styles.k}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 1.6 }}
            />
        </motion.div>
    );
};
