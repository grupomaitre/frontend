import { FC, useEffect, useState } from 'react'
import { Label, Input, Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import { countCabecera } from '../../Api/Cabecera/ApiReporCabecera'
interface IProps {
    orden: number

}

const FooterTable: FC<IProps> = ({ orden }) => {

    const [totalCart, settotalCart] = useState(0)
    const [totalAnulado, settotalAnulado] = useState(0)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const mesa = useSelector((state: any) => state.mesaSlice.mesa)
    const subFinal = cart.reduce((acc: number, el: any) => acc + ((parseFloat(el.cantidad) * parseFloat(el.precio))), 0)
    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    const subServiciototal = cart.reduce((acc: any, el: any) => acc + ((parseFloat(el.cantidad) * parseFloat(el.precio) - parseFloat(el.descuento)) * el.servicio / 100), 0)
    const subTotal = (subFinal - totaldescuento) || 0
    const totalIva = subTotal * 15 / 100
    const itemsTotals = [
        { name: 'Sub Final', value: (subFinal).toFixed(2) || 0.00 },
        { name: 'Descuento', value: totaldescuento.toFixed(2) || 0.00 },
        { name: 'Sub Total', value: (subTotal).toFixed(2) || 0.00 },
        { name: 'Servicio (10%)', value: subServiciototal.toFixed(2) || 0.00 },
        { name: 'Iva (15%)', value: totalIva.toFixed(2) || 0.00 },
    ]

    useEffect(() => {
        settotalCart(subTotal + subServiciototal + totalIva)
    }, [cart])
    useEffect(() => {
        countCabecera('A').then((res: any) => {
            settotalAnulado(res.data.length)
        })
    }, [mesa])
    return (

        <div className='d-flex  justify-content-between p-1 ' style={{ background: '#034460' }}>
            <div style={{ border: '1px solid rgb(251, 180, 0,0.5)' }} className='px-1 py-1'>
                {
                    itemsTotals.map((item, key) => (
                        <div className='mb-1 d-flex align-items-center justify-content-between' key={key}>

                            <span className='text-white ' style={{ fontSize: '9px', userSelect: 'none' }}>{item.name}</span>
                            <Input
                                type="text"
                                className='rounded-0 text-end fs-12'
                                placeholder='0.00'
                                value={item.value || 0.00}
                                readOnly
                                style={{ height: '20px', width: '70px' }} />

                        </div>
                    ))
                }
            </div>
            <div className='text-center w-100'>
                <div className='bg-black ' style={{ border: '1px solid rgb(251, 180, 0,0.5)', userSelect: 'none' }} >
                    <span style={{ color: '#33ff00', fontSize: '35px' }} className='d-flex justify-content-around align-items-center'>
                        <Label className='' style={{ color: '#ff3a00', fontSize: '35px' }}>Total:</Label>
                        <Label>    {totalCart.toFixed(2)}</Label>
                    </span>
                </div>


                <Row className='fs-11 text-white mt-1'>
                    <Col lg='6' className='border-end'>
                        {totalAnulado ? <span className='badge bg-danger fs-10'>Anulados:{totalAnulado || 55}</span> : ''}
                    </Col>
                    <Col lg='6' className='d-flex flex-column align-items-start justify-content-around'>
                        <span className='' >Orden: {idCart || 0}</span>
                        <span className='' >Factura 001-002: {orden}</span>
                        <span className='' >Consumo Personal: {orden}</span>
                    </Col>
                </Row>
            </div>

        </div>


    )
}

export default FooterTable