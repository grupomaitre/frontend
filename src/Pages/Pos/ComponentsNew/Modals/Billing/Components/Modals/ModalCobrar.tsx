import { Modal, ModalHeader, ModalBody, Card, CardBody, CardHeader, Row, Col } from 'reactstrap'
import CompDetails from '../CompModalCobrar/CompDetails'
import { FC, useState, useRef, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setValueEfectivo } from '../../../../../../../slices/Orders/OrdersSlice'
import CompContentDocs from '../CompModalCobrar/CompContentDocs'
import { totalCart } from '../../../../../Func/FuncCart'
import { getOrderByCart } from '../CompModalCobrar/Api/ApiOrder'
import { useQuery } from 'react-query'

interface Props {
    show: boolean
    onCloseClick: any
    closeModalBilling: any
}

interface IrefInput {
    current: HTMLInputElement | null
}



const ModalCobrar: FC<Props> = ({ show, onCloseClick, closeModalBilling }) => {
    const dispatch = useDispatch()
    const { idCart } = useSelector((state: any) => ({
        cart: state.cartSlice.cart,
        idCart: state.cartSlice.idCart,
        /* mesa:state. */
    }))
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const [documento, setDocumento] = useState('')
    const [razon_social, setRazon_social] = useState('')
    const [n_factura, setN_factura] = useState('')
    const [disabledCobrar, setDisabledCobrar] = useState(true)
    const innerBtnCobrar = createRef<HTMLInputElement>();
    const [testVuelto, setTestVuelto] = useState(0)
    const [propina, setPropina] = useState(0)
    const [efectivoTest, setEfectivoTest] = useState(0)
    const getDataOrden = async () => {

        const res: any = await getOrderByCart(idCart)
        if (res.status === "success") {
            setN_factura(res?.data.id_order || null);
            setRazon_social(res?.data?.cliente?.razon_social || '');
            setDocumento(res?.data.documento || '');
            //           console.log(res)

        }

    }


    useEffect(() => {
        getDataOrden()
    }, [show, idCart])


    const closeModals = () => {
        closeModalBilling()
        onCloseClick()
    }
    const [activeTabItem, setactiveTab] = useState<string>("1")
    const totalRedondeado = totalCart()
    //keyboard
    const [inputValues, setInputValues] = useState<Array<string | number | any>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {
        /* 
                if (inputRefs.current[0] && inputRefs.current[0].current) {
        
                    clearInvidualInput(activeInputIndex);
        
                } else {
                    const newInputValues = [...inputValues];
                    newInputValues[activeInputIndex] += value;
                    setInputValues(newInputValues);
        
                }
         */
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = ""
        inputRefs.current[activeInputIndex].current?.focus()
        inputRefs.current[activeInputIndex].current?.select()
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
    const handleKeydown = () => {
        if (activeInputIndex === 0) {

            innerBtnCobrar.current?.focus()
        }
    }
    //end keyboard

    useEffect(() => {
        //rounded total2
        setInputValues([totalRedondeado || '0', '0', '0', '0'])
        dispatch(setValueEfectivo(totalRedondeado))
    }, [totalRedondeado])
    const { isLoading, data: ordenes } = useQuery(['dataOrden', idCart], () => getOrderByCart(idCart));
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)


    //inputs 
    const [inputEfectivo, setInputEfectivo] = useState<number>(0)
    const [inputTarjeta, setInputTarjeta] = useState<number>(0)
    const [inputCheque, setInputChequeTab] = useState<number>(0)
    const [inputDeposito, setInputDeposito] = useState<number>(0)
    //inputs ref
    const inputRefCheque = useRef<HTMLInputElement>(null)
    const inputRefTarjeta = useRef<HTMLInputElement>(null)
    const inputRefDeposito = useRef<HTMLInputElement>(null)
    //label api forma pago set
    const [formaPago, setFormaPago] = useState('')
    //info cart

    useEffect(() => {
        setInputEfectivo(parseFloat(inputValues[0].toString()) || 0)
        setEfectivoTest(parseFloat(inputValues[0].toString()) || 0)

    }, [inputValues[0]])

    useEffect(() => {
        setInputChequeTab(parseFloat(inputValues[1].toString()) || 0)
    }, [inputValues[1]])

    useEffect(() => {
        setInputTarjeta(parseFloat(inputValues[2].toString()) || 0)
    }, [inputValues[2]])

    useEffect(() => {
        setInputDeposito(parseFloat(inputValues[3].toString()) || 0)
    }, [inputValues[3]],)

    useEffect(() => {
        setactiveTab('1')
        inputRefs.current[0].current?.focus()
        localStorage.setItem('forma_pago', 'Efectivo' || '')
        setFormaPago('Efectivo')
        dispatch(setValueEfectivo(inputEfectivo))

        setTimeout(() => {
            inputRefs.current[0].current?.select()
        }, 100)
    }, [idCart, totalCart, cart])
    return (
        <>
            {!isLoading &&
                <Modal isOpen={show} backdrop={'static'} fade={false} size='' style={{ maxWidth: '70%' }}>
                    <ModalHeader style={{ maxHeight: '50%', height: '35px' }} className='m-0 p-0 px-2'>
                        <span className='fs-12 p-1'>Caja Cobro</span>
                    </ModalHeader>
                    <ModalBody className='bg-gray'>


                        <div className='d-flex'>
                            <div style={{ width: '35%' }} >
                                <CompDetails
                                    closeModals={closeModals}
                                    activeTabItem={activeTabItem}
                                    setactiveTab={setactiveTab}
                                    show={show}
                                    //keyboard
                                    inputValues={inputValues}
                                    inputRefs={inputRefs}
                                    setInputValues={setInputValues}
                                    handleInputChange={handleInputChange}
                                    handleInputClick={handleInputClick}
                                    handleKeydown={handleKeydown}
                                    handleInputFocus={handleInputFocus}
                                    totalCart={totalRedondeado}
                                    setDisabledCobrar={setDisabledCobrar}
                                    //data
                                    documento={documento}
                                    razon_social={razon_social}
                                    n_factura={n_factura}
                                    //setTestVuelto
                                    setTestVuelto={setTestVuelto}
                                    testVuelto={testVuelto}
                                    //propina
                                    setPropina={setPropina}
                                    propina={propina}
                                    //efectivo
                                    setEfectivoTest={setEfectivoTest}
                                    //btn cobrar
                                    disabledCobrar={disabledCobrar}
                                    efectivoTest={efectivoTest}
                                    innerBtnCobrar={innerBtnCobrar}
                                    //inputs
                                    inputEfectivo={inputEfectivo}
                                    inputTarjeta={inputTarjeta}
                                    inputCheque={inputCheque}
                                    inputDeposito={inputDeposito}
                                    setInputEfectivo={setInputEfectivo}
                                    inputRefCheque={inputRefCheque}
                                    inputRefTarjeta={inputRefTarjeta}
                                    inputRefDeposito={inputRefDeposito}
                                    formaPago={formaPago}
                                    setFormaPago={setFormaPago}
                                />
                            </div>
                            <div className='' style={{ width: '70%', height: '100%' }}>
                                <Card className='mb-1  rounded-start-0' >
                                    <CardHeader className='text-center p-3 d-flex flex-row gap-2 justify-content-around page-bg text-white rounded-start-0'
                                        style={{ fontSize: '0.68rem' }}>
                                        <div> Cuenta N°:<br />
                                            <span className='fw-bold'> {mesacart}</span>

                                        </div>
                                        <div> N°:<br /> <span style={{ fontWeight: '700' }}> {!isLoading ? ordenes?.data?.id_order || 0 : "001"}</span>
                                        </div>
                                        <div> Documento: <br />
                                            <span style={{ fontWeight: '700' }} className='text-capitalize'>
                                                {' ' + !isLoading ? ordenes?.data?.documento : "documento"}
                                            </span>
                                        </div>
                                        <div> Cliente:<br /> <span style={{ fontWeight: '500' }} >{!isLoading ? ordenes?.data?.cliente?.razon_social || '' : "empresa"}</span> </div>
                                    </CardHeader>
                                    <CardBody>

                                        <Row className='d-flex  justify-content-center align-items-center'>
                                            <Col lg=''>
                                                <CompContentDocs
                                                    activeTab={activeTabItem}
                                                    onKeyPress={onKeyPress}
                                                    handleDelete={() => handleDelete()}
                                                    closeModals={closeModals}
                                                    testVuelto={testVuelto}
                                                    totalCart={totalRedondeado}
                                                    setPropina={setPropina}
                                                    //inputs
                                                    setInputTarjeta={setInputTarjeta}
                                                    setInputChequeTab={setInputChequeTab}
                                                    setInputDeposito={setInputDeposito}

                                                />
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>


                            </div>

                        </div>
                    </ModalBody>
                </Modal>}
        </>
    )
}

export default ModalCobrar