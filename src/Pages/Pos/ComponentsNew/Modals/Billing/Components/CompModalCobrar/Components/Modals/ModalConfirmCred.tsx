import { FC, useState } from 'react'
import { Button, Col, Modal, ModalBody, Row } from 'reactstrap'
import HeaderModal from '../../../../../../../../../common/Generics/Modal/CompontenHeader/HeaderModal'
import { Info } from 'react-feather'
import ModalAlert from '../../../../../../../../../common/Generics/Modal/ModalAlert'
import { useSelector } from 'react-redux'
import ModalDateCredit from './ModalDateCredit'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalConfirmCred: FC<IProps> = ({ show, onCloseClick }) => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const totalCart = cart.reduce((acc: any, el: any) => acc + (el.cantidad * el.precio_final), 0)

    const [showModalAlert, setModalAlert] = useState(false)
    const [showDateCredit, setshowDateCredit] = useState(false)
    const handleSinAbono = () => {
        if (totalCart === 0) {
            setModalAlert(true)
        } else {
            console.log('funcion sin abono')
            onCloseClick()
        }
    }
    const handleConAbono = () => {
        if (totalCart === 0) {
            setModalAlert(true)

        } else {
            setshowDateCredit(true)
            //  onCloseClick()
        }
    }
    const handleCloseModals = () => {
        setModalAlert(true)
        onCloseClick()
    }
    return (
        <>
            {
                showModalAlert &&
                <ModalAlert
                    onAceptar={() => handleCloseModals()}
                    onCancelar={() => handleCloseModals()}
                    onCloseClick={() => handleCloseModals()}
                    show={showModalAlert}
                    showAceptar={true}
                    showCancelar={true}
                    text='No se puede dar cretido aun comprobante en 0'
                    textFs='15'
                />
            }


            {
                showDateCredit &&
                <ModalDateCredit
                    show={showDateCredit}
                    onCloseClick={() => setshowDateCredit(false)}
                />

            }

            <Modal isOpen={show} toggle={onCloseClick} centered size='sm' backdrop={false} fade={false}>
                <HeaderModal
                    textHeader='Mensaje'
                />
                <ModalBody className='rounded' style={{ background: '#d6d9df' }}>
                    <Row className='mb-3 d-flex align-items-center' >
                        <Col lg='3'>
                            <Info
                                size={50}
                                fill='#416abb'
                                color='white'
                                className='shadow-icon rounded-pill'
                            />

                        </Col>
                        <Col>
                            <span className='ms-4 fs-11'>
                                {'Enviar Comprobante a Crédito'}
                            </span>

                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Button size='sm' className='fs-11' color='light'
                                onClick={() => handleSinAbono()}
                            >Sin Abono</Button>
                        </Col>
                        <Col>
                            <Button size='sm' className='fs-11' color='light'
                                onClick={() => handleConAbono()}
                            >Con Abono</Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={() => onCloseClick()}
                                size='sm'
                                className='fs-11'
                                color='light'>Cancelar </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ModalConfirmCred