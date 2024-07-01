import { useState, FC, useEffect } from 'react'
import { Input, Table } from 'reactstrap'
interface Props {
    handleKeyDown: (e: any, key: number) => void
    totalCaja: number
    saldoInicial: number
}
const TableCierraCaja: FC<Props> = ({ handleKeyDown, totalCaja, saldoInicial }) => {
    // const [saldoInicialCaja, setSaldoInicialCaja] = useState<any>(0)
    const [total, setTotal] = useState<any>()
    const [sobrante, setSobrante] = useState<any>()
    const [b100, setB100] = useState(0)
    const [b50, setB50] = useState(0)
    const [b20, setB20] = useState(0)
    const [b10, setB10] = useState(0)
    const [b5, setB5] = useState(0)
    const [one, setOne] = useState(0)
    const [m50, setM50] = useState(0)
    const [m25, setM25] = useState(0)
    const [m10, setM10] = useState(0)
    const [m5, setM5] = useState(0)
    const [m1, setM1] = useState(0)
    const countMonedas = [
        { id: 1, inputChange: b100, labeX: 'X', name: 'B_100', value: 100, count: 0 },
        { id: 2, inputChange: b50, labeX: 'X', name: 'B_50', value: 50, count: 0 },
        { id: 3, inputChange: b20, labeX: 'X', name: 'B_20', value: 20, count: 0 },
        { id: 4, inputChange: b10, labeX: 'X', name: 'B_10', value: 10, count: 0 },
        { id: 5, inputChange: b5, labeX: 'X', name: 'B_5', value: 5, count: 0 },
        { id: 6, inputChange: one, labeX: 'X', name: 'ONE', value: 1, count: 0 },
        { id: 7, inputChange: m50, labeX: 'X', name: 'M_50', value: 0.5, count: 0 },
        { id: 8, inputChange: m25, labeX: 'X', name: 'M_25', value: 0.25, count: 0 },
        { id: 9, inputChange: m10, labeX: 'X', name: 'M10', value: 0.10, count: 0 },
        { id: 10, inputChange: m5, labeX: 'X', name: 'M_5', value: 0.05, count: 0 },
        { id: 11, inputChange: m1, labeX: 'X', name: 'M_1', value: 0.01, count: 0 },
    ]


    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        const numericValue = parseInt(value);

        if (numericValue < 0) {
            return;
        }

        switch (name) {
            case 'B_100':
                setB100(value)
                break;
            case 'B_50':
                setB50(value)
                break;
            case 'B_20':
                setB20(value)
                break;
            case 'B_10':
                setB10(value)
                break;
            case 'B_5':
                setB5(value)
                break;
            case 'ONE':
                setOne(value)
                break;
            case 'M_50':
                setM50(value)
                break;
            case 'M_25':
                setM25(value)
                break;
            case 'M10':
                setM10(value)
                break;
            case 'M_5':
                setM5(value)
                break;
            case 'M_1':
                setM1(value)
                break;
            default:
                break;
        }
    }


    useEffect(() => {
        const totalMonedas = countMonedas.map((item) => {
            return item.count = item.value * item.inputChange
        })
        const totalRounde = parseFloat(totalMonedas.reduce((a, b) => a + b, 0).toFixed(2))
        setTotal(totalRounde)
    }, [countMonedas])
    useEffect(() => {
        setSobrante(parseFloat(((totalCaja + saldoInicial) - total).toFixed(2)))
        return () => {
            setSobrante(0)
        }
    }, [total, saldoInicial])

    const [sobranteAbsoluto, setSobranteAbsoluto] = useState(0);

    useEffect(() => {
        setSobranteAbsoluto(Math.abs(sobrante));
    }, [sobrante]);
    return (
        <Table

            className='sm p-0 m-0 text-white border' size="sm"

            hover
        >
            <thead className='border'>
                <tr className='text-white'>
                    <th className='page-bg text-white fw-light border-light  border fs-12 text-center'>Cant</th>
                    <th className='page-bg text-white fw-light border-light  border fs-12 text-center'>X</th>
                    <th className='page-bg text-white fw-light border-light  border fs-12 text-center'>Moneda</th>
                    <th className='page-bg text-white fw-light border-light  border fs-12 text-center'>=</th>
                    <th className='page-bg text-white fw-light border-light  border fs-12 text-center'>Total</th>
                </tr>
            </thead>
            <tbody>
                {countMonedas.map((item, key) => (
                    <tr key={key}>
                        <td style={{ width: '20px' }}>
                            <Input
                                defaultValue={0}
                                className='text-center fs-12 rounded'
                                name={item.name}
                                style={{ width: '100px', height: '22px' }}
                                onChange={handleInputChange}
                                onKeyDown={(e) => handleKeyDown(e, key)}

                            />
                        </td>
                        <td className='text-center fs-12'>
                            {item.labeX}
                        </td>
                        <td className='text-center fs-13'>
                            {item.name}
                        </td>
                        <td className='text-center'>
                            <span>=</span>
                        </td>
                        <td className='text-center'>
                            $ {item.inputChange * item.value}
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot className='table-dark text-white fs-11 fw-light' >
                <tr className='fw-light' >
                    <td colSpan={3}>Saldo Inicial + Total:  <span className=' ms-2'> ${Math.round(saldoInicial + totalCaja * 100) / 100}</span> </td>
                    <td colSpan={3} >Efectivo en caja: <span className=' ms-2'>$ {total}</span> </td>
                </tr>
                <tr>
                    <td colSpan={12} className='text-center text-success'>

                        {sobrante < 0 ? <h5 className='text-white'>Sobrante: ${sobranteAbsoluto}</h5>
                            : <span className='text-info fs-15'>Faltante $ {sobranteAbsoluto}</span>}
                    </td>

                </tr>
            </tfoot>
        </Table>
    )
}

export default TableCierraCaja