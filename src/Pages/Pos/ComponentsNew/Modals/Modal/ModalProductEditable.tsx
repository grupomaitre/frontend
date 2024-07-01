import { FC, useRef, useState } from 'react'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: IProducts
}
import { useDispatch } from 'react-redux'
import { Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { IProducts } from '../../../Interfaces/InterfaceGroups'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import { addCart } from '../../../../../slices/Cart/cartSlice'
const ModalProductEditable: FC<IProps> = ({
    show, onCloseClick, item
}) => {
    const inputPrecioRef = useRef<HTMLInputElement>(null)
    const inputDetalleRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const [precio, setPrecio] = useState<number>(0)
    const [detalle, setDetalle] = useState<string>('')
    const handleAddCart = () => {
        const newItem = {
            ...item,
            nombre: detalle || item.nombre,
            cantidad: 1,
            precio: precio / 1.15 || item.precio
        };
        const res: any = dispatch(addCart(newItem))
        if (res.payload.cantidad > 0) {
            onCloseClick()
        }
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered size='sm'>
            <ModalHeader toggle={onCloseClick} className='bg-primary  p-0 px-3 py-1'>
                <Label className='text-white'>{item?.nombre}</Label>
            </ModalHeader>
            <ModalBody>
                <Card className='mb-0'>

                    <CardBody className=''>
                        <Row>
                            <Col>
                                <Label className='fs-13'>{'Precio Incluido el 15%'}</Label>
                                <Input
                                    innerRef={inputPrecioRef}
                                    bsSize='sm'
                                    type='number'
                                    className='border-black'
                                    onChange={(e) => setPrecio(parseFloat(e.target.value))}
                                    onKeyDown={(e) => e.key === 'Enter' && inputDetalleRef.current?.focus()}
                                />
                            </Col>
                        </Row>
                        <Label className='fs-13'>Ingrese Detalle del Item</Label>
                        <Input
                            innerRef={inputDetalleRef}
                            bsSize='sm'
                            className='border-black'
                            onChange={(e) => setDetalle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCart()}
                        />
                    </CardBody>
                </Card>

            </ModalBody>

            <ModalFooter className=''>
                <BtnPosModal
                    onAceptarClick={handleAddCart}
                    onCloseClick={onCloseClick}
                    divClass={'justify-content-between gap-3 w-100'}
                />
            </ModalFooter>
        </Modal>
    )
}

export default ModalProductEditable