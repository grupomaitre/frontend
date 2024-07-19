import { FC, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import ConfirmPrecuenta from '../ConfirmPrecuenta'
import { useDispatch, useSelector } from 'react-redux'
import { statusMudarItem } from '../Api/MudarItems'
import { socketTest } from '../../../Socket/ConctSocket'
import { totalCartTwo } from '../../../Func/FuncCart'
import axios from 'axios'
import { clearCuenta } from '../../../../../slices/Cart/cuentaSlice'
interface IProps {
    setInputValues: any
}
const BtnPreCuentaMudarItem: FC<IProps> = ({ setInputValues }) => {
    const dispatch = useDispatch()
    const cartNew = useSelector((state: any) => state.cuentaSlice.cartNew)
    const subCuentaTwo = useSelector((state: any) => state.cuentaSlice.subCuentaTwo)
    const nombreMesa = useSelector((state: any) => state.cartSlice.mesacart)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)

    const cart = useSelector((state: any) => state.cartSlice.cart)
    const [cartPrint, setCartPrint] = useState()
    const [mesaPrint, setMesaPrint] = useState('')
    const [showModalPrecuenta, setShowModalPrecuenta] = useState(false)

    const totalCartNew = totalCartTwo()

    const handlePreCuenta = (item: number) => {
        switch (item) {
            case 1:
                setCartPrint(cart)
                setShowModalPrecuenta(true)
                setMesaPrint(nombreMesa)
                break;
            case 2:
                console.log('first')
                setCartPrint(cartNew)
                setShowModalPrecuenta(true)
                setMesaPrint(subCuentaTwo)
                onEditCart()
                break;
            default:
                break;
        }
    }
    const onEditCart = async () => {
        const id_cart_2 = (sessionStorage.getItem('id_cart_2') || '')
        const id_mesa: any = (sessionStorage.getItem('id_mesa' || ''))
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')

        const cantidad = cartNew.reduce((acc: any, item: any) => acc + item.cantidad, 0)
        const res: any = await statusMudarItem(
            parseFloat(id_mesa),
            cartNew,
            cantidad,
            orden,
            pax,
            idCajaLocal,
            vendedor,
            id_user,
            parseFloat(id_cart_2),
            totalCartNew)
        console.log(res)
        if (res) {
            await axios.patch('api/v1/update-group-cart', {
                idCart: idCart,
                cart: cartNew,
            })
            sessionStorage.removeItem('id_cart_2')
            socketTest.emit('actualizarMesas')
            setInputValues((prevInputValues: any) => {
                const newInputValues = [...prevInputValues]
                newInputValues[1] = ''
                return newInputValues
            })
            dispatch(clearCuenta())
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
                        disabled={cartNew.length === 0 ? true : false}
                    >
                        Precuenta
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default BtnPreCuentaMudarItem