import { FC, useEffect, useState, useRef } from 'react'
import { TabPane, Row, Col, Label, Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import { useSelector } from 'react-redux'
import visa from '../../../../../../../assets/images/tarjetas/visa.png'
import mastercard from '../../../../../../../assets/images/tarjetas/mastercard.png'
import diners from '../../../../../../../assets/images/tarjetas/diners.png'
import american from '../../../../../../../assets/images/tarjetas/american.png'
import discover from '../../../../../../../assets/images/tarjetas/discover.png'
import { v4 as uuidv4 } from 'uuid';
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import FormTarjeta from './Components/FormTarjeta'
import BtnPosModal from '../../../../../../../Components/Common/Buttons/BtnPosModal'
import TableGeneric from '../../../../../../../common/Generics/Table/TableGeneric'
import ModalAlert from '../../../../../../../common/Generics/Modal/ModalAlert'
interface Props {
    total: number
    newData?: any
    setNewData?: any
    items: any
    inputRefs?: any
    onKeyPress?: any
    handleDelete?: any
    inputValues?: any
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    activeInputIndex: any
    setActiveInputIndex: any
    editTarjeta: any
    saveTarjeta: any
    deleteTarjeta: (item: number) => void
    onCloseClick: any
    setInputValues: any,
    loading: boolean
}
const TabPaneTarjeta: FC<Props> = ({ total, deleteTarjeta, items, onKeyPress, handleDelete, inputRefs, inputValues, setInputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    activeInputIndex,
    setActiveInputIndex,
    editTarjeta,
    saveTarjeta,
    onCloseClick,
    loading
}) => {
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const totalItems = items.reduce((acc: any, el: any) => acc + (parseFloat(el.monto)), 0)

    const [selectItemRow, setSelectItemRow] = useState<any>({})
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [totalPropina, setTotalPropina] = useState<any>('')
    const [tarjeta, setTarjeta] = useState<string>('')
    //error tarjeta
    const [errorTarjeta, setErroTarjeta] = useState(false)
    const [forma_pago, setForma_pago] = useState<string>('')
    //btns
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [addNext, setAddNext] = useState(true)
    const btnAgregarRef = useRef<HTMLButtonElement>(null)
    const cards = [
        { id: 1, name: 'visa', url: visa },
        { id: 2, name: 'mastercard', url: mastercard },
        { id: 3, name: 'diners', url: diners },
        { id: 4, name: 'american', url: american },
        { id: 5, name: 'discover', url: discover },
    ]

    useEffect(() => {
        if (totalItems >= total) {
            setAddNext(true)
        }
        else {
            setAddNext(false)
        }
    }, [items, total, totalItems])


    const columns = [
        //select row
        {
            Header: 'Adquiriente',
            accessor: 'nombre_adquiriente'
        },
        {
            Header: 'Monto',
            accessor: 'monto'
        },
        {
            Header: 'Propina',
            accessor: 'propina'
        },
        {
            Header: 'Boucher',
            accessor: 'numero_boucher'
        },
        {
            Header: 'Lote',
            accessor: 'numero_lote'
        },
        {
            Header: 'Total',
            accessor: 'total'
        }


    ]

    useEffect(() => {
        if (isEdit) {
            setInputValues([
                selectItemRow?.monto || 0,
                selectItemRow?.propina || 0,
                selectItemRow?.numero_boucher || '',
                selectItemRow?.numero_lote || ''])
            setTarjeta(selectItemRow?.nombre_adquiriente || '')
        }
    }, [isEdit, selectItemRow])

    const handleTarjeta = (item: any) => {
        setTarjeta(item)
        setErroTarjeta(false)
    }

    const handlePushData = () => {
        const idCajaLocal = JSON.parse(localStorage.getItem('idCaja') || '0')

        if (inputValues[0] === 0) return
        const dataPush = {
            id_order: id_order,
            monto: inputValues[0],
            propina: inputValues[1],
            numero_boucher: inputValues[2],
            numero_lote: inputValues[3],
            nombre_adquiriente: tarjeta,
            forma_pago,
            total: totalPropina,
            id_caja_diaria: idCajaLocal,
            uiID: uuidv4()
        }
        if (isEdit) {
            editTarjeta(selectItemRow?.id_factura_tarjeta, dataPush)
            setIsEdit(false)
        } else {
            if (tarjeta.length === 0) {
                setErroTarjeta(true)
                setBtnDisabled(true)
            }
            else {

                saveTarjeta(dataPush)
                clearInputs()
            }
        }
    }


    useEffect(() => {
        setTotalPropina((parseFloat(inputValues[1]) + parseFloat(inputValues[0])) || 0)
    }, [inputValues])


    const removeCart = () => {
        const item = selectItemRow;
        deleteTarjeta(item?.id_factura_tarjeta)
        clearInputs()
    };

    const clearInputs = () => {
        setBtnDisabled(false)
        setIsEdit(false)
        setTarjeta('')
        setInputValues(['', '', '', ''])
        inputRefs.current[0].current?.focus()
        inputRefs.current[0].current?.select()
        setSelectItemRow({})
    }
    const handleKeydown = () => {
        if (activeInputIndex < inputRefs.current.length - 1) {
            inputRefs.current[activeInputIndex + 1].current?.focus()
            inputRefs.current[activeInputIndex + 1].current?.select()
            setActiveInputIndex(activeInputIndex + 1)
        } else {
            inputRefs.current[0].current?.focus()
        }

    }
    useEffect(() => {

        if (selectItemRow?.id_factura_tarjeta > 0) {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }

    }, [selectItemRow]);
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
            <div className='  text-whtie fs-11' >

                <TabPane tabId="2" id="product" className='text-white mt-0 p-0'>

                    <Card className='mb-1 mt-0'>
                        <CardHeader className='m-0 p-0 py-1 px-1'>
                            <Row className='d-flex align-items-center justify-content-between'>
                                <Col lg='' className=' me-1 d-flex flex-column text-center'>
                                    <Label className='bg-dark rounded text-white p-1 text-uppercase fs-4'> {
                                        tarjeta || 'Tarjeta'
                                    }</Label>
                                </Col>

                                <Col lg=''>
                                    <div className='d-flex align-items-center gap-2 '>
                                        {
                                            cards.map((item, key) => (
                                                <div key={key} className='rounded  border'>
                                                    <Button
                                                        size='sm'
                                                        color='light'
                                                        className="shadow  rounded text-dark"
                                                        onClick={() => handleTarjeta(item.name)}
                                                    >
                                                        <img src={item.url} alt="" width={43} height={43} />
                                                    </Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Col>

                                <Col className=''>

                                    <Label className='bg-black p-2 rounded fs-5 '
                                        style={{ color: 'red ' }}
                                    >Total: ${parseFloat(totalPropina.toString()).toFixed(2) || 0}</Label>

                                </Col>
                            </Row>
                        </CardHeader>

                        <CardBody>
                            {errorTarjeta && <Row>
                                <Col lg='12' className=' text-center'>

                                    <div className='text-white fs-15 fw-bold bg-danger py-2'>
                                        Selecione una Tarjeta
                                    </div>

                                </Col>
                            </Row>}
                            <Row>
                                <FormTarjeta
                                    inputRefs={inputRefs}
                                    inputValues={inputValues}
                                    handleInputChange={handleInputChange}
                                    handleInputClick={handleInputClick}
                                    handleInputFocus={handleInputFocus}
                                    handleKeydown={handleKeydown}
                                />
                            </Row>


                        </CardBody>


                        <CardFooter className='d-flex  gap-2'>
                            <Button className=' ms-1 fs-15'
                                style={{ height: '40px' }}
                                block
                                innerRef={btnAgregarRef}
                                color='primary'
                                type='submit'
                                //    disabled={loading}
                                disabled={inputValues[0] === 0 || loading ? true : false}
                                onClick={addNext ? () => setShowAlert(true) : () => handlePushData()}
                            //  disabled={btnDisabled}

                            /*     */
                            /*       onKeyDown={
                                (e) => {
                                    if (e.key === 'Enter') {
                                        handlePushData
                                    }
                                }
                            } */
                            >{!!isEdit ? 'Actualizar' : 'Agregar'}   </Button>
                            <Button className=' fs-14'
                                color='danger'
                                outline
                                block
                                onClick={removeCart}
                            >Eliminar</Button>
                            <Button
                                outline
                                color='secondary'
                                onClick={() => clearInputs()}
                            >
                                {'Limpiar'}
                            </Button>

                        </CardFooter>
                    </Card>


                    <Card className='mb-0'>
                        <CardBody>
                            <Row className=''>

                                <Col lg='8'>


                                    <TableGeneric
                                        showFilter={false}
                                        showFooter={false}
                                        columns={columns || []}
                                        data={items || []}
                                        selectItemRow={setSelectItemRow}
                                        divClass='table-responsive text-black bg-table'
                                        tableClass='cursor-pointer w-100'
                                        theadClass='position-sticky top-0 bg-table '
                                        thClass='fs-11 fw-light border'
                                        tbodyClass='bg-gray'
                                        styleHeight='233px'
                                        overflowY='scroll'
                                    />


                                </Col>
                                <Col lg='2' className='rounded-1 d-flex align-items-start px-0' style={{ background: '' }}>
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
                        <CardFooter>
                            <BtnPosModal
                                onAceptarClick={onCloseClick}
                                onCloseClick={onCloseClick}
                            />
                        </CardFooter>
                    </Card>

                </TabPane>
            </div >

        </>
    )
}

export default TabPaneTarjeta