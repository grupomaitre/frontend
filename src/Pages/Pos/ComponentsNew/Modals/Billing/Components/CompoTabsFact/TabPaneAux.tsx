import { TabPane, Row, Col, Label, Input, Table, Button } from 'reactstrap'
const TabPaneAux = () => {
    return (

        <TabPane tabId="8" id="settings">
            <Row className='mb-3'>
                <Col lg='2'>
                    <Label>Axualiar</Label>
                </Col>
                <Col >
                    <Input type='text' className='bg-warning border-dark' />
                </Col>
            </Row>
            <Table size='sm' bordered>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Puntos</th>
                        <th>Total</th>
                        <th>Saldo</th>
                        <th>Ingresador por</th>
                        <th>Observación</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>22-05-2023</td>
                        <td>100</td>
                        <td>100</td>
                        <td>1000</td>
                        <td>ADMIN</td>
                        <td>001</td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col lg='2'>
                    <Label>Valor a Asignar</Label>
                </Col>
                <Col lg='3'>
                    <Input type='text' />
                </Col>
                <Col lg='3'>
                    {'$'}
                </Col>
                <Col>
                    <Button block>Validar</Button>
                </Col>
            </Row>
        </TabPane>
    )
}

export default TabPaneAux