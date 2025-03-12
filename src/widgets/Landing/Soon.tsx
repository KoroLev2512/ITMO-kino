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
                <Title className={styles.soon}>Ждём на премьере!</Title>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <Link to='https://itmo.events/'
                      className={styles.registration_button}
                      target="_blank"
                      rel="noopener noreferrer">
                    Зарегистрироваться
                </Link>
            </motion.div>

            <motion.img
                src="/images/landing.png"
                alt="header"
                className={styles.land}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
            />
        </motion.div>
    );
};
