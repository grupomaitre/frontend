import { FC, useState, useEffect } from 'react'
import { Row, Col, Label } from 'reactstrap'
interface Props {
    total2: number
    inputEfectivo: number
    inputCheque: number
    inputTarjeta: number
    inputDeposito: number
    setDisabledCobrar: any
    setTestVuelto: any
}
const DetalleCuentaTotals: FC<Props> = ({ inputEfectivo, inputCheque, inputTarjeta, inputDeposito, total2, setDisabledCobrar, setTestVuelto }) => {
    const [totalPagar, setTotalPagar] = useState<number>(0)
    const [totalVuelto2, setTotalVuelto] = useState(0)

    useEffect(() => {
        setTotalPagar(inputEfectivo + inputCheque + inputTarjeta + inputDeposito)
    }, [inputEfectivo, inputCheque, inputTarjeta, inputDeposito])

    useEffect(() => {
        setTotalVuelto(totalPagar - total2)
        setTestVuelto(Math.abs(totalPagar - total2))
    }, [totalPagar, inputEfectivo, inputCheque, inputTarjeta, inputDeposito, total2])

    useEffect(() => {
        if (totalPagar >= total2) {
            setDisabledCobrar(false)
        } else {
            setDisabledCobrar(true)
        }

    }, [totalPagar, total2])


    return (
        <>
            <Row className='' >
                <Col lg='5'>
                    <Label className='text-black fs-15'>TOTAL PAGO</Label>
                </Col>
                <Col className='bg-black border-success border-bottom' lg='4'>
                    <Label className='text-center py-1' style={{ color: '#33ff00' }}>{(totalPagar).toFixed(2) || '0.00'}</Label>
                </Col>

            </Row>
            <Row>
                <Col className='bg-black' lg='5'>
                    <Label className='text-center text-white py-1 fs-4'>VUELTO</Label>
                </Col>
                <Col className='bg-black border-success border-bottom' lg='4'>
                    <Label className='text-center  py-1 fs-4' style={{ color: '#33ff00' }}>$ {(totalVuelto2).toFixed(2)}</Label>
                </Col>
            </Row>
            <Row>
                <Col lg='5'>
                    <Label className='text-black fs-12'>Total de retencion</Label>
                </Col>
                <Col className='bg-black border-success border-bottom' lg='4'>
                    <Label className='text-center ' style={{ color: '#33ff00' }}>0.00</Label>
                </Col>
            </Row>
            <Row>
                <Col lg='5'>
                    <Label className='text-black fs-12'>Nota de Credito</Label>
                </Col>
                <Col className='bg-black' lg='4'>
                    <Label className='text-center  ' style={{ color: '#33ff00' }}>0.00</Label>
                </Col>
            </Row>

        </>
    )
}

export default DetalleCuentaTotals