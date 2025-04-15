import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Title } from "../../shared/ui/Title";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const Soon = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.25 });

    return (
        <motion.div
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
                <Title className={styles.soon}>Выбирайте сеанс <span className={styles.highlightMargin}> и регистрируйтесь</span></Title>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className={styles.buttons}>
                    <Link to='https://itmo.events/events/108557'
                          className={styles.registration_button}
                          target="_blank"
                          rel="noopener noreferrer">
                        16:30
                    </Link>
                    <Link to='https://itmo.events/events/110111'
                          className={styles.registration_button}
                          target="_blank"
                          rel="noopener noreferrer">
                        19:00
                    </Link>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                className={styles.land}
            >
                <motion.img
                    src="/images/landing.webp"
                    alt="header"
                />
                <div className={styles.tg}>
                    следите за нами в tg:
                    <Link to="https://t.me/cgitmo/" className={styles.tg_link}>
                        @cgitmo
                    </Link>
                </div>
                {/*<Link to='/movie/1'*/}
                {/*      className={styles.registration_button}*/}
                {/*      target="_blank"*/}
                {/*      rel="noopener noreferrer"*/}
                {/*>*/}
                {/*    Выбор мест*/}
                {/*</Link>*/}
            </motion.div>
        </motion.div>
    );
};