import { FC, useEffect, useRef, useState, createRef } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Modal, ModalBody, Row, } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { addCuenta, removeCuenta, clearCuenta, setNewCartCuenta } from '../../../../slices/Cart/cuentaSlice'
import { addCartPrueba, clearCart, clearIDMesa, clearMesa, clearPax, minusCart, setIDCart, setIDUser, setIsCartSuccess, setNewCart, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { IModalMudarItem, IrefInput } from './Interface/InterMudarItem'
import { socketTest } from '../../Socket/ConctSocket'
import { BuscarMesa } from '../../Helpers/ApiMesas'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import ModalConfimacion from './Components/ModalConfimacion'
import ConfirMudarItem from './CompoMudarItem/ConfirMudarItem'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import ColumnRight from './Interface/ColumnRight'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import { deleteTempCuenta, opMudarItems, openCuenta, statusMudarItem } from './Api/MudarItems'
import axios from 'axios'
import './css/styleMudarItem.css'
import GloblaTable from '../../../../common/Generics/Table/GloblaTable'
import { totalCart } from '../../Func/FuncCart'
import { totalCartFunc } from '../../Func/Caculos'
import ConfirmPrecuenta from './ConfirmPrecuenta'
import { saveCart } from '../../Helpers/ApiCart'
import CardHeaderModal from '../../../../common/CardHeaderModal'
const ModalMudarItem: FC<IModalMudarItem> = ({ show, onCloseClick }) => {
    const nombre_mesa = (sessionStorage.getItem('nombre_mesa') || '')
    const id_mesa: any = (sessionStorage.getItem('id_mesa' || ''))
    const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
    const [inputDisabledCuenta2, setInputDisabledCuenta2] = useState<boolean>(false)
    const [showModalPrecuenta, setShowModalPrecuenta] = useState(false)
    const [disableRight, setDisableRight] = useState<boolean>(false)
    const [disableLeft, setDisableLeft] = useState<boolean>(false)
    const [productRight, setProductRight] = useState<any>(null)
    const [productLeft, setProductLeft] = useState<any>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [isMismaCuenta, setIsMismaCuenta] = useState<boolean>(false)
    const [selectItemRow, setSelectItemRow] = useState<any>({})
    const [selectItemRow2, setSelectItemRow2] = useState<any>({})
    //teclado
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    //misma cuenta
    //ref inputs
    const dispatch = useDispatch()

    const { cart, cartNew, cuenta, idCart, pax, orden, vendedor, id_user } = useSelector((state: any) => ({
        cart: state.cartSlice.cart,
        cartNew: state.cuentaSlice.cartNew,
        cuenta: state.cartSlice.mesacart,
        idCart: state.cartSlice.idCart,
        pax: state.cartSlice.pax,
        orden: state.cartSlice.orden,
        vendedor: state.cartSlice.vendedor,
        id_user: state.cartSlice.id_user,
        selectedProduct: state.productSlice.selectedProduct



    }))
    const [activeRow, setActiveRow] = useState(null);
    const [inputDisabledcuenta, setInputDisabledcuenta] = useState<boolean>(false)
    const [btnDisabledSave, setBtnDisabledSave] = useState<boolean>(false)
    const [idTempCuenta, setIdTempCuenta] = useState<number>()
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
    //useeffec

    useEffect(() => {
        setInputValues([nombre_mesa, '', '', ''])
        setTimeout(() => {
            inputRefs.current[1].current?.focus()
        }, 100);
    }, [nombre_mesa, show])


    useEffect(() => {

        if (cartNew.length === 0) {
            setDisableLeft(true)
        } else {
            setDisableLeft(false)
        }
    }, [selectItemRow, selectItemRow2, cart, cartNew])

    useEffect(() => {

        if (cart.length === 0) {
            setDisableRight(true)
        } else {
            setDisableRight(false)
        }
    }, [selectItemRow, selectItemRow2, cart, cartNew])
    const moveRight = () => {
        setActiveRow(null)
        dispatch(minusCart(selectItemRow))
        dispatch(addCuenta(selectItemRow))


        setProductRight(null)
        return
        /*   } */
    }

    const moveLeft = () => {
        dispatch(addCartPrueba(selectItemRow2))
        dispatch(removeCuenta(selectItemRow2))
        setSelectItemRow2(null)
        return

    }

    const onEditCart = async () => {

        const cantidad = cartNew.reduce((acc: any, item: any) => acc + item.cantidad, 0)
        const res: any = await statusMudarItem(parseFloat(id_mesa), cartNew, cantidad, orden, pax, idCajaLocal, vendedor, id_user, idTempCuenta)
        handlesaveCart()
        await axios.patch('api/v1/update-group-cart', {
            idCart: idCart,
            cart: cartNew,
        })
        dispatch(clearCuenta())
        dispatch(clearCart())
        /*    if (res.status) {
               // onCloseClick()
               dispatch(clearCuenta())
               dispatch(clearCart())
               await axios.patch('api/v1/update-group-cart', {
                   idCart: idCart,
                   cart: cartNew,
               })
           } */
    }
    const handlesaveCart = async () => {
        const total = totalCart()

        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
        const cantidad = cartNew.reduce((acc: any, item: any) => acc + item.cantidad, 0)
        try {


            const result = await saveCart(cartNew, cantidad, orden, parseInt(inputValues[1]), pax || 0, idCajaLocal || idCajaLocal, vendedor, id_user, total)

            if (result) {
                onCloseClick()
                dispatch(setVendedorSlice(''))
                dispatch(clearIDMesa(0))
                dispatch(clearMesa())
                dispatch(clearCart())
                dispatch(clearPax())
                dispatch(setIDCart(0))
                dispatch(setIsCartSuccess(false))
                dispatch(setIDUser(0))
                socketTest.emit('actualizarMesas')

            }

        } catch (error) {
            console.log(error)

        }
    }
    const handleClearCuentaMain = () => {
        setInputDisabledcuenta(false)

        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues]
            newInputValues[0] = ''
            return newInputValues
        })
        inputRefs.current[0].current?.focus()
        inputRefs.current[0].current?.select()
    }
    const handleClearCuenta = () => {
        setInputDisabledCuenta2(false)
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
        console.log(res)
        setIdTempCuenta(res.id_temp_cuenta)
        setDisableRight(false)
        setShowModal(false)
        setInputDisabledCuenta2(true)
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues]
            newInputValues[1] = nombre_mesa + res?.sub_orden
            return newInputValues
        })
        setShowModal(false)

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
        setDisableRight(false)
        setShowConfirMudarItem(false)
        setInputDisabledCuenta2(true)
        setTimeout(() => {
            inputRefs.current[2].current?.focus()

        }, 100);
    }
    /*     const mismaCuenta = () => {
            setShowModal(true)
        }
     */






    /*   const columns1 = ColumnOriginal({ activeRow, setProductRight }) */
    const columns1 = [
        {
            Header: 'Cant',
            accessor: 'cantidad',
        },
        {
            Header: 'Detalle',
            accessor: 'nombre',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => setProductRight(row.original)}>
                    <span >{row.original.nombre}</span>
                </div>
            ),
        },
        {
            Header: 'P.Unit',
            accessor: 'precio',
            Cell: ({ row }: any) => {
                const precio = parseFloat(row.original.precio) * parseFloat(row.original.cantidad)
                return (precio).toFixed(2)
            },
        }


    ]
    const columns = ColumnRight({ activeRow, setProductLeft })


    const [showConfirMudarItem, setShowConfirMudarItem] = useState<boolean>(false)
    const [productCuenta, setproductCuenta] = useState<any>([])

    const handleEnter = async () => {

        switch (activeInputIndex) {

            case 0:
                BuscarMesa(inputValues[0], idCart).then((res: any) => {
                    if (/^[a-zA-Z0-9]*$/.test(inputValues[0]) === false || inputValues[0].length === 0) {
                        inputRefs.current[0].current?.focus();
                        setInputValues(prevInputValues => {
                            const newInputValues = [...prevInputValues];
                            newInputValues[1] = '';
                            return newInputValues;
                        });
                        return;
                    }

                    if (res.status) {
                        setInputDisabledcuenta(true);
                        dispatch(setNewCart(res.product));
                        setTimeout(() => {
                            inputRefs.current[1].current?.focus();
                            inputRefs.current[1].current?.select();
                        }, 100);
                        return;
                    } else {
                        dispatch(setNewCart([]));
                    }
                });
                break;
            case 1:
                const res: any = await BuscarMesa(inputValues[1], idCart)
                switch (res.message) {
                    case "Mesa no encontrada":
                        ClearInputKeyBoard(1)
                        inputRefs.current[1].current?.focus();
                        break
                    case "Cuenta sin items":
                        inputRefs.current[1].current?.blur();
                        setInputDisabledCuenta2(true)
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
                            setproductCuenta(res.data.product || [])
                            setInputDisabledCuenta2(true)
                            setShowConfirMudarItem(true)
                        }
                        break
                    default:
                        break
                }


                return
                if (res.message === "Mesa no encontrada") {
                    ClearInputKeyBoard(1)
                    setTimeout(() => {
                        inputRefs.current[1].current?.focus();
                    }, 100)
                    return
                } else {
                    setShowConfirMudarItem(true)
                    setproductCuenta(res?.product || [])
                    setInputDisabledCuenta2(true)
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
        onCloseClick()
        dispatch(clearCuenta())
        return
        await deleteTempCuenta(idTempCuenta || 0)
        dispatch(clearCuenta())
        setIdTempCuenta(0)


    }


    const totalCartFinal = totalCartFunc(cart || [])
    const totalCartNew = totalCartFunc(cartNew || [])

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
            {/* precuenta modal */}
            {showModalPrecuenta &&
                <ConfirmPrecuenta
                    show={showModalPrecuenta}
                    onCloseClick={() => setShowModalPrecuenta(false)}
                    cart={cartNew}
                />}
            <Modal isOpen={show}  size='lg' backdrop={'static'} className='mt-3' fade={false}>
                <CardHeaderModal
                    onCloseClick={onCloseClick}
                    text='Mover Items'
                    classHeader='p-2 rounded'
                />
                <ModalBody style={{ background: '#e8e8e8' }} >

                    <Card className='m-0 mb-1'>
                        <CardHeader className='d-flex justify-content-between  bg-gray align-items-center text-black' >
                            <Col lg='3'>
                                <Label>Cuenta</Label>
                                <div className='d-flex align-items-center'>
                                    <InputKeyBoard
                                        inputRef={inputRefs.current[0]}
                                        value={inputValues[0]}
                                        onChange={(event) => handleInputChange(event, 0)}
                                        handleInputClick={() => handleInputClick(0)}
                                        handleKeydown={handleEnter}
                                        classInput='text-center input-border rounded fs-6'
                                        disabled={parseInt(inputValues[0]) > 0 ? true : false}
                                        type='text'
                                        handleInputFocus={() => handleInputFocus(0)}
                                        bsSize='sm'
                                        styleInput={{ height: '40px', borderRadius: '0' }}
                                    />
                                    <Button className='ms-1 rounded-0'
                                        color='danger'
                                        onClick={() => handleClearCuentaMain()}
                                    >
                                        X
                                    </Button>

                                </div>
                            </Col>
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
                            <Col lg='3'>
                                <Label>Cuenta 2</Label>
                                <div className='d-flex align-items-end'>
                                    <InputKeyBoard
                                        inputRef={inputRefs.current[1]}
                                        value={inputValues[1]}
                                        onChange={(event) => handleInputChange(event, 1)}
                                        handleInputClick={() => handleInputClick(1)}
                                        handleKeydown={handleEnter}
                                        classInput='text-center input-border fs-6 text-uppercase'
                                        type={'text'}
                                        handleInputFocus={() => handleInputFocus(1)}
                                        bsSize='sm'
                                        styleInput={{ height: '40px', borderRadius: '0' }}
                                        disabled={inputDisabledCuenta2}
                                    />

                                    <Button className='ms-1 rounded-0'
                                        color='danger'
                                        onClick={() => handleClearCuenta()}
                                    >
                                        X
                                    </Button>
                                </div>

                            </Col>
                        </CardHeader>
                        <CardBody className=''>
                            <Row className='mb-2 border-bottom'>
                                <Col className='rounded ' lg='5'>

                                    <GloblaTable
                                        /*              showFilter={false}
                                                     showFooter={false} */
                                        columns={columns1 || []}
                                        data={cart || []}
                                        setSelectItemRowInv={(e: any) => setSelectItemRow(e)}
                                        divClass='table-responsive text-black bg-table fs-11'
                                        tableClass='cursor-pointer w-100'
                                        theadClass='position-sticky top-0 bg-table '
                                        thClass='fs-11 fw-light border'
                                        /*   tbodyClass='bg-gray' */
                                        styleHeight='150px'
                                    /*       overflowY='scroll' */
                                    />
                                </Col>
                                <Col lg='2' >
                                    <Button block
                                        className='mb-2'
                                        color='success'
                                        onClick={() => setShowModalPrecuenta(true)}
                                    >
                                        Precuenta
                                    </Button>
                                    <Input type='text' className='mb-2  inputMudar' placeholder='Cant' />
                                    <div className='d-flex flex-column '>
                                        <Button color='success'
                                            outline
                                            disabled={disableRight}
                                            className='rounded shadow' onClick={() => moveRight()}><ArrowRight /></Button>
                                        <Button
                                            color='danger'
                                            disabled={disableLeft}
                                            outline
                                            className='rounded my-3 shadow' onClick={() => moveLeft()}><ArrowLeft /></Button>

                                    </div>
                                </Col>
                                <Col className=' rounded' lg='5'>
                                    <GloblaTable
                                        /*       showFilter={false}
                                              showFooter={false} */
                                        columns={columns || []}
                                        data={cartNew || []}
                                        setSelectItemRowInv={(e: any) => setSelectItemRow2(e)}
                                        divClass='table-responsive text-black bg-table fs-11'
                                        tableClass='cursor-pointer w-100'
                                        theadClass='position-sticky top-0 bg-table '
                                        thClass='fs-11 fw-light border'
                                        /*        tbodyClass='bg-gray' */
                                        styleHeight='150px'
                                    /*        overflowY='scroll' */
                                    />

                                </Col>
                            </Row>
                            <Row className='text-warning bg-black'>
                                <Col lg='6' className='d-flex justify-content-around'>
                                    <Label>Total:</Label>
                                    <Label>{Math.round((totalCartFinal) * 100) / 100 || 0}</Label>
                                </Col>
                                <Col lg='6' >
                                    <Label className='float-end'>Total:{(totalCartNew).toFixed(2) || 0}</Label>
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-between text-black'>
                                <Col lg='2' className='d-flex align-items-center'>
                                    <Label>Pax: </Label>

                                    <InputKeyBoard
                                        inputRef={inputRefs.current[2]}
                                        value={inputValues[2]}
                                        onChange={(event) => handleInputChange(event, 2)}
                                        handleInputClick={() => handleInputClick(2)}
                                        handleKeydown={handleEnter}
                                        classInput='text-center input-border rounded-0 fs-6'
                                        //disabled={inputDisabledcuenta}
                                        type='text'
                                        handleInputFocus={() => handleInputFocus(2)}
                                        bsSize='sm'
                                        styleInput={{ height: '40px', borderRadius: '0' }}
                                    />
                                </Col>
                                <Col lg='2' className='d-flex align-items-center'>
                                    <Label>Pax: </Label>

                                    <InputKeyBoard
                                        inputRef={inputRefs.current[3]}
                                        value={inputValues[3]}
                                        onChange={(event) => handleInputChange(event, 3)}
                                        handleInputClick={() => handleInputClick(3)}
                                        handleKeydown={handleEnter}
                                        classInput='text-center input-border rounded-0 fs-6'
                                        //disabled={inputDisabledcuenta}
                                        type='text'
                                        handleInputFocus={() => handleInputFocus(3)}
                                        bsSize='sm'
                                        styleInput={{ height: '40px', borderRadius: '0' }}
                                    />
                                </Col>
                            </Row>
                            <Row className='my-2'>
                                <Col lg='2'>
                                    <Button
                                        block
                                        outline
                                        color='success'
                                        onClick={() => setShowKeyBoard(!showKeyBoard)}
                                    >Teclado</Button>
                                </Col>
                            </Row>
                            {showKeyBoard && <Row className='mt-2'>
                                <Col lg=''>

                                    <NumericKeyboard
                                        handleDelete={() => handleDelete()}
                                        onKeyPress={(e) => onKeyPress(e)}
                                        keyboards={
                                            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                                                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                                            ]
                                        }
                                        gridTemplateColumns={'10'}
                                        widthKey='50px'
                                        heightKey='50px'
                                        fontSizeKey='1.55rem'
                                        heightBtnDelete='50px'
                                        widthBorrar='80px'
                                        fondoKey='#e6ecec'
                                        colorKeys='#13284e'
                                        gridColumn='span 1'
                                        sizeBorrar={'0.9rem'}
                                        bgDelete={'#ff0000'}
                                        colorDelete={'#fff'}
                                        showDelete={true}

                                    />
                                </Col>

                                <Col lg='2' >
                                    <Button
                                        block
                                        onClick={() => handleDelete()}
                                        color='danger'
                                        className='my-1 fs-11 border'
                                        style={{ height: '62%', width: '100%' }}
                                    >
                                        {'Borrar'}
                                    </Button>
                                </Col>
                                <Col lg='2' >
                                    <Button
                                        block
                                        onClick={() => handleEnter()}
                                        color='light'
                                        className='my-1 fs-11 border'
                                        style={{ height: '62%', width: '100%' }}
                                    >
                                        {'Enter'}
                                    </Button>
                                </Col>

                            </Row>}
                        </CardBody>
                        <CardFooter>
                            <BtnPosModal
                                onAceptarClick={onEditCart}
                                onCloseClick={handleClose}
                                btnDisabled={btnDisabledSave}
                            />
                        </CardFooter>
                    </Card>
                </ModalBody>

            </Modal>
        </>
    )
}

export default ModalMudarItem