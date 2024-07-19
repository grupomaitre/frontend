import { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import ConfirmPrecuenta from '../ConfirmPrecuenta'
import { useSelector } from 'react-redux'

const BtnPreCuentaMudarItem = () => {
    const cartNew = useSelector((state: any) => state.cuentaSlice.cartNew)
    const subCuentaTwo = useSelector((state: any) => state.cuentaSlice.subCuentaTwo)
    const nombreMesa = useSelector((state: any) => state.cartSlice.mesacart)

    const cart = useSelector((state: any) => state.cartSlice.cart)
    const [cartPrint, setCartPrint] = useState()
    const [mesaPrint, setMesaPrint] = useState('')
    const [showModalPrecuenta, setShowModalPrecuenta] = useState(false)
    const handlePreCuenta = (item: number) => {
        switch (item) {
            case 1:
                setCartPrint(cart)
                setShowModalPrecuenta(true)
                setMesaPrint(nombreMesa)
                break;
            case 2:
                setCartPrint(cartNew)
                setShowModalPrecuenta(true)
                setMesaPrint(subCuentaTwo)
                break;
            default:
                break;
        }
    }
    return (
        <>
            {/* precuenta modal */}
            {showModalPrecuenta &&
                <ConfirmPrecuenta
                    show={showModalPrecuenta}
                    onCloseClick={() => setShowModalPrecuenta(false)}
                    cart={cartPrint}
                    nombreMesa={mesaPrint}
                />}
            <Row>
                <Col lg='2'>
                    <Button
                        outline
                        block
                        className='mb-2'
                        color='success'
                        onClick={() => handlePreCuenta(1)}
                    >
                        Precuenta
                    </Button>
                </Col>
                <Col></Col>
                <Col lg='2'>
                    <Button
                        outline
                        block
                        className='mb-2'
                        color='success'
                        onClick={() => handlePreCuenta(2)}
                    >
                        Precuenta
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default BtnPreCuentaMudarItem