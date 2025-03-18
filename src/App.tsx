import {createBrowserRouter, RouterProvider} from "react-router-dom";
import style from "./App.module.scss";
import {HomePage} from "./pages/HomePage";
import {MoviePage} from "./pages/MoviePage";
import {SessionPage} from "./pages/SessionPage";
// import { RegistrationPage } from "./pages/RegistrationPage";
import {Provider} from "react-redux";
import {store} from "./shared/store";

const router = createBrowserRouter(
    [
        {path: "/", element: <HomePage/>},
        {path: "/movie/:id", element: <MoviePage/>},
        {path: "/movie/:movieId/sessions/:sessionId", element: <SessionPage/>},
        // { path: "/movie/:movieId/registration/", element: <RegistrationPage /> },
    ],
    {
        future: {
            v7_startTransition: true,
        } as Partial<Record<string, any>>,
    }
);

export const App = () => {
    return (
        <Provider store={store}>
            <div className={style.App}>
                <RouterProvider router={router}/>
            </div>
        </Provider>
    );
};