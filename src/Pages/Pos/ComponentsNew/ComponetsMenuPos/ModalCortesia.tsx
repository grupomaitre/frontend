import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
interface ModalCortesiaProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
/* interface Item {
    id: number
    name: string
    icon?: string
} */

import { Button, ButtonGroup, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import TestTelcado from './Components/TestTelcado'
import { getListMesas } from '../../Helpers/getListMesas'
import { setNewCart } from '../../../../slices/Cart/cartSlice'
const ModalCortesia: React.FC<ModalCortesiaProps> = ({ show, onCloseClick, item }) => {
    const dispatch = useDispatch()
    //   const [activeItem, setActiveItem] = useState<number>()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
    const [inputCortesia, setInputCortesia] = useState<any>('')
    console.log(setBtnDisabled, setInputCortesia)
    const inputRefCantidad = useRef<HTMLInputElement>(null)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa);

    const msmDefecto = [
        { name: 'Mensaje 1' },
        { name: 'Mensaje 2' },
        { name: 'Mensaje 3' },
    ]
    useEffect(() => {
        inputRefCantidad.current?.focus()
    }, [show, item])

    /*Teclado funciones */
    const keyboard = useRef();
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [inputs, setInputs] = useState<any>({})
    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default");

    const onChangeAll = (inputs: any) => {
        console.log('cambio?')
        setInputs({ ...inputs })
    }

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default"
        setLayoutName(newLayoutName)
    }

    const onKeyPress = (button: any) => {
        // console.log("Button pressed", button)
        if (button === "{shift}" || button === "{lock}") handleShift()
    }

    const onChangeInput = (event: any) => {
        const inputValue = event.target.value
        setInputs({
            ...inputs,
            [inputName]: inputValue
        })
        if (keyboard.current) {
            (keyboard.current as any).setInput(inputValue)
        }
    }
    const getInputValue = (inputName: string) => {
        return inputs[inputName] || ""
    }
    const customNumbers = {
        default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}']
    }
    const customTeclas = {
        default: [
            'Q W E R T Y U I O P {bksp}',
            'A S D F G H J K L Ñ',
            'Z X C V B N M',
            '{space}',
        ]
    }
    const saveCortesia = async () => {
        try {
            const result = await axios.post('api/v1/product-cortesia',
                {
                    id_cart: item.id_cart,
                    id_product: item.id_product,
                    cantidad: inputs.cortesia,
                    cortesia_obseracion: inputCortesia
                }
            )
            if (result.data) {
                getListMesas(idMesa).then((data) => {
                    dispatch(setNewCart(data.product))
                    onCloseClick()
                })
            }
        } catch (e) {
            console.log('first error', e)
        }
    }

    return (
        <Modal isOpen={show} toggle={onCloseClick} size='md' fade={false}>
            <ModalHeader>
                {'Cortesia '}
            </ModalHeader>
            <ModalBody style={{ background: '#23486b' }}>
                <Row>
                    <Col className='d-flex justify-content-between'>
                        <Label className='text-white fs-6 text-uppercase'>{item.nombre} -  </Label>
                        <Label className='text-white fs-6 text-uppercase'>Cantidad:{item.cantidad}</Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup vertical className='bg-white rounded w-100'>
                            {
                                msmDefecto.map((item: any, key: number) => (
                                    <Button
                                        onClick={() => setInputs({ ...inputs, obsCortesia: item.name })}
                                        key={key}
                                        block
                                        color='light'
                                        className=' mx-0 p-1  d-flex  rounded-0 d-flex justify-content-between border' >
                                        <span className='py-1 fs-14'>{item.name}</span>
                                    </Button>
                                ))
                            }
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className='my-2 '>
                    <Col lg='' className=''>
                        <Input
                            innerRef={inputRefCantidad}
                            placeholder='Cantidad'
                            type='number'
                            value={getInputValue('cortesia')}
                            onChange={(e) => onChangeInput(e)}
                            onFocus={() => setInputName("cortesia")}
                        />
                        <Input
                            type='textarea'
                            placeholder='Observaciones'
                            value={getInputValue('obsCortesia')}
                            onChange={(e) => onChangeInput(e)}
                            onFocus={() => setInputName("obsCortesia")}
                            className='mt-2'
                            style={{
                                maxHeight: '182px', height: '182px', minHeight: '182px'
                            }}
                        />
                    </Col>
                    <Col lg=''>
                        <TestTelcado
                            customLayout={customNumbers}
                            inputName={inputName}
                            onChangeAll={onChangeAll}
                            onKeyPress={onKeyPress}
                        />
                        <Button color="info" block className="btn-label rounded-0 rounded-0 mt-1" onClick={() => setShowKeyboard(!showKeyboard)}
                        >
                            <i className="mdi mdi-keyboard-variant label-icon align-middle fs-16 me-2"></i>
                            Teclado
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
            {
                showKeyboard && <TestTelcado

                    customLayout={customTeclas}
                    inputName={inputName}
                    onChangeAll={onChangeAll}
                    onKeyPress={onKeyPress}
                />
            }


            <BtnPosModal
                onAceptarClick={() => saveCortesia()}
                btnDisabled={btnDisabled}
                onCloseClick={onCloseClick}
            />
        </Modal>
    )
}

export default ModalCortesia