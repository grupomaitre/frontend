import { TabPane, Row, Col, Label, Input, Button, Table } from 'reactstrap'
import Select from 'react-select'
const TabPaneNCredito = () => {
    return (

        <TabPane tabId="4" id="settings">
            <Row className='mb-1'>
                <Col lg='3'>
                    <Label>Saldo de</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
            </Row>
            <Row className='mb-1'>
                <Col lg='3'>
                    <Label>Inventario de</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
                <Col>
                    <Button>Buscar Comprobante</Button>
                </Col>
            </Row>
            <Row className='mb-1'>
                <Col lg='3'>
                    <Label>Afecta a</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
            </Row>
            <Row className='mb-1'>
                <Col lg='3'>
                    <Label>N° de Serie</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                    <div className='mt-1'>
                        <Input type='checkbox' />
                        <Label>Emitir NT Credito</Label>
                        <Input type='checkbox' />
                        <Label>Imprimir</Label>
                    </div>
                </Col>
            </Row>
            <Row className='mb-1'>
                <Col lg='3'>
                    <Label>Autorización</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col>
                    <Button>Agregar Detalle</Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>Secuencial</Label>
                </Col>
                <Col lg='3'>
                    <Input type='text' />
                </Col>
                <Col lg='1'>
                    <Label>Fecha</Label>
                </Col>
                <Col lg='2'>
                    <Input type='date' />
                </Col>
                <Col>
                    <Button>Eliminar</Button>
                </Col>
            </Row>
            <Table size='sm'>
                <thead>
                    <tr>
                        <th>Cant</th>
                        <th>Detalle</th>
                        <th>P. Unita</th>
                        <th>Total</th>
                        <th>Iva</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>3.99</td>
                        <td>Detalle</td>
                        <td>10</td>
                        <td>100</td>
                        <td>12</td>
                        <td> <Button size='sm'>x</Button> </td>
                        <td><Button size='sm'>Edit</Button></td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col lg='3'>
                    <Label>Observación</Label>
                    <Input type='textarea' style={{ height: '85px' }} />
                </Col>
                <Col>
                    <Table size='sm' bordered>
                        <tbody>
                            <tr>
                                <td>ICE</td>
                                <td>0.00</td>
                                <td>No Iva</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>SubTotal</td>
                                <td>0.00</td>
                                <td></td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>Descuento</td>
                                <td>0.00</td>
                                <td>Transporte</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td>IVA 15%</td>
                                <td>0.00</td>
                                <td className='bg-black text-white'>Total</td>
                                <td className='bg-black text-white'>0.00</td>
                            </tr>
                            <tr>
                                <td>Iva 0%</td>
                                <td>0.00</td>
                            </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </TabPane>
    )
}

export default TabPaneNCredito