import { FC } from 'react'
interface Props {
    cajaDiaria: number
    saldoInicial: number
}
const WidgetsHistorial: FC<Props> = ({ cajaDiaria, saldoInicial }) => {
    return (
        <>
            <div className='d-flex justify-content-between '>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className=''>No. Caja Diaria</span>
                    <div className='bg-black  text-center fs-14 ms-3 border rounded' style={{ color: '#ff0000', width: '100px' }}>
                        <span className='fw-bold'>   {cajaDiaria}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <span className=''>Saldo Inicial</span>
                    <div className='bg-black  text-center fs-14 ms-3 rounded' style={{ color: '#fff', width: '100px' }}>
                        {saldoInicial}
                    </div>
                </div>
            </div>
        </>
    )
}

export default WidgetsHistorial