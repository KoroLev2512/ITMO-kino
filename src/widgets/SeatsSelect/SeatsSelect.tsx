import classNames from 'classnames'
import { Seat } from './components/Seat'
import { Seat as ISeat } from '../../shared/types'
import styles from './styles.module.scss'

type BuySeats = ISeat[] | undefined

interface SeatsSelectProps {
    buySeats: BuySeats
}

interface ISeatWithId extends ISeat {
    id: number;
    status: string;
}

const resetNumsForward = [34, 34, 34, 34, 34, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28]
const emptyCellsForward = [
    184, 185, 186, 187, 188, 189, 204, 205, 206, 235, 236, 237, 238, 239, 240,
    269, 270, 271, 272, 273, 274, 303, 304, 305, 306, 307, 308, 337, 338, 339,
    340, 341, 342, 371, 372, 373, 374, 375, 376, 405, 406, 407, 408, 409, 410,
    439, 440, 441, 442, 443, 444, 473, 474, 475, 207, 208, 209, 210, 211, 212,
    213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227,
    228, 229, 230, 231, 232, 233, 234, 476, 477, 478
]

// Генерация мест без переворачивания нумерации внутри ряда.
const generateSeats = (
    buySeats: ISeat[] | undefined,
    resetNums: number[],
    emptyCells: number[]
): (ISeatWithId | null)[] => {
    const seats: (ISeatWithId | null)[] = [];
    let id = 1;
    let row = 1;
    let seatNum = 1;

    for (let i = 0; i < 507; i++) {
        if (emptyCells.includes(i)) {
            seats.push(null);
            continue;
        }

        const currentRowMax = resetNums[row - 1];
        const currentRow = row;
        const currentSeatNum = seatNum;

        const seatData: ISeatWithId = {
            id: id++,
            row: currentRow,
            seat: currentSeatNum,
            status: buySeats?.some(s => s.row === currentRow && s.seat === currentSeatNum)
                ? 'busy'
                : 'available',
        };
        seats.push(seatData);

        if (seatNum === currentRowMax) {
            row++;
            seatNum = 1;
        } else {
            seatNum++;
        }
    }
    return seats;
};

// Группировка мест по рядам
// const groupSeatsByRow = (seats: (ISeatWithId | null)[]): (ISeatWithId | null)[][] => {
//     const groups: (ISeatWithId | null)[][] = []
//     let currentRow = 1
//     let currentGroup: (ISeatWithId | null)[] = []
//     seats.forEach(item => {
//         if (item && item.row > currentRow) {
//             groups.push(currentGroup)
//             currentGroup = []
//             currentRow = item.row
//         }
//         currentGroup.push(item)
//     })
//     if (currentGroup.length) groups.push(currentGroup)
//     return groups
// }

export const SeatSelect = ({ buySeats }: SeatsSelectProps) => {
    const allSeats = generateSeats(buySeats, resetNumsForward, emptyCellsForward);
    const rowsCount = 14;
    const rows = Array.from({ length: rowsCount }, (_, i) => i + 1);

    // const forwardRowsReverse = groupSeatsByRow(allSeats);
    // const reverseRows = forwardRowsReverse.slice().reverse();
    // const reverseSeatsFlat = reverseRows.flat();

    return (
        <div className={styles.seatsSelect}>
            <div className={styles.screen}>
                <span>Экран</span>
                <img src="/icons/screen.svg" alt="screen" />
            </div>
            <div className={styles.place}>
                <div className={styles.rows}>
                    {rows.map((r) => (
                        <div
                            key={`row-${r}`}
                            className={classNames(styles.row, { [styles.marginTop]: r >= 7 })}
                        >
                            {r}
                        </div>
                    ))}
                </div>
                <div className={styles.seats}>
                    {allSeats.map((seat, idx) =>
                        seat ? (
                            <Seat
                                key={`seat-${seat.id}`}
                                data={seat}
                            />
                        ) : (
                            <div key={`empty-${idx}`} className={styles.emptySeat} />
                        )
                    )}
                </div>
            </div>
            <div className={styles.info}>
                <div className={classNames(styles.infoItem, styles.available)}>
                    <i className="ic-dot" />
                    <span className={styles.text}>Свободно</span>
                </div>
                <div className={classNames(styles.infoItem, styles.busy)}>
                    <i className="ic-dot busy" />
                    <span className={styles.text}>Занято</span>
                </div>
                <div className={classNames(styles.infoItem, styles.selected)}>
                    <i className="ic-dot selected" />
                    <span className={styles.text}>Выбрано</span>
                </div>
            </div>
            {/*<div className={styles.place}>*/}
            {/*    <div className={styles.rows}>*/}
            {/*        {Array.from({ length: rowsCount }, (_, i) => rowsCount - i).map(r => (*/}
            {/*            <div key={`rev-row-${r}`} className={styles.row}>{r}</div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <div className={styles.seats}>*/}
            {/*        {reverseSeatsFlat.map((seat, idx) =>*/}
            {/*            seat ? (*/}
            {/*                <Seat*/}
            {/*                    key={`rev-seat-${seat.id}`}*/}
            {/*                    data={seat}*/}
            {/*                />*/}
            {/*            ) : (*/}
            {/*                <div key={`rev-empty-${idx}`} className={styles.emptySeat} />*/}
            {/*            )*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={styles.screen}>*/}
            {/*    <span>Экран</span>*/}
            {/*    <img src="/icons/screen.svg" alt="screen" />*/}
            {/*</div>*/}
        </div>
    );
};

// let seat = 1;
// let row = 1;
// let resetNums = [34, 34, 34, 34, 34, 28, 28, 28, 28, 28, 28, 28, 28, 28];
// const emptyCells = [184, 185, 186, 187, 188, 189, 204, 205, 206, 235, 236, 237, 238, 239, 240, 269, 270, 271, 272, 273, 274, 303, 304, 305, 306, 307, 308, 337, 338, 339, 340, 341, 342, 371, 372, 373, 374, 375, 376, 405, 406, 407, 408, 409, 410, 439, 440, 441, 442, 443, 444, 473, 474, 475];

//     return (
//         <div className={styles.seatsSelect}>
//             <div className={styles.info}>
//                 <div className={classNames(styles.infoItem, styles.available)}>
//                     <i className="ic-dot"/>
//                     <span className={styles.text}>Свободно</span>
//                 </div>
//                 <div className={classNames(styles.infoItem, styles.busy)}>
//                     <i className="ic-dot busy"/>
//                     <span className={styles.text}>Занято</span>
//                 </div>
//                 <div className={classNames(styles.infoItem, styles.selected)}>
//                     <i className="ic-dot selected"/>
//                     <span className={styles.text}>Выбрано</span>
//                 </div>
//             </div>
//             <div className={styles.place}>
//                 <div className={styles.rows}>
//                     {Array(14).fill(0).map((item, i) => (
//                         <div key={`row-${i}`} className={styles.row}>{i + 1}</div>
//                     ))}
//                 </div>
//                 <div className={styles.seats}>
//                     {Array(475).fill(0).map((item, i) => {
//                         if (emptyCells.includes(i)) {
//                             return <div key={`null-${i}`}/>
//                         } else {
//                             const seatData = {
//                                 id: seat,
//                                 row,
//                                 seat,
//                                 status: isBusySeat(row, seat, buySeats) ? 'busy' : 'available'
//                             }
//                             if (seat === resetNums[row - 1] || seat === 34) {
//                                 seat = 1
//                                 row++
//                                 seatData.row = row
//                             } else {
//                                 seat++
//                             }
//                             return <Seat key={`${row}-${seat}`} data={seatData}/>;
//                         }
//                     })}
//                 </div>
//             </div>
//             <div className={styles.screen}>
//                 {/*<i className="ic-screen"></i>*/}
//                 <span>Экран</span>
//                 <img src='/icons/screen.svg' alt='screen'/>
//             </div>
//         </div>
//     )
// }
