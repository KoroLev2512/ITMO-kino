import { Fragment } from 'react'
import { TableData } from './types'

import style from './styles.module.scss'

interface InfoTableProps {
    data: TableData[]
}

export const TablePopup = ({ data }: InfoTableProps) => {
    const renderItems = (data: TableData[]) => {
        return data.map(({ label, value }) => (
            <Fragment key={label}>
                <div className={style.label}>{label}</div>
                <div>{value}</div>
            </Fragment>
        ))
    }

    return (
        <div className={style.InfoTablePopup}>{renderItems(data)}</div>
    )
}
