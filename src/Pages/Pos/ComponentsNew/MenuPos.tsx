import React from 'react'
import { useState, Suspense } from 'react'
//import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import ModalPersonal from './ComponetsMenuPos/ModalPersonal'
import ModalMudarCuenta from './ComponetsMenuPos/ModalMudarCuenta'
import ModalFunciones from './ComponetsMenuPos/ModalFunciones'
import SpinnerLoad from '../../../Components/Common/Spinner/SpinnerLoad'
import ModalMudarItem from './ComponetsMenuPos/ModalMudarItem'
const ModalAnulacion = React.lazy(() => import('./Modals/ModalAnulacion'))
import ModalReservas from './ComponetsMenuPos/ModalReservas'
import ModalTimbrar from './ComponetsMenuPos/ModalTimbrar'
import { clearCart, clearIDMesa, clearIDUser, clearMesa, clearPax, removeCartItem, setVendedorSlice } from '../../../slices/Cart/cartSlice'
import ModalVerCart from './ComponetsMenuPos/ModalVerCart'
import ConfirmPrecuenta from './ComponetsMenuPos/ConfirmPrecuenta'
import ModalRefencia from './ComponetsMenuPos/ModalReferencia'
import ModalMensajes from './ComponetsMenuPos/ModalMensajes'
import ModalTMagnetica from './ComponetsMenuPos/ModalTMagnetica'
import ModalCortesia from './ComponetsMenuPos/ModalCortesia'
import ModalAnulacionItem from './Modals/ModalAnulacionItem'
import { Airplay, Bell, Book, Calendar, CornerUpLeft, MessageCircle, MinusCircle, PlusCircle, Printer, Settings, Shuffle, Smile, User, Users } from 'react-feather'
import Loader from '../../../Components/Common/Loader'
import { useNavigate } from 'react-router-dom'
import ModalAlert from '../../../common/Generics/Modal/ModalAlert'
import ModalComandas from './CompModalFunciones/ModalComandas'
import { Button } from 'reactstrap'
import CargeSpinner from '../../../common/Loading/CargeSpinner'
import { ToastContainer } from 'react-toastify'
interface IProps {
    mesas: Array<any>
    item: any
    addCart: any
    minusCart: any
    getMesa: any
    setItemUniCart?: any
}
const MenuPos: React.FC<IProps> = ({ item, addCart, minusCart, getMesa, setItemUniCart }) => {
    const navigate = useNavigate()
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const selectedProduct = useSelector((state: any) => state.productSlice.selectedProduct)
    const dispatch = useDispatch()
    const [showModalAnulacion, setShowModalAnulacion] = useState(false)
    const [showModalPersonal, setShowModalPersonal] = useState(false)
    const [showModalReferencia, setShowModalReferencia] = useState(false)
    const [showModalMensaje, setShowModalMensaje] = useState(false)
    const [showModalTMagnetica, setShowModalTMagnetica] = useState(false)
    const [showModalFunciones, setShowModalFunciones] = useState(false)
    const [showModalMudarItem, setShowModalMudarItem] = useState(false)
    const [showModalCortesia, setShowModalCortesia] = useState(false)
    const [showModalMudarCuenta, setShowModalMudarCuenta] = useState(false)
    const [showModalReservas, setShowModalReservas] = useState(false)
    const [showModalComandas, setShowModalComandas] = useState(false)
    const [showModalTimbrar, setShowModalTimbrar] = useState(false)
    const [showModalVerCart, setShowModalVerCart] = useState(false)
    const [showModalPrecuenta, setShowModalPrecuenta] = useState(false)
    const [showModalConfirSalir, setShowModalConfirSalir] = useState(false)
    const menu = [
        { name: 'Personal', icon: User, colorIcon: "#31d2f2", function: () => setShowModalPersonal(true) },
        { name: 'Timbrar', icon: Bell, colorIcon: "#b19a66", function: () => setShowModalTimbrar(true) },
        { name: 'Otros =', icon: PlusCircle, colorIcon: "#fff", fill: '#33ff00', function: () => cart.length > 0 ? dispatch(addCart(selectedProduct)) : null },
        { name: 'Preferencias', icon: Smile, colorIcon: "#ff7f01", function: () => selectedProduct?.id_product > 0 ? handlePrefencia() : null },
        { name: 'Mensaje', icon: MessageCircle, colorIcon: "#61afef", function: () => setShowModalMensaje(true) },
        { name: 'Re-imprecion', icon: Printer, colorIcon: "", function: () => cart.length > 0 ? handlePrint() : null },
        { name: 'Reservas', icon: Calendar, colorIcon: "#f75858", function: () => setShowModalReservas(true) },
        { name: 'Comandas', icon: Book, colorIcon: "#0d6efd", function: () => cart.length > 0 ? setShowModalComandas(true) : null },
        { name: 'Mudar Item', icon: Shuffle, colorIcon: "#ff7f01", function: () => cart.length > 0 && setShowModalMudarItem(true) },
        { name: 'Mudar Cuenta', icon: Users, colorIcon: "#27abff", function: () => setShowModalMudarCuenta(true) },
        { name: 'Eliminar Item', icon: MinusCircle, colorIcon: "#fff", fill: '#ff1414', function: () => cart.length > 0 ? handleRemove() : null },
        { name: 'Precuenta', icon: Airplay, colorIcon: "#14eb00", function: () => setShowModalPrecuenta(true) },
        { name: 'Funciones', icon: Settings, colorIcon: "#000", fill: "#fff", function: () => setShowModalFunciones(true) },
        { name: 'Salir', icon: CornerUpLeft, colorIcon: "#fff", color: '#ff1414', function: () => salirPos() },

    ]
    //  const navigate = useNavigate()
    const handleClick = (funcion: any): void => {
        if (typeof funcion === 'function') {
            funcion()
        }
    }


    const [showModalItemAnul, setshowModalItemAnul] = useState(false)

    const handleRemove = () => {

        if (selectedProduct?.isCartSuccess) {
            //isCartSuccess item true
            setShowModalAnulacion(true)
        } else if (selectedProduct.cantidad > 1) {
            //isCartSuccess item false
            setshowModalItemAnul(true)
        } else {
            dispatch(removeCartItem({ producto: selectedProduct, cantidad: 1 }))
        }
    }
    const handlePrint = async () => {
        setShowModalVerCart(true)
    }
    const confirmSalir = async () => {
        dispatch(clearIDMesa(0))
        dispatch(clearMesa())
        dispatch(clearCart())
        dispatch(clearPax())
        dispatch(clearIDUser())
        dispatch(setVendedorSlice(''))
        navigate('/dashboard')
    }

    const salirPos = () => {
        setShowModalConfirSalir(true)

    }
    const handlePrefencia = () => {

        if (!selectedProduct.isCartSuccess) {
            // localStorage.setItem('items', JSON.stringify(selectedProduct))
            setShowModalReferencia(true);
        } else {
            setShowModalReferencia(false);
        }


    }

    const menuPos = false

    return (
        <>
            {/* salir */}

            {
                showModalConfirSalir &&
                <ModalAlert
                    show={showModalConfirSalir}
                    onCloseClick={() => setShowModalConfirSalir(false)}
                    onAceptar={() => confirmSalir()}
                    onCancelar={() => setShowModalConfirSalir(false)}
                    showAceptar={true}
                    showCancelar={true}
                    text='Desea Salir?'
                    backdrop={true}
                />
            }

            {/* Modal Ver carrito */}
            {showModalVerCart &&
                <ModalVerCart
                    show={showModalVerCart}
                    onCloseClick={() => setShowModalVerCart(false)}
                />}
            {/* Modal Precuenta */}
            {showModalPrecuenta &&
                <ConfirmPrecuenta
                    show={showModalPrecuenta}
                    onCloseClick={() => setShowModalPrecuenta(false)}
                    cart={cart}
                />}
            {/* Modal Anulacion */}
            {showModalAnulacion &&
                <ModalAnulacion
                    show={showModalAnulacion}
                    onCloseClick={() => setShowModalAnulacion(false)}
                    item={item}
                    addCart={addCart}
                    minusCart={minusCart}
                    cart={cart}
                    getMesa={getMesa}

                />}    {/* Modal anulacion item */}
            {showModalItemAnul &&
                <ModalAnulacionItem
                    item={selectedProduct}
                    show={showModalItemAnul}
                    onCloseClick={() => setshowModalItemAnul(false)}
                />}

            {/* Modal personal */}
            {showModalPersonal && <ModalPersonal
                show={showModalPersonal}
                onCloseClick={() => setShowModalPersonal(false)}
            />}
            {/* Modal Timbrar */}
            {showModalTimbrar && <ModalTimbrar
                show={showModalTimbrar}
                onCloseClick={() => setShowModalTimbrar(false)}
            />}

            {/* Referencias */}
            {showModalReferencia && <ModalRefencia
                setItemUniCart={setItemUniCart}
                item={selectedProduct}
                show={showModalReferencia}
                onCloseClick={() => setShowModalReferencia(false)}
            />}
            {/* Modal Mensajes */}
            {setShowModalMensaje &&
                <Suspense fallback={<SpinnerLoad />}>
                    <ModalMensajes
                        show={showModalMensaje}
                        onCloseClick={() => setShowModalMensaje(false)}
                    />
                </Suspense>}
            {/* Reservas */}
            {showModalReservas && <ModalReservas
                show={showModalReservas}
                onCloseClick={() => setShowModalReservas(false)}
            />}
            {
                showModalComandas && <ModalComandas
                    show={showModalComandas}
                    onCloseClick={() => setShowModalComandas(false)}
                />
            }
            {/* Tarjeta Magnetica */}
            {showModalTMagnetica && <ModalTMagnetica
                show={showModalTMagnetica}
                onCloseClick={() => setShowModalTMagnetica(false)}
            />}
            {/* Modal Cortesia */}
            {showModalCortesia && <ModalCortesia
                show={showModalCortesia}
                onCloseClick={() => setShowModalCortesia(false)}
                item={item}
            />}
            {
                showModalMudarItem &&
                <ModalMudarItem
                    show={showModalMudarItem}
                    onCloseClick={() => setShowModalMudarItem(false)}
                />

            }

            {/* Modal Mudar Cuenta */}
            {showModalMudarCuenta && <ModalMudarCuenta
                show={showModalMudarCuenta}
                onCloseClick={() => setShowModalMudarCuenta(false)}
            />}
            {/* Modal funciones */}
            {showModalFunciones && <ModalFunciones
                show={showModalFunciones}
                onCloseClick={() => setShowModalFunciones(false)}
            />}
            {
                menuPos ? <CargeSpinner /> :
                    <Suspense fallback={<Loader />}>
                        <div className=' mb-1  d-flex justify-content-between align-items-center p-1 px- text-center ' style={{ background: 'rgb(15, 50, 83)' }}>
                            {
                                (menu || []).map((item, key) => (

                                    <Button key={key}

                                        className='d-flex flex-column justify-content-center align-items-center border-icons'
                                        style={{
                                            userSelect: 'none',
                                            width: '70px',
                                            height: '46px',
                                            borderRadius: '2px',
                                            cursor: 'pointer',
                                            background: item.color ? item.color : '#ffff',
                                            color: item.color ? '#ffff' : '#000'
                                        }}
                                        onClick={() => handleClick(item.function)}
                                    >


                                        {
                                            item.icon ? <item.icon
                                                fill={item.fill ? item.fill : '#fff'}
                                                size={25}
                                                color={item.colorIcon ? item.colorIcon : '#000'}
                                                className='fs-4 ' style={{ color: item.color ? '#fff' : '#000', userSelect: 'none', strokeWidth: '2', }} /> : null
                                        }

                                        <span className=' px-1  text-truncate ' style={{ fontWeight: '', fontSize: '0.68rem', userSelect: 'none' }}>{item.name}</span>
                                    </Button>
                                ))
                            }
                        </div >
                    </Suspense>
            }
            <ToastContainer />
        </>
    )
}

export default MenuPos