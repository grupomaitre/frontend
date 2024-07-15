import { FC, useState } from 'react'
import { Check, X } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Label, Button, Input, Card, CardHeader, CardBody, CardFooter } from 'reactstrap'
import { totalCart } from '../../../Pages/Pos/Func/FuncCart'
import TableGeneric from '../Table/TableGeneric'

interface IProps {
    show: boolean
    onCloseClick: () => void
    itemFacturacion?: any
}
const ModalFacturacion: FC<IProps> = ({ show, onCloseClick, itemFacturacion }) => {
    const [selectItemRow, setSelectItemRow] = useState()
    const total = totalCart()
    return (
        <Modal isOpen={show} size='lg'>
            <ModalHeader toggle={onCloseClick}>
                {'Facturación'}
            </ModalHeader>
            <ModalBody className='fondo-sistema text-white fs-12'>
                <Row>
                    <Col lg='6'>
                        <Label className='text-white fs-12'>{'Clave y Autorización de pruebas'}</Label> <br />
                        <Label className='fs-12 text-info'>{'0910202101209176557000120010020000002031234567816'}</Label>
                    </Col>
                    <Col lg='6' className='text-white d-flex justify-content-between'>
                        <Label>Pruebas</Label>
                        <Label>Producción</Label>
                    </Col>
                </Row>
                <Row>
                    <Col lg='6'>
                        <Label className='text-white fs-12'>{'Clave y Autorización de pruebas'}</Label> <br />
                    </Col>
                    <Col lg='6'>
                        <Label>
                            <Button size='sm' color='light'>ver borrador</Button>
                        </Label>
                    </Col>
                </Row>
                <Row className='d-flex align-items-center'>
                    <Col lg='6'>
                        <Button size='sm' color='light'>...</Button>
                    </Col>
                    <Col>
                        <Label>{'Generar Archivo'}</Label>
                    </Col>
                    <Col>
                        <Check color='#03fe04' />
                    </Col>
                    <Col>
                        <Button size='sm' color='light'>{'Empezar'}</Button>
                    </Col>
                </Row>
                {/* info */}
                <Row className='mt-2'>
                    <Col className='' lg='6'>
                        <Card className='border-primary'>
                            <CardHeader className='bg-black  border-primary'>
                                <Row className=''>
                                    <Col>
                                        <h6 className='text-info fs-12'>Factura 001 - 002</h6>
                                        <h4 className='text-white'>N°:00000435</h4>
                                    </Col>
                                    <Col className='text-end'>
                                        <h6 className='text-info'>{'Total'}</h6>
                                        <h4 style={{ color: '#ff0000' }}>{total}</h4>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody className='fondo-sistema text-white'>
                                <Row>
                                    <Col>
                                        <Label>{'Cliente:Consumidor final'}</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Nombre Comercial</Label>
                                    </Col>
                                    <Col>
                                        <Label>
                                            <Input className='custom-input' />
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Teléfono</Label>
                                    </Col>
                                    <Col>
                                        <Label>
                                            <Input className='custom-input' />
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Dirección</Label>
                                    </Col>
                                    <Col>
                                        <Label>
                                            <Input className='custom-input' />
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Correo Electrónico</Label>
                                    </Col>
                                    <Col>
                                        <Label>
                                            <Input className='custom-input' />
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='2'>
                                        <Button size='sm' color='light'>
                                            {'xml'}
                                        </Button>
                                    </Col>
                                    <Col lg='4'>
                                        <Label>Con Copia a</Label>
                                    </Col>
                                    <Col>
                                        <Label>
                                            <Input className='custom-input' />
                                        </Label>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <TableGeneric
                                    showFilter={false}
                                    showFooter={false}
                                    columns={[
                                        {
                                            Header: 'Correo Electrónico',
                                            accessor: 'id_caja_diaria',
                                        },
                                        {
                                            Header: 'Enviar',
                                            accessor: 'correo',
                                        }
                                    ]}
                                    data={[]}
                                    selectItemRow={setSelectItemRow}
                                    divClass='table-responsive text-black bg-table'
                                    tableClass='cursor-pointer w-100'
                                    theadClass='position-sticky top-0 bg-table '
                                    thClass='fs-11 fw-light border'
                                    tbodyClass='bg-light'
                                    styleHeight='50px'
                                    overflowY='scroll'
                                />
                            </CardFooter>
                        </Card>
                        <Row>
                            <Col>

                            </Col>
                        </Row>
                    </Col>
                    <Col lg='6' className='d-flex flex-column justify-content-between my-4'>
                        <div>
                            <Row>
                                <Col>
                                    <Label>{'Firmado Archivo'}</Label>
                                </Col>
                                <Col>
                                    <X color='#ff0000' />
                                </Col>
                                <Col >
                                    <Button size='sm' color='light'> {'Firmar'}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>{'Enviado Archivo'}</Label>
                                </Col>
                                <Col lg='8'>
                                    <Check color='#03fe04' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>{'Estado'}</Label>
                                </Col>
                                <Col lg='8'>
                                    <Check color='#03fe04' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label>{'Enviado Correo ride'}</Label>
                                </Col>
                                <Col lg='8'>
                                    <Check color='#03fe04' />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row>
                                <Col>
                                    <Label className='text-warning'>{'sin@correo.com'}@</Label>
                                </Col>
                                <Col>
                                    <Input type='checkbox' />
                                    <Label> {' '}Adjuntar Archivo XML</Label>
                                </Col>
                            </Row>
                            <Row>
                                <div className='bg-black text-center py-4'>
                                    <Label className=''>Correo Activo:</Label>
                                </div>
                            </Row>
                        </div>
                    </Col>
                </Row>
                {/* table */}
                <Row>
                    <TableGeneric
                        showFilter={false}
                        showFooter={false}
                        columns={[
                            { Header: 'Observación', accessor: 'ob' },
                            { Header: 'Fecha', accessor: 'fecha' },
                            { Header: 'Usuario', accessor: 'usuario' },
                            { Header: 'Maquina', accessor: 'maquina' },
                            { Header: 'Cod Error', accessor: 'codigo_error' },
                            { Header: 'Ambiente', accessor: 'Ambiente' },
                            { Header: 'Informacion Adicional', accessor: 'info_adcional' },
                        ]}
                        data={[]}
                        selectItemRow={setSelectItemRow}
                        divClass='table-responsive text-black bg-table'
                        tableClass='cursor-pointer w-100'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-11 fw-light border'
                        tbodyClass='bg-light'
                        styleHeight='100px'
                        overflowY='hidden'
                    />
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default ModalFacturacion