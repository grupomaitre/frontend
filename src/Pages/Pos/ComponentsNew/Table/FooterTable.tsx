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

        <div className='d-flex border-bottom justify-content-between'>
            <div style={{ background: '#3578a2' }}>
                {
                    itemsTotals.map((item, key) => (
                        <div className='mb-1 d-flex align-items-center justify-content-between' key={key}>

                            <span className='text-white ' style={{ fontSize: '9px' }}>{item.name}</span>
                            <Input
                                type="text"
                                className='rounded-0 text-end fs-12'
                                placeholder='0.00'
                                value={item.value || 0.00}
                                // value={Math.round(item.value * 100) / 100 || 0.00}
                                readOnly
                                style={{ height: '20px', width: '70px' }} />

                        </div>
                    ))
                }
            </div>
            <div className='text-center '>
                <div className='bg-black px-4' >
                    <span style={{ color: '#33ff00', fontSize: '42px' }} className=''> {totalCart.toFixed(2)}{/*  {(Math.round((totalCart * 100) / 100) || 0.00)} */}</span>
                </div>
                <Label className='' style={{ color: '#ff3a00', fontSize: '30px' }}>Total</Label>

                <Row className='fs-11 text-white'>
                    <Col>
                        {totalAnulado ? <span className='badge bg-danger fs-10'>Anulados:{totalAnulado}</span> : ''}
                    </Col>
                    <Col>
                        <Label className='' >Orden: {idCart || 0}</Label>
                        <Label className='' >Factura: {orden}</Label>
                    </Col>
                </Row>
            </div>

        </div>


    )
}

export default FooterTable