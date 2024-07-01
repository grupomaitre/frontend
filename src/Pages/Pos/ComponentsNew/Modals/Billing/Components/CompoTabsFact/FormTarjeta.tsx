import { FC, useEffect, useState, useRef } from 'react'
import { TabPane, Row, Col, Label, Button, Card, CardBody } from 'reactstrap'
import { useSelector } from 'react-redux'
import visa from '../../../../../../../assets/images/tarjetas/visa.png'
import mastercard from '../../../../../../../assets/images/tarjetas/mastercard.png'
import diners from '../../../../../../../assets/images/tarjetas/diners.png'
import american from '../../../../../../../assets/images/tarjetas/american.png'
import discover from '../../../../../../../assets/images/tarjetas/discover.png'
import { deleteItemTarjeta, getTarjetas, updateItemTarjeta } from './Api/ApiTarjetas'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import FormTarjeta from './Components/FormTarjeta'
import BtnPosModal from '../../../../../../../Components/Common/Buttons/BtnPosModal'
import TableGeneric from '../../../../../../../common/Generics/Table/TableGeneric'
interface Props {
    total: number
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
    onCloseClick: any
}
const TabPaneTarjeta: FC<Props> = ({ total, setNewData, items, onKeyPress, handleDelete, inputRefs, inputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    activeInputIndex,
    setActiveInputIndex,
    editTarjeta,
    saveTarjeta,
    onCloseClick,
}) => {
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const [data, setData] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState<any>({})
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [monto, setMonton] = useState<number>(total || 0)
    const [propina, setPropina] = useState<number>(0)
    const [totalPropina, setTotalPropina] = useState<number>(0)
    const [boucher, setBoucher] = useState<string>('')
    const [lote, setLote] = useState<string>('')
    const [tarjeta, setTarjeta] = useState<string>('')
    const [forma_pago, setForma_pago] = useState<string>('')

    const btnAgregarRef = useRef<HTMLButtonElement>(null)
    const cards = [
        { id: 1, name: 'visa', url: visa },
        { id: 2, name: 'mastercard', url: mastercard },
        { id: 3, name: 'diners', url: diners },
        { id: 4, name: 'american', url: american },
        { id: 5, name: 'discover', url: discover },
    ]
    const [n_tarjeta, setN_tarjeta] = useState<string>('')


    useEffect(() => {
        setData(items)
    }, [items])

    useEffect(() => {
        setMonton(inputValues[0])
    }, [inputValues[0]])

    useEffect(() => {
        setPropina(inputValues[1])
    }, [inputValues[1]])

    useEffect(() => {
        setN_tarjeta(inputValues[2])
    }, [inputValues[2]])

    useEffect(() => {
        setBoucher(inputValues[3])
    }, [inputValues[3]])




    useEffect(() => {
        setN_tarjeta('')
    }, [])


    useEffect(() => {
        setBoucher(inputValues[2])
    }, [inputValues[2]])

    useEffect(() => {
        setLote(inputValues[3])
    }, [inputValues[3]])

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
            Header: 'Referencia',
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
            console.log('entro edit?')
            setMonton(selectItemRow?.monto)
            setPropina(selectItemRow?.propina)
            setBoucher(selectItemRow?.numero_boucher)
            setLote(selectItemRow?.numero_lote)
            setTarjeta(selectItemRow?.nombre_adquiriente)
            setForma_pago('')
        }
    }, [isEdit, selectItemRow])



    const handlePushData = () => {
        console.log(monto)
        return
        if (isEdit) {

            updateItemTarjeta(selectItemRow?.id_factura_tarjeta, {
                monto: monto || total,
                n_tarjeta,
                numero_boucher: boucher,
                numero_lote: lote,
                nombre_adquiriente: tarjeta,
                forma_pago,
                propina: inputValues[1],
                total: totalPropina
            }).then((res: any) => {
                getTarjetas(id_order).then((res: any) => {
                    setData(res)
                })
                if (res) {
                    setIsEdit(false)
                    //clear inputs  
                    setMonton(total)
                    setN_tarjeta('')
                    setBoucher('')
                    setLote('')
                    setTarjeta('')
                    setPropina(0)

                }
            })
            return
        }
        const dataPush = {
            id_order: id_order,
            monto: monto || total,
            n_tarjeta,
            numero_boucher: boucher,
            numero_lote: lote,
            nombre_adquiriente: tarjeta,
            forma_pago,
            propina: inputValues[1],
            total: totalPropina
        }
        setData((prevData: any) => [...prevData, dataPush])
    }


    useEffect(() => {
        setTotalPropina((monto) + (propina) || 0)
    }, [monto, propina])

    useEffect(() => {
        setNewData(data)
    }, [data])

    const handleEliminaritem = () => {

        if (!selectItemRow) return
        setData((prevData: any) => prevData.filter((item: any) => item.id_factura_tarjeta !== selectItemRow?.id_factura_tarjeta))
        deleteItemTarjeta(selectItemRow?.id_factura_tarjeta).then((res: any) => {
            if (res.status) {
                getTarjetas(id_order)
            }
        }
        )
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
        if (selectItemRow) {
            setIsEdit(true)
        }

    }, [selectItemRow])
    return (
        <>
            <div className=' px-2 py-2 rounded text-whtie fs-11' >

                <TabPane tabId="2" id="product" className='text-white'>
                    <Card>
                        <CardBody className='bg-gray'>
                            <Row className=''>
                                <Row className=''>
                                    <Col lg='2 me-1 d-flex flex-column text-center '>
                                        <Label>Adquiriente</Label>
                                        <Label className='bg-dark rounded text-white p-1 text-uppercase'> {
                                            tarjeta || 'Tarjeta'
                                        }</Label>
                                    </Col>

                                    <Col lg='6' className='d-flex '>
                                        {
                                            cards.map((item, key) => (
                                                <div key={key} className='rounded my-1'>
                                                    <Button
                                                        size='sm'
                                                        color='light'
                                                        className="px-2 mx-1 border-1  rounded text-dark"
                                                        onClick={() => setTarjeta(item?.name)}
                                                    >
                                                        <img src={item.url} alt="" width={43} height={43} />
                                                    </Button>
                                                </div>
                                            ))
                                        }
                                    </Col>
                                    <Col >

                                        <div className='float-end'>
                                            <Label className='bg-black p-2 rounded fs-15 '
                                                style={{ color: 'red ' }}
                                            >Total Propina: ${(totalPropina) || 0}</Label>

                                        </div>
                                    </Col>

                                </Row>


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
                    </Card>
                    <Row className='my-3 fondo-sistema bg-danger p-1 border rounded border-secondary shadow-lg'>

                        <Col lg='8'>
                            <div className='d-flex my-2'>
                                <Button className='w-75 fs-12 rounded-0'
                                    color='light'
                                    onClick={handleEliminaritem}
                                >Eliminar</Button>

                                <Button className='w-75 ms-1 fs-12 rounded-0'
                                    innerRef={btnAgregarRef}
                                    color='light'
                                    onClick={handlePushData}
                                    onKeyDown={
                                        (e) => {
                                            if (e.key === 'Enter') {
                                                handlePushData
                                            }
                                        }
                                    }
                                >{!!isEdit ? 'Actualizar' : 'Agregar'}   </Button>
                            </div>


                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={data || []}
                                selectItemRow={setSelectItemRow}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-11 fw-light border'
                                tbodyClass='bg-light'
                                styleHeight='130px'
                                overflowY='scroll'
                            />
                            <div className='mt-1'>
                                <BtnPosModal
                                    onAceptarClick={items.length > 0 ? editTarjeta : saveTarjeta}
                                    onCloseClick={onCloseClick}
                                />
                            </div>
                        </Col>
                        <Col lg='4' className='rounded-1 d-flex align-items-start px-0' style={{ background: '' }}>
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                heightKey='45px'
                                heightBtnDelete='50px'
                                keyboards={[
                                    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '00'
                                ]}
                            />
                            <Button
                                color='light'
                                className='fs-11 d-flex align-items-center justify-content-center '
                                style={{ width: '60px', height: '65%', marginTop: '3px', textAlign: 'center' }}
                                onClick={handleKeydown}
                            >
                                <span className=''>ENTER</span>
                            </Button>
                        </Col>

                    </Row>

                </TabPane>
            </div >

        </>
    )
}

export default TabPaneTarjeta