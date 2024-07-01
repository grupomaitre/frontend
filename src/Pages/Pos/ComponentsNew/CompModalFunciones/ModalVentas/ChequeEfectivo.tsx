import { FC } from 'react'
import { DollarSign } from 'react-feather'
import { Card, CardBody, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import { saveOrderFormPay } from '../Api/ApiSaveDocs'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    getData: () => void
}
const ChequeEfectivo: FC<IProps> = ({ show, onCloseClick, item, getData }) => {
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
            size='sm'
        >
            <ModalHeader toggle={onCloseClick}>
                Cheque a  Efectivo
            </ModalHeader>
            <ModalBody className='bg-gray rounded'>

                <Row>
                    <Col lg=''>
                        <Card>
                            <CardBody className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                <DollarSign
                                    size={78}
                                    color='green'
                                    className='mb-4'
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

                </Row>

                <BtnPosModal
                    onAceptarClick={handleSave}
                    onCloseClick={onCloseClick}
                />

            </ModalBody>
        </Modal>
    )
}

export default ChequeEfectivo