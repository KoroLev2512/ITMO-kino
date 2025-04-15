import React from 'react';
import ReactDOM from 'react-dom/client';
import {Helmet, HelmetProvider} from "react-helmet-async";
import {App} from './App';

import './app/styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HelmetProvider>
        <Helmet>
            <title>ITMO KINO</title>
            <meta name="description" content="Мы сделали кино в ИТМО и приглашаем вас его посмотреть"/>
            <meta name="keywords"
                  content="ИТМО, кино, показ, студенты, студенческая жизнь, актив, творчество, тизеры, кинопоказ, кинотеатр"/>
            <meta name="author" content="Yurii Korolev"/>
            <meta property="og:title" content="ИТМО КИНО"/>
            <meta property="og:description" content="Мы сделали кино в ИТМО и приглашаем вас его посмотреть"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://itmokino.ru"/>
            <meta property="og:image" content="https://itmokino.ru/itmokino-metadata.webp"/>
        </Helmet>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </HelmetProvider>
);
