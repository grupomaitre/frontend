import React, { FC, useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col, Card, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import CompDataClient from './Components/CompInterface/CompDataClient'
import CompoFormCliente from './Components/CompInterface/CompoFormCliente'
import CompDocsBilling from './Components/CompInterface/CompDocsBilling'
import CompTypeDisc from './Components/CompInterface/CompTypeDisc'
import './css/style.css'
import { totalCart } from '../../../Func/FuncCart'
import NumericKeyboard from '../../../common/NumericKeyboardProps'
import { keyBoards } from '../../../common/Keys'
interface ModalBillingProps {
    show: boolean
    onCloseClick: () => void
    orden?: number
}

const ModalBilling: FC<ModalBillingProps> = ({ show, onCloseClick }) => {
    const [cliente, setCliente] = useState<any>({})
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    const [methodPay, setMethodPay] = useState('Efectivo')
    const [consumidorFinal, setConsumidorFinal] = useState<any>({})
    useEffect(() => {
        setMethodPay('Efectivo')
    }, [show])
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const total = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.total), 0)
    //state focus input
    const [focusID, setFocusID] = useState(false)
    /*Teclado funciones */
    const [inputs, setInputs] = useState<any>({})
    //    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default")


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


    useEffect(() => {
        setInputs({
            value: cliente.value,
            razon_social: cliente.razon_social,
            label: cliente.razon_social,
            identificacion: cliente.identificacion,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            correo: cliente.correo,
            observaciones: '',
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
        <Modal isOpen={show} backdrop={'static'} size='lg' className='' fade={false} toggle={onCloseClick}>

            <ModalBody className='rounded' style={{ background: '#f8f9fa' }} >
                <Row className='mb-2 justify-content-around bg-black text-white rounded m-0'>
                    <Col lg='10'>
                        <div className='fs-6'>{'Facturación'}</div>
                    </Col>
                    <Col>
                        <div className='fs-5 text-warning'>Total:{totalFinal.toFixed(2) || 0.00}</div>
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
                                    setConsumidorFinal={setConsumidorFinal}
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
                                    consumidorFinalData={consumidorFinal}
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
                <NumericKeyboard
                    onKeyPress={(e) => console.log(e)}
                    handleDelete={() => console.log()}
                    btnClass='rounded'
                    widthKey='65px'
                    heightKey='40px'
                    keyboards={keyBoards}
                    gridTemplateColumns={'10'}
                    fontSizeKey='1.2rem'
                />

            }

        </Modal >
    )
}

export default ModalBilling