import React, { useRef } from 'react';
import { Movies } from "./Movies";
import { Head } from "./Head";
import { Date } from "./Date";
import styles from "./styles.module.scss";
import { Soon } from "./Soon";

export const Landing = () => {
    const soonRef = useRef(null);

    return (
        <div className={styles.wrapper}>
            <Head soonRef={soonRef} />
            <Movies />
            <Date />
            <div ref={soonRef}>
                <Soon />
            </div>
        </div>
    );
};
