import { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, ModalHeader, Row, Col, Button } from 'reactstrap'
import { GetMesasPosition, getMesasDetails } from '../Helpers/GetMesas'
import { socketTest } from '../Socket/ConctSocket'
import { setMesa } from '../../../slices/Facturacion/Mesa/mesaSlice'
import { setModalMesaMap } from '../../../slices/Cart/ModalSlice'
import { addMesa, addPax, clearCart, clearMesa, clearPax, onErrorCart, setIDCart, setIDUser, setIdMesa, setIdOrder, setIsCartSuccess, setNewCart, setVendedorSlice } from '../../../slices/Cart/cartSlice'
import { setStatusCobrar } from '../../../slices/Cart/cuentaSlice'
import { setCount, setCuentaKey, setOnUserName } from '../../../slices/Cart/tecladoSlice'
import axios from 'axios'
interface IProps {
    items?: any
    show: boolean
    onCloseClick: () => void
}
const ModalMapMesas: FC<IProps> = ({ show, onCloseClick }) => {
    const urlBase = (localStorage.getItem('api_url') || '')
    const configMap = true
    const [mesas, setMesas] = useState<any[]>([]);
    //   const showMesaMap = useSelector((state: any) => state.ModalSlice.showMesaMap)
    const dispatch = useDispatch()
    useEffect(() => {
        if (configMap) {
            dispatch(setModalMesaMap(true))
        } else {
            dispatch(setModalMesaMap(false))

        }
    }, [])
    const positionMesas = async () => {
        GetMesasPosition().then((data: any) => {
            //    setMesas(data)

        })
    }
    useEffect(() => {
        positionMesas()
    }, [])
    const getAllCart = async (id_mesa: number) => {

        try {
            const result = await axios.get("api/list-cart-mesa", { params: { id_mesa: id_mesa, status: 1, status_mesa: 1 } })

            const { data } = result
            /*  if (status === 'success_mudar_item') {
                 setShowModalMudarItem(true)
                 setItemMudar(result.data)
 
             }  *//* else { */
            dispatch(setIdOrder(result.data.id_order))
            dispatch(setNewCart(data.product))
            dispatch(addPax(data.pax))
            dispatch(setIDCart(data.id_cart))
            dispatch(setVendedorSlice(data.resposable))
            dispatch(setIDUser(data.id_user))

            /*     } */

        } catch (error) {
            return error
        }
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

    const handleClick = (item: any) => {

        dispatch(setModalMesaMap(false))


        if (item.status) {

            if (item.status_mudar_item) {
                console.log(item)
                dispatch(setIdMesa(item.id_mesa))
                console.log("setShowModalMudarItem(true)")
            } else {
                handleGetAllCartClick(item)
                dispatch(onErrorCart(false))
            }
        } else if (item.status_cobrar) {
            console.log(item.id_mesa)
            dispatch(setIdMesa(item.id_mesa))
            handleModalCobrar(item)
            dispatch(addMesa(item.nombre_mesa))
            dispatch(setStatusCobrar(item.status_cobrar))

        } else if (item.status_precuenta) {
            handleGetAllCartClick(item)
        }
        else {
            dispatch(onErrorCart(false))
            dispatch(addMesa(0))
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
    const handleClickMesa = (item: any) => {
        dispatch(clearPax())
        dispatch(clearMesa())
        dispatch(clearCart())
        dispatch(addMesa(item.nombre_mesa))
        dispatch(setIdMesa(item.id_mesa))
        dispatch(setIsCartSuccess(true))
        // setShowModalPax(true)
    };

    const handleModalCobrar = (item: any) => {

        // setShowModalCobrar(true)
        getAllCart(item.id_mesa)
        dispatch(setIsCartSuccess(true))
        dispatch(clearCart())
    }

    useEffect(() => {
        // Escuchar el evento 'mesasActualizadas' emitido desde el servidor
        socketTest.on('mesasActualizadas', (nuevasMesas) => {
            dispatch(setMesa(nuevasMesas.data || []))
        });

        // Limpiar el listener al desmontar el componente
        return () => {
            socketTest.off('mesasActualizadas');
        };
    }, []);


    const getMesas = async () => {
        const res = await getMesasDetails()
        if (res) {
            setMesas(res)
        }
    }


    useEffect(() => {
        getMesas()
    }, [])
    const [horaActual, setHoraActual] = useState<Date | null>(null);
    useEffect(() => {
        const ahora = new Date();
        setHoraActual(ahora);
    }, []);
    //calculate now
    /*   useEffect(() => {
          const horaAperturaString = "14:00:01"
          const ahora = new Date();
  
          const horaAperturaArray = horaAperturaString.split(":");
          const horaApertura = new Date(
              ahora.getFullYear(),
              ahora.getMonth(),
              ahora.getDate(),
              parseInt(horaAperturaArray[0], 10),
              parseInt(horaAperturaArray[1], 10),
              parseInt(horaAperturaArray[2], 10)
          );
  
          const diferenciaEnMilisegundos: number = ahora.getTime() - horaApertura.getTime();
  
          const diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60);
  
  
      }, []) */
    return (
        <Modal isOpen={show} fullscreen={true} fade={false} >
            <ModalHeader toggle={onCloseClick}>
                {'Mapa de mesas'}
            </ModalHeader>
            <ModalBody className='page-bg'>
                <Row>
                    {mesas.map((item: any, key: number) => (
                        <Col key={key}>
                            <div
                            className='m-2'
                                //lg='2'

                                /*    className={
                                       'fw-lighter cursos-pointer rounded m-2 shadow text-center ' +
                                       (item.status
                                           ? 'bg-success fw-lighter'
                                           : item.status_cobrar
                                               ? 'bg-danger fw-lighter text-white'
                                               : item.status_precuenta
                                                   ? 'bgPrecuenta fw-lighter text-white'
                                                   : 'bg-white text-black fw-medium')
                                   } */
                                onClick={() => handleClick(item)}
                                style={{ fontSize: '10px' }}
                            >

                                {/*               <img src={`${urlBase}${item.imagen}`} /> */}
                                <img src='http://127.0.0.1:8000/images/mesas/mesa_light_green.png' height='50' width='50' />
                                {/*  <span style={{ userSelect: 'none' }}>{item?.nombre_mesa || key}</span>
                                <br />
                                <span>Apertura: {item.hora_apertura}</span>
                                <br /> */}
                                {/*    <span>Tiempo : {horaActual?.toLocaleTimeString()}</span> */}
                            </div>
                            {/*     <Tooltip
                                isOpen={tooltipOpenArray[key]}
                                target={item.nombre_mesa}
                                toggle={() => toggleTooltip(key)}
                            >
                                Detalles Cuenta
                            </Tooltip> */}
                        </Col>
                    ))}
                </Row>

            </ModalBody>

        </Modal>
    )
}

export default ModalMapMesas