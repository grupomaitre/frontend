import { TabPane, Row, Col, Label, Input, Button, Table } from 'reactstrap'
import Select from 'react-select'
const TabPaneRetencion = () => {
    return (

        <TabPane tabId="3" id="messages">
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>Documento</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>N° de Serie</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col lg='1'>
                    <Button color='dark' className='border'>{'->'}</Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>N° de Autorización</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col >
                    <Button color='dark' className='border'>{'0'}</Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>N° de Retención</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col >
                    <Input type='checkbox' />
                    <Label>Retención Pendiente</Label>
                </Col>
            </Row>
            <Row>
                <Col lg='3'>
                    <Label>Fecha de Emisión</Label>
                </Col>
                <Col lg='6'>
                    <Input type='date' />
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col lg='3'>
                    <Label>Tipo de Retención</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
                <Col lg='3'>
                    <Button color='dark'>+</Button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col lg='3'>
                    <Label>Ejerccio Fiscal</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' />
                    <Label>Editor B.I</Label>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col lg='12'>
                    <Button className='float-end'>Agregar</Button>
                </Col>
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Secuencial</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3.99</td>
                            <td>123456789</td>
                            <td>Tipo 1</td>
                            <td> <Button>x</Button> </td>
                            <td><Button>Edit</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

        </TabPane>
    )
}

export default TabPaneRetencion