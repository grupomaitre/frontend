import { memo, FC } from 'react'
import { Button, Col, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { Save } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import BtnPlusMinus from '../Buttons/BtnPlusMinus'
import BtnTrashCart from '../Buttons/BtnTrashCart'
import { remove } from '../../../../slices/Cart/cartSlice'
interface IModalCart {
    show: any
    onCloseClick: any
    item: any
}

const ModalCart: FC<IModalCart> = ({ show, onCloseClick, item }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const filteredProduct = cart.filter((product: any) => product.id_product === item.id_product);
    const totalQuantity = filteredProduct.map((product: any) => parseFloat(product.cantidad.toFixed(2)))
        .reduce((acc: any, quantity: number) => acc + quantity, 0);

    const handleRemove = () => {
        dispatch(remove(item))
        onCloseClick()
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} className="modal-cart">
            <ModalHeader className='border-dark py-3 border-bottom' toggle={onCloseClick}>
                <span className='bg-black text-warning p-2 rounded px-4 text-capitalize'>{item.nombre} </span>
            </ModalHeader>
            <ModalBody>

                <Row>
                    <h1>Cantidad:  # {totalQuantity}</h1>
                    <Col lg='6'>
                        <BtnPlusMinus
                            item={item}
                            cart={cart}
                            activeBtnPlus={false}
                        />
                    </Col>
                    <Col lg='6'>
                        <BtnTrashCart
                            handleRemove={() => handleRemove()}
                        />
                    </Col>

                </Row>
                <Row className='mt-3'>
                    <Col lg='12'>
                        <h4>Referencias</h4>
                        <Input type='textarea' style={{ maxHeight: '100px', minHeight: '100px' }} />

                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onCloseClick}>
                    <Save />
                    Guardar</Button>
                <Button color="light" onClick={onCloseClick}>Cerrar</Button>{' '}
            </ModalFooter>
        </Modal>
    )
}

export default memo(ModalCart)