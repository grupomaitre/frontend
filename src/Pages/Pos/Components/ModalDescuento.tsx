import { createRef, FC, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { addNewDescuento } from '../../../slices/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import NumericKeyboard from '../common/NumericKeyboardProps'
import { IrefInput } from '../ComponentsNew/ComponetsMenuPos/Interface/InterMudarItem'
import { keyNumeris } from '../common/Keys'
import InputKeyBoard from '../ComponentsNew/Cards/CardOrders/InputKeyBoard'
import CardHeaderModal from '../../../common/CardHeaderModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
const ModalDescuento: FC<IProps> = ({
    show,
    onCloseClick,
    item
}) => {
    const producto = JSON.parse(localStorage.getItem('itemCart') || '')
    const dispatch = useDispatch()
    const [seleccionado, setSeleccionado] = useState({ porcentaje: true, valor: false });
    const [textRadio, setTextRadio] = useState('porcentaje')
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const uiID = cart.find((x: any) => x.uuid_detalle === producto.uuid_detalle);
    const totalDesc = (uiID?.cantidad * uiID?.precio)

    const handleApiDescuento = async () => {
        if (textRadio === 'porcentaje') {
            const desc = Math.round((totalDesc * parseFloat(inputValues[0]) / 100) * 100) / 100
            dispatch(addNewDescuento({ item: uiID, descuento: desc, tipodescuento: textRadio }))
            onCloseClick()
            return
        }
        if (textRadio === 'valor') {
            dispatch(addNewDescuento({ item: producto, descuento: parseFloat(inputValues[0]), tipodescuento: textRadio }))
            onCloseClick()
            return
        }
    }
    const handleRadioClick = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setTextRadio(e.target.value)
        if (name === 'radio1') {
            if (value === 'porcentaje') {
                setSeleccionado({ porcentaje: true, valor: false });
                setInputValues([''])
            } else if (value === 'valor') {
                setSeleccionado({ porcentaje: false, valor: true });
                setInputValues([''])

            }
        }
    };
    //teclado 

    const [inputValues, setInputValues] = useState<Array<string>>(['']);
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
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
    const handleDelete = () => {
        setInputValues([''])
        inputRefs.current[0].current?.focus()
        return

    }
    //end teclado
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100);
    }, [])
    useEffect(() => {
        if ((inputValues[0].length) > 3) {
            inputRefs.current[0].current?.focus()
            setInputValues([''])
        }
    }, [inputValues[0]])
    return (
        <Modal isOpen={show} toggle={onCloseClick} fade={false} backdrop={'static'} style={{ maxWidth: '350px' }}>
            <CardHeaderModal
                text={item?.nombre}
                onCloseClick={onCloseClick}
                classHeader='p-2 rounded-top text-capitalize'
            />
            <ModalBody className='shadow-modal rounded fs-11 p-0'
                style={{ background: '#d6d9df' }}
            >
                <Card className='mb-0 rounded-top-0'>
                    <CardHeader>
                        <Row className=' mb-3'>
                            <Col lg='6' className='d-flex align-items-center flex-column'>
                                <Label name="radio1" className='fs-12' htmlFor='porCen'>Porcentaje</Label>
                                <Input
                                    id='porCen'
                                    type='radio'
                                    name="radio1"
                                    value="porcentaje"
                                    className='fs-3'
                                    checked={seleccionado?.porcentaje}
                                    onChange={handleRadioClick}
                                />
                            </Col>
                            <Col lg='6' className='d-flex align-items-center flex-column'>
                                <Label className='fs-12' htmlFor='valor' >Valor</Label>
                                <Input
                                    id='valor'
                                    type='radio'
                                    name="radio1"
                                    value="valor"
                                    className='fs-3'
                                    checked={seleccionado?.valor}
                                    onChange={handleRadioClick}
                                />
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row className='mb-3 d-flex align-items-center' >
                            <span className='mb-1 text-capitalize fs-12 text-center'>Ingrese {textRadio || "porcentaje"} Descuento</span>
                            <Col>

                                <InputKeyBoard
                                    inputRef={inputRefs.current[0]}
                                    value={inputValues[0]}
                                    onChange={(event) => handleInputChange(event, 0)}
                                    handleInputClick={() => handleInputClick(0)}
                                    classInput='text-center border-sistema shadow text-uppercase'
                                    bsSize='sm'
                                    styleInput={{ fontSize: '1.2rem' }}
                                    type='text'
                                    handleInputFocus={() => handleInputFocus(0)}
                                />
                            </Col>

                        </Row>
                        <div className='d-flex justify-content-center'>
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                btnClass='rounded'
                                widthBorrar={'98%'}
                                widthKey='80px'
                                heightKey='60px'
                                heightBtnDelete='60px'
                                keyboards={keyNumeris}
                            />

                        </div>

                    </CardBody>
                    <CardFooter>
                        <Row className=''>
                            <Col lg='6' >
                                <Button
                                    disabled={inputValues[0].length > 0 ? false : true}
                                    block
                                    color='primary'
                                    size='lg'
                                    onClick={() => handleApiDescuento()}
                                >
                                    {'Aceptar'}
                                </Button>
                            </Col>

                            <Col>
                                <Button
                                    onClick={onCloseClick}
                                    block
                                    color='danger'
                                    size='lg'
                                >
                                    {'Cancelar'}
                                </Button>

                            </Col>
                        </Row>
                    </CardFooter>
                </Card>



            </ModalBody>

        </Modal>
    )
}

export default ModalDescuento