// import { MovieList } from '../../widgets/MovieList'
// import { Text } from '../../shared/ui/Text'
import { Landing } from "../../widgets/Landing";
import styles from './home.styles.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.wrapper}>
                <Landing/>
                {/* <Text center children={"Welcome to itmokino"} className={styles.title}/> */}
                {/* <MovieList/> */}
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </div>
        </div>
    );
};
