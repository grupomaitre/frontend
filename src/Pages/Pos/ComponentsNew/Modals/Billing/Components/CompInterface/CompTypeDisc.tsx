import { FC, useState } from 'react'
import { Row, Col, Card, CardBody, Label, Button, CardHeader } from 'reactstrap'
import ModalTypeDisc from '../Modals/ModalTypeDisc'
import { ArrowDown } from 'react-feather'
import ModalConfirmacion from './Components/ModalConfirmacion'
interface CompTypeDiscProps {
    total: number
}
const CompTypeDisc: FC<CompTypeDiscProps> = ({ total }) => {
    const [showModalTypeDisc, setShowModalTypeDisc] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const onConfirm = () => {
        if (isConfirm) {
            setIsConfirm(false)
        } else {
            setIsConfirm(true)
            setShowModalConfirm(false)
        }
    }
    return (
        <>
            {showModalTypeDisc &&
                <ModalTypeDisc
                    show={showModalTypeDisc}
                    onCloseClick={() => setShowModalTypeDisc(false)}
                    total={total}
                />}
            {showModalConfirm &&
                <ModalConfirmacion
                    show={showModalConfirm}
                    onCloseClick={() => setShowModalConfirm(false)}
                    confirmar={onConfirm}
                />}
            <Row className='mt-2'>
                <Col lg=''>

                    <Label className='fs-13'>Tipo de Descuento</Label>
                    <Row className=' align-items-center'>
                        <Col lg=''>
                            <Button block color='warning' className=" border" onClick={() => setShowModalTypeDisc(true)}>
                                <span className='text-uppercase  fs-11 fw-semi-bold'> {'Dar Descuento'}</span>
                            </Button>



                        </Col>
                        <Col lg='3'>
                            <Button block color='warning' size='' className='' onClick={() => setShowModalConfirm(true)}>
                                <ArrowDown size={20} />
                            </Button>

                        </Col>


                    </Row>
                    {isConfirm && <Row className='mt-3'>
                        <Col lg='6'>
                            <Button color='light' className=''>
                                <span className='text-uppercase'> {'Quitar Iva '}</span>
                            </Button>
                        </Col>
                        <Col lg='6'>
                            <Button block color='light' className='' >
                                <span className='text-uppercase'>Quitar Servicio </span><br />
                            </Button>
                        </Col>
                    </Row>}
                </Col>
            </Row>
        </>
    )
}

export default CompTypeDisc