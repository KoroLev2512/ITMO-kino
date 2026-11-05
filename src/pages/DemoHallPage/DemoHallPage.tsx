import { Header } from '../../widgets/Header'
import { SeatSelect } from '../../widgets/SeatsSelect'

import sessionStyle from '../SessionPage/session.styles.module.scss'
import style from './demoHall.styles.module.scss'

export const DemoHallPage = () => (
    <div className={sessionStyle.bg}>
        <div className={sessionStyle.wrapper}>
            <Header title="Схема зала" backTo="/"/>
            <div className={sessionStyle.content}>
                <p className={style.note}>
                    Наведите на место, чтобы увидеть ряд и статус.
                    <br/>
                    Выбор мест в демо отключён — бронирование доступно только кассирам перед показом — приходите пораньше.
                </p>
                {/* Demo shows an empty hall: no backend, every seat is free. */}
                <SeatSelect buySeats={[]} readOnly/>
            </div>
        </div>
    </div>
)
