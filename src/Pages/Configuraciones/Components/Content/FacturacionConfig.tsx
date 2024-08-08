import { FC, useState } from 'react'
import Select from 'react-select'
import { Card, CardBody, Col, Input, Label, Row, TabPane } from 'reactstrap'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface IProps {
    tabId: string
}
const FacturacionConfig: FC<IProps> = ({ tabId }) => {

    const [selectItemRow, setSelectItemRow] = useState<any>()

    const columns = [

        {
            Header: "#",
            Cell: (cell: any) => {
                return <input type="checkbox" className="productCheckBox form-check-input" value={cell.row.original.id} onClick={() => console.log()} />;
            },
        },
        {
            Header: 'Documento',
            accessor: 'name'

        }
    ]
    const data = [
        {
            id: 1,
            name: "proforma"
        },
        {
            id: 2,
            name: "proforma1"
        },
        {
            id: 3,
            name: "proforma3"
        },
        {
            id: 4,
            name: "proforma4"
        },
        {
            id: 5,
            name: "proforma5"
        },
    ]

    return (
        <TabPane tabId={tabId} className='bg-gray border p-2  fs-12 rounded shadow'>

            <Row className='mb-2 '>
                <Col lg='3'>
                    <Input type='checkbox' id='EcaFactura' />
                    <Label htmlFor='EcaFactura' className='cursor-pointer'>Elejir Cliente Antes de Factura</Label>
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='formaPago' />
                    <Label htmlFor='formaPago' className='cursor-pointer'>Forma Pago</Label>

                </Col>
                <Col>
                    <Input type='checkbox' id='InvPreCosto' />
                    <Label htmlFor='InvPreCosto' className='cursor-pointer'>Invisible Precio Costo</Label>
                </Col>
            </Row>

            <Row className='mb-2'>
                <Col lg='3'>
                    <Input type='checkbox' id='defaulPrecio' />
                    <Label htmlFor='defaulPrecio' className='cursor-pointer'>Precio por default</Label>
                </Col>

                <Col lg='3'>
                    <Select />
                </Col>

                <Col>
                    <Input type='checkbox' id='InvPreVenta' />
                    <Label htmlFor='InvPreVenta' className='cursor-pointer'>Invisible Precio Venta</Label>
                </Col>
            </Row>

            <Row className='mb-2'>
                <Col lg='3'>
                    <Input type='checkbox' id='documentos' />
                    <Label htmlFor='documentos' className='cursor-pointer'>Documentos</Label>
                </Col>
                <Col lg='3'>
                    <TableGeneric
                        columns={columns || []}
                        data={data || []}
                        showFilter={false}
                        showFooter={false}
                        selectItemRow={setSelectItemRow}
                        divClass='table-responsive text-black'
                        tableClass='w-100 fs-11  table-sm cursor-pointer'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-11 fw-light border-bottom '
                        tbodyClass='bg-light'
                        customPageSize={10}
                        styleHeight='100px'

                    />
                </Col>
                <Col>
                    <Input type='checkbox' id='pvp1' />
                    <Label htmlFor='pvp1'>Invisible Pvp 1</Label>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col>
                    <Input type='checkbox' id='AecsSelect' />
                    <Label htmlFor='AecsSelect'>Aparecer en Cartera solo los selecionados</Label>
                </Col>
                <Col>
                    <Input type='checkbox' id='pvp2' />
                    <Label htmlFor='pvp2'>Invisible Pvp 2</Label>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col>
                    <Input type='checkbox' id='BSubRDft' />
                    <Label htmlFor='BSubRDft'>Búsqueda SubRubro por Default</Label>
                </Col>
                <Col>
                    <Input type='checkbox' id='pvp3' />
                    <Label htmlFor='pvp3'>Invisible Pvp 3</Label>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    Vendedor Por Default
                </Col>
                <Col lg='3'>
                    <Select className='sm' />
                </Col>
                <Col>
                    <Input type='checkbox' id='InsertIce' />
                    <Label htmlFor='InsertIce'>Ingreso ICE</Label>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Label>Total Items (Alerta)</Label>
                </Col>
                <Col lg='3'>

                    <Input type='number' bsSize='sm' />

                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='doPedisd' />
                    <Label htmlFor='doPedisd'>Realizar Pedidos</Label>
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='ShvClint' />
                    <Label htmlFor='ShvClint'>Sin Historial de Ventas por Cliente</Label>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col lg='3'>
                    <Input type='checkbox' id='EditPrcDeflt' />
                    <Label htmlFor='EditPrcDeflt'>Editar Precio por Default</Label>
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='visblPrce' />
                    <Label htmlFor='visblPrce'>Visible Precios</Label>
                </Col>
                <Col lg='4'>
                    <Input type='checkbox' id='vSPCode' />
                    <Label htmlFor='vSPCode'>Visualizar Solo Productos sin códigos</Label>
                </Col>
            </Row>

            <Row className='mb-3'>
                <Col lg='3'>
                    <Input type='checkbox' id='DescDeflt' />
                    <Label htmlFor='DescDeflt'>Descuento  por Default</Label>
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='editNombre' />
                    <Label htmlFor='editNombre'>Editar Nombre</Label>
                </Col>
                <Col lg='4'>
                    <Input type='checkbox' id='vSPCode' />
                    <Label htmlFor='vSPCode'>Trabajar con código de Barras(directo)</Label>
                </Col>
            </Row>

            <Row>
                <Col lg='3'>
                    <Input type='checkbox' id='imptDeft' />
                    <Label htmlFor='imptDeft'>Impuesto por Default</Label>
                </Col>
                <Col lg='3'>
                    <Input type='checkbox' id='verMas' />
                    <Label htmlFor='verMas'>Ver Más (Habilitado)</Label>
                </Col>
                <Col lg='4'>
                    <Input type='checkbox' id='deftPrintCompro' />
                    <Label htmlFor='deftPrintCompro'>Default "No", al momento de imprimir Comprobantes</Label>
                </Col>
            </Row>


        </TabPane>
    )
}

export default FacturacionConfig