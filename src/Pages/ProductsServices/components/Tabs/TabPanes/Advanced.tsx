import { FC } from 'react'
import Select from 'react-select'
import { Button, Col, Input, Label, Row, TabPane } from "reactstrap"
interface Props {
    tabId: string
}
const Advanced: FC<Props> = ({ tabId }) => {
/*     const columns = [
        {
            Header: 'Title 1',
            accessor: 'title1',
        },
        {
            Header: 'Title 2',
            accessor: 'title2',
        },
        {
            Header: 'Title 3',
            accessor: 'title3',
        },
        {
            Header: 'Title 4',
            accessor: 'title4',
        }
    ] */
    return (
        <TabPane tabId={tabId} id="advanced" style={{ fontSize: '10px' }} className='fondo-sistema'>
            <Col lg='9'>
                <Row className='mb-1'>
                    <Col lg='2'>
                        <Label>Cantidad Contenido</Label>
                    </Col>
                    <Col lg='3'>
                        <Input type='text' className='rounded-0 border-0 custom-input' />
                    </Col>
                    <Col>
                        <Label>Presentación ICE</Label>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='2'>
                        <Label>Medida Contenido</Label>
                    </Col>
                    <Col lg='3'>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '30px',
                                    minHeight: '30px',
                                    borderRadius: 'none',
                                    border: 'none'
                                }),
                            }}
                        />
                    </Col>
                    <Col lg='3'>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '30px',
                                    minHeight: '30px',
                                    borderRadius: 'none',
                                    border: 'none'
                                }),
                            }}
                        />
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col lg='2' >
                        <Label>Actual Medida:Kilos Cambiar por:</Label>
                    </Col>
                    <Col>
                        <Button size='sm' block color='light' className=''>Cambiar</Button>
                    </Col>
                    <Col>
                        <Button size='sm' block color='light' className=''>Combos</Button>
                    </Col>
                    <Col>
                        <Button size='sm' block color='light' className=''>Promociones</Button>
                    </Col>
                    <Col>
                        <Button size='sm' block color='light' className=''>Color</Button>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='2'>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '30px',
                                    minHeight: '30px',
                                    borderRadius: 'none',
                                    border: 'none'
                                }),
                            }}
                        />
                    </Col>
                    <Col>
                        <Input type='checkbox' className='me-3' />
                        <Label>Sin Completar</Label>
                    </Col>
                    <Col lg='1'>
                        <Label>Puntos </Label>
                    </Col>
                    <Col>
                        <Input type='text' className='rounded-0 border-0 custom-input' />
                    </Col>
                    <Col lg='1'>
                        <Label>Factor </Label>
                    </Col>
                    <Col>
                        <Input type='text' className='rounded-0 border-0 custom-input' />
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='2'>
                        <Select
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: '30px',
                                    minHeight: '30px',
                                    borderRadius: 'none',
                                    border: 'none'
                                }),
                            }}
                        />
                    </Col>
                    <Col>
                        <Input type='checkbox' className='me-3' />
                        <Label>Comisión Motorizado</Label>
                    </Col>
                    <Col lg='1'>
                        <Label>Desc 1 </Label>
                    </Col>
                    <Col>
                        <Input type='text' className='rounded-0 border-0 custom-input' />
                    </Col>
                    <Col lg='1'>
                        <Label>Base </Label>
                    </Col>
                    <Col>
                        <Input type='text' className='rounded-0 border-0 custom-input' />
                    </Col>
                </Row>
                <Row>
                    <Col>
                  
                    </Col>
                </Row>
            </Col>
        </TabPane>
    )
}

export default Advanced