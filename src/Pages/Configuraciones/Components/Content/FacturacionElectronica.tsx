import { FC, useEffect, useState } from 'react'
import Select from 'react-select'
import { Card, Col, Container, Input, Label, Row, TabPane } from 'reactstrap'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface IProps {
    tabId: string
    setDataForm: any
}
const FacturacionElectronica: FC<IProps> = ({ tabId, setDataForm }) => {
    const [selectItemRow, setSelectItemRow] = useState()
    const [fileP12, setFileP12] = useState()
    const oPEMail = [{
        value: 'gmail',
        label: 'Gmail'
    },
    {
        value: 'hotmail',
        label: 'Hotmail'
    },
    {
        value: 'servidorPropio',
        label: 'servidor Propio'
    }
    ]
    const dropdownData = [
        {
            title: 'Edición', subItems: [

                { text: 'Salir', onClick: () => console.log('Limpiar') }
            ]
        },
    ];
    useEffect(() => {
        setDataForm()
    }, [])
    const handleP12 = (e: any) => {
        const archivoSeleccionado = e.target.files[0];
        setFileP12(archivoSeleccionado)
    }
    const save = () => {
        const formData: any = new FormData();
        formData.append('archivo_p12', fileP12);
        console.log(formData.append('archivo_p12', fileP12));
    }
    return (
        <TabPane tabId={tabId}>
            {/*             <button onClick={save}>enviar p12</button>
 */}
            <Container className=' ' fluid>
                <Card className=' fs-11' body>
                    <Row className=''>
                        <Col>
                            <Label className=''>{'Ub. Certificado'}</Label>
                        </Col>
                        <Col>
                            <Input type='file'
                                className='form-control fs-11 custom-input border-sistema'
                                accept='.p12'
                                onChange={(e) => handleP12(e)}
                            />
                        </Col>
                        <Col>
                            <Label className=''>{'Tipo de correo'}</Label>
                        </Col>
                        <Col className='w-100'>
                            <Select
                                defaultValue={oPEMail[0]}
                                options={oPEMail}
                            />
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <Label>{'Clave'}</Label>
                        </Col>
                        <Col>
                            <Input type='password' className='custom-input border-sistema' />
                        </Col>
                        <Col>
                            <Label>{'mail.transport.protocol'}</Label>
                        </Col>
                        <Col>
                            <Select
                                options={[
                                    { value: false, label: '-' },
                                    { value: true, label: 'True' }
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <Label>{'Email'}</Label>
                        </Col>
                        <Col>
                            <Input type='email' className='custom-input' />
                        </Col>
                        <Col>
                            <Label>{'mail.smtp.auth'}</Label>
                        </Col>
                        <Col>
                            <Select
                                options={[
                                    { value: false, label: '-' },
                                    { value: true, label: 'True' }
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row>

                        <Col>
                            <Label>{'Clave'}</Label>
                        </Col>
                        <Col>
                            <Input type='password' className='custom-input' />
                        </Col>
                        <Col>
                            <Label>{'mail.smtp.starttls.enable'}</Label>
                        </Col>
                        <Col>
                            <Select
                                options={[
                                    { value: false, label: '-' },
                                    { value: true, label: 'True' }
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row className=''>

                        <Col>
                            <Label>{'Tipo de Certificado'}</Label>
                        </Col>
                        <Col>
                            <Select
                                options={[
                                    { value: "token_7300", label: 'Token 7300' },
                                    { value: "archivo_p12", label: 'Archivo p12' }
                                ]}
                            />
                        </Col>
                        <Col>
                            <Label>{'mail.smtp.host'}</Label>
                        </Col>
                        <Col>
                            <Input type='text' className='custom-input' />
                        </Col>
                    </Row>
                    <Row className=''>

                        <Col>
                            <Label>{'Librería e Token'}</Label>
                        </Col>
                        <Col>
                            <Input type='text' className='custom-input' />

                        </Col>
                        <Col>
                            <Label>{'mail.smtp.port'}</Label>
                        </Col>
                        <Col>
                            <Input type='text' className='custom-input' />
                        </Col>
                    </Row>
                    <Row className=''>
                        <Col>
                            <Label>{'No. de Resolución'}</Label>
                        </Col>
                        <Col>
                            <Input className='custom-input' />
                        </Col>
                        <Col>
                            <div className="form-check ">
                                <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                <Label className="form-check-label" for="formCheck1">
                                    {'Desde la nube'}
                                </Label>
                            </div>
                        </Col>
                        <Col>
                            <Input type='text' className='custom-input' />
                        </Col>
                    </Row>
                    <Row className=''>
                        <Col>
                            <Label>{'Obligado a llevar contabilidad'}</Label>
                        </Col>
                        <Col>
                            <Select
                                options={[
                                    { value: 'NO', label: 'NO' },
                                    { value: 'SI', label: 'NO' }
                                ]}
                            />
                        </Col>
                        <Col>
                            <Input type='text' className='custom-input' />
                        </Col>
                        <Col>
                            <div className="form-check ">
                                <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                <Label className="form-check-label" for="formCheck1">
                                    {'Perfumeria'}
                                </Label>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg='6' className=''>
                            <div className='d-flex justify-content-between gap-4 '>
                                <Label className='w-50'>{'Url Logo Ride'}</Label>
                                <Input className='w-50 custom-input' type='text' />
                            </div>
                            <div className='d-flex justify-content-between gap-4 '>
                                <Label className='w-50'>{'Url Logo Ride 2'}</Label>
                                <Input className='w-50 custom-input' type='text' />
                            </div>
                            <div className='d-flex justify-content-between gap-4 '>
                                <Label className='w-50'>{'Url Código Barras'}</Label>
                                <Input className='w-50 custom-input' type='text' />
                            </div>
                            <div className='d-flex justify-content-between gap-4 '>
                                <Label className='w-50'>{'Dirección Descargar XML'}</Label>
                                <Input className='w-50 custom-input' type='text' />
                            </div>
                            <div className='d-flex justify-content-between gap-4 '>
                                <Label className='w-50'>{'Dirección Archivo temp'}</Label>
                                <Input className='w-50 custom-input' type='text' />
                            </div>
                        </Col>

                        <Col className='d-flex justify-content-between gap-4'>
                            <div className='' style={{ width: '60%' }}>
                                <TableGeneric
                                    showFilter={false}
                                    showFooter={false}
                                    columns={[]}
                                    data={[]}
                                    selectItemRow={setSelectItemRow}
                                    divClass='table-responsive text-black bg-table'
                                    tableClass='cursor-pointer w-100'
                                    theadClass='position-sticky top-0 bg-table '
                                    thClass='fs-11 fw-light border'
                                    tbodyClass='bg-light'
                                    styleHeight='130px'
                                    overflowY='scroll'
                                />
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Observación'}
                                    </Label>
                                </div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Pago directo Tarjeta'}
                                    </Label>
                                </div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Bloquear Facturas vendidas'}
                                    </Label>
                                </div>
                                <div className='d-flex justify-content-between gap-4 '>
                                    <Input className='w-50 custom-input' type='text' />
                                </div>
                            </div>
                            <div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Vendedor'}
                                    </Label>
                                </div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Descuento Incluido Factura'}
                                    </Label>
                                </div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Total Articulos'}
                                    </Label>
                                </div>
                                <div className="form-check ">
                                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                                    <Label className="form-check-label" for="formCheck1">
                                        {'Formato de Factura con lotes'}
                                    </Label>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Card>
            </Container>
        </TabPane>
    )
}

export default FacturacionElectronica