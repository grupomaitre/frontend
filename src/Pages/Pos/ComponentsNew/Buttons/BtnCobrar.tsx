import { FC, useEffect, useState } from 'react'
import { editCart, saveCart } from '../../Helpers/ApiCart';
import { onErrorCart, setIDCart, setIdMesa, setNewCart } from '../../../../slices/Cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import ModalBilling from '../Modals/Billing/ModalBilling';
import { socketTest } from '../../Socket/ConctSocket';
import { verCarrro } from '../../Helpers/ApiGetAllCart';
import { totalCart } from '../../Func/FuncCart';
interface IProps {
    btnIsCartSuccess: boolean
    cart: any
    cantidad: number
    orden: number
    id_mesa: number
    pax: number
    id_caja: number
    vendedor: string
    id_user: number
}




const BtnCobrar: FC<IProps> = ({
    btnIsCartSuccess,
    cart,
    cantidad,
    orden,
    id_mesa,
    pax,
    id_caja,
    vendedor,
    id_user

}) => {
    const dispatch = useDispatch()
    const [modalBilling, setModalBilling] = useState(false)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)

    const handleKeyPress = (event: any) => {
        if (event.key === '-') {
            btnIsCartSuccess ? editComanda() : handleCobrar()
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [cart, btnIsCartSuccess]);
    const total = totalCart()

    const handleCobrar = async () => {
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
        if (btnIsCartSuccess) {
            setModalBilling(true)
        }
        else {
            const resCart: any = await saveCart(cart, cantidad, orden, id_mesa, pax, idCajaLocal || id_caja, vendedor, id_user, total)
            if (resCart) {
                setModalBilling(true)
                dispatch(setIdMesa(resCart?.cart.id_mesa))
                dispatch(setIDCart(resCart?.cart.id_cart))
                dispatch(onErrorCart(false))
                const resListCart: any = await verCarrro(resCart?.cart.id_mesa, idCart)
                dispatch(setNewCart(resListCart?.data?.product || resListCart?.product))
                socketTest.emit('actualizarMesas');
                console.log(resListCart?.product)
            }

        }
    }
    const editComanda = async () => {

        try {

            const resEdit: any = await editCart(idCart, cart)
            if (resEdit.status === 'success') {
                setModalBilling(true)
                socketTest.emit('actualizarMesas');
                const res: any = await verCarrro(resEdit?.id_mesa, idCart)
                dispatch(setNewCart(res?.data?.product || res?.product))
                dispatch(onErrorCart(false))

            }
            /*          const print = await axios.get('/api/imprimir-prueba', {
                         params: {
                             nombreMesa: '1',
                             pax: pax,
                             orden: orden,
                             mesero: vendedor,
                             cart: cart
                         }
                     }) */
        } catch (e) {
            return console.log(e)
        }
    }
    return (
        <>
            {modalBilling &&
                <ModalBilling
                    show={modalBilling}
                    onCloseClick={() => setModalBilling(false)}
                />}
            <Button
                block
                color='light'
                style={{ width: '100%', height: '75px', marginTop: '2px', background: '#fff', fontSize: '14px' }}
                disabled={cart.length > 0 ? false : true}
                className='  rounded   d-flex flex-column justify-content-center align-items-center'
                /*    onClick={() => id_mesa ? handleCobrar() : null} */
                onClick={() => btnIsCartSuccess ? editComanda() : handleCobrar()}
            >
                <span > {'Cobrar (-)'}</span>

            </Button>
        </>

    )
}

export default BtnCobrar