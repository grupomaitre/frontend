import { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, ListGroup, ListGroupItem, Label, Card, CardHeader, CardBody, CardFooter, Input } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import { toastError } from '../../../../Components/Common/Swals/SwalsApi'
import HeaderModal from '../../../../common/Generics/Modal/CompontenHeader/HeaderModal'
import { socketTest } from '../../Socket/ConctSocket'
import { clearCart, clearIDMesa, clearMesa, setIDUser, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { setSelectedProduct } from '../../../../slices/Cart/productSlice'
interface IProps {
    show: boolean
    onCloseClick: () => void
    onCloseFunct: () => void
}
interface ItemsAnulacion {
    name: string
}
const ModalAnuCuenta: FC<IProps> = ({ show, onCloseClick, onCloseFunct }) => {
    const [activeItem, setActiveItem] = useState<any>()
    const [motivo, setMotivo] = useState('')
    const [observacion, setObservacion] = useState('')
    const listAnulacion: ItemsAnulacion[] = [
        { name: 'Desición del Cliente' },
        { name: 'Error del camarero' },
        { name: 'Error de carga' },
        { name: 'Error de cocina' },
        { name: 'Ingreso de item equivocado' },
        { name: 'No hay stock de item' },
    ]
    const dispatch = useDispatch()
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    const id_cart = useSelector((state: any) => state.cartSlice.idCart)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const terminal = (localStorage.getItem('terminal') || '0')
    const handleAnulacion = async () => {
        try {
            const result = await axios.post('api/anulacion-cuenta', {
                id_mesa: id_mesa,
                id_cart: id_cart,
                motivo: motivo,
                observacion: observacion,
            })
            if (result) {
                socketTest.emit('actualizarMesas')
                dispatch(setVendedorSlice(''))
                dispatch(setIDUser(0))
                dispatch(clearCart())
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(setSelectedProduct({}))
                onCloseFunct()
                onCloseClick()
                await axios.get('api/imprimir-comanda', {
                    params: {
                        mesa: mesacart,
                        pax: pax || 1,
                        mesero: vendedor,
                        orden: orden,
                        cart: cart,
                        terminal: terminal,
                        cancelar_mesa: true,
                        motivo: motivo,
                    }
                })
            }
        } catch (error) {

            toastError({ Text: 'Error al Anular' })
        }
    }

    const handleClick = (key: number, mov: string) => {
        setActiveItem(key)
        setMotivo(mov)
    }

    return (
        <Modal isOpen={show} toggle={onCloseClick} size='sm' fade={false}>
            <HeaderModal
                textHeader='Anulación de Cuenta'
                fs='11'
            />
            <ModalBody className=' text-white  fs-11 p-2 '>

                <Card>
                    <CardHeader className='text-white p-0 fs-14 px-2 ' style={{ background: 'rgb(255, 167, 0)' }}>
                        <Label>Cuenta :  # {id_mesa}</Label> <br />
                        <Label>Motivo: <span className=''>{motivo || ''}</span></Label>
                    </CardHeader>
                    <CardBody>
                        <ListGroup className='shadow mb-1'>
                            {listAnulacion.map((item, key) => (
                                <ListGroupItem
                                    onClick={() => handleClick(key, item.name)}
                                    key={key}
                                    className='fs-11 '
                                    style={{
                                        cursor: 'pointer',
                                        background: key === activeItem ? '#ff8500' : '',
                                        color: key === activeItem ? '#fff' : '',

                                    }}
                                // active = { activeItem === key}
                                >
                                    {item.name}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        <Input
                            type='textarea'
                            className='border '

                            placeholder='Observación'
                            onChange={(e: any) => setObservacion(e.target.value)}
                        />
                    </CardBody>
                    <CardFooter style={{ background: 'rgb(255, 167, 0,0.3)' }}>
                        <BtnPosModal
                            onAceptarClick={handleAnulacion}
                            onCloseClick={onCloseClick}
                        />
                    </CardFooter>
                </Card>

            </ModalBody>

        </Modal >
    )
}

export default ModalAnuCuenta