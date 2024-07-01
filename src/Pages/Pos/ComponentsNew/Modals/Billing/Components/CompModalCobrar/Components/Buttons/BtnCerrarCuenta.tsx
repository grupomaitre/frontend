import { FC } from 'react'
import './btn.css'
import { Button } from 'reactstrap'
import { CloseBilling } from '../../../../../../../Helpers/ApiBilling'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, clearIDMesa, clearIDUser, clearMesa, clearPax, onErrorCart, setVendedorSlice } from '../../../../../../../../../slices/Cart/cartSlice'
import { setInputMesa, setInputVendedor } from '../../../../../../../../../slices/Cart/cartStatusSlice'
import { socketTest } from '../../../../../../../Socket/ConctSocket'
import { setIDCheque, setIDDeposito, setIDEfectivo, setIDTarjeta } from '../../../../../../../../../slices/Orders/OrdersSlice'
import axios from 'axios'
interface IProps {
    closeModals: () => void
    error: any
    innerBtnCobrar: any
}
const BtnCerrarCuenta: FC<IProps> = ({ closeModals, error, innerBtnCobrar }) => {
    const dispatch = useDispatch()
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const id_cheque = useSelector((state: any) => state.ordersSlice.id_cheque)
    const id_tarjeta = useSelector((state: any) => state.ordersSlice.id_tarjeta)
    const id_deposito = useSelector((state: any) => state.ordersSlice.id_deposito)

    const onCloseBill = async () => {
        const formaPago = (localStorage.getItem('forma_pago') || '').toString()

        const res = await CloseBilling(id_mesa, idCart, id_order, formaPago, id_cheque, id_tarjeta, id_deposito)

        if (res.status) {
            dispatch(onErrorCart(true))
            dispatch(clearCart())
            dispatch(clearIDMesa(0))
            dispatch(clearMesa())
            dispatch(clearPax())
            dispatch(clearIDUser())
            dispatch(setVendedorSlice(''))
            dispatch(setInputMesa(false))
            dispatch(setInputVendedor(true))
            dispatch(setIDEfectivo(0))
            dispatch(setIDCheque(0))
            dispatch(setIDTarjeta(0))
            dispatch(setIDDeposito(0))
            socketTest.emit('actualizarMesas');
            closeModals()
            await axios.get('/api/imprimir-cobrar', {
                params: {
                    nombreMesa: id_mesa,
                    orden: id_order,
                    vendedor: vendedor,
                    pax: 0,
                    cart: cart,
                    total: 0
                }
            })
        }

    }
    const handleFocus = (e: any) => {
        if (e.key === 'Enter') {
            onCloseBill()
        }
    }
    return (
        <Button
            block
            color='danger'
            onKeyDown={(e) => handleFocus(e)}
            innerRef={innerBtnCobrar || null}
            onClick={() => onCloseBill()}
            className='rounded text-white shadow custom-btn'
            disabled={error}

        >
            Cobrar
        </Button>

    )
}

export default BtnCerrarCuenta