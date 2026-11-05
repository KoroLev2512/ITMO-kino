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
  /** Demo mode: hover shows seat info, clicks do nothing and never touch the order store. */
  readOnly?: boolean
}

const statusLabel: Record<string, string> = {
  available: 'свободно',
  busy: 'занято',
  selected: 'выбрано',
}

export const Seat = ({ data, className, readOnly }: SeatProps) => {
  const { row, seat, status: initStatus } = data
  const [status, setStatus] = useState(initStatus);
  const classes = classNames(style.Seat, style[status], { [style.readOnly]: readOnly }, className)
  const dispatch = useDispatch()
  const tooltip = `Ряд ${row}, место ${seat} — ${statusLabel[status] ?? status}`

  const onClick = () => {
    if (readOnly) return
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
      onClick={readOnly ? undefined : onClick}
      data-tooltip={readOnly ? tooltip : undefined}
      aria-label={tooltip}
      aria-disabled={readOnly || undefined}
    >
      <i className='ic-seat' />
      <span className={style.seatNum}>{seat}</span>
    </div>
  )
}
