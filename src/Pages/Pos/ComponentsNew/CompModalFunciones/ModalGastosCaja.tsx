import { FC, createRef, useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Row, Label, Button, Col, Card, CardBody, CardHeader, CardFooter } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import SelectCommon from '../../common/SelectCommon'
import { IrefInput } from '../ComponetsMenuPos/Interface/InterMudarItem'
import { ObjectNavItem } from '../Modals/Billing/Components/CompModalCobrar/interface/IPropsNavs'
import { BookOpen, DollarSign } from 'react-feather'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import CompContentDocs from '../Modals/Billing/Components/CompModalCobrar/CompContentDocs'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { SwalError } from '../../../../Components/Common/Swals/SwalsApi'
import axios from 'axios'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalGastosCaja: FC<IProps> = ({ show, onCloseClick }) => {
    const currentDate = new Date();
    const [data, setData] = useState([])
    const [selectForma, setSelectedOpForma] = useState<any>(null);
    const [opForma, setOpForma] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState('')
    const [labelForma, setLabelForma] = useState('')

    //get movimiento 
    const getMovimientoCaja = async () => {
        try {
            const res: any = await axios.get('/api/v1/list/movimiento/caja')
            if (res?.status === 'success') {
                return setData(res?.data)
            }
        } catch (error) {
            return SwalError({ title: error })
        }
    }

    useEffect(() => {
        getMovimientoCaja()
    }, [])

    useEffect(() => {
        setOpForma([
            {
                value: 'egreso',
                label: 'Egreso'
            },
            {
                value: 'ingreso',
                label: 'Ingresos'
            }
        ])
    }, [show])


    //keyboard
    const [inputValues, setInputValues] = useState<Array<string | number | any>>(['', '', '', '', '']);
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

    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }
    //end keyboard
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100);
    }, [show])

    const [btnDisabledEfe, setBtnDisabledEfe] = useState(true)
    const [btnDisabledChq, setBtnDisabledChq] = useState(true)
    const closeModals = () => {
        onCloseClick()
    }

    const TabNavItem: ObjectNavItem[] = [
        {
            value: '1',
            inputName: "efectivo",
            label: 'EFECTIVO',
            function: () => {
                inputRefs.current[0].current?.focus()
                inputRefs.current[0].current?.select()

            },
            valueInput: inputValues[0],

            icon: <DollarSign size={15} className='me-1' />,
            ref: inputRefs.current[0],
            disabled: btnDisabledEfe
        },
        {
            value: '2',
            inputName: "cheque",
            label: 'CHEQUE',
            valueInput: inputValues[1],
            readonly: true,
            function: () => {
                inputRefs.current[1].current?.focus()
                inputRefs.current[1].current?.select()

            },
            icon: <BookOpen size={15} className='me-1' />,
            ref: inputRefs.current[1],
            disabled: btnDisabledChq
        }

    ]
    const toggle = (tab: any) => {
        switch (tab?.value) {
            case '1':
                setTimeout(() => {
                    inputRefs.current[0].current?.focus()
                }, 100);
                setLabelForma(tab?.label || 'efectivo')
                setBtnDisabledEfe(false)
                setBtnDisabledChq(true)

                break;
            case '2':
                setTimeout(() => {
                    inputRefs.current[1].current?.focus()
                }, 100)
                setLabelForma(tab?.label || 'cheque')
                setBtnDisabledEfe(true)
                setBtnDisabledChq(false)
                break;
            default:
                break;
        }
    }
    const columns = [
        {
            Header: "Tipo",
            accessor: "tipo"
        },
        {
            Header: "Observaciones",
            accessor: "observacion"
        },
        {
            Header: "Documento",
            accessor: "documento"
        },
        {
            Header: "Fecha",
            accessor: "fecha"
        },
        {
            Header: "Usuario",
            accessor: "user.user_name"
        },
        {
            Header: "total",
            accessor: "total"
        },

    ]

    const saveOrder = async () => {
        const user = JSON.parse(sessionStorage.getItem('authUser') || '{}')
        const idCaja = JSON.parse(localStorage.getItem('idCaja') || '')
        const data = {
            user_id: user?.id_user,
            total: !btnDisabledEfe ? inputValues[0] : inputValues[1],
            forma_pago: selectForma?.value === 'ingreso' ? 'otros ingresos en ' + labelForma : selectForma?.value,
            observacion: inputValues[4],
            id_caja: idCaja,
            documento: selectForma?.value
        }

        try {
            const res: any = await axios.post('/api/add-orders', data)
            if (res.status) {
                //  closeModals()
                getMovimientoCaja()
            }
        } catch (e) {
            SwalError({ title: e, text: 'Error al guardar' })
        }
    }

    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg' className='mt-1'>
            <ModalHeader toggle={onCloseClick}>

            </ModalHeader>
            <ModalBody>
                <Card>
                    <CardHeader className='bg-black'>
                        <div className='rounded  text-center text-white d-flex flex-row justify-content-between'>
                            <Label className='text-info'> Movimiento Caja</Label>
                            <Label className='text-danger'>CJ: CAJA FACTURACION :  {currentDate.toISOString().slice(0, 10)}   </Label>
                        </div>
                    </CardHeader>
                    <CardBody>

                        <Row className='mb-1'>
                            <SelectCommon
                                value={selectForma}
                                setSelectedOption={setSelectedOpForma}
                                options={opForma}
                                isClearable={true}
                                fontSize='20px'
                                height={'45px'}
                            />
                        </Row>

                        <Row className=''>
                            <Col lg='8'>
                                <Card>
                                    <CardBody>
                                        {TabNavItem.map((item, key: number) => (
                                            <div key={key} className='d-flex flex-row justify-content-rounded '>
                                                <Button
                                                    className='mb-1'
                                                    style={{
                                                        background: '#ff3012',
                                                        width: '60%',
                                                        fontSize: '0.8rem',
                                                        cursor: "pointer", textAlign: 'center', color: '#fff', borderRadius: '5px', height: '50px'
                                                    }}


                                                    onClick={() => { toggle(item) }} >
                                                    {item.icon && item.icon}
                                                    {item.label}
                                                </Button>

                                                <div className=" d-flex flex-row ms-2">
                                                    <InputKeyBoard
                                                        inputRef={item.ref}
                                                        value={item.valueInput}
                                                        onChange={(event) => handleInputChange(event, key)}
                                                        handleInputClick={() => handleInputClick(key)}
                                                        handleKeydown={() => console.log('')}
                                                        classInput='text-center  fs-15 '
                                                        styleInput={{ height: '42px' }}
                                                        type='text'
                                                        handleInputFocus={() => handleInputFocus(key)}
                                                        bsSize='sm'
                                                        disabled={item.disabled}
                                                    />


                                                </div>
                                            </div>
                                        ))}
                                        {!btnDisabledChq &&
                                            <Row className='my-2'>
                                                <Col lg=''>
                                                    <Label>N° Cheque</Label>
                                                </Col>
                                                <Col>
                                                    <InputKeyBoard
                                                        inputRef={inputRefs.current[3]}
                                                        value={inputValues[3]}
                                                        onChange={(event) => handleInputChange(event, 3)}
                                                        handleInputClick={() => handleInputClick(3)}
                                                        //handleKeydown={handleKeydown}
                                                        classInput='text-center  fs-15 '
                                                        styleInput={{ height: '42px', maxHeight: '50px' }}
                                                        type='text'
                                                        handleInputFocus={() => handleInputFocus(3)}
                                                    />

                                                </Col>
                                            </Row>}
                                        <Row>
                                            <Col className=''>
                                                <Label>Observación</Label>

                                            </Col>
                                            <Col>
                                                <InputKeyBoard
                                                    inputRef={inputRefs.current[4]}
                                                    value={inputValues[4]}
                                                    onChange={(event) => handleInputChange(event, 4)}
                                                    handleInputClick={() => handleInputClick(4)}
                                                    classInput='fs-15 '
                                                    styleInput={{ height: '50px' }}
                                                    type='textarea'
                                                    handleInputFocus={() => handleInputFocus(4)}
                                                    bsSize='sm'
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col  >

                                <CompContentDocs
                                    activeTab='1'
                                    onKeyPress={onKeyPress}
                                    handleDelete={() => handleDelete()}
                                />
                            </Col>
                        </Row>

                        <Row >
                            <Col lg='8'>
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
                                    tbodyClass='bg-gray'
                                    styleHeight='100px'
                                    overflowY='scroll'
                                />
                            </Col>
                            <Col className=''>
                                <BtnPosModal
                                    text='Guardar'
                                    textCancelar='Cerrar'
                                    onAceptarClick={saveOrder}
                                    onCloseClick={onCloseClick}
                                    divClass={'flex-column'}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter className='text-danger d-flex bg-black'>
                        <Label>Total Ingreso: 0</Label>
                        <Label className=''>Total Egreso: 0</Label>
                    </CardFooter>

                </Card>

            </ModalBody>

        </Modal>
    )
}

export default ModalGastosCaja