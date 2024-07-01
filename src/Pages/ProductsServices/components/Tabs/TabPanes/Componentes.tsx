import { FC, useState } from 'react'
import Select from 'react-select'
import { Col, Label, Row, TabPane, Input, Card, CardBody } from "reactstrap"
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
interface Props {
    tabId: string
}

const Componentes: FC<Props> = ({ tabId }) => {
    const [selectItemRow, setSelectItemRow] = useState()
    /*   const [data, setData] = useState([{
          materiaPrima: "001"
      }]) */
    const columns = [
        {
            Header: 'Item',
            accessor: 'item',
        },
        {
            Header: 'Cantidad ',
            accessor: 'materiaPrima',
        },
        {
            Header: 'Medida',
            accessor: 'cantidad',
        },
        {
            Header: 'Costo ',
            accessor: 'medidaContenido',
        },
        {
            Header: 'T.Medida',
            accessor: 'bodega',
        },
        {
            Header: 'Bodega',
            accessor: 'precioVenta',
        },
    ]
    return (
        <TabPane tabId={tabId} id="components" style={{ fontSize: '13px' }} className=''>
            <Row>
                <Col xl='4' lg='5'>
                    <Row>
                        <Col>
                            <div className="form-check form-radio-primary mb-3">
                                <Input className="form-check-input" type="radio" name="formradiocolor1" id="formItem" defaultChecked />
                                <Label className="form-check-label" for="formItem">
                                    Item
                                </Label>
                            </div>

                        </Col>
                        <Col>
                            <div className="form-check form-radio-primary mb-3">
                                <Input className="form-check-input" type="radio" name="formradiocolor1" id="formFormula" defaultChecked />
                                <Label className="form-check-label" for="formFormula">
                                    Fórmula
                                </Label>
                            </div>

                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col lg='4' xl='5'>
                            <Label>Materia Prima</Label>
                        </Col>
                        <Col >
                            <Input type='text' className='' bsSize='sm' style={{ background: '#ffe390' }} />
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col lg='4' xl='5'>
                            <Label>Cantidad </Label>
                        </Col>
                        <Col lg='3'>
                            <Input type='text' className='' bsSize='sm' />

                        </Col>
                    </Row>
                    <Row>
                        <Col lg='4' xl='5'>
                            {' '}
                        </Col>
                        <Col>
                            <div className='mt-1'>
                                <Input type='checkbox' className='me-3' />
                                <Label>Medida Contenido</Label>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col lg='4' xl='5'>
                            <Label>Materia Prima</Label>
                        </Col>
                        <Col>
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
                    <Row className='mb-1'>
                        <Col lg='4' xl='5'>
                            <Label>Bodega </Label>
                        </Col>
                        <Col>
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
                            <div className='mt-1'>
                                <Input type='checkbox' className='me-3' />
                                <Label>Opcional </Label>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col lg='4' xl='5'>
                            <Label>Precio Venta </Label>
                        </Col>
                        <Col lg='3'>
                            <Input type='text' className='' bsSize='sm' />
                        </Col>
                    </Row>
                </Col>
                <Col xl='' lg='' >
                    <Card>
                        <CardBody>
                          {/*   <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={[]}
                                selectItemRow={setSelectItemRow}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-11 fw-light border'
                                tbodyClass='bg-light'
                                styleHeight='200px'
                                overflowY='scroll'
                            /> */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </TabPane>
    )
}

export default Componentes