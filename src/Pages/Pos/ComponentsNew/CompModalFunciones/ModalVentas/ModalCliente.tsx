import { FC, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
interface IProps {
    show: boolean
    onCloseClick: () => void
}

import { getClientes } from '../../../Helpers/Apiclientes'
import { InterfaceGetApi } from '../../../../../interfaces/IApi'
import { useDispatch, useSelector } from 'react-redux'
import { setClientePos } from '../../../../../slices/PointSale/pointSaleSlice'
const ModalCliente: FC<IProps> = ({
    show, onCloseClick
}) => {
    const dispatch = useDispatch()
    const cliente = useSelector((state: any) => state.pointSaleSlice.clientePos)
    const [clients, setClients] = useState<any>([])
    const [idCliente, setIdCliente] = useState()
    const [formClient, setFormClient] = useState<any>({
        name: null,
        dni: null,
        cellPhone: null,
        address: null,
        email: null,
        nombreComercial: null,
        copiaEmail: null,
        convenioMatriz: null,
        provincia: null,
        ciudad: null,
        sector: null,
        ruta: null,
        observacion: null,
        fechaNacimiento: null
    })
    //setCliente
    useEffect(() => {
        if (cliente) {
            setFormClient({
                name: cliente.name || null,
                dni: cliente.dni || null,
                cellPhone: cliente.cellPhone || null,
                address: cliente.address || null,
                email: cliente.email || null,
                nombreComercial: cliente.nombreComercial || null,
                copiaEmail: cliente.copiaEmail || null,
                convenioMatriz: cliente.convenioMatriz || null,
                provincia: cliente.provincia || null,
                ciudad: cliente.ciudad || null,
                sector: cliente.sector || null,
                ruta: cliente.ruta || null,
                observacion: cliente.observacion || null,
                fechaNacimiento: cliente.fechaNacimiento || null,
            })
        }
    }, [cliente])
    const inputRefSelect = useRef<any | null>(null)
    const inputRefname = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        getClientes().then((data: InterfaceGetApi) => {
            if (data.status) {
                setClients((data.data || []).map((item: any) => (
                    {
                        value: item?.id_cliente,
                        label: item?.razon_social,
                        name: item?.razon_social,
                        dni: item?.identificacion,
                        cellPhone: item?.celular,
                        address: item?.direccion,
                        email: item?.email
                    }
                )
                ))
            }
        }

        )
    }, [])
    const [showAllform, setShowAllform] = useState(false)
    const handleChangeInput = (e: any) => {
        setFormClient((prev: any) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    const handleChangeSelect = (e: any) => {
        setIdCliente(e.value)
        setFormClient((prev: any) => (
            {
                ...prev,
                name: e.name,
                dni: e.dni,
                cellPhone: e.cellPhone,
                address: e.address,
                email: e.email,
                value: e.value
            }
        ))
    }
    const handleSaveCliente = async () => {
        dispatch(setClientePos(formClient))
        onCloseClick()
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg'>
            <ModalHeader toggle={onCloseClick}>
            </ModalHeader>
            <ModalBody className='fs-11'>
                <Card>

                    <CardBody>
                        <Row className='mb-1'>
                            <Col lg='2'>
                                <Label>Buscar</Label>
                            </Col>
                            <Col>
                                <Select
                                    ref={inputRefSelect}
                                    className='text-black'
                                    options={clients}
                                    // defaultValue={clients.find((option: any) => option.value === cliente?.datos_cliente?.id_cliente)}
                                    onChange={handleChangeSelect}
                                    placeholder='Búsqueda(Empresa / persona cédula / ruc telefono'
                                    styles={
                                        {
                                            control: (base: any) => ({
                                                ...base,
                                                height: '35px',
                                                minHeight: '35px',
                                                fontSize: '12px',
                                                background: 'rgb(255, 175, 95,0.6)'
                                            }),

                                        }
                                    }
                                />
                            </Col>
                        </Row>

                        <Row className='mb-2'>
                            <Col lg='2'>Nombre / Empresa</Col>
                            <Col lg=''>
                                <Input
                                    innerRef={inputRefname}
                                    defaultValue={formClient?.name}
                                    name='name'
                                    bsSize='sm'
                                    onChange={handleChangeInput}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg='9'>
                                <Row className='mb-1'>
                                    <Col lg='3'>Ruc/Cédula</Col>
                                    <Col>
                                        <Input
                                            defaultValue={formClient?.dni}
                                            name='dni'
                                            bsSize='sm'
                                            onChange={handleChangeInput}
                                        />
                                    </Col>

                                </Row>
                                <Row className='mb-1'>
                                    <Col lg='2'>Telefono

                                    </Col>
                                    <Col lg='1'>
                                        <Button
                                            color='white'
                                            className='border fs-11'
                                            size='sm'
                                        >s/n</Button>
                                    </Col>
                                    <Col>
                                        <Input
                                            defaultValue={formClient?.cellPhone}
                                            name='cellPhone'
                                            onChange={handleChangeInput}
                                            bsSize='sm' />
                                    </Col>

                                </Row>
                                <Row className='mb-1'>
                                    <Col lg='2'> Dirección</Col>
                                    <Col lg='1'>
                                        <Button
                                            color='white'
                                            className='border fs-11'
                                            size='sm'
                                        >s/n</Button>
                                    </Col>
                                    <Col>
                                        <Input
                                            defaultValue={formClient?.address}
                                            name='address'
                                            onChange={handleChangeInput}
                                            bsSize='sm' />
                                    </Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col lg='2'>Email</Col>
                                    <Col lg='1'>
                                        <Button
                                            color='white'
                                            className='border fs-11'
                                            size='sm'
                                        >s/n</Button>
                                    </Col>
                                    <Col>
                                        <Input
                                            name='email'
                                            onChange={handleChangeInput}
                                            //    defaultValue={formClient?.email}
                                            bsSize='sm' />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg='3'>
                                <Button block color='light border mb-1 bg-orange text-white'
                                    onClick={handleSaveCliente}
                                    style={{ height: '58px' }}>
                                    Continuar
                                </Button>
                                <Button block color='' className='border shadow-sm' >
                                    Consumidor Final
                                </Button>
                            </Col>
                        </Row>
                        <Row className='d-flex align-items-center'>
                            <Col lg='2'>
                                <Label>Tipo de Crédito</Label>
                            </Col>
                            <Col lg='3'>
                                <Input type='select' bsSize='sm' onChange={(e) => console.log(e.target.value)} />
                            </Col>
                            <Col lg='2'>
                                <Label>Vendedor</Label>
                            </Col>
                            <Col lg='3'>
                                <Input type='select' bsSize='sm' onChange={(e) => console.log(e.target.value)} />
                            </Col>
                            <Col className=''>
                                <Button
                                    onClick={() => setShowAllform(!showAllform)}
                                    color='info'
                                    className='text-white'
                                    size='sm'>
                                    Más
                                </Button>
                            </Col>
                        </Row>
                        {
                            showAllform &&
                            <>
                                <Row className='mt-2 mb-1'>
                                    <Col lg='2'>
                                        <Label>Nombre Comercial</Label>
                                    </Col>
                                    <Col>
                                        <Input bsSize='sm' name='nombreComercial' onChange={handleChangeInput}
                                            defaultValue={formClient?.nombreComercial}
                                        />
                                    </Col>
                                </Row>

                                <Row className='mb-1'>
                                    <Col lg='2'>
                                        <Label>Copia Email</Label>
                                    </Col>
                                    <Col>
                                        <Input
                                            bsSize='sm'
                                            name='copiaEmail'
                                            onChange={handleChangeInput}
                                            defaultValue={formClient?.copiaEmail}
                                        />
                                    </Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col lg='2'>
                                        <Label>Convenio / Matriz </Label>
                                    </Col>
                                    <Col>
                                        <Input
                                            bsSize='sm'
                                            name='convenioMatriz'
                                            defaultValue={formClient?.convenioMatriz}
                                            onChange={handleChangeInput}
                                            style={{ background: 'rgb(255, 227, 144)' }} />
                                    </Col>


                                </Row>
                                <Row className='mb-1 align-items-center'>

                                    <Col lg='2'>
                                        <Label>Provincia</Label>
                                    </Col>
                                    <Col lg='4'>
                                        <Input
                                            bsSize='sm'
                                            name='provincia'
                                            defaultValue={formClient?.provincia}
                                            onChange={handleChangeInput}
                                        />
                                    </Col>

                                    <Col lg='2'>
                                        <Label>Ciudad</Label>

                                    </Col>

                                    <Col lg='4'>
                                        <Input
                                            bsSize='sm'
                                            name='ciudad'
                                            defaultValue={formClient?.ciudad}
                                            onChange={handleChangeInput}
                                        />
                                    </Col>

                                </Row>
                                <Row className='mb-1'>

                                    <Col lg='2'>
                                        <Label>Sector</Label>
                                    </Col>

                                    <Col lg='4'>
                                        <Input
                                            bsSize='sm'
                                            name='sector'
                                            defaultValue={formClient?.sector}
                                            onChange={handleChangeInput}

                                        />
                                    </Col>

                                    <Col lg='2'>
                                        <Label>Ruta</Label>

                                    </Col>

                                    <Col lg='4'>
                                        <Input
                                            bsSize='sm'
                                            name='ruta'
                                            defaultValue={formClient?.ruta}
                                            onChange={handleChangeInput}
                                        />
                                    </Col>
                                </Row>
                                <Row className='mb-1'>
                                    <Col lg='2'>
                                        <Label>Como Nos Conoció</Label>
                                    </Col>
                                    <Col>
                                        <div className="input-group">
                                            <Input type="select" bsSize='sm' onChange={(e) => console.log(e.target.value)} />
                                            <Button
                                                outline
                                                size='sm'
                                                className="" >...</Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg='2'>
                                        <Label>Observación</Label>
                                    </Col>
                                    <Col lg='4'>
                                        <Input
                                            bsSize='sm'
                                            name='observacion'
                                            defaultValue={formClient?.observacion}
                                            onChange={handleChangeInput}

                                        />
                                    </Col>
                                    <Col lg='3'>
                                        <Label>Fecha de Nacimiento</Label>
                                    </Col>
                                    <Col lg='3'>
                                        <Input
                                            bsSize='sm'
                                            type='date'
                                            name='fechaNacimiento'
                                            defaultValue={formClient?.fechaNacimiento}
                                            onChange={handleChangeInput}
                                        />
                                    </Col>
                                </Row>
                            </>
                        }
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal>
    )
}
export default ModalCliente