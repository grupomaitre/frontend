import { FC, useEffect, useRef, useState, createRef } from 'react'
import { Button, Card, CardFooter, CardHeader, Col, Modal, ModalBody } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { clearCuenta, setNewCartCuenta } from '../../../../slices/Cart/cuentaSlice'
import { clearCart, clearIDMesa, clearMesa, clearPax, setIDCart, setIDUser, setIsCartSuccess, setIsPreference, setNewCart, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { IModalMudarItem, IrefInput } from './Interface/InterMudarItem'
import { socketTest } from '../../Socket/ConctSocket'
import { BuscarMesa, searchMesa } from '../../Helpers/ApiMesas'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import ModalConfimacion from './Components/ModalConfimacion'
import ConfirMudarItem from './CompoMudarItem/ConfirMudarItem'
import { deleteTempCuenta, opMudarItems, openCuenta, statusMudarItem } from './Api/MudarItems'
import axios from 'axios'
import './css/styleMudarItem.css'
import { totalCart } from '../../Func/FuncCart'
import { saveCart } from '../../Helpers/ApiCart'
import CardHeaderModal from '../../../../common/CardHeaderModal'
import { setInputMesa, setInputVendedor } from '../../../../slices/Cart/cartStatusSlice'
import InputCuentaOneMudarItems from './CompoMudarItem/InputCuentaOneMudarItems'
import InputCuentaTwoMudarItems from './CompoMudarItem/InputCuentaTwoMudarItems'
import CartsMudarItem from './CompoMudarItem/CartsMudarItem'
const ModalMudarItem: FC<IModalMudarItem> = ({ show, onCloseClick }) => {
    const nombre_mesa = (sessionStorage.getItem('nombre_mesa') || '')
    const id_mesa: any = (sessionStorage.getItem('id_mesa' || ''))
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
    const total = totalCart()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [isMismaCuenta, setIsMismaCuenta] = useState<boolean>(false)
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const cartNew = useSelector((state: any) => state.cuentaSlice.cartNew)
    const cuenta = useSelector((state: any) => state.cartSlice.mesacart)
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const [idTempCuenta, setIdTempCuenta] = useState<number>()
    //disabled inputs mesa
    const [disabledCuenta1, setdisabledCuenta1] = useState(false)
    const [disableArrowRight, setDisableArrowRight] = useState(true)
    const [inputDisabledCuenta2, setInputDisabledCuenta2] = useState(false)
    //efectos iniciales
    //useeffec

    useEffect(() => {
        setInputValues([nombre_mesa, '', '', ''])
        setTimeout(() => {
            inputRefs.current[0].current?.blur()
            inputRefs.current[1].current?.focus()
        }, 100);
        setdisabledCuenta1(true)
        setDisableArrowRight(true)
    }, [nombre_mesa, show])


    //start keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
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
    //on focus function
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }
    const ClearInputKeyBoard = (item: number) => {
        const nuevosValores = [...inputValues];
        nuevosValores[item] = '';
        setInputValues(nuevosValores);
    }
    //end keyboard


    //guardar newCart y edit cart old
    const onEditCart = async () => {
        const id_cart_2 = (sessionStorage.getItem('id_cart_2') || '')
        const cantidad = cartNew.reduce((acc: any, item: any) => acc + item.cantidad, 0)
        const res: any = await statusMudarItem(parseFloat(id_mesa), cartNew, cantidad, orden, pax, idCajaLocal, vendedor, id_user, parseFloat(id_cart_2))
        if (res) {
            await axios.patch('api/v1/update-group-cart', {
                idCart: idCart,
                cart: cartNew,
            })
            dispatch(clearCuenta())
            dispatch(clearCart())
            onCloseClick()
            sessionStorage.removeItem('id_cart_2')
            socketTest.emit('actualizarMesas')
            handleClose()
        }

    }

    const handleClearCuentaMain = () => {
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues]
            newInputValues[0] = ''
            return newInputValues
        })
        inputRefs.current[0].current?.focus()
        inputRefs.current[0].current?.select()
        dispatch(clearCart())
    }
    const handleClearCuentaTwo = () => {
        dispatch(clearCuenta())
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues]
            newInputValues[1] = ''
            return newInputValues
        })


        inputRefs.current[1].current?.focus()
        inputRefs.current[1].current?.select()

    }
    const onConfimation = async () => {
        const res = await openCuenta((id_mesa), cuenta, idCart)
        console.log(res?.id_cart)
        sessionStorage.setItem('id_cart_2', res?.id_cart)
        setIdTempCuenta(res.id_temp_cuenta)
        setShowModal(false)
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues]
            newInputValues[1] = res?.sub_orden
            return newInputValues
        })
        setDisableArrowRight(false)
        setShowModal(false)
        setInputDisabledCuenta2(true)


    }

    const onMismaCuentaClick = async () => {
        try {
            /* const res = await axios.post('/api/v1/open/cuenta/mudar/item', {
                cuenta: inputValues[1]
            })
            console.log(res) */
            setShowConfirMudarItem(false)
            // socketTest.emit('actualizarMesas')
        } catch (error) {
            console.log(error)
        }
        return
        setShowConfirMudarItem(false)
        setTimeout(() => {
            inputRefs.current[2].current?.focus()

        }, 100);
    }

    const [showConfirMudarItem, setShowConfirMudarItem] = useState<boolean>(false)

    const handleEnter = async () => {
        switch (activeInputIndex) {

            case 0:
                console.log(0)
                const resMesa = await BuscarMesa(inputValues[0], idCart)
                console.log(resMesa)
                return
                if (/^[a-zA-Z0-9]*$/.test(inputValues[0]) === false || inputValues[0].length === 0) {
                    inputRefs.current[0].current?.focus();
                    setInputValues(prevInputValues => {
                        const newInputValues = [...prevInputValues];
                        newInputValues[1] = '';
                        return newInputValues;
                    });
                    return;
                }

                /*           if (res.status) {
                              dispatch(setNewCart(res.product));
                              setTimeout(() => {
                                  inputRefs.current[1].current?.focus();
                                  inputRefs.current[1].current?.select();
                              }, 100);
                              return;
                          } else {
                              dispatch(setNewCart([]));
                          }
           */
                break;
            case 1:

                const res: any = await searchMesa(inputValues[1])
                console.log(res)
                switch (res.message) {
                    case "Mesa no encontrada":
                        ClearInputKeyBoard(1)
                        inputRefs.current[1].current?.focus();
                        setDisableArrowRight(true)
                        break
                    case "Cuenta sin items":
                        inputRefs.current[1].current?.blur();
                        setShowConfirMudarItem(true)
                        setIsMismaCuenta(false)
                        break
                    case "Cuenta con items":
                        if (inputValues[0] === res.data.id_mesa) {
                            setShowConfirMudarItem(true)
                            setIsMismaCuenta(true)
                        }
                        else {
                            dispatch(setNewCartCuenta(res.data.product || []));
                            setShowConfirMudarItem(true)
                        }
                        break
                    default:
                        break
                }



                /*           if (res.message === "Mesa no encontrada") {
                              ClearInputKeyBoard(1)
                              setTimeout(() => {
                                  inputRefs.current[1].current?.focus();
                              }, 100)
                              return
                          } else {
                              setShowConfirMudarItem(true)
                              dispatch(setNewCartCuenta(res.product));
                          }
                          const cantidad = cartNew.reduce((acc: any, item: any) => acc + item.cantidad, 0);
                          opMudarItems(cartNew, parseFloat(id_mesa), cantidad, orden, pax, idCajaLocal, vendedor, id_user, cuenta).then((res: any) => {
                              console.log(res);
                              socketTest.emit('actualizarMesas');
          
                              setTimeout(() => {
                                  inputRefs.current[2].current?.focus();
                                  inputRefs.current[2].current?.select();
                              }, 100);
                          });
                         */
                break;
            case 2:
                setTimeout(() => {
                    inputRefs.current[3].current?.focus();
                    inputRefs.current[3].current?.select();
                }, 100);
                break;
            case 3:
                inputRefs.current[3].current?.focus();
                break;
            default:
                // Acción por defecto si no coincide con ningún caso
                break;
        }
    }


    const handleClose = async () => {
        dispatch(clearCuenta())
        dispatch(clearCart())
        dispatch(clearMesa())
        dispatch(setInputMesa(false))
        dispatch(setInputVendedor(true))
        setInputValues(['', '', '', ''])
        dispatch(setVendedorSlice(''))
        dispatch(clearIDMesa(0))
        dispatch(setIDUser(0))
        dispatch(setIsPreference(false))
        onCloseClick()
        return
        await deleteTempCuenta(idTempCuenta || 0)
        setIdTempCuenta(0)
    }

    useEffect(() => {
        const cantidad = cart.reduce((acc: number, el: any) => acc + ((parseFloat(el.cantidad))), 0)
        console.log(cart)
        console.log(cantidad)
        if (cantidad === 1) {
            setDisableArrowRight(true)
        } else {
            setDisableArrowRight(false)
        }
    }, [cart])


    return (
        <>
            {/*btn misma cuenta sub cuentas 1b */}
            {
                showModal &&
                <ModalConfimacion
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    onConfimation={() => onConfimation()}
                />
            }
            {
                showConfirMudarItem &&
                <ConfirMudarItem
                    show={showConfirMudarItem}
                    isMismaCuenta={isMismaCuenta}
                    onCloseClick={() => setShowConfirMudarItem(false)}
                    onMismaCuentaClick={() => onMismaCuentaClick()}
                    onOtraCuentaClick={() => setShowConfirMudarItem(false)}
                    mesaCart={inputValues[1]}
                />
            }

            <Modal isOpen={show} size='lg' backdrop={'static'} className='mt-3' fade={false}>
                <CardHeaderModal
                    onCloseClick={onCloseClick}
                    text='Mover Items'
                    classHeader='p-2 rounded'
                />
                <ModalBody style={{ background: '#e8e8e8' }} >

                    <Card className='m-0 mb-1'>
                        <CardHeader className='d-flex justify-content-between  bg-gray align-items-center text-black' >
                            <InputCuentaOneMudarItems
                                handleInputClick={handleInputClick}
                                handleInputFocus={handleInputFocus}
                                inputRefs={inputRefs}
                                inputValues={inputValues}
                                handleInputChange={(event: any) => handleInputChange(event, 0)}
                                handleEnter={handleEnter}
                                handleClearCuentaMain={handleClearCuentaMain}
                                disabledCuenta1={disabledCuenta1}

                            />
                            <Col lg='2'>
                                <Button
                                    className='fs-15 fw-bold border-info shadow rounded'
                                    style={{ height: '65px' }}
                                    block
                                    color='warning'
                                    onClick={() => setShowModal(true)}>
                                    {'Misma Cuenta'}
                                </Button>
                            </Col>
                            <InputCuentaTwoMudarItems
                                handleInputClick={handleInputClick}
                                handleInputFocus={handleInputFocus}
                                inputRefs={inputRefs}
                                inputValues={inputValues}
                                handleInputChange={(event: any) => handleInputChange(event, 1)}
                                handleEnter={handleEnter}
                                handleClearCuenta={handleClearCuentaTwo}
                                inputDisabledCuenta2={inputDisabledCuenta2}

                            />

                        </CardHeader>
                        <CartsMudarItem
                            inputValues={inputValues}
                            inputRefs={inputRefs}
                            handleInputChange={handleInputChange}
                            handleInputClick={handleInputClick}
                            handleEnter={handleEnter}
                            handleInputFocus={handleInputFocus}
                            handleDelete={handleDelete}
                            onKeyPress={onKeyPress}
                            disableArrowRight={disableArrowRight}
                        />
                        <CardFooter>
                            <BtnPosModal
                                onAceptarClick={onEditCart}
                                onCloseClick={handleClose}
                            // btnDisabled={btnDisabledSave}
                            />
                        </CardFooter>
                    </Card>
                </ModalBody>

            </Modal>
        </>
    )
}

export default ModalMudarItem