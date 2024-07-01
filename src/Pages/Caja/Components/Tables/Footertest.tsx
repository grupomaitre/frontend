import { FC } from 'react'
interface Props {
    totalCaja: number
    text?: string
    colSpan?: number
}
const Footertest: FC<Props> = ({ totalCaja, text, colSpan }) => {
    return (
        <>
            <tr>
                <td colSpan={colSpan || 0}>
                    <span className=" fw-bold fs-14">{text || 'Total:'}  </span>
                </td>
                <td >
                    <span className=" fw-bold fs-14 text-center">{totalCaja || '0.00'}</span>
                </td>
            </tr>
        </>
    )
}

export default Footertest