import { FC, useEffect, useState } from 'react'
import axios from 'axios';
import { socketTest } from '../../Socket/ConctSocket';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, clearIDMesa, clearMesa, clearPax, onErrorCart, setIDCart, setIDUser, setIsCartSuccess, setVendedorSlice } from '../../../../slices/Cart/cartSlice';
import { setCount } from '../../../../slices/Cart/tecladoSlice';
import { Button } from 'reactstrap';
import { setSelectedProduct } from '../../../../slices/Cart/productSlice';
import { setModalMesaMap } from '../../../../slices/Cart/ModalSlice';
import { totalCart } from '../../Func/FuncCart';
interface IProps {
    id_cart: number
    cart: any
}

const editcaFunction: FC<IProps> = ({ id_cart, cart }) => {
    const total = totalCart()
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const orden = useSelector((state: any) => state.cartSlice.orden)



    const dispatch = useDispatch()
    const [contador, setContador] = useState(0)
    const handleKeyPress = (event: any) => {
        if (event.key === '+') {
            editCart()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [cart]);

    const editCart = async () => {
        const terminal = (localStorage.getItem('terminal') || '0')

        try {
            const result: any = await axios.patch(`api/edit-cart/${id_cart}`, { cart: cart, status: 1, total: total })
            if (result.status === "success") {
                socketTest.emit('actualizarMesas');
                dispatch(onErrorCart(true))
                dispatch(setVendedorSlice(''))
                dispatch(setIDUser(0))
                dispatch(clearCart())
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(setIsCartSuccess(true))
                setContador(contador + 1)
                dispatch(setCount(contador))
                dispatch(setSelectedProduct({}))
                dispatch(setModalMesaMap(true))
                await axios.get('api/imprimir-comanda', {
                    params: {
                        mesa: mesacart,
                        pax: pax,
                        mesero: vendedor,
                        orden: orden,
                        cart: cart,
                        terminal: terminal,
                    }
                })

            }
        } catch (error) {
            dispatch(clearIDMesa(0))
            dispatch(clearMesa())
            dispatch(clearCart())
            dispatch(clearPax())
            dispatch(onErrorCart(true))
            dispatch(setIDCart(0))
            dispatch(setIsCartSuccess(false))
            dispatch(setSelectedProduct({}))
            dispatch(setVendedorSlice(''))


        }

    }

    return (
        <Button
            color='light'
            style={{ height: '75px', margin: '', fontSize: '14px' }}

            onClick={() => editCart()}
            className='d-flex flex-column justify-content-center align-items-center px-2 border-sistema'>
            Guardar (+)

        </Button>
    )
}

export default editcaFunction