import { FC } from 'react'
import { ArrowRight, Book, CreditCard, DollarSign } from 'react-feather'
import { Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import { saveOrderFormPay } from '../Api/ApiSaveDocs'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    getData: () => void

}
const TarjetaEfectivo: FC<IProps> = ({ show, onCloseClick, item, getData }) => {
    const handleSave = async () => {
        const data = {
            forma_pago: 'Efectivo',

        }
        const res: any = await saveOrderFormPay(item?.factura, data)
        if (res) {
            console.log(res)
            getData()
            onCloseClick()
        }
    }
    return (
        <Modal isOpen={show}
            toggle={onCloseClick}
            size='md'
        >
            <ModalHeader toggle={onCloseClick}>
                Tarjeta a  Efectivo
            </ModalHeader>
            <ModalBody className='bg-gray rounded'>

                <Row className='d-flex align-items-center'>
                    <Col lg='5'>
                        <Card>
                            <CardHeader className='p-0 px-1 bg-primary text-white'>
                                Tarjeta
                            </CardHeader>
                            <CardBody className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                <CreditCard
                                    size={100}
                                    color='#0076ee'
                                />

                                <Input
                                    className='text-center bg-gray mb-4'
                                    value={item?.total || 0}
                                    readOnly
                                />
                                <div className='bg-black py-2 w-100 text-center'>
                                    <span className='text-warning'> TRANSFERIR</span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <ArrowRight
                            size={55}
                        />
                    </Col>
                    <Col lg='5' className='text-center ' style={{ height: '315px' }}>
                        <Card>
                            <CardHeader className='p-0 px-1 bg-primary text-white'>
                                Efectivo
                            </CardHeader>
                            <CardBody>
                                <DollarSign
                                    size={78}
                                    color='green'
                                    className='mb-4'
                                />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>

                <BtnPosModal
                    onAceptarClick={handleSave}
                    onCloseClick={onCloseClick}
                />

            </ModalBody>
        </Modal>
    )
}

export default TarjetaEfectivo