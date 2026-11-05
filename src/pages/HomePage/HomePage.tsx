import { Landing } from "../../widgets/Landing";
import styles from './home.styles.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.bg}>
            <main className={styles.wrapper}>
                <Landing/>
            </main>
        </div>
    );
};
