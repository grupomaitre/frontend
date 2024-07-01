import { Modal, ModalHeader, ModalBody, Card, CardBody, CardFooter, CardHeader, Row, Col } from 'reactstrap'
import CompDetails from '../CompModalCobrar/CompDetails'
import { FC, useState, useRef, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setValueEfectivo } from '../../../../../../../slices/Orders/OrdersSlice'
import CompContentDocs from '../CompModalCobrar/CompContentDocs'
import BtnCobrar from '../CompModalCobrar/Components/BtnsCobrarCuenta'
import { totalCart } from '../../../../../Func/FuncCart'
import { getOrderByCart } from '../CompModalCobrar/Api/ApiOrder'

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
    const [documento, setDocumento] = useState('')
    const [razon_social, setRazon_social] = useState('')
    const [n_factura, setN_factura] = useState('')
    const [disabledCobrar, setDisabledCobrar] = useState(true)
    const innerBtnCobrar = createRef<HTMLInputElement>();
    const [testVuelto, setTestVuelto] = useState(0)
    const getDataOrden = async () => {

        const res: any = await getOrderByCart(idCart)
        if (res.status === "success") {
            setN_factura(res?.data.id_order || null);
            setRazon_social(res?.data.cliente.razon_social || '');
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

    return (
        <>
            <Modal isOpen={show} backdrop={true} fade={false} size='lg'>
                <ModalHeader style={{ maxHeight: '50%', height: '35px' }} className='m-0 p-0 px-2'>
                    <span className='fs-12 p-1'>Caja Cobro</span>
                </ModalHeader>
                <ModalBody className='bg-gray'>


                    <div className='d-flex  '>
                        <div style={{ width: '60%' }} >
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
                            />
                        </div>
                        <div className='' style={{ width: '50%' }}>
                            <Card className='mb-1 border-primary rounded-start-0' >
                                <CardHeader className='page-bg text-white fs-6 py-3 text-center  rounded-start-0'>
                                    Total:  {totalRedondeado && totalRedondeado}
                                </CardHeader>
                                <CardBody>

                                    <Row className='d-flex  justify-content-center align-items-center'>
                                        <Col lg='9'>
                                            <CompContentDocs
                                                activeTab='1'
                                                onKeyPress={onKeyPress}
                                                handleDelete={() => handleDelete()}
                                            />
                                        </Col>
                                    </Row>

                                </CardBody>
                                <CardFooter>
                                    <BtnCobrar
                                        error={disabledCobrar}
                                        total2={0}
                                        closeModals={closeModals}
                                        innerBtnCobrar={innerBtnCobrar}
                                    />
                                </CardFooter>
                            </Card>


                        </div>

                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalCobrar