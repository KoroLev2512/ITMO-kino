import {BrowserRouter, Route, Routes} from 'react-router-dom'
import style from './App.module.scss'
import {HomePage} from './pages/HomePage'
import {MoviePage} from './pages/MoviePage'
import {SessionPage} from './pages/SessionPage'
import {RegistrationPage} from "./pages/RegistrationPage";
import {Landing} from './widgets/Landing';
import {Provider} from 'react-redux'
import {store} from './shared/store'


export const App = () => {
    return (
        <Provider store={store}>
            <div className={style.App}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/movie/:id" element={<MoviePage/>}/>
                        <Route path="/movie/:movieId/sessions/:sessionId" element={<SessionPage/>}/>
                        <Route path="/movie/:movieId/registration/" element={<RegistrationPage/>}/>
                        <Route path="/" element={<Landing/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    )
}
