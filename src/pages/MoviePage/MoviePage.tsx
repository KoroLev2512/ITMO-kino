import {useParams, useNavigate} from 'react-router-dom'
import {Text} from '../../shared/ui/Text'
import {useGetMovieByIdQuery} from '../../shared/api'
import {SessionTime} from '../../widgets/SessionTime'
import {Session} from '../../shared/types'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

import style from './movie.styles.module.scss'

// import { InfoTable } from '../../widgets/InfoTable'
// import { helpers } from './helpers'
// import { Header } from '../../widgets/Header'

export const MoviePage = () => {
    const params = useParams()
    const navigate = useNavigate();
    const {isLoading, data} = useGetMovieByIdQuery(params.id!)

    const slides = document.querySelectorAll('.swiper-slide');
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    const renderSessionTimes = (sessions: Session[]) => {
        if (!data) return null
        return sessions.map(({id, time}) => {
            return <SessionTime key={id} id={id} movieId={data.id!} time={time}/>
        })
    }

    const handleRegisterClick = () => {
        if (data) {
            navigate(`/movie/1/registration`, { state: { premier: data.premier } });
        }
    };

    if (isLoading) return <h1>Загрузка...</h1>
    if (!data) return <Text center>Фильм не найден</Text>

    return (
        <div className={style.bg}>
            <div className={style.wrapper}>
                <div className={style.content}>
                    <Text center className={style.title}>Выбор сеанса</Text>
                    <div className={style.session}>
                        <div className={style.date}>
                            <h3 className={style.date_title}>Дата</h3>
                            <div className={style.date_value}>{data.premier}</div>
                        </div>
                        <div className={style.sessionTimesList}>
                            {renderSessionTimes(data.sessions)}
                        </div>
                    </div>
                </div>
                <Swiper
                    className={style.carousel}
                    slidesPerView={3}
                    loop={true}
                    onClick={handleRegisterClick}
                >
                    <SwiperSlide>
                        <img src="/images/blue_slide.png" alt="Blue Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/pink_slide.png" alt="Pink Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/red_slide.png" alt="Red Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/blue_slide.png" alt="Blue Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/pink_slide.png" alt="Pink Slide" className={style.slide} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/images/red_slide.png" alt="Red Slide" className={style.slide} />
                    </SwiperSlide>
                </Swiper>
                {/*<div className={style.content}>*/}
                {/*  <div className={style.leftColumn}>*/}
                {/*  </div>*/}
                {/*</div>*/}
                {/*<div className={style.image}>*/}
                {/*  <img src={data.img} alt={data.title} />*/}
                {/*</div>*/}
                {/*<div className={style.desc}>{data.description}</div>*/}
                {/*<div className={style.rightColumn}>*/}
                {/*<div className={style.info}>*/}
                {/*  <InfoTable data={helpers.getInfoData(data)} />*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

