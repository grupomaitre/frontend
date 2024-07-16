import { FC, useState } from 'react'
import { Button, CardBody, Col, Input, Label, Row } from 'reactstrap'
import GloblaTable from '../../../../../common/Generics/Table/GloblaTable'
import InputKeyBoard from '../../Cards/CardOrders/InputKeyBoard'
import NumericKeyboard from '../../../common/NumericKeyboardProps'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { addCartPrueba, minusCart } from '../../../../../slices/Cart/cartSlice'
import { addCuenta, removeCuenta } from '../../../../../slices/Cart/cuentaSlice'
import ColumnRight from '../Interface/ColumnRight'
import { totalCartFunc } from '../../../Func/Caculos'
import ConfirmPrecuenta from '../ConfirmPrecuenta'
interface IProps {
    inputValues: any
    inputRefs: any
    handleInputChange: any
    handleInputClick: any
    handleEnter: any
    handleInputFocus: any
    handleDelete: any
    onKeyPress: any
    disableArrowRight: boolean
}
const CartsMudarItem: FC<IProps> = ({
    inputValues,
    inputRefs,
    handleInputChange,
    handleInputClick,
    handleEnter,
    handleInputFocus,
    handleDelete,
    onKeyPress,
    disableArrowRight
}) => {
    const dispatch = useDispatch()
    const [activeRow, setActiveRow] = useState(null);
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const cartNew = useSelector((state: any) => state.cuentaSlice.cartNew)
    const [selectItemRow, setSelectItemRow] = useState<any>({})
    const [selectItemRow2, setSelectItemRow2] = useState<any>({})
    const [showModalPrecuenta, setShowModalPrecuenta] = useState(false)
    const [showKeyBoard, setShowKeyBoard] = useState(false)

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
                    onClick={() => console.log(row.original)}>
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
    const columns = ColumnRight({ activeRow })


    const moveRight = () => {
        setActiveRow(null)
        dispatch(minusCart(selectItemRow))
        dispatch(addCuenta(selectItemRow))


    }

    const moveLeft = () => {
        dispatch(addCartPrueba(selectItemRow2))
        dispatch(removeCuenta(selectItemRow2))
        setSelectItemRow2(null)

    }

    const totalCartFinal = totalCartFunc(cart || [])
    const totalCartNew = totalCartFunc(cartNew || [])
    return (
        <>
            {/* precuenta modal */}
            {showModalPrecuenta &&
                <ConfirmPrecuenta
                    show={showModalPrecuenta}
                    onCloseClick={() => setShowModalPrecuenta(false)}
                    cart={cartNew}
                />}
            <CardBody className=''>
                <Row className='mb-2 border-bottom'>
                    <Col className='rounded ' lg='5'>

                        <GloblaTable
                            columns={columns1 || []}
                            data={cart || []}
                            setSelectItemRowInv={(e: any) => setSelectItemRow(e)}
                            divClass='table-responsive text-black bg-table fs-11'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-light border'
                            styleHeight='150px'
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
                                disabled={disableArrowRight}
                                className='rounded shadow' onClick={() => moveRight()}><ArrowRight /></Button>
                            <Button
                                color='danger'
                                //  disabled={disableLeft}
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
        </>
    )
}

export default CartsMudarItem