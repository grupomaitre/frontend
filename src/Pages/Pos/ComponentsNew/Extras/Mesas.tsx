import { FC, useState } from 'react'
import { addMesa, setIdMesa, setNewCart, addPax, clearCart, clearPax, setIDCart, setIsCartSuccess, clearMesa, setVendedorSlice, setIdOrder, setIDUser, onErrorCart } from '../../../../slices/Cart/cartSlice'
import { useDispatch } from 'react-redux'
import ModalPax from '../Modals/Modal/ModalPax'
import axios from 'axios'
import SimpleBar from 'simplebar-react'
//import ModalMudarItem from './ModalMudarItemDetalles'
import ModalCobrar from '../Modals/Billing/Components/Modals/ModalCobrar'
import { setCount, setCuentaKey, setOnUserName } from '../../../../slices/Cart/tecladoSlice'
import { setStatusCobrar } from '../../../../slices/Cart/cuentaSlice'
import ModalMudarItemDetalles from './ModalMudarItemDetalles'
interface IProps {
    mesas: Array<any>
}
const MesasTeclado: FC<IProps> = ({ mesas }) => {
    const [showModalPax, setShowModalPax] = useState(false)
    const [showModalCobrar, setShowModalCobrar] = useState(false)
    const [showModalMudarItem, setShowModalMudarItem] = useState(false)
    const dispatch = useDispatch()
    const getAllCart = async (id_mesa: number) => {

        try {
            const result = await axios.get("api/list-cart-mesa", { params: { id_mesa: id_mesa, status: 1, status_mesa: 1 } })

            if (result) {
                const { data } = result

                dispatch(setIdOrder(result.data.id_order))
                dispatch(setNewCart(data.product))
                dispatch(addPax(data.pax))
                dispatch(setIDCart(data.id_cart))
                dispatch(setVendedorSlice(data.resposable))
                dispatch(setIDUser(data.id_user))
                dispatch(setIdMesa(result.data.id_mesa))
                dispatch(addMesa(result.data.nombre_mesa))

            }

        } catch (error) {
            return error
        }
    }
    const handleClickMesa = (item: any) => {
        dispatch(clearPax())
        dispatch(clearMesa())
        dispatch(clearCart())
        dispatch(addMesa(item.nombre_mesa))
        dispatch(setIdMesa(item.id_mesa))
        dispatch(setIsCartSuccess(true))
        // setShowModalPax(true)
    }

    const handleGetAllCartClick = (item: any) => {
        getAllCart(item.id_mesa)
        dispatch(addMesa(item.nombre_mesa))
        dispatch(setIdMesa(item.id_mesa))
        dispatch(setIsCartSuccess(true))
        dispatch(clearCart())
        dispatch(setIDUser(1))

    }
    //contador test
    const [contador, setContador] = useState(0)

    const handleStatusMesa = (item: any) => {
        if (item.status) {
            if (item.status_mudar_item) {
                dispatch(setIdMesa(item.id_mesa))
                // dispatch(addMesa(item.nombre_mesa))
                setShowModalMudarItem(true)
            } else {
                handleGetAllCartClick(item)
                dispatch(onErrorCart(false))
                console.log('second')
            }
        } else if (item.status_cobrar) {
            handleGetAllCartClick(item)
            dispatch(setIdMesa(item.id_mesa))
            dispatch(addMesa(item.nombre_mesa))
            setShowModalCobrar(true)
            return
            // handleModalCobrar(item)
            dispatch(setStatusCobrar(item.status_cobrar))

        } else if (item.status_precuenta) {
            handleGetAllCartClick(item)
        }
        else {
            dispatch(onErrorCart(false))
            // dispatch(addMesa(0))
            dispatch(setIdMesa(item.id_mesa))
            handleClickMesa(item)
            dispatch(setVendedorSlice(''))
            setContador(contador + 1)
            //test 'borrar'
            dispatch(setCount(contador))
            dispatch(setIDCart(0))
            dispatch(setCuentaKey(true))
            dispatch(setOnUserName(false))
            dispatch(setIDUser(0))


        }

    }

    return (
        <>
            <ModalPax
                show={showModalPax}
                onCloseClick={() => setShowModalPax(false)}
            />

            {showModalCobrar &&
                <ModalCobrar
                    show={showModalCobrar}
                    onCloseClick={() => setShowModalCobrar(false)}
                    closeModalBilling={() => setShowModalCobrar(false)}
                />
            }

            {showModalMudarItem &&
                <ModalMudarItemDetalles
                    show={showModalMudarItem}
                    onCloseClick={() => setShowModalMudarItem(false)}
                    items={{}}
                />}
            <div >
                <div style={{ background: '#3578a2' }} className='text-end' >
                    <div className='mt-1'>
                        <SimpleBar autoHide={false} style={{ maxHeight: "100px" }} className="simplebar-track-info">

                            <div className='gridContainerMesas ' >
                                {
                                    mesas.map((item: any, key) => (
                                        /*  item.status === 3 ? null : */
                                        <span key={key}
                                            className={"rounded  d-flex flex-column align-items-center  spanMesa border border-light shadow text-center  " +
                                                (item.status ? 'backgroundSuccess fw-bold' :
                                                    item.status_cobrar ? 'backgroundredCobrar fw-bold text-white' :
                                                        item.status_precuenta ? 'bgPrecuenta fw-bold text-white'
                                                            : 'bg-white text-black fw-medium')}
                                            onClick={() => handleStatusMesa(item)}
                                            style={{ height: '30px' }}
                                        >
                                            <span style={{ userSelect: 'none' }}>{item?.nombre_mesa || key}</span>
                                        </span>
                                    ))
                                }
                            </div>
                        </SimpleBar>
                    </div>
                </div>

            </div >

        </>
    )
}

export default MesasTeclado