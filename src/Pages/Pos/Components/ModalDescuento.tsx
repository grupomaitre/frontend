import { FC, useState } from 'react'
import { Check, HelpCircle, X } from 'react-feather'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { addNewDescuento } from '../../../slices/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
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

    const [inputDescuento, setInputDescuento] = useState<number>(0)
    const [seleccionado, setSeleccionado] = useState({ porcentaje: true, valor: false });
    const [textRadio, setTextRadio] = useState('porcentaje')
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const uiID = cart.find((x: any) => x.uuid_detalle === producto.uuid_detalle);
    const totalDesc = (uiID?.cantidad * uiID?.precio)

    const handleApiDescuento = async () => {
        if (textRadio === 'porcentaje') {
            const desc = Math.round((totalDesc * inputDescuento / 100) * 100) / 100
            dispatch(addNewDescuento({ item: uiID, descuento: desc, tipodescuento: textRadio }))
            onCloseClick()
            return
        }
        if (textRadio === 'valor') {
            dispatch(addNewDescuento({ item: producto, descuento: inputDescuento, tipodescuento: textRadio }))
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
                setInputDescuento(0)
            } else if (value === 'valor') {
                setSeleccionado({ porcentaje: false, valor: true });
                setInputDescuento(0)

            }
        }
    };

    return (
        <Modal isOpen={show} toggle={onCloseClick} fade={false} backdrop={false} centered size='sm'>
            <ModalHeader className='p-1 fs-11' toggle={onCloseClick}>
                <span className='fs-11 text-capitalize fw-lighter'>{'Descuento a:' + item?.nombre || null}</span>
            </ModalHeader>
            <ModalBody className='shadow-modal rounded fs-11'
                style={{ background: '#d6d9df' }}
            >
                <Row className=' ms-5'>
                    <Col>
                        <Label name="radio1">Porcentaje</Label>
                        <Input
                            type='radio'
                            name="radio1"
                            value="porcentaje"
                            checked={seleccionado?.porcentaje}
                            onChange={handleRadioClick}
                        />
                    </Col>
                    <Col>
                        <Label>Valor</Label>
                        <Input
                            type='radio'
                            name="radio1"
                            value="valor"
                            checked={seleccionado?.valor}
                            onChange={handleRadioClick}
                        />
                    </Col>
                </Row>

                <Row className='mb-3 d-flex align-items-center' >
                    <Col lg='3'>
                        <HelpCircle
                            size={50}
                            fill='#416abb'
                            color='white'
                            className='shadow-icon rounded-pill'
                        />

                    </Col>
                    <Col>

                        <span className='text-capitalize'>Ingrese {textRadio || "porcentaje"} Descuento</span>
                        <Input
                            className='rounded-0 custom-input'
                            onChange={(e) => setInputDescuento(parseFloat(e.target.value))}
                        />

                        {/*   {error && <span className='text-danger mt-1'>valor erroneo</span>} */}

                    </Col>

                </Row>
                <Row className=''>
                    <Col  >
                        <Button
                            block
                            className={'d-flex justify-content-around align-items-center  float-end border border-info rounded-pill fs-13'}
                            color='primary'
                            size=''
                            onClick={() => handleApiDescuento()}
                        >
                            <Check size={15} />
                            {'Aceptar'}
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            onClick={onCloseClick}
                            block
                            color='danger'
                            size=''
                            className='d-flex justify-content-around  align-items-center rounded-pill border border-white fs-13'
                        >
                            <X size={15} />
                            {'Cancelar'}
                        </Button>

                    </Col>
                </Row>
            </ModalBody>

        </Modal>
    )
}

export default ModalDescuento