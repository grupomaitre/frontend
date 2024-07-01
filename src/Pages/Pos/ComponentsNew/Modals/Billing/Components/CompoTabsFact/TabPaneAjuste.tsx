import { TabPane, Row, Col, Label, Input, Button } from 'reactstrap'
import Select from 'react-select'
const TabPaneAjuste = () => {
    return (
        <TabPane tabId="7" id="settings">
            <Row className='mb-3'>
                <Col lg='4'>
                    <Label>Motivo</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='4'>
                    <Label>Tipo</Label>
                </Col>
                <Col lg='6'>
                    <Select />
                </Col>
                <Col>
                    <Button color='dark' className='border'>+</Button>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='4'>
                    <Label>Detalle</Label>
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
            </Row>
            <Row>
                <Col lg='4'>
                    {''}
                </Col>
                <Col lg='6'>
                    <Label>Ingrese Número Nota de Crédito 00100100012456</Label>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='4'>
                    {''}
                </Col>
                <Col lg='6'>
                    <Input type='text' />
                </Col>
                <Col>
                    <Button color='dark' className='border'>Aplicar NC</Button>
                </Col>
            </Row>
            <Row>
                <Col lg='4'>
                    <Label>Monto</Label>
                </Col>
                <Col lg='3'>
                    <Input type='text' />
                </Col>
                <Col lg='3'>
                    <Input type='date' />
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='text-center '>
                    <Label>{'NOTA: El ajuste es sólo para Cuadre de Saldos/Comprobantes en el Sistema Administrativo'}</Label>

                </Col>
            </Row>
        </TabPane>
    )
}

export default TabPaneAjuste