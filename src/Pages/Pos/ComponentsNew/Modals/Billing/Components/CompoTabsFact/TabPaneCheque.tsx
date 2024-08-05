import { FC, useEffect, useRef, useState } from 'react'
import { TabPane, Row, Col, Button, Card, CardBody, CardFooter } from 'reactstrap'
import { getBancos } from '../../Helpers/ApiFacturacion'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import FormCheque from './Components/FormCheque'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import TableGeneric from '../../../../../../../common/Generics/Table/TableGeneric'
import ModalAlert from '../../../../../../../common/Generics/Modal/ModalAlert'

interface Props {
    items: any
    total: number
    setInputChequeTab: any
    //keyboard
    inputRefs?: any
    onKeyPress?: any
    handleDelete?: any
    inputValues?: any
    setInputValues: any
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    activeInputIndex: any
    setActiveInputIndex: any
    //
    editCheque: (id: number, data: any) => void
    saveCheque?: any
    deleteCheque: (id: number) => void
    isLoading: boolean
}
const TabPaneCheque: FC<Props> = ({ items, total,
    //keyboard
    inputRefs,
    onKeyPress,
    handleDelete,
    inputValues,
    setInputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    activeInputIndex,
    setActiveInputIndex,
    //
    editCheque,
    saveCheque,
    deleteCheque,
    isLoading

}) => {
    const [selectItem, setSelectItem] = useState<any>({})
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [banco, setBanco] = useState<string>('')

    const [fecha_emision, setFecha_emision] = useState<any>({ value: new Date(), label: new Date() })
    const [fecha_cheque, setFecha_cheque] = useState<any>()
    const [estado_cheque, setEstado_cheque] = useState<string>('')
    const [ingreso_banco, setIngreso_banco] = useState<string>('')
    //input CHEQUE
    //input disabled
    const [totals, setTotal] = useState<number>()
    const [bank, setBank] = useState([])
    //redux
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const id_cart = useSelector((state: any) => state.cartSlice.idCart)
    const btnAgregarRef = useRef<HTMLButtonElement>(null)
    const [addNext, setAddNext] = useState(true)
    const totalItems = items.reduce((acc: any, el: any) => acc + (parseFloat(el.monto)), 0)

    useEffect(() => {
        setFecha_emision(selectItem?.fecha_mision)
    }, [selectItem, isEdit])

    useEffect(() => {
        if (totalItems >= total) {
            setAddNext(true)
        }
        else {
            setAddNext(false)
        }
    }, [items, total, totalItems])


    //input refs

    useEffect(() => {
        setTotal(total)
    }, [total])



    //is edit
    useEffect(() => {
        if (isEdit) {
            setInputValues([
                selectItem?.monto || '',
                selectItem?.numero_cheque || '',
                selectItem?.numero_cuenta || '',
                selectItem?.nombre_beneficiario || '',
                selectItem?.fecha_mision || '',
                selectItem?.fecha_cheque || '',
                selectItem?.estado_cheque || '',
                selectItem?.ingreso_banco || '',
                selectItem?.banco || ''
            ])

        }
    }, [isEdit, selectItem])





    const getBank = async () => {
        getBancos().then((res) => {
            setBank(res.data.map((item: any) => ({ value: item.id_banco, label: item.banco })))
        })
    }

    useEffect(() => { getBank() }, [])

    const columns = [
        {
            Header: 'Monto',
            accessor: 'monto'
        },
        {
            Header: 'N° Cheque',
            accessor: 'numero_cheque'
        },
        {
            Header: 'N° Cuenta',
            accessor: 'numero_cuenta'
        },
        {
            Header: 'Banco',
            accessor: 'banco'
        },
        {
            Header: 'Beneficiario',
            accessor: 'nombre_beneficiario'
        },
        {
            Header: 'Estado',
            accessor: 'estado_cheque'
        }
    ]

    const handlePushData = () => {
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')
        if (inputValues[0] === 0) return
        const newFechaEmision = new Date(fecha_emision || null).toISOString().slice(0, 10) || null
        const newFechaCheque = new Date(fecha_cheque || null).toISOString().slice(0, 10) || null
        const dataPush = {
            monto: inputValues[0] || totals,
            numero_cheque: inputValues[1],
            numero_cuenta: inputValues[2],
            banco,
            nombre_beneficiario: inputValues[3],
            fecha_emision: newFechaEmision,
            fecha_cheque: newFechaCheque,
            estado_cheque: estado_cheque,
            ingreso_banco,
            id_order: id_order,
            id_cart: id_cart,
            id_caja_diaria: idCajaLocal,
            uiID: uuidv4()
        }
        if (isEdit) {
            editCheque(selectItem?.id_factura_cheque, dataPush)
            clearInputs()
            return
        } else {
            saveCheque(dataPush)
            clearInputs()
            return
        }

    }

    const handleDeleteItem = () => {
        //eliminar fila del datatable
        const item = selectItem;
        deleteCheque(item?.id_factura_cheque)
        clearInputs()

    }

    const clearInputs = () => {
        setIsEdit(false)
        setInputValues(['', '', '', '', '', '', '', '', ''])
        inputRefs.current[0].current?.focus()
        inputRefs.current[0].current?.select()
    }

    const handleKeydown = () => {
        //next input ref
        if (activeInputIndex < inputRefs.current.length - 1) {
            inputRefs.current[activeInputIndex + 1].current?.focus()
            inputRefs.current[activeInputIndex + 1].current?.select()
            setActiveInputIndex(activeInputIndex + 1)
        } else {
            inputRefs.current[activeInputIndex].current?.blur()
            handlePushData()
        }

    }
    useEffect(() => {

        if (selectItem?.id_factura_cheque > 0) {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }

    }, [selectItem]);

    const [showAlert, setShowAlert] = useState(false)

    const handleCloseAlert = () => {
        setAddNext(false)
        setShowAlert(false)
    }
    return (
        <>
            {
                showAlert &&
                <ModalAlert
                    show={showAlert}
                    onAceptar={() => handleCloseAlert()}
                    onCancelar={() => setShowAlert(false)}
                    onCloseClick={() => setShowAlert(false)}
                    showAceptar={true}
                    showCancelar={true}
                    text='Total mayor al original'
                    backdrop={true}
                />
            }
            <TabPane tabId="1" id="home">
                <Card className='mb-1'>
                    <CardBody>
                        <FormCheque
                            bank={bank}
                            handleInputChange={handleInputChange}
                            handleInputClick={handleInputClick}
                            handleInputFocus={handleInputFocus}
                            inputRefs={inputRefs}
                            inputValues={inputValues}
                        />


                    </CardBody>
                    <CardFooter className='p-0 px-1'>
                        <Row className=' '>

                            <Col lg=''>
                                <Button
                                    block
                                    className='w-75 me-1 fs-12 rounded'
                                    innerRef={btnAgregarRef}
                                    color='primary'
                                    onClick={addNext ? () => setShowAlert(true) : () => handlePushData()}
                                    disabled={inputValues[0] === 0 || isLoading ? true : false}

                                    onKeyDown={
                                        (e) => {
                                            if (e.key === 'Enter') {
                                                handlePushData
                                            }
                                        }
                                    }
                                >{isEdit ? 'Actualizar' : 'Agregar'}   </Button>





                            </Col>
                            <Col>
                                <Button
                                    block
                                    className='fs-12'
                                    color='danger'
                                    outline
                                    onClick={handleDeleteItem}
                                >Eliminar</Button>
                            </Col>

                            <Col>
                                <Button
                                    block
                                    className='fs-12'
                                    outline
                                    onClick={() => clearInputs()}
                                >
                                    Limpiar
                                </Button>
                            </Col>

                        </Row>
                    </CardFooter>
                </Card>



                <Card className='mb-0'>
                    <CardBody>
                        <Row>
                            <Col  sm='7' xl='8'>
                                <TableGeneric
                                    showFilter={false}
                                    showFooter={false}
                                    columns={columns || []}
                                    data={items || []}
                                    selectItemRow={setSelectItem}
                                    divClass='table-responsive text-black bg-table'
                                    tableClass='cursor-pointer w-100'
                                    theadClass='position-sticky top-0 bg-table '
                                    thClass='fs-12 fw-bold page-bg text-white border'
                                    tdClass='border fs-11'
                                    tbodyClass='bg-light'
                                    styleHeight='230px'
                                    overflowY='scroll'
                                />
                            </Col>
                            <Col lg='' className='rounded-1 d-flex align-items-start px-0' style={{ background: '' }}>
                                <NumericKeyboard
                                    handleDelete={() => handleDelete()}
                                    onKeyPress={(e) => onKeyPress(e)}
                                    btnClass={"keyBoard rounded shadow-sm"}
                                    widthKey='55px'
                                    heightKey='55px'
                                    fontSizeKey='1.55rem'
                                    heightBtnDelete='55px'
                                    fondoKey='#e6ecec'
                                    colorKeys='#13284e'
                                    widthBorrar='55px'
                                    gridColumn='span 1'
                                    sizeBorrar={'0.8rem'}
                                    bgDelete={'#f30000'}
                                    colorDelete={'#fff'}
                                    keyboards={[
                                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'
                                    ]}
                                />
                                <Button
                                    color='light'
                                    className='fs-11 d-flex align-items-center justify-content-center border-sistema '
                                    style={{ width: '60px', height: '96%', marginTop: '3px', textAlign: 'center' }}
                                    onClick={handleKeydown}
                                >
                                    <span className=''>ENTER</span>
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </TabPane>
        </>



    )
}

export default TabPaneCheque