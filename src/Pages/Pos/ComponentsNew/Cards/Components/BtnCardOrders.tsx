import { FC, useState, useEffect } from 'react'
import { Search, Send, Star, User, Users } from 'react-feather'
import { Button, Col } from 'reactstrap'
import ModalVendedor from '../Modals/ModalVendedor'
import ModalBuscar from '../../Modals/ModalBuscar'
import ModalPax from '../../Modals/Modal/ModalPax'
import { editCart, saveCart } from '../../../Helpers/ApiCart'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, clearIDMesa, clearMesa, clearPax, onErrorCart, setIDCart, setIdMesa, setNewCart } from '../../../../../slices/Cart/cartSlice'
import { verCarrro } from '../../../Helpers/ApiGetAllCart'
import { socketTest } from '../../../Socket/ConctSocket'
import axios from 'axios'
import { totalCart } from '../../../Func/FuncCart'
interface IProp {
}
const BtnCardOrders: FC<IProp> = () => {
    const dispatch = useDispatch()
    const [showModalVendedor, setShowModalVendedor] = useState(false)
    const [showModalBuscar, setShowModalBuscar] = useState(false)
    const [shoModalPax, setShowModalPax] = useState(false)
    const [inputDisabledMarchar, setInputDisabledMarchar] = useState<boolean>(true)
    const [btnIsCartSuccess, setBtnIsCartSuccess] = useState(false)


    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const id_caja = useSelector((state: any) => state.cajaSlice.caja)
    const producto = useSelector((state: any) => state.productSlice.productSliceList)

    const total = totalCart()

    useEffect(() => {
        const cartSuccess = cart.some((item: any) => item.isCartSuccess === true);
        setBtnIsCartSuccess(cartSuccess)
    }, [cart])
    const cantidad = cart.reduce((acc: any, item: any) => acc + item.cantidad, 0)

    const newComanda = async () => {

        try {
            const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
            saveCart(cart, cantidad, orden, idMesa, pax, idCajaLocal || id_caja, vendedor, id_user, total).then(res => {
                if (res) {
                    dispatch(setIdMesa(res.cart.id_mesa))
                    dispatch(setIDCart(res.cart.id_cart))
                    dispatch(onErrorCart(false))

                    verCarrro(res.cart.id_mesa, idCart).then(res => {

                        dispatch(setNewCart(res.data.product || res?.product))
                    })
                    socketTest.emit('actualizarMesas');
                    axios.get('api/imprimir-comanda', {
                        params: {
                            nombreMesa: mesacart,
                            pax: pax,
                            mesero: vendedor,
                            orden: orden,
                            cart: cart,
                        }
                    })
                }
            })

        } catch (error) {
            if (error) {
                // setInputs({ ...inputs, cuenta: '', userName: '', cantidad: '' })
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(clearCart())
                dispatch(clearPax())
                dispatch(onErrorCart(false))


            }
        }
    }

    const editComanda = async () => {
        setInputDisabledMarchar(true)
        try {

            editCart(idCart, cart).then((resEdit: any) => {
                socketTest.emit('actualizarMesas');
                dispatch(setIdMesa(resEdit.id_mesa))
                verCarrro(resEdit.id_mesa, idCart).then(res => {

                    dispatch(setNewCart(res?.data?.product || res?.product))
                    dispatch(onErrorCart(false))

                })
            })
            axios.get('api/imprimir-comanda', {
                params: {
                    nombreMesa: mesacart,
                    pax: pax,
                    mesero: vendedor,
                    orden: orden,
                    cart: cart,
                }
            })

        } catch (e) {
            return e
        }
    }
    useEffect(() => {
        if (cart.length > 0) {
            setInputDisabledMarchar(false)
        } else {
            setInputDisabledMarchar(true)
        }
    }, [cart])
    return (
        <>
            {
                showModalVendedor &&
                <ModalVendedor
                    show={showModalVendedor}
                    onCloseClick={() => setShowModalVendedor(false)}
                />
            }
            {
                showModalBuscar &&
                <ModalBuscar
                    show={showModalBuscar}
                    onCloseClick={() => setShowModalBuscar(false)}
                    producto={producto}
                />

            }

            {shoModalPax &&
                <ModalPax
                    show={shoModalPax}
                    onCloseClick={() => setShowModalPax(false)}
                />}
            <Col lg='6' className='mt-1 '>

                <div className=' my-1' style={{ borderRadius: '70px' }}>
                    <div className='d-flex mb-1 gap-1 '>
                        <Button
                            block
                            color='light'
                            className=" text-black  d-flex flex-column fs-12 justify-content-center  btn-custom" onClick={() => setShowModalPax(true)}>
                            <User size={13}
                                color='#0dcaf0'
                                fill='#0dcaf0'

                            />
                            <span className=''>
                                Pax: <span className=' text-primary shadow-lg'>{pax}</span>
                            </span>
                        </Button>
                        <Button
                            onClick={() => setShowModalVendedor(true)}
                            block
                            color='light'
                            className=" text-black  d-flex flex-column fs-12 justify-content-center    btn-custom">
                            <Users
                                color='#0dcaf0'
                                fill='#0dcaf0'
                                size={13} />
                            <span>

                                Vendedor</span>
                        </Button>
                    </div>
                    <div className='d-flex gap-1'>
                        <Button
                            block
                            color='light'
                            className=" text-black  d-flex flex-row fs-12 align-items-center   btn-custom"
                        >
                            <span><Star
                                fill='#ff7f01'
                                color='#ff7f01'
                                size={14}
                            /> Objetivo</span>
                        </Button>
                        <Button
                            block
                            color='light'
                            className=" text-black  d-flex flex-row fs-12 align-items-center   btn-custom"
                            onClick={() => setShowModalBuscar(true)}
                        >
                            <span><Search
                                color='#2c58ec'
                                size={14}
                            /> Buscar</span>
                        </Button>
                    </div>
                    <Button
                        block
                        disabled={inputDisabledMarchar}
                        color='primary'
                        onClick={() => btnIsCartSuccess ? editComanda() : newComanda()}
                        className="d-flex justify-content-start align-items-center  mt-1  rounded-1 " >
                        <Send size={18} className='me-2 fw-normal' />
                        <span className='border-start ms-1 border-info align-self-end text-center w-100' style={{ fontSize: '0.9rem' }} >
                            Marchar Comanda
                        </span>
                    </Button>
                </div>


            </Col>
        </>
    )
}

export default BtnCardOrders