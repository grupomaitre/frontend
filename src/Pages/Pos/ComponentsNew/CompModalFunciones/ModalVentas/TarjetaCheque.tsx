import { FC, useState } from 'react'
import { CreditCard } from 'react-feather'
import { Card, CardBody, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import { saveOrderFormPay } from '../Api/ApiSaveDocs'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    getData: () => void
}
const TarjetaCheque: FC<IProps> = ({ show, onCloseClick, item, getData }) => {
    const [numeroCheque, setNumeroCheque] = useState('')
    const [banco, setBanco] = useState('')
    const [numeroCuenta, setnumeroCuenta] = useState('')
    const [nombreBeneficiario, setnombreBeneficiario] = useState('')
    const [fecha_emision, setFechaEmision] = useState<any>()
    const [fecha_cheque, setFechacheque] = useState('')
    const [estado_cheque, setEstadoCheque] = useState('')
    const [ingreso_banco, setIngresoBanco] = useState('')

    const handleSave = async () => {
        const data = {
            forma_pago: 'Cheque',
            monto: item?.total,
            numero_cheque: numeroCheque,
            banco: banco,
            numero_cuenta: numeroCuenta,
            nombre_beneficiario: nombreBeneficiario,
            fecha_mision: fecha_emision,
            fecha_cheque: fecha_cheque,
            estado_cheque: estado_cheque,
            ingreso_banco: ingreso_banco,
            id_order: item?.factura,
            id_cart: item?.orden
        }
        const res: any = await saveOrderFormPay(item?.factura, data)
        if (res) {
            getData()
            onCloseClick()
        }
    }
    return (
        <Modal isOpen={show}
            toggle={onCloseClick}
            size='lg'
        >
            <ModalHeader toggle={onCloseClick}>
                Tarjeta a Cheque
            </ModalHeader>
            <ModalBody className='bg-gray rounded'>

                <Row>
                    <Col lg='4'>
                        <Card>
                            <CardBody className='d-flex flex-column justify-content-center align-items-center gap-3'>
                                <CreditCard
                                    size={63}
                                    color='#0076ee'
                                />
                                <Input
                                    className='text-center bg-gray'
                                    value={item?.total || 0}
                                    readOnly
                                />
                                <div className='bg-black py-2 w-100 text-center'>
                                    <span className='text-warning'> TRANSFERIR</span>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg='8'>
                        <Card>
                            <CardBody className=''>
                                <div className='fs-13'>
                                    <Row className='mb-2 '>
                                        <Col lg='6 '>N° Cheque</Col>
                                        <Col lg='6 '>
                                            <Input bsSize='sm'
                                                onChange={(e) => setNumeroCheque(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col lg='6'>Banco</Col>
                                        <Col>
                                            <Select
                                                onChange={(e: any) => setBanco(e?.value)}
                                                className='border rounded'
                                                isClearable
                                                options={[
                                                    { value: 'Banco Pichincha', label: 'Banco Pichincha' },
                                                    { value: 'Produbanco', label: 'Produbanco' },
                                                    { value: 'Banco Guayaquil', label: 'Banco Guayaquil' },
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col lg='6'>Fecha de Emisión</Col>
                                        <Col>
                                            <Input bsSize='sm' type='date'
                                                onChange={(e) => setFechaEmision(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col lg='6'>Estado del Cheque</Col>
                                        <Col lg='6'>
                                            <Select
                                                onChange={(e: any) => setEstadoCheque(e?.value)}
                                                className='border rounded'
                                                isClearable
                                                options={[
                                                    { value: 'Pagado', label: 'Pagado' },
                                                    { value: 'Sin Cobrar', label: 'Sin Cobrar' },
                                                    { value: 'Pospechado', label: 'Pospechado' },
                                                ]}
                                            />
                                        </Col>
                                    </Row>
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

export default TarjetaCheque