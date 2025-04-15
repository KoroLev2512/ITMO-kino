// import { MovieList } from '../../widgets/MovieList'
// import { Text } from '../../shared/ui/Text'
import { Landing } from "../../widgets/Landing";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from './home.styles.module.scss';

export const HomePage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>ITMO KINO</title>
                <meta name="description" content="Мы сделали кино в ИТМО и приглашаем вас его посмотреть" />
                <meta name="keywords" content="ИТМО, кино, показ, студенты, студенческая жизнь, актив, творчество, тизеры, кинопоказ, кинотеатр" />
                <meta name="author" content="Yurii Korolev" />
                <meta property="og:title" content="ИТМО КИНО" />
                <meta property="og:description" content="Мы сделали кино в ИТМО и приглашаем вас его посмотреть" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://itmokino.ru" />
                <meta property="og:image" content="https://itmokino.ru/itmokino-metadata.webp" />
            </Helmet>
            <div className={styles.bg}>
                <div className={styles.wrapper}>
                    <Landing/>
                    {/* <Text center children={"Welcome to itmokino"} className={styles.title}/> */}
                    {/* <MovieList/> */}
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>
            </div>
        </HelmetProvider>
    );
};
