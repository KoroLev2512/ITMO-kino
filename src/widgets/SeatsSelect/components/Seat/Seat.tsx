import classNames from 'classnames'
import style from './Seat.module.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSeat, deleteSeat } from '../../../../shared/slices'
import { Seat as ISeat } from '../../../../shared/types'

interface SeatProps {
  data: {
    row: number
    seat: number
    status: string
  }
  className?: string
  /**
   * Demo mode: hover shows "Ряд N, место M", the seat never changes state and never
   * touches the order store. A click only calls `onReadOnlyClick`.
   */
  readOnly?: boolean
  onReadOnlyClick?: (seat: ISeat) => void
}

const statusLabel: Record<string, string> = {
  available: 'свободно',
  busy: 'занято',
  selected: 'выбрано',
}

export const Seat = ({ data, className, readOnly, onReadOnlyClick }: SeatProps) => {
  const { row, seat, status: initStatus } = data
  const [status, setStatus] = useState(initStatus);
  const classes = classNames(style.Seat, style[status], { [style.readOnly]: readOnly }, className)
  const dispatch = useDispatch()
  const position = `Ряд ${row}, место ${seat}`
  const label = readOnly ? position : `${position} — ${statusLabel[status] ?? status}`

  const onClick = () => {
    if (readOnly) {
      onReadOnlyClick?.({ row, seat })
      return
    }
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
    <div
      className={classes}
      onClick={onClick}
      data-tooltip={readOnly ? label : undefined}
      aria-label={label}
    >
      <i className='ic-seat' />
      <span className={style.seatNum}>{seat}</span>
    </div>
  )
}
