import {useDispatch, useSelector} from 'react-redux'
import {Header} from '../../widgets/Header'
import {SeatSelect} from '../../widgets/SeatsSelect'
import {RootState} from '../../shared/store'
import {OrderState, clearOrder} from '../../shared/slices'
import classNames from 'classnames'
import {useParams} from 'react-router-dom'
import {Title} from '../../shared/ui/Title'
import {useGetMovieByIdQuery, useGetSessionByIdQuery} from '../../shared/api'
import {useUpdateSeatsByIdMutation} from '../../shared/api/order'
import {OrderData} from '../../shared/types'
import {useEffect, useRef, useState} from 'react'

// import { InfoTable } from '../../widgets/InfoTable'

import style from './session.styles.module.scss'


export const SessionPage = () => {
    const dispatch = useDispatch()
    const imgRef = useRef<HTMLImageElement>(null)
    const [isDisabled, setIsDisabled] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const params = useParams()
    const {isLoading, data: sessionData} = useGetSessionByIdQuery(params.sessionId!)
    const {data: movieData} = useGetMovieByIdQuery(params.movieId!)
    const [buyTicket, {isSuccess}] = useUpdateSeatsByIdMutation()
    const {order} = useSelector((state: RootState) => state)
    const price = 500
    const seatsCount = order.seats.length
    const totalPrice = price * seatsCount

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getOrderInfo = (order: OrderState) => {
        return order.seats.map(({row, seat}, i) => ({
            label: `Билет ${i + 1}`,
            value: `Ряд ${row} место ${seat}`
        }))
    }

    useEffect(() => {
        if (isSuccess) {
            const dataForQrCode = encodeURI(JSON.stringify({
                movie: movieData?.title,
                time: sessionData?.time,
                sessionId: sessionData?.id,
                seats: order.seats,
                total_price: totalPrice
            }));
            setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${dataForQrCode}`);
        }
    }, [isSuccess, movieData?.title, order.seats, sessionData?.id, sessionData?.time, totalPrice]);

    useEffect(() => {
        if (qrCode) {
            // Генерим QR код
            if (imgRef.current) {
                imgRef.current.src = qrCode
            }
        }
    }, [qrCode])

    if (isLoading) return <Title center>Загрузка свободных мест...</Title>

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getSessionInfo = (movie: string, time: string) => {
        return [
            {
                label: 'Название',
                value: movie
            },
            {
                label: 'Начало в',
                value: time
            }
        ]
    }

    const clearOrderInStore = () => {
        dispatch(clearOrder())
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getPriceInfo = (count: number, price: number) => {
        return [
            {
                label: 'Количество',
                value: count
            },
            {
                label: 'Цена',
                value: `${price}₽`
            },
        ]
    }

    const onClick = () => {
        const buySeats = sessionData?.seat?.buy_seats || []
        const orderData: OrderData = {
            id: sessionData?.seatId!,
            buy_seats: [...buySeats, ...order.seats]
        }
        buyTicket(orderData)
        setIsDisabled(true)
    }

    if (!sessionData || !movieData) return null

    return (
        <div className={style.bg}>
            <div className={style.wrapper}>
                <Header title="Выбор места" onClick={clearOrderInStore}/>
                <div className={style.content}>
                    <div className={style.date}>
                        <p className={style.date_title}>{sessionData.date} |&nbsp;</p>
                        <p className={style.date_time}>{sessionData.time}</p>
                    </div>
                    <SeatSelect buySeats={sessionData?.seat?.buy_seats}/>
                    <div className={style.info}>
                        {/*<InfoTable data={getSessionInfo(movieData.title, sessionData.time)} />*/}
                        {!!seatsCount && <div className={style.info}>
                            {/*<h3 className={style.title}>Выбранные места</h3>*/}
                            {/*<InfoTable data={getOrderInfo(order)} />*/}
                            {/*<div className={style.info}>*/}
                            {/*  <InfoTable data={getPriceInfo(seatsCount, price)} />*/}
                            {/*</div>*/}
                            {/*<div className={style.total}>*/}
                            {/*  <span>Итого:</span>*/}
                            {/*  <strong>{totalPrice}₽</strong>*/}
                            {/*</div>*/}
                            {!qrCode && <div
                                className={classNames(style.button, 'hover', {
                                    [style.disable]: isDisabled
                                })}
                                onClick={onClick}
                            >
                                <div className={style.accept}>
                                    готово
                                </div>
                            </div>}
                        </div>}
                        <h3 className={classNames(style.title, style.titleCenter)}>0</h3>
                        {qrCode && <div className={style.qr}>
                            <img ref={imgRef} src="" alt="QR Code"/>
                        </div>}
                    </div>
                </div>
            </div>
            {/*<img*/}
            {/*    src="/images/chairs-bg-red.png"*/}
            {/*    alt="red-chairs"*/}
            {/*    className={style.bg}*/}
            {/*/>*/}
        </div>
    )
}
