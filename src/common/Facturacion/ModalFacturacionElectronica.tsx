import { FC, useState } from 'react'
import { Check, X } from 'react-feather'
import { Modal, ModalBody, ModalHeader, Row, Col, Label, Button, Input, Card, CardHeader, CardBody, CardFooter, Spinner } from 'reactstrap'
import TableGeneric from '../Generics/Table/TableGeneric'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toastError } from '../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'

interface IProps {
    show: boolean
    onCloseClick: () => void
    itemFacturacion: any
}
const ModalFacturacionElectronica: FC<IProps> = ({ show, onCloseClick, itemFacturacion }) => {
    const userData: any = (JSON.parse(sessionStorage.getItem("authUser") || ''))
    const cart = useSelector((state: any) => state.pointSaleSlice.cart)

    const [selectItemRow, setSelectItemRow] = useState()
    const total = 100
    const handlePrint = () => {
        const url = 'http://127.0.0.1:8000/api/v1/genearar/ride/borrador';

        axios.post(url, { cart: cart }).then((data) => (
            console.log(data)
        ))

        return
        /*      console.log(selectItemRow)
             console.log(itemFacturacion)
             const idEmpresa = userData?.id_company
             const res: any = await imprimirComprobante(idEmpresa)
             console.log(res)
             return */
    }
    const [isLoading, setIsLoading] = useState(false)
    const handleEmpezar = () => {
        setIsLoading(true)
        setTimeout(() => {
            toastError({ message: 'Error al generar xml' })
            setIsLoading(false)

        }, 3000);
    }
    return (
        <>
            <Modal isOpen={show} size='lg'>
                <ModalHeader toggle={onCloseClick}>
                    {'Facturación'}
                </ModalHeader>
                <ModalBody className='text-black fs-12'>
                    <Row className='gap-1'>
                        <Col lg='6' className='border-bottom-0 bg-gray'>
                            <Label className=' fs-12'>{'Clave y Autorización de pruebas'}</Label> <br />
                            <Label className='fs-12 text-info'>{''}</Label>
                        </Col>
                        <Col lg='' className=' d-flex justify-content-between border-bottom-0 bg-gray'>
                            <Label>Pruebas</Label>
                            <Label>Producción</Label>
                        </Col>
                    </Row>
                    <Row className='gap-1'>
                        <Col lg='6' className='border-bottom-0 bg-gray'>
                            <Label className=' fs-12'>{'Clave y Autorización de pruebas'}</Label> <br />
                        </Col>
                        <Col lg='' className='bg-gray border'>
                            <Label>
                                <Button size='sm' color='light'
                                    onClick={() => handlePrint()}
                                >ver borrador</Button>
                            </Label>
                        </Col>
                    </Row>
                    <Row className='d-flex align-items-center'>
                        <Col lg='6' className='border-bottom-0 bg-gray'>
                            <Button size='sm' color='light'>...</Button>
                        </Col>
                        <Col>
                            <Label>{'Generar Archivo'}</Label>
                        </Col>
                        <Col>
                            {
                                isLoading
                                    ? <Spinner size="sm" color="success" />
                                    : <X color='#ff0000' />
                            }
                            {/* <Check color='#03fe04' /> */}
                        </Col>
                        <Col>
                            <Button size='sm' color='light' onClick={() => handleEmpezar()}>{'Empezar'}</Button>
                        </Col>
                    </Row>
                    {/* info */}
                    <Row className='mt-2'>
                        <Col className='bg-gray' lg='6' >
                            <Card className='border-primary'>
                                <CardHeader className='bg-black  border-primary'>
                                    <Row className=''>
                                        <Col>
                                            <h6 className='text-info fs-12'>Factura 001 - 002</h6>
                                            <h4 className=''>N°:00000435</h4>
                                        </Col>
                                        <Col className='text-end'>
                                            <h6 className='text-info'>{'Total'}</h6>
                                            <h4 style={{ color: '#ff0000' }}>{total}</h4>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className='text-black'>
                                    <Row>
                                        <Col>
                                            <Label>{'Cliente:Consumidor final'}</Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Nombre Comercial</Label>
                                        </Col>
                                        <Col>
                                            <Label>
                                                <Input className='custom-input' />
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Teléfono</Label>
                                        </Col>
                                        <Col>
                                            <Label>
                                                <Input className='custom-input' />
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Dirección</Label>
                                        </Col>
                                        <Col>
                                            <Label>
                                                <Input className='custom-input' />
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Correo Electrónico</Label>
                                        </Col>
                                        <Col>
                                            <Label>
                                                <Input className='custom-input' />
                                            </Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg='2'>
                                            <Button size='sm' color='light'>
                                                {'xml'}
                                            </Button>
                                        </Col>
                                        <Col lg='4'>
                                            <Label>Con Copia a</Label>
                                        </Col>
                                        <Col>
                                            <Label>
                                                <Input className='custom-input' />
                                            </Label>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <TableGeneric
                                        showFilter={false}
                                        showFooter={false}
                                        columns={[
                                            {
                                                Header: 'Correo Electrónico',
                                                accessor: 'id_caja_diaria',
                                            },
                                            {
                                                Header: 'Enviar',
                                                accessor: 'correo',
                                            }
                                        ]}
                                        data={[]}
                                        selectItemRow={setSelectItemRow}
                                        divClass='table-responsive text-black bg-table'
                                        tableClass='cursor-pointer w-100'
                                        theadClass='position-sticky top-0 bg-table '
                                        thClass='fs-11 fw-light border'
                                        tbodyClass='bg-light'
                                        styleHeight='50px'
                                        overflowY='scroll'
                                    />
                                </CardFooter>
                            </Card>
                            <Row>
                                <Col>

                                </Col>
                            </Row>
                        </Col>
                        <Col lg='6' className='d-flex flex-column justify-content-between my-4'>
                            <div>
                                <Row>
                                    <Col>
                                        <Label>{'Firmado Archivo'}</Label>
                                    </Col>
                                    <Col>
                                        {/*    <X color='#ff0000' /> */}
                                    </Col>
                                    <Col >
                                        <Button size='sm' color='light'> {'Firmar'}</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>{'Enviado Archivo'}</Label>
                                    </Col>
                                    <Col lg='8'>
                                        {/*    <Check color='#03fe04' /> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>{'Estado'}</Label>
                                    </Col>
                                    <Col lg='8'>
                                        {/*    <Check color='#03fe04' /> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>{'Enviado Correo ride'}</Label>
                                    </Col>
                                    <Col lg='8'>
                                        {/*     <Check color='#03fe04' /> */}
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col>
                                        <Label className='text-warning'>{'sin@correo.com'}@</Label>
                                    </Col>
                                    <Col>
                                        <Input type='checkbox' />
                                        <Label> {' '}Adjuntar Archivo XML</Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className='bg-black text-center py-4'>
                                        <Label className=''>Correo Activo:</Label>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    {/* table */}
                    <Row>
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={[
                                { Header: 'Observación', accessor: 'ob' },
                                { Header: 'Fecha', accessor: 'fecha' },
                                { Header: 'Usuario', accessor: 'usuario' },
                                { Header: 'Maquina', accessor: 'maquina' },
                                { Header: 'Cod Error', accessor: 'codigo_error' },
                                { Header: 'Ambiente', accessor: 'Ambiente' },
                                { Header: 'Informacion Adicional', accessor: 'info_adcional' },
                            ]}
                            data={[]}
                            selectItemRow={setSelectItemRow}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-light border'
                            tbodyClass='bg-light'
                            styleHeight='100px'
                            overflowY='hidden'
                        />
                    </Row>
                </ModalBody>
            </Modal>
            <ToastContainer />

        </>
    )
}

export default ModalFacturacionElectronica