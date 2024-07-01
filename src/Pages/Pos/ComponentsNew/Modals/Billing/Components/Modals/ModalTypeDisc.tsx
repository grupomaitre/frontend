import { FC, createRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Label, Input, Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap'
import BtnPosModal from '../../../../../../../Components/Common/Buttons/BtnPosModal'
import { addCartDescAll2 } from '../../../../../../../slices/Cart/cartSlice'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import { IrefInput } from '../../../../ComponetsMenuPos/Interface/InterMudarItem'
import InputKeyBoard from '../../../../Cards/CardOrders/InputKeyBoard'
import { totalCart } from '../../../../../Func/FuncCart'
interface ModalTypeDiscProps {
    show: boolean
    onCloseClick: () => void
    total?: number
}
const ModalTypeDisc: FC<ModalTypeDiscProps> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const [activeItem, setActiveItem] = useState(null)
    const itemDisc = [
        { id: 1, name: 'Consumo Administrador', icon: 'ri-reply-fill', valor: 100 },
        { id: 2, name: 'Cortesia', icon: 'ri-share-forward-fill', valor: 100 },
        { id: 3, name: 'Consumo Personal', icon: 'ri-share-forward-fill', valor: 50 },
        { id: 4, name: 'Promocion Diners', icon: 'ri-share-forward-fill', valor: 50 },
        { id: 5, name: 'Promocion produbanco', icon: 'ri-share-forward-fill', valor: 25 },
    ]

    const handleClick = (item: any) => {
        setActiveItem(item.id)
        setInputValues([item?.valor])
    }


    const [seleccionado, setSeleccionado] = useState({ porcentaje: true, valor: false });
    const [textRadio, setTextRadio] = useState('porcentaje')
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const total = totalCart()
    const handleApiDescuento = async () => {
        console.log(typeof parseFloat(inputValues[0]))
        if (textRadio === 'porcentaje') {
            console.log('porcentaje??')

            dispatch(addCartDescAll2({ items: cart, descuento: inputValues[0], tipodescuento: textRadio }))
            return
        }
        if (textRadio === 'valor') {
            const input = parseFloat(inputValues[0])
            //   const res = Math.round((input / total * 100) * 100) / 100
            const res = (input / total * 100)
            console.log(res)
            dispatch(addCartDescAll2({ items: cart, descuento: res, tipodescuento: textRadio }))
            return

        }
    }
    const handleRemoveDisc = () => {
        dispatch(addCartDescAll2({ items: cart, descuento: 0, tipodescuento: textRadio }))
        setInputValues(['']);
        inputRefs.current[0].current?.focus()


    }
    const handleRadioClick = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setTextRadio(e.target.value)
        if (name === 'radio1') {
            if (value === 'porcentaje') {
                setSeleccionado({ porcentaje: true, valor: false });
                //  setInputDescuento(0)
            } else if (value === 'valor') {
                setSeleccionado({ porcentaje: false, valor: true });
                // setInputDescuento(0)

            }
        }
    };
    //keyboard
    const [inputValues, setInputValues] = useState<Array<string | number | any>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleDelete = () => {
        setInputValues(['']);
        inputRefs.current[0].current?.focus()

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
            inputRefs.current[0].current?.select()
        }, 100);
    }, [show])
    const totalFinal = totalCart()
    return (
        <Modal isOpen={show} size='lg' centered backdrop={false} fade={false}  >
            <ModalHeader toggle={onCloseClick} className='m-0 p-0 px-3'>Tipo de Descuento</ModalHeader>
            <ModalBody className='fondo-sistema' >

                <Card>
                    <CardBody className='bg-gray'>
                        <Row>
                            <Col lg=''>
                                <Card>
                                    <CardHeader className='text-white bg-primary'>
                                        {'Total: $'}{totalFinal}
                                    </CardHeader>
                                    <CardBody>

                                        <ListGroup className='p-2 shadow'>
                                            {
                                                itemDisc.map((item) => (
                                                    <ListGroupItem
                                                        tag='button'
                                                        color='light'
                                                        className="list-group-item-action fs-11" key={item.id}
                                                        onClick={() => handleClick(item)}
                                                        active={activeItem === item.id}
                                                    >
                                                        {item.name}-%{item.valor}
                                                    </ListGroupItem>
                                                ))
                                            }
                                        </ListGroup>

                                    </CardBody>
                                    <CardFooter>
                                        <Row className='mb-2'>
                                            <Col className=''>
                                                <Label> Observación</Label>
                                                <Input type='text'
                                                    className='rounded-0'
                                                />
                                            </Col>
                                        </Row>
                                        <Row className=''>
                                            <Col>
                                                <Button
                                                    onClick={() => handleApiDescuento()}
                                                    className='shadow'
                                                    block
                                                    color='warning'
                                                    style={{ height: '80px', fontWeight: '600' }}>
                                                    Todos los items
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button
                                                    onClick={() => handleRemoveDisc()}
                                                    className='shadow'
                                                    block
                                                    color='danger'
                                                    outline
                                                    style={{ height: '80px' }}>Quitar A Todos</Button>
                                            </Col>
                                        </Row>
                                    </CardFooter>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardBody className='fs-16'>
                                        <Row className=' ms-5 '>
                                            <Col>
                                                <Label name="radio1" >Porcentaje</Label>
                                                <Input
                                                    type='radio'
                                                    name="radio1"
                                                    className="form-check-input"
                                                    value="porcentaje"
                                                    checked={seleccionado.porcentaje}
                                                    onChange={handleRadioClick}
                                                />
                                            </Col>
                                            <Col>
                                                <Label>Valor</Label>
                                                <Input
                                                    type='radio'
                                                    name="radio1"
                                                    value="valor"
                                                    checked={seleccionado.valor}
                                                    onChange={handleRadioClick}
                                                />
                                            </Col>
                                        </Row>
                                        <div className="rounded input-group my-3 shadow">
                                            <InputKeyBoard
                                                inputRef={inputRefs.current[0]}
                                                value={inputValues[0]}
                                                onChange={(event) => handleInputChange(event, 0)}
                                                handleInputClick={() => handleInputClick(0)}
                                                classInput='text-center  fs-18 form-control '
                                                type='text'
                                                handleInputFocus={() => handleInputFocus(0)}
                                                bsSize='sm'
                                            />

                                            <span className="input-group-text">%</span>
                                        </div>
                                        <Row>
                                            <Col lg='' className=''>
                                                <NumericKeyboard
                                                    handleDelete={() => handleDelete()}
                                                    onKeyPress={(e) => onKeyPress(e)}
                                                    btnClass={'shadow rounded'}
                                                    widthKey='80px'
                                                    heightKey='70px'
                                                    fontSizeKey='1.55rem'
                                                    heightBtnDelete='70px'
                                                    fondoKey='#e6ecec'
                                                    colorKeys='#13284e'
                                                    widthBorrar='80px'
                                                    gridColumn='span 1'
                                                    sizeBorrar={'0.9rem'}
                                                    bgDelete={'#ff0000'}
                                                    colorDelete={'#fff'}
                                                    keyboards={[
                                                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </CardBody>
                    <CardFooter>
                        <BtnPosModal
                            textCancelar='Regresar'
                            onAceptarClick={onCloseClick}
                            onCloseClick={onCloseClick}
                            vertical={true}
                            divClass='d-flex justify-content-center align-items-center h-100'
                        />
                    </CardFooter>
                </Card>
            </ModalBody>
        </Modal >
    )
}

export default ModalTypeDisc