import {createBrowserRouter, RouterProvider} from "react-router-dom";
import style from "./App.module.scss";
import {HomePage} from "./pages/HomePage";
import {MoviePage} from "./pages/MoviePage";
import {SessionPage} from "./pages/SessionPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {Provider} from "react-redux";
import {store} from "./shared/store";
import {Helmet, HelmetProvider} from "react-helmet-async";
import React from "react";

const router = createBrowserRouter(
    [
        {path: "/", element: <HomePage/>},
        {path: "/movie/:id", element: <MoviePage/>},
        {path: "/movie/:movieId/sessions/:sessionId", element: <SessionPage/>},
        {path: "/movie/:movieId/registration/", element: <RegistrationPage/>},
        {path: "/*", element: <NotFoundPage/>},
    ],
    {
        future: {
            v7_startTransition: true,
        } as Partial<Record<string, any>>,
    }
);

export const App = () => {
    return (
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
            <Provider store={store}>
                <div className={style.App}>
                    <RouterProvider router={router}/>
                </div>
            </Provider>
        </HelmetProvider>
    );
};