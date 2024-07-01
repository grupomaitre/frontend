import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Input, Label } from 'reactstrap'
import Select from 'react-select'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalTMagnetica: React.FC<IProps> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} onClose={onCloseClick} size='lg' backdrop={'static'}>
            <ModalHeader>
                {'T. Magnetica'}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col lg='8'>
                        <Row className='mb-2'>
                            <Col lg='2'>
                                Código
                            </Col>
                            <Col lg='7'>
                                <Input type="text" />
                            </Col>
                            <Col>
                                <Button block color="primary">Buscar</Button>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <Input type='text' placeholder='Buscar' />

                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='3'>
                                Ruc/Cédula
                            </Col>
                            <Col>
                                <Input type='text' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='3'>
                                Empresa/Persona
                            </Col>
                            <Col>
                                <Input type='text' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='3'>
                                Telefono
                            </Col>
                            <Col>
                                <Input type='text' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='3'>
                                Dirección
                            </Col>
                            <Col>
                                <Input type='text' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col lg='3'>
                                Email
                            </Col>
                            <Col>
                                <Input type='text' />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>Relacionista</Col>
                            <Col>
                                <Select />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>Tipo de precio</Col>
                            <Col>
                                <Select />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>Descuento</Col>
                            <Col>
                                <Select />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                <Label className="form-check-label" for="formCheck1">
                                    Anticipo
                                </Label>
                            </Col>
                        </Row>

                    </Col>
                    <Col className=''>
                        <Row className='mb-5'>
                            <Col>
                                <Button outline block color="primary" className='mb-2'>Guardar</Button>
                                <Button outline block color="primary">Pedido</Button>

                            </Col>
                        </Row>
                        <Row>
                            <Select />
                            <div className='d-flex justify-content-around'>
                                <Label>Hombre</Label>
                                <Label>Mujeres</Label>

                            </div>
                        </Row>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={onCloseClick}>
                    {'Cerrar'}
                </Button>
            </ModalFooter>
        </Modal>

    )
}

export default ModalTMagnetica