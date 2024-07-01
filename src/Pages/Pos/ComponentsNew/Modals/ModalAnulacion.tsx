import { FC, useState, createRef, useRef, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem, Input, Label, Row, Col } from 'reactstrap'

import ModalConfirm from './Confirmacion/ModalConfirm'
import { getListMesas } from '../../Helpers/getListMesas'
import { setNewCart, updateQuantity } from '../../../../slices/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { saveAnulacionItem } from './Helpers/Anulaciones'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import { keyNumeris } from '../../common/Keys'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import { setOnModal } from '../../../../slices/Cart/tecladoSlice'
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


const ModalAnulacion: FC<IModalAnulacion> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const selectedProduct = useSelector((state: any) => state.productSlice.selectedProduct)
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

    useEffect(() => {
        if (show) {
            dispatch(setOnModal(true))
            inputRefs.current[0].current?.focus()
        }


    }, [selectedProduct, show])


    useEffect(() => {
        inputRefs.current[0].current?.select()
    }, [inputValues[0]])



    const handleUpdateQuantity = () => {
        const cant = parseInt(inputValues[0])
        saveAnulacionItem(selectedProduct, itemAnulacion, cant || 1, mesacart, vendedor).then(() => {

            dispatch(updateQuantity({ item: selectedProduct, newQuantity: inputValues[0] || 1 }))
            // setErrorQuantity(false)
            onCloseClick()
            setInputValues([''])
            getListMesas(id_mesa).then((res) => {
                dispatch(setNewCart(res.product))

            })
        })
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
    /*  const handleInputFocus = (index: number) => {
         setActiveInputIndex(index);
     } */
    const handleDelete = () => {
        setInputValues([''])
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
    return (
        <>
            <ModalConfirm show={modalConfirm} onCloseClick={() => setModalConfirm(false)} />
            <Modal isOpen={show} size='md' toggle={onCloseClick} className='mt-1' innerRef={modalInputRef} fade={false}>
                <ModalHeader toggle={onCloseClick} style={{ height: '30px' }} className='p-0 mx-2'>
                    <span className='fs-11'> Eliminar Item</span>
                </ModalHeader>
                <ModalBody style={{ background: '#23486b' }}>
                    <div className='d-flex justify-content-around bg-black   fs-12'>
                        <span className='text-capitalize text-white'>{selectedProduct.nombre}</span>
                        <span className='text-white'>{'Cantidad'}-<span>{selectedProduct.cantidad}</span></span>
                    </div>
                    <ListGroup className='border-0 rounded-0'>
                        {listAnulacion.map((item: any, key) => (
                            <ListGroupItem
                                onClick={() => setItemAnulacion(item.name)}
                                key={key} className=' bg-white fs-12'
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
                                //handleKeydown={handleKeydown}
                                classInput='text-center  rounded-0 fs-15'
                                styleInput={{ fontSize: '1.7rem' }}
                                type='number'
                                // handleInputFocus={() => handleInputFocus(0)}
                                bsSize='sm'

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
                    </Row>
                </ModalBody>
                <BtnPosModal
                    onAceptarClick={handleUpdateQuantity}
                    onCloseClick={handleClose}
                />
            </Modal>
        </>
    )
}

export default ModalAnulacion