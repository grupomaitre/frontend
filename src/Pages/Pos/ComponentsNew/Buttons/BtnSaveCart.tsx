import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { socketTest } from '../../Socket/ConctSocket'
import { clearCart, clearIDMesa, clearMesa, clearPax, onErrorCart, setIDCart, setIDUser, setIsCartSuccess, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { setCount } from '../../../../slices/Cart/tecladoSlice'
import { saveCart } from '../../Helpers/ApiCart'
import axios from 'axios'
import { Button } from 'reactstrap'
import { setSelectedProduct } from '../../../../slices/Cart/productSlice'
import { setModalMesaMap } from '../../../../slices/Cart/ModalSlice'
import { totalCart } from '../../Func/FuncCart'

interface IProps {
    cart: any
    id_mesa: number
    cantidad: number
    orden: number
    pax: number
    id_caja: number
    vendedor: string
    id_user: number
    mesacart: string
}
const BtnSaveCart: FC<IProps> = ({ cart, id_mesa, cantidad, orden, pax, id_caja, vendedor, id_user, mesacart }) => {

    const dispatch = useDispatch()
    const [contador, setContador] = useState(0)
    const handleKeyPress = (event: any) => {
        if (event.key === '+') {
            handlesaveCart()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [cart]);
    const total = totalCart()

    const handlesaveCart = async () => {
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
        const terminal = (localStorage.getItem('terminal') || '0')
        try {

            if (id_mesa === 0 || cart.length === 0) {
                console.log('first')
                dispatch(setModalMesaMap(true))
                dispatch(setVendedorSlice(''))
                dispatch(setIDUser(0))
                dispatch(clearCart())
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(setIsCartSuccess(true))
                setContador(contador + 1)
                dispatch(setCount(contador))
                dispatch(onErrorCart(true))
                dispatch(setSelectedProduct({}))
                return

            }

            const result = await saveCart(cart, cantidad, orden, id_mesa, pax, idCajaLocal || id_caja, vendedor, id_user, total)

            if (result) {
                console.log('second')
                socketTest.emit('actualizarMesas')
                dispatch(setVendedorSlice(''))
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(clearCart())
                dispatch(clearPax())
                dispatch(setIDCart(0))
                dispatch(setIsCartSuccess(false))
                dispatch(setIDUser(0))
                dispatch(setSelectedProduct({}))
                await axios.get('api/imprimir-comanda', {
                    params: {
                        nombreMesa: mesacart,
                        pax: pax,
                        mesero: vendedor,
                        orden: orden,
                        cart: cart,
                        terminal: terminal,
                    }
                })

                return dispatch(onErrorCart(true))


            }
        } catch (error) {

            dispatch(clearIDMesa(0))
            dispatch(clearMesa())
            dispatch(clearCart())
            dispatch(clearPax())
            dispatch(onErrorCart(true))

        }
    }
    return (
        <>
            <Button
                color='light'
                style={{ height: '75px', margin: '', fontSize: '14px' }}
                onClick={() => handlesaveCart()}
                className='d-flex flex-column justify-content-center align-items-center px-2 border-sistema'>
                Guardar (+)

            </Button>
        </>
    )
}

export default BtnSaveCart