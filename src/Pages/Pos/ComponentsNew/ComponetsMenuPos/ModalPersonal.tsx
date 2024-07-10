import React, { useEffect, useRef, useState, createRef } from 'react'
import { Modal, ModalBody, Button, Row, Col, Label, Card, CardBody } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { searchUser } from '../../Helpers/ApiUser'
import { addMesa, addPax, onErrorCart, setIDCart, setIDUser, setIdMesa, setIsCartSuccess, setNewCart, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { UpdatePersonCart } from '../../Helpers/ApiCart'
import { BuscarMesa } from '../../Helpers/ApiMesas'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import { IrefInput } from './Interface/InterMudarItem'
import CardHeaderModal from '../../../../common/CardHeaderModal'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalPersonal: React.FC<IProps> = ({ show, onCloseClick }) => {

    const dispatch = useDispatch()
    const vendedorActual = useSelector((state: any) => state.cartSlice.vendedor)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const [vendedor, setVendedor] = React.useState('')
    const [idUser, setIdUser] = React.useState(0)
    const [btnAceptar, setBtnAceptar] = useState(true)
    const [showKeyboard, setShowKeyboard] = useState(false)
    const [disabledMesa, setDisabledMesa] = useState(false)
    //start keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', ''])
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()))
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] += value
        setInputValues(newInputValues)
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1)
        setInputValues(newInputValues)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues]
        newInputValues[index] = event.target.value
        setInputValues(newInputValues)
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index)
    }
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index)
    }
    //end keyBoard
    //start modal useEffect
    useEffect(() => {
        if (idMesa > 0) {
            const updatedValues = [...inputValues]
            updatedValues[0] = idMesa
            setInputValues(updatedValues)
            setDisabledMesa(true)
            setTimeout(() => {
                inputRefs.current[1].current?.focus()
            }, 100);
            console.log('entro??')

        }
    }, [show])
    const handleDownMesa = (e: any) => {
        if (e.key === 'Enter') {
            BuscarMesa(inputValues[0], idCart).then((res: any) => {
                if (res?.data?.status_cobrar) {
                    console.log('abrir modal cobrar')
                    return
                }
                if (res.status) {
                    dispatch(setNewCart(res.product))
                    dispatch(setIDCart(res.id_cart))
                    dispatch(addPax(res.pax))
                    dispatch(setIsCartSuccess(true))
                    dispatch(addMesa(res.id_mesa))
                    dispatch(setIdMesa(res.id_mesa))
                    dispatch(setIDUser(res.id_user))
                    dispatch(setVendedorSlice(res.resposable))
                    dispatch(onErrorCart(false))
                    setDisabledMesa(true)
                    setBtnAceptar(false)
                    setTimeout(() => {
                        inputRefs.current[1].current?.focus()
                    }, 100)
                    return
                } else {

                    handleClearInput()

                }
            }
            )
        }
    }

    const handleInvInputValues = (index: number) => {
        inputRefs.current[index].current?.select()
        const updatedValues = [...inputValues]
        updatedValues[index] = ''
        setInputValues(updatedValues)
    }

    const handleDownUser = async (e: any) => {
        if (e.key === 'Enter') {

            const resUser = await searchUser(inputValues[1])
            if (!resUser) {
                handleInvInputValues(1)
                setVendedor('')
                return
            }
            if (resUser.status) {
                setIdUser(resUser.data.id_user)
                setBtnAceptar(false)
                setVendedor(resUser.data.persona.last_name + ' ' + resUser.data.persona.name)
                return
            }

        }
    }

    const handleAceptar = () => {
        UpdatePersonCart(idCart, vendedor, idUser).then((res: any) => {
            console.log(res)
            if (res) {
                onCloseClick()
                setBtnAceptar(true)
                setDisabledMesa(false)
                setVendedor('')
                dispatch(setVendedorSlice(''))
                dispatch(setIDCart(0))
                setIdUser(0)
            }
        })
    }
    /*Teclado funciones */


    const handleClose = () => {
        onCloseClick()
        setBtnAceptar(true)
        setDisabledMesa(false)
        setVendedor('')
        //   setMesa('')
        dispatch(setVendedorSlice(vendedor))
        dispatch(setIDCart(0))
        setIdUser(0)
    }
    const handleDownEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (inputValues[0]) {

                handleDownMesa({ key: 'Enter' })
            }
            if (inputValues[1]) {
                handleDownUser({ key: 'Enter' })
            }

        }
    }
    const handleClearInput = () => {

        handleInvInputValues(0)
        setDisabledMesa(false)
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100)
    }
    return (

        <Modal isOpen={show} toggle={onCloseClick} size='lg' backdrop={true} fade={false}>

            <ModalBody className='p-0  '>

                <Card className='rounded m-0'>
                    <CardHeaderModal
                        onCloseClick={onCloseClick}
                        text='Personal'
                    />
                    <CardBody className='fs-14' >
                        <Row>
                            <Col lg='7' className='border-end d-flex flex-column justify-content-between'>
                                <Row className="mb-2">
                                    <Col lg={5} >
                                        <Label>Cuenta Actual:</Label>
                                    </Col>
                                    <Col className='d-flex'>

                                        <InputKeyBoard
                                            inputRef={inputRefs.current[0]}
                                            value={inputValues[0]}
                                            onChange={(event) => handleInputChange(event, 0)}
                                            handleInputClick={() => handleInputClick(0)}
                                            handleKeydown={() => handleDownMesa({ key: 'Enter' })}
                                            classInput='text-center input-border rounded-0 rounded-start fs-11'
                                            disabled={disabledMesa}
                                            type='text'
                                            handleInputFocus={() => handleInputFocus(0)}
                                            bsSize='sm'
                                            styleInput={{ height: '40px', borderRadius: '0' }}
                                        />
                                        <Button
                                            color='danger'
                                            className='border-0 rounded-0 rounded-end'
                                            onClick={() => handleClearInput()}
                                        >x</Button>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={5} >
                                        <Label className='' style={{ color: '#33ff00' }}>Vendedor Actual:</Label>
                                    </Col>
                                    <Col  >
                                        <Label className='text-warning text-uppercase fs-11'>{vendedorActual}</Label>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col lg={5} >
                                        <Label>Nuevo Vendedor:</Label>

                                    </Col>
                                    <Col  >


                                        <InputKeyBoard
                                            inputRef={inputRefs.current[1]}
                                            value={inputValues[1]}
                                            onChange={(event) => handleInputChange(event, 1)}
                                            handleInputClick={() => handleInputClick(1)}
                                            handleKeydown={() => handleDownUser({ key: 'Enter' })}
                                            classInput='text-center border-sistema shadow-sm rounded fs-6'
                                            //    disabled={inputDisabledcuenta}
                                            type='text'
                                            handleInputFocus={() => handleInputFocus(1)}
                                            bsSize='sm'
                                            styleInput={{ height: '40px', borderRadius: '0' }}
                                        />
                                    </Col>
                                    <Label className='mt-1 text-white text-uppercase fs-12 text-center'>{vendedor}</Label>

                                </Row>
                                <Row>
                                    <BtnPosModal
                                        divClass='w-100 text-center'
                                        btnDisabled={btnAceptar}
                                        text='Aceptar'
                                        onAceptarClick={handleAceptar}
                                        onCloseClick={handleClose}
                                    />
                                </Row>
                            </Col>
                            <Col lg='' className=''>
                                <Row className='mb-2'>
                                    <Col lg='8' className='' >

                                        <NumericKeyboard
                                            handleDelete={() => handleDelete()}
                                            onKeyPress={(e) => onKeyPress(e)}
                                            heightKey='55px'
                                            widthKey='60px'
                                            widthBorrar='100%'
                                            heightBtnDelete='55px'
                                            btnClass='rounded'

                                        />
                                    </Col>
                                    <Col lg='3' className=' ps-0'>
                                        <Button
                                            onClick={() => handleDownEnter({ key: 'Enter' })}
                                            block
                                            className='fs-11 border-sistema h-100'
                                            color='light'
                                        >Enter</Button>
                                    </Col>
                                </Row>

                                <Button
                                    style={{ width: '92%' }}
                                    className='border-sistema'
                                    color='light'
                                    onClick={() => setShowKeyboard(!showKeyboard)}
                                >Teclado</Button>

                            </Col>
                        </Row>
                    </CardBody>
                </Card>


            </ModalBody>

        </Modal>
    )
}

export default ModalPersonal