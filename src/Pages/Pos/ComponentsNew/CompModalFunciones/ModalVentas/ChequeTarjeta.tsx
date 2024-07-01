import { FC, useState } from 'react'
import { DollarSign } from 'react-feather'
import { Button, Card, CardBody, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import visa from '../../../../../assets/images/tarjetas/visa.png'
import mastercard from '../../../../../assets/images/tarjetas/mastercard.png'
import diners from '../../../../../assets/images/tarjetas/diners.png'
import american from '../../../../../assets/images/tarjetas/american.png'
import discover from '../../../../../assets/images/tarjetas/discover.png'
import { saveOrderFormPay } from '../Api/ApiSaveDocs'
import SimpleBar from 'simplebar-react'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    getData: () => void
}
const ChequeTarjeta: FC<IProps> = ({ show, onCloseClick, item, getData }) => {
    const [tarjeta, setTarjeta] = useState<string>('')
    const [referencia, setReferencia] = useState<string>('')
    const [lote, setLote] = useState<string>('')

    const cards = [
        { id: 1, name: 'visa', url: visa },
        { id: 2, name: 'mastercard', url: mastercard },
        { id: 3, name: 'diners', url: diners },
        { id: 4, name: 'american', url: american },
        { id: 5, name: 'discover', url: discover },
    ]
    const handleSave = async () => {
        const data = {
            forma_pago: 'Tarjeta',
            monto: item?.total,
            nombre_adquiriente: tarjeta,
            propina: null,
            total: item?.total,
            numero_boucher: referencia,
            numero_lote: lote,
            id_order: item?.factura

        }
        const res: any = await saveOrderFormPay(item?.factura, data)
        console.log(res)
        if (res) {
            getData()
            onCloseClick()
        }
    }
    const handleTarjeta = (item: any) => {
        setTarjeta(item)
    }

    return (
        <Modal isOpen={show}
            toggle={onCloseClick}
            size='lg'
        >
            <ModalHeader toggle={onCloseClick}>
                Cheque a Tarjeta
            </ModalHeader>
            <ModalBody className='bg-gray rounded'>

                <Row>
                    <Col lg='4'>
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
                    <Col lg='8'>
                        <Card>
                            <CardBody className=''>
                                <div className='fs-13'>
                                    <Row className='mb-2 '>
                                        <Col lg='3'>Adquiriente</Col>
                                        <Col lg='9'>
                                            <SimpleBar style={{ maxWidth: '100%' }}>
                                                <div className='d-flex align-items-center gap-2 '>
                                                    {
                                                        cards.map((item, key) => (
                                                            <div key={key} className='rounded  border'>
                                                                <Button
                                                                    size='sm'
                                                                    color='light'
                                                                    className="shadow  rounded text-dark"
                                                                    onClick={() => handleTarjeta(item.name)}
                                                                >
                                                                    <img src={item.url} alt="" width={43} height={43} />
                                                                </Button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </SimpleBar>
                                        </Col>
                                    </Row>
                                    <Row className='mb-2 '>
                                        <Col lg='6 '>N° Tarjeta </Col>
                                        <Col lg='6 '>
                                            <Input bsSize='sm' />
                                        </Col>
                                    </Row>
                                    <Row className='mb-2'>
                                        <Col lg='6'>Forma de pago</Col>
                                        <Col>
                                            <Select
                                                className='border rounded'
                                                isClearable
                                                options={[
                                                    { value: 'Media Net', label: 'Media Net' }
                                                ]}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                        <Col lg='6'>Banco</Col>
                                        <Col>
                                            <Select
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
                                        <Col lg=''>Referencia</Col>
                                        <Col lg=''>
                                            <Input
                                                onChange={(e) => setReferencia(e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            N° Lote
                                        </Col>
                                        <Col lg=''>
                                            <Input
                                                onChange={(e) => setLote(e.target.value)}

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

export default ChequeTarjeta