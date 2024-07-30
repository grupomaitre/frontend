import { FC, useState, createRef, useRef, useEffect } from 'react'
import { Modal, ModalBody, ListGroup, ListGroupItem, Input, Label, Row, Col, Badge } from 'reactstrap'

import ModalConfirm from './Confirmacion/ModalConfirm'
import { getListMesas } from '../../Helpers/getListMesas'
import { clearCart, clearIDMesa, clearMesa, setIDUser, setNewCart, setVendedorSlice, updateQuantity } from '../../../../slices/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { saveAnulacionItem } from './Helpers/Anulaciones'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import { keyNumeris } from '../../common/Keys'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import { setOnModal } from '../../../../slices/Cart/tecladoSlice'
import CardHeaderModal from '../../../../common/CardHeaderModal'
import axios from 'axios'
import { socketTest } from '../../Socket/ConctSocket'
import { setSelectedProduct } from '../../../../slices/Cart/productSlice'
interface IrefInput {
    current: HTMLInputElement | null
}

interface IModalAnulacion {
    show: boolean
    onCloseClick: () => void
    item: any
    addCart?: any
    minusCart?: any
    cart?: any
    getMesa?: any
}


const ModalEliminarItem: FC<IModalAnulacion> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const selectedProduct = useSelector((state: any) => state.productSlice.selectedProduct)
    const id_cart = useSelector((state: any) => state.cartSlice.idCart)

    const orden = useSelector((state: any) => state.cartSlice.orden)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    //    const [errorQuantity, setErrorQuantity] = useState(false)
    const [modalConfirm, setModalConfirm] = useState(false)
    const [itemAnulacion, setItemAnulacion] = useState<string>()
    const [inputValues, setInputValues] = useState<Array<string>>(['']);
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const modalInputRef = useRef<HTMLInputElement>(null);

    const listAnulacion = [
        { name: 'Desición del Cliente' },
        { name: 'Error del camarero' },
        { name: 'Error de carga' },
        { name: 'Error de cocina' },
        { name: 'Ingreso de item equivocado' },
        { name: 'No hay stock de item' },
    ]

    const handleUpdateQuantity = async () => {
        const terminal = (localStorage.getItem('terminal') || '0')
        const cant = parseInt(inputValues[0])
        const res: any = await saveAnulacionItem(selectedProduct, itemAnulacion, cant || 1, mesacart, vendedor)
        if (res) {
            console.log(res?.cart)
            if (res?.cart.length === 0) {

                const result = await axios.post('api/anulacion-cuenta', {
                    id_mesa: id_mesa,
                    id_cart: id_cart,
                    motivo: itemAnulacion,
                    observacion: itemAnulacion,
                })
                if (result) {
                    socketTest.emit('actualizarMesas')
                    dispatch(setVendedorSlice(''))
                    dispatch(setIDUser(0))
                    dispatch(clearCart())
                    dispatch(clearIDMesa(0))
                    dispatch(clearMesa())
                    dispatch(setSelectedProduct({}))
                    onCloseClick()
                }
                return
            }

            dispatch(updateQuantity({ item: selectedProduct, newQuantity: inputValues[0] || 1 }))
            onCloseClick()
            setInputValues([''])
            getListMesas(id_mesa).then((res) => {
                dispatch(setNewCart(res.product))

            })
            await axios.get('api/eliminar/item/cart/imprimir', {
                params: {
                    nombreMesa: mesacart,
                    pax: pax,
                    mesero: vendedor,
                    orden: orden,
                    terminal: terminal,
                    item: selectedProduct,
                    motivo: itemAnulacion
                }
            })

        }


    }

    //teclado 
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    }

    const handleInputClick = (index: number) => {
        setActiveInputIndex(index);
    }
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }
    const handleDelete = () => {
        setInputValues([''])
        inputRefs.current[0].current?.focus()
        return
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(-1);
        setInputValues(newInputValues);
    }
    const handleClose = () => {
        onCloseClick()
        setInputValues([''])
        dispatch(setOnModal(true))

    }
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100);
    }, [show])

    return (
        <>
            <ModalConfirm show={modalConfirm} onCloseClick={() => setModalConfirm(false)} />
            <Modal isOpen={show} size='md' backdrop='static' className='mt-2 ' innerRef={modalInputRef} fade={false}>

                <ModalBody style={{ background: '#23486b' }} className='rounded p-0 p-1' >
                    <CardHeaderModal
                        text='Eliminar Items'
                        onCloseClick={onCloseClick}
                        classHeader='p-2'
                    />
                    <div className='d-flex   justify-content-around bg-black   fs-6 py-2'>
                        <span className='text-capitalize text-white'>{selectedProduct.nombre}</span>
                        <span className='text-white'>{'Cantidad'}-<Badge color='warning' className='fs-6'>{selectedProduct.cantidad}</Badge ></span>
                    </div>
                    <ListGroup className=''>
                        {listAnulacion.map((item: any, key) => (
                            <ListGroupItem
                                onClick={() => setItemAnulacion(item.name)}
                                key={key} className=' bg-white fs-6'
                                style={{ cursor: 'pointer' }}>

                                {item.name}
                            </ListGroupItem>
                        ))}
                    </ListGroup>

                    <Row className='my-2 '>
                        <Col lg='7'>
                            <Label className='fs-12 text-white'>Cantidad a Eliminar</Label>
                        </Col>
                        <Col lg='4' style={{ marginLeft: '8px', width: '40%' }}>

                            <InputKeyBoard
                                inputRef={inputRefs.current[0]}
                                value={inputValues[0]}
                                onChange={(event) => handleInputChange(event, 0)}
                                handleInputClick={() => handleInputClick(0)}
                                classInput='text-center border-sistema shadow text-uppercase'
                                bsSize='sm'
                                styleInput={{ fontSize: '1.2rem' }}
                                type='text'
                                handleInputFocus={() => handleInputFocus(0)}
                            />
                        </Col>

                    </Row>

                    <Row className=''>
                        <Col lg='7'>
                            <Input
                                type='textarea'
                                placeholder={itemAnulacion}
                                style={{ maxHeight: '100PX', minHeight: '98%' }}
                                className='rounded-0'
                            />
                        </Col>
                        <Col lg='5'>
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                heightKey='40px'
                                heightBtnDelete='40px'
                                keyboards={keyNumeris}
                            />
                        </Col>
                        <BtnPosModal
                            btnDisabled={inputValues[0].length > 0 ? false : true}
                            divClass='mt-2'
                            onAceptarClick={handleUpdateQuantity}
                            onCloseClick={handleClose}
                            textCancelar='Salir'
                        />
                    </Row>
                </ModalBody>

            </Modal>
        </>
    )
}

export default ModalEliminarItem