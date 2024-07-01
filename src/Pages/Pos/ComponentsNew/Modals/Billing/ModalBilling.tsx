import React, { FC, useEffect, useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody, Row, Col, Card, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import CompDataClient from './Components/CompInterface/CompDataClient'
import CompoFormCliente from './Components/CompInterface/CompoFormCliente'
import CompDocsBilling from './Components/CompInterface/CompDocsBilling'
import CompTypeDisc from './Components/CompInterface/CompTypeDisc'
import './css/style.css'
import TestTelcado from '../../ComponetsMenuPos/Components/TestTelcado'
import { totalCart } from '../../../Func/FuncCart'
interface ModalBillingProps {
    show: boolean
    onCloseClick: () => void
    orden?: number
}

const ModalBilling: FC<ModalBillingProps> = ({ show, onCloseClick }) => {
    const [cliente, setCliente] = useState<any>({})
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    const [methodPay, setMethodPay] = useState('Efectivo')
    useEffect(() => {
        setMethodPay('Efectivo')
    }, [show])
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const total = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.total), 0)
    //state focus input
    const [focusID, setFocusID] = useState(false)
    /*Teclado funciones */
    const keyboard = useRef()
    const [inputs, setInputs] = useState<any>({})
    //    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default")

    const onChangeAll = (inputs: any) => {
        setInputs({ ...inputs })
    }

    const onKeyPress = (button: string) => {
        if (button === '{enter}') {
            const inputsArray = Object.keys(inputs)
            const currentIndex = inputsArray.findIndex((input) => input === inputName)
            console.log('enter', currentIndex)
            if (currentIndex !== -1 && currentIndex < inputsArray.length - 1) {
                const nextInputName = inputsArray[currentIndex + 1]
                setInputName(nextInputName)

                if (keyboard.current) {
                    (keyboard.current as any).setInput(inputs[nextInputName])
                }
            }
        }
    }
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = event.target.value
        const inputName = event.target.id

        setInputs({
            ...inputs,
            [inputName]: inputVal,
        })
    }
    const getInputValue = (inputName: string) => {
        return inputs[inputName] || ""
    }

    const customTeclas = {
        default: [
            "{esc} 1 2 3 4 5 6 7 8 9 0",
            "Q W E R T Y U I O P {enter}",
            "A S D F G H J K L Ñ ",
            "Z X C V B N M {bksp}",
            "@hotmail.com @gmail.com @ .com",
            "{space}"
        ],
        shift: [
            "1 2 3 4 5 6 7 8 9 0",
            "Q W E R T Y U I O P",
            "A S D F G H J K L Ñ",
            "{shiftactivated} Z X C V B N M {bksp}",
            "{space}"
        ]
    }
    useEffect(() => {
        setInputs({
            value: 11,
            razon_social: 'Consumidor Final',
            label: 'Consumidor Final',
            identificacion: '9999999999999',
            telefono: '999999999',
            direccion: 'N/A',
            correo: 'sincorreo@gmail.com',
            observaciones: 'Consumidor Final',
        })
    }, [])
    //test ref cambiar <---
    const inputreftes = React.createRef<HTMLInputElement>()
    const inputBtn = React.createRef<HTMLInputElement>()
    const selectRef = React.createRef<HTMLSelectElement>()
    useEffect(() => {
        selectRef.current?.focus()
    }, [show === true])
    useEffect(() => {
        setCliente({
            ...inputs
        })
    }, [inputs])
    const handleClose = () => {
        onCloseClick()
        console.log('entro?')
    }
    const totalFinal = totalCart()
    return (
        <Modal isOpen={show} backdrop={'static'} size='lg' fade={false} toggle={onCloseClick}>

            <ModalBody className='rounded' style={{ background: '#f8f9fa' }} >
                <Row className='mb-2 justify-content-around'>
                    <Col lg='10'>
                        <div className='fs-6'>{'Facturación'}</div>
                    </Col>
                    <Col>
                        <div className='fs-16  text-success'>Total:{totalFinal}</div>
                    </Col>
                </Row>
                <Row className=''>
                    <Col >
                        <Card className='rounded-3 m-0 shadow'>
                            <CardBody className=''>
                                <CompDataClient
                                    setCliente={setCliente}
                                    setInputs={setInputs}
                                    //FOCUS
                                    focusID={focusID}
                                    setFocusID={setFocusID}
                                    inputreftes={inputreftes}
                                />
                                <CompoFormCliente
                                    cliente={cliente}
                                    setCliente={setCliente}
                                    onChangeInput={onChangeInput}
                                    getInputValue={getInputValue}
                                    setInputName={setInputName}
                                    inputName={inputName}
                                    focusID={focusID}
                                    inputreftes={inputreftes}
                                    inputBtn={inputBtn}
                                    setInputs={setInputs}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg='5'>
                        <Card className='rounded m-0 shadow'>
                            <CardBody className='m-0' >
                                <CompDocsBilling
                                    closeModalBilling={onCloseClick}
                                    cliente={cliente}
                                    methodPay={methodPay}
                                    inputBtn={inputBtn}
                                />
                                <CompTypeDisc
                                    total={total}
                                />
                            </CardBody>
                        </Card>
                    </Col>

                </Row>



                <Row className='mt-4'>
                    <BtnPosModal
                        onAceptarClick={() => setShowKeyBoard(!showKeyBoard)}
                        onCloseClick={handleClose}
                        text='Teclado'
                        textCancelar='Cerrar'
                        btnClassAceptar={'border-success'}

                    />
                </Row>


            </ModalBody >
            {
                showKeyBoard &&
                <TestTelcado
                    customLayout={customTeclas}
                    inputName={inputName}
                    onChangeAll={onChangeAll}
                    onKeyPress={onKeyPress}
                />
            }

        </Modal >
    )
}

export default ModalBilling