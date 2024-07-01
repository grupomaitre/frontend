import { TabPane, Row, Col, Label, Button } from 'reactstrap'
import Select from 'react-select'
const TabPaneCobrar = () => {
    return (

        <TabPane tabId="5" id="settings">
            <Row className='mb-3'>
                <Col lg='4'>
                    <Label>Personal</Label>
                </Col>
                <Col lg='8'>
                    <Select />
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col >
                    <Button color='dark' className='float-end'>{'Enviar a Consumo'}</Button>
                </Col>
            </Row>
        </TabPane>)
}

export default TabPaneCobrar