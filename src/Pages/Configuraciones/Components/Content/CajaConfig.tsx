import { FC, useState } from 'react'
import { Card, CardBody, Col, Input, Label, Row, TabPane } from 'reactstrap'
import UseCheckBoxs from '../../hook/useCheckBoxs'
import { ListCheckConfig1, ListCheckConfig2, ListCheckFour, ListCheckOne, ListCheckTree, ListCheckTwo } from './DataCheck'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'


interface IProps {
    tabId: string
}
const CajaConfig: FC<IProps> = ({ tabId }) => {
    const [selectItemRow2, setSelectItemRow2] = useState()
    const [isChecked, setIsChecked] = useState<any>([])
    const columns = [
        {
            Header: 'SELECION',

            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center text-center'
                    onClick={() => console.log(row.original)}>
                    <input type="checkbox" />
                </div>
            ),

        },
        {
            Header: 'PREDETERMINADA', accessor: 'pre',

            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center text-center'
                    onClick={() => console.log(row.original)}>
                    <input type="checkbox" />
                </div>
            ),
        },
        { Header: 'CAJA', accessor: 'caja' }
    ]
    const data = [
        {
            caja: 'CAJA CONTABLE'
        },
        {
            caja: 'CAFA FACTURACION'
        }
    ]

    const handleToggleField = (fieldName: string) => {
        const isCheckedIndex = isChecked.findIndex((item: any) => item.name === fieldName);
        if (isCheckedIndex !== -1) {
            const updatedIsChecked = [...isChecked];
            updatedIsChecked[isCheckedIndex].status = !updatedIsChecked[isCheckedIndex].status;
            setIsChecked(updatedIsChecked);
        } else {
            setIsChecked([...isChecked, { name: fieldName, status: true }]);
        }
    }

    return (
        <TabPane tabId={tabId}>

            <Card className='fs-11'>
                <CardBody className=''>
                    <Row className='rounded p-1 mx-2 border-sistema'>
                        <Col lg='4'>
                            <Label>Seleción de caja</Label>
                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={data || []}
                                selectItemRow={setSelectItemRow2}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                thClass='fs-11 fw-border px-3 text-end border'
                                tdClass={'fs-11 border'}
                                tbodyClass='bg-light'
                                styleHeight='80px'
                                overflowY='scroll'
                            />
                        </Col>
                        <Col>
                            <Label>Quitar de formato Cajas</Label>
                            <Row className='fs-11'>
                                <Col>
                                    <UseCheckBoxs
                                        list={ListCheckConfig1}
                                        handleToggleField={handleToggleField}

                                    />

                                </Col>
                                <Col>
                                    <UseCheckBoxs
                                        list={ListCheckConfig2}
                                        handleToggleField={handleToggleField}

                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='my-2 mx-2 p-1 rounded border-sistema' >
                        <Label>GLOBAL</Label>
                        <Col lg='2'>
                            <Label>Exportar</Label>
                        </Col>
                        <Col lg='2'>
                            <Input type='select' bsSize='sm' />
                        </Col>
                        <Col lg='3'>
                            <div className='d-flex'>
                                <Input type='checkbox' id='EditPrcDeflt' />
                                <Label htmlFor='EditPrcDeflt'>Resetear No. De Orden por Día 1+</Label>
                            </div>
                        </Col>
                        <Col lg='1'>
                            <Input bsSize='sm' />

                        </Col>
                    </Row>
                    <Row className='fs-11 p-2 rounded mx-2 border-sistema'>
                        <Col lg='3'>
                            <UseCheckBoxs
                                list={ListCheckOne}
                                handleToggleField={handleToggleField}
                            />
                        </Col>
                        <Col lg='3'>
                            <UseCheckBoxs
                                list={ListCheckTwo}
                                handleToggleField={handleToggleField}

                            />
                        </Col>
                        <Col lg='3'>
                            <UseCheckBoxs
                                list={ListCheckTree}
                                handleToggleField={handleToggleField}

                            />
                        </Col>
                        <Col lg='3'>
                            <UseCheckBoxs
                                list={ListCheckFour}
                                handleToggleField={handleToggleField}

                            />
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </TabPane>

    )
}

export default CajaConfig