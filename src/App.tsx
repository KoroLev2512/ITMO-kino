import {createBrowserRouter, RouterProvider} from "react-router-dom";
import style from "./App.module.scss";
import {HomePage} from "./pages/HomePage";
import {MoviePage} from "./pages/MoviePage";
import {SessionPage} from "./pages/SessionPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {DemoHallPage} from "./pages/DemoHallPage";
import {ServiceUnavailablePage} from "./pages/ServiceUnavailablePage";
import {Provider} from "react-redux";
import {store} from "./shared/store";
import {HelmetProvider} from "react-helmet-async";
import {Seo} from "./shared/ui/Seo";
import React, {useEffect} from "react";

// Default meta / OG / JSON-LD live in public/index.html; routes only override title and robots.
// Password-gated booking pages and 404 are kept out of the index.
const router = createBrowserRouter(
    [
        {path: "/", element: <><Seo/><HomePage/></>},
        {path: "/movie/:id", element: <><Seo title="Выбор сеанса" noindex/><MoviePage/></>},
        {path: "/movie/:movieId/sessions/:sessionId", element: <><Seo title="Выбор мест" noindex/><SessionPage/></>},
        {path: "/movie/:movieId/registration/", element: <><Seo title="Регистрация" noindex/><RegistrationPage/></>},
        {path: "/demo/hall", element: <><Seo title="Схема зала — демо"/><DemoHallPage/></>},
        {path: "/503", element: <><Seo title="503 — технический перерыв" noindex/><ServiceUnavailablePage/></>},
        {path: "/*", element: <><Seo title="404 — страница не найдена" noindex/><NotFoundPage/></>},
    ],
    {
        future: {
            v7_startTransition: true,
        } as Partial<Record<string, any>>,
    }
);

export const App = () => {
    useEffect(() => {
        document.dispatchEvent(new Event('REACT_SNAP_RENDERED'));
    }, []);
    return (
        <HelmetProvider>
            <Provider store={store}>
                <div className={style.App}>
                    <RouterProvider router={router}/>
                </div>
            </Provider>
        </HelmetProvider>
    );
};
