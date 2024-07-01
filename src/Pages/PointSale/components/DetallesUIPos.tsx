import { Button, Col, Input, Label, Row } from 'reactstrap'
import ItemsMenuPos from './ItemsMenuPos'
import { useState } from 'react'
import ModalCliente from '../../Pos/ComponentsNew/CompModalFunciones/ModalVentas/ModalCliente'
import { useSelector } from 'react-redux'

const DetallesUIPos = () => {
    const clientePos = useSelector((state: any) => state.pointSaleSlice.clientePos)
    const cart = useSelector((state: any) => state.pointSaleSlice.cart)
    const [showModalCliente, setShowModalCliente] = useState(false)

    const calculateTotal = (items: any) => {
        return items.reduce((acc: any, item: any) => {
            const totalWithIva = item.precio * item.cantidad;
            return acc + (totalWithIva * item.iva);
        }, 0);
    };

    const cantItems = cart.reduce((acc: number, el: any) => acc + el.cantidad || 0, 0)
    const totalAmount: number = calculateTotal(cart)

    return (
        <>
            {showModalCliente &&
                <ModalCliente
                    show={showModalCliente}
                    onCloseClick={() => setShowModalCliente(false)}
                />
            }

            <div className=' px-3 py-1  rounded shadow' style={{ border: '1px solid rgb(0,0,0,0.3)', background: '#d6d9df' }}>

                <Row >
                    <Col >
                        <ItemsMenuPos />
                    </Col>
                </Row>

                <Row className='pt-1' >

                    <Col>
                        <Row>
                            <Col lg='2' className='d-flex justify-content-between fs-15 '>
                                <Label>Cliente:</Label>
                            </Col>
                            <Col lg='4' className=''>
                                <Label className='text-uppercase fw-bold'>{clientePos && clientePos?.name || ''}</Label>
                            </Col>
                            <Col lg='2' className=''>
                                <Button block color='light' className='' size='sm' onClick={() => setShowModalCliente(true)}>
                                    Cliente
                                </Button>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg='2' className='fs-15'>
                                <Label>Tarjeta</Label>
                            </Col>
                            <Col lg='4' className=''>
                                <Input bsSize='sm' type='select' />
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className='py-1 '>

                    <Col lg='9' className='d-flex align-items-end justify-content-start fs-16 '>
                        <div className='px-3 shadow-sm rounded   border me-4'>
                            <Label className='fw-bold'> Total Items: {cantItems || 0} </Label> -
                            <Label className='fw-bold'> Lineas: {cart?.length || 0} </Label>
                        </div>
                    </Col>

                    <Col lg='' className='bg-black d-flex align-items-end justify-content-center fs-16 rounded'>
                        <Label className='text-danger fs-3'>Total:{totalAmount && totalAmount.toFixed(2) || 0}</Label>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default DetallesUIPos