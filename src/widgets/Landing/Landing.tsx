import React, { useRef } from 'react';
import { Movies } from './Movies';
import { Head } from './Head';
import { Date } from './Date';
import { Soon } from './Soon';
import styles from './styles.module.scss';

export const Landing = () => {
    const soonRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className={styles.wrapper}>
            <Head soonRef={soonRef} />
            <Movies />
            <Date />
            <div ref={soonRef}><Soon /></div>
        </div>
    );
};
