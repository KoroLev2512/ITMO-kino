import classNames from 'classnames'
import style from './Seat.module.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSeat, deleteSeat } from '../../../../shared/slices'

interface SeatProps {
  data: {
    row: number
    seat: number
    status: string
  }
  className?: string
}

export const Seat = ({ data }: SeatProps, className:string) => {
  const { row, seat, status: initStatus } = data
  const [status, setStatus] = useState(initStatus);
  const classes = classNames(style.Seat, style[status], className)
  const dispatch = useDispatch()

  const onClick = () => {
    if (initStatus !== 'busy') {
      const isSelected = status === 'available'
      const newStatus = isSelected ? 'selected' : 'available'
      setStatus(newStatus)

      if (isSelected) {
        dispatch(addSeat({ row, seat }))
      } else {
        dispatch(deleteSeat({ row, seat }))
      }
    }
  }

  return (
    <div className={classes} onClick={onClick}>
      <i className='ic-seat' />
      <span className={style.seatNum}>{seat}</span>
    </div>
  )
}
