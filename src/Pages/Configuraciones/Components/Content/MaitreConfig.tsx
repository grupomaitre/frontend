import { FC, useState } from 'react'
//import "react-dual-listbox/lib/react-dual-listbox.css";
import { Card, CardBody, Col, Input, Label, Row, TabPane } from 'reactstrap'
import Select from 'react-select'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric';
interface IProps {
    tabId: string
}
const MaitreConfig: FC<IProps> = ({ tabId }) => {
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
    const [selected, setSelected] = useState([]);

    const options = [
        { value: '1', label: 'Apple' },
        { value: '2', label: 'Banana' },
        { value: '3', label: 'Orange' },
        // Otros elementos de la lista
    ];
    return (
        <TabPane tabId={tabId}>
            <Card body>

                <Row className='mb-1'>
                    <Col lg='3'>
                        <Input type='checkbox' id='PFmaitre' />
                        <Label htmlFor='PFmaitre'>Punto De Facturación Maitre</Label>
                    </Col>
                    <Col lg='3'>
                        <Input type='checkbox' id='SnCoFac' />
                        <Label htmlFor='SnCoFac'>Sin Copia en Facturación en Mesas</Label>
                    </Col>
                    <Col lg='3'>
                        <Input type='checkbox' id='formPeq' />
                        <Label htmlFor='formPeq'>Formato Pequeño Comandas</Label>
                    </Col>
                    <Col lg='3'>
                        <Input type='checkbox' id='sDClntComd' />
                        <Label htmlFor='sDClntComd'>Sin Datos Cliente Comanda</Label>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='3' className='d-flex justify-content-between'>
                        <div>
                            <Input type='checkbox' id='nCrr' />
                            <Label htmlFor='nCrr'>No Cerrar</Label>

                        </div>
                        <div>
                            <Input type='checkbox' id='clvnd' />
                            <Label htmlFor='clvnd'>Clave Vendedor</Label>

                        </div>
                    </Col>

                    <Col lg=''>
                        <Input type='checkbox' id='formtMa' />
                        <Label htmlFor='formtMa'>Formato Maitre.</Label>
                    </Col>
                    <Col lg=''>
                        <Input type='checkbox' id='CbrDcrt' />
                        <Label htmlFor='CbrDcrt'>Cobrar Directo</Label>
                    </Col>
                    <Col lg=''>
                        <Input type='checkbox' id='cmdTtls' />
                        <Label htmlFor='cmdTtls'>Comandas con Totales</Label>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='3'>
                        <Input type='checkbox' id='nPgr' />
                        <Label htmlFor='nPgr'>No Pagar</Label>


                    </Col>
                    <Col lg='3'>
                        <Input type='checkbox' id='vndxPrd' />
                        <Label htmlFor='vndxPrd'>Vendedor por Producto</Label>

                    </Col>
                    <Col lg='3'>
                        <Input type='checkbox' id='bgWndMs' />
                        <Label htmlFor='bgWndMs'>Fondo de Pantalla Plano de Mesas</Label>
                    </Col>
                    <Col lg=''>
                        <Input type='checkbox' id='noInPx' />
                        <Label htmlFor='noInPx'>No ingresar Pax</Label>
                    </Col>

                    <Col lg='' className='d-flex justify-content-between'>
                        <div>
                            <Input type='checkbox' id='tch' />
                            <Label htmlFor='tch'>Touch</Label>

                        </div>
                        <div>
                            <Input type='checkbox' id='conPsns' />
                            <Label htmlFor='conPsns'>Con Posesiones</Label>

                        </div>
                    </Col>
                </Row>
                <Row className='mb-1'>
                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="formCheck6" />
                            <Label className="form-check-label" for="formCheck6">
                                Usuario Directo
                            </Label>
                        </div>


                    </Col>
                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="inLtCja" />
                            <Label className="form-check-label" for="inLtCja">
                                Ingresar Lote Caja
                            </Label>
                        </div>


                    </Col>
                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="nPClEnInv" />
                            <Label className="form-check-label" for="nPClEnInv">
                                No pedir Cliente al enviar al Inventario
                            </Label>
                        </div>
                    </Col>

                </Row>
                <Row className='mb-1'>
                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="slRbrs" />
                            <Label className="form-check-label" for="slRbrs">
                                Solo Rubros
                            </Label>
                        </div>


                    </Col>
                    <Col lg='5'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="dsgPlts" />
                            <Label className="form-check-label" for="dsgPlts">
                                Descargar Platos (Recetas) de la bodega predeterminada en el equipo donde se envia
                            </Label>
                        </div>
                    </Col>

                </Row>
                <Row>
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
                        <Input type='file' className='mb-2' bsSize='sm' />
                        <Row>
                            <Col lg='2'>
                                <div className="form-check form-check-info">
                                    <Input className="form-check-input" type="checkbox" id="nClrBtn" />
                                    <Label className="form-check-label" for="nClrBtn">
                                        No Colorear Botones
                                    </Label>
                                </div>
                            </Col>
                            <Col lg='3' className=''>
                                <Label>Cuenta Default</Label>
                                <Select />
                            </Col>
                            <Col lg='3'>
                                <Label>T Consumo</Label>
                                <Select />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col lg='12' className='text-center bg-black'>
                        <Label className='fs-5 text-info '>GLOBAL</Label>
                    </Col>
                </Row>

                <Row className='mb-2'>
                    <Col className='text-center bg-black text-info'>
                        <Label>Reporteria</Label>
                    </Col>
                    <Col className='mt-3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="sCtrCmd" />
                            <Label className="form-check-label" for="sCtrCmd">
                                Sin Contra Comanda
                            </Label>
                        </div>

                    </Col>
                    <Col className='mt-3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="nSCmb" />
                            <Label className="form-check-label" for="nSCmb">
                                No se para Combo
                            </Label>
                        </div>

                    </Col>
                    <Col className='mt-3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="eljVndPlt" />
                            <Label className="form-check-label" for="eljVndPlt">
                                Elegir Vendedor por Plato
                            </Label>
                        </div>
                    </Col>
                </Row>

                <Row className='mb-2'>

                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="deltPlts" />
                            <Label className="form-check-label" for="deltPlts">
                                Eliminacion de Platos(1)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="mdrCts" />
                            <Label className="form-check-label" for="mdrCts">
                                Mudar Cuentas(7)
                            </Label>
                        </div>
                    </Col>

                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="cbrAftPrn" />
                            <Label className="form-check-label" for="cbrAftPrn">
                                Cobrar antes de imprimir
                            </Label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="frtTch" />
                            <Label className="form-check-label" for="frtTch">
                                Formato Touch
                            </Label>
                        </div>
                    </Col>
                </Row>

                <Row className='mb-2'>

                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="AnCts" />
                            <Label className="form-check-label" for="AnCts">
                                Anulación de Cuentas (2)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="aprCjs" />
                            <Label className="form-check-label" for="aprCjs">
                                Apertura de Caja (8)
                            </Label>
                        </div>
                    </Col>
                    <Col className='d-flex' lg='3'>
                        <Row>
                            <Col>
                                <Label>Valor minimo ticket</Label>
                            </Col>
                            <Col>
                                <Input bsSize='sm' />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="reTrjt" />
                            <Label className="form-check-label" for="reTrjt">
                                Recarga Tarjeta
                            </Label>
                        </div>
                    </Col>
                </Row>

                <Row className='mb-2'>

                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info w-50">
                            <Input className="form-check-input" type="checkbox" id="crtss" />
                            <Label className="form-check-label" for="crtss">
                                Cortesias (3)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="anlCompr" />
                            <Label className="form-check-label" for="anlCompr">
                                Anulación de Comprobantes
                            </Label>
                        </div>
                    </Col>

                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="acCtAuPrCmp" />
                            <Label className="form-check-label" for="acCtAuPrCmp">
                                Actualizar costo Automáticamente Productos con Componentes
                            </Label>
                        </div>
                    </Col>

                </Row>
                <Row className='mb-2'>
                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info w-50">
                            <Input className="form-check-input" type="checkbox" id="retr" />
                            <Label className="form-check-label" for="retr">
                                Retro (4)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="deltAbns" />
                            <Label className="form-check-label" for="deltAbns">
                                Eliminación de Abonos (10)
                            </Label>
                        </div>
                    </Col>

                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="tckTtl" />
                            <Label className="form-check-label" for="tckTtl">
                                Ticket Solo en Total 0
                            </Label>
                        </div>
                    </Col>

                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="dsgRctfct" />
                            <Label className="form-check-label" for="dsgRctfct">
                                Descargar Receteas por factura
                            </Label>
                        </div>
                    </Col>

                </Row>

                <Row className='mb-2'>
                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info w-50">
                            <Input className="form-check-input" type="checkbox" id="clsCj" />
                            <Label className="form-check-label" for="clsCj">
                                Cierre de caja (5)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="gtsCjs" />
                            <Label className="form-check-label" for="gtsCjs">
                                Gastos Caja (11)
                            </Label>
                        </div>
                    </Col>
                    <Col lg='3'>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="nAuFctr" />
                            <Label className="form-check-label" for="nAuFctr">
                                No Autorizar Facturas
                            </Label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="dsRcClsCjs" />
                            <Label className="form-check-label" for="dsRcClsCjs">
                                Descargar Recetas por Cierre de Caja
                            </Label>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg='3' className='d-flex justify-content-between'>
                        <div className="form-check form-check-info w-50">
                            <Input className="form-check-input" type="checkbox" id="dcsApl" />
                            <Label className="form-check-label" for="dcsApl">
                                Descuento Aplicado (6)
                            </Label>
                        </div>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="edtClnt" />
                            <Label className="form-check-label" for="edtClnt">
                                Editar Cliente (12)
                            </Label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-check form-check-info">
                            <Input className="form-check-input" type="checkbox" id="vldSckRcts" />
                            <Label className="form-check-label" for="vldSckRcts">
                                Valida Stock Recetas
                            </Label>
                        </div>
                    </Col>
                </Row>


            </Card>


        </TabPane>
    )
}

export default MaitreConfig