import { FC, useEffect, useMemo, useState } from 'react'
import { Form } from 'reactstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Col, Input, Label, Row, Table } from 'reactstrap'
import TableGeneric from '../../../common/Generics/Table/TableGeneric'
import ModalAlert from '../../../common/Generics/Modal/ModalAlert'
import { toastError } from '../../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'
import ModalFacturacionElectronica from '../../../common/Facturacion/ModalFacturacionElectronica'
import { useSelector } from 'react-redux'
import InputCommon from '../../../common/Inputs/InputCommon'
import ModalCliente from '../../Pos/ComponentsNew/CompModalFunciones/ModalVentas/ModalCliente'
import { verificarRuc } from '../../../Func/VerificarCedula'
interface IProp {
    onCloseClick: () => void
}
const CobrarPos: FC<IProp> = ({ onCloseClick }) => {
    const cliente = useSelector((state: any) => state.pointSaleSlice.clientePos)
    const [isEdit, setIsEdit] = useState(false)
    const [showModalCliente, setShowModalCliente] = useState(false)
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [showFactura, setShowFactura] = useState<boolean>(false)
    const [selectItemRow, setSelectItemRow] = useState<any>()
    const [itmesForm, setItemsForm] = useState({
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
    const columns = useMemo(
        () => [
            {
                Header: 'Documentos',
                accessor: 'name',
                Cell: ({ row }: any) => (
                    <Button
                        color='primary'
                        className=' w-100'
                        block
                        size='lg'
                        type='submit'
                        onDoubleClick={handleDoubleClick}

                    >
                        <span >{row.original.name}</span>
                    </Button>
                ),
            }
        ],
        []
    );
    const listAnulacion = [
        {
            id: 1,
            name: 'Consumidor final'
        },
        {
            id: 2,
            name: 'Factura 001-002'
        },
        {
            id: 3,
            name: 'Factura 001-002'
        },
        {
            id: 4,
            name: 'Factura 001-002'
        },
        {
            id: 5,
            name: 'Factura 001-002'
        },
        {
            id: 6,
            name: 'Factura 001-002'
        },
        {
            id: 7,
            name: 'Factura 001-002'
        },
        {
            id: 8,
            name: 'Ticket'
        },
    ]

    const [listDocs, setListDocs] = useState([{}])
    useEffect(() => {
        setListDocs(listAnulacion)
    }, [])
    const handleAceptar = () => {
        setShowFactura(true)
        setShowConfirm(false)
    }
    useEffect(() => {
        if (cliente) {
            setItemsForm({
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
    //Formik
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (itmesForm && itmesForm?.name) || '',
            dni: (itmesForm && itmesForm?.dni) || 0,
            cellPhone: (itmesForm && itmesForm?.cellPhone) || '',
            address: (itmesForm && itmesForm?.address) || '',
            email: (itmesForm && itmesForm?.email) || '',
            nombreComercial: (itmesForm && itmesForm?.nombreComercial) || '',
            copiaEmail: (itmesForm && itmesForm?.copiaEmail) || '',
            convenioMatriz: (itmesForm && itmesForm?.convenioMatriz) || '',
            provincia: (itmesForm && itmesForm?.provincia) || '',
            ciudad: (itmesForm && itmesForm?.ciudad) || '',
            sector: (itmesForm && itmesForm?.sector) || '',
            ruta: (itmesForm && itmesForm?.ruta) || '',
            observacion: (itmesForm && itmesForm?.observacion) || '',
            fechaNacimiento: (itmesForm && itmesForm?.fechaNacimiento) || '',
        },
        validationSchema: Yup.object({
            //validaciones
            name: Yup.string().required('Campo requerido'),
            dni: Yup.string()
                .matches(/^[0-9]*$/, 'La cédula debe contener solo números')
                .min(10, 'La cédula debe tener 10 dígitos')
                .max(13, 'La cédula debe tener 13 dígitos')
                .required('Campo requerido'),
            email: Yup.string().required('Campo requerido'),
        }),
        //send form
        onSubmit: (values) => {
            console.log('entro??')
            return
            if (isEdit) {
                //editar
                const updateForm = {
                    razon_social: values.name || 0.00,
                }
            }
            else {
                const newValues = {
                    name: values['name'],
                }
            }
        }
    })
    const handleDoubleClick = () => {
        validation.handleSubmit()
        return
        if (selectItemRow) {
            setShowConfirm(true)
        } else {
            toastError({ title: 'Selecione Un Documento' })
        }
    }
    const handleverificar_ruc = () => {
        const res = verificarRuc("1751622159", 1)
        console.log(res)
    }
    return (

        <>
            {showModalCliente &&
                <ModalCliente
                    show={showModalCliente}
                    onCloseClick={() => setShowModalCliente(false)}
                />
            }

            {showFactura &&
                <ModalFacturacionElectronica
                    itemFacturacion={{}}
                    onCloseClick={() => setShowFactura(false)}
                    show={showFactura}
                />
            }

            {showConfirm &&
                < ModalAlert
                    show={true}
                    onCloseClick={() => setShowConfirm(false)}
                    onAceptar={() => handleAceptar()}
                    onCancelar={() => setShowConfirm(false)}
                    text={'Desea Crear ' + `${selectItemRow?.name || ''}`}
                    showAceptar={true}
                    showCancelar={true}
                    textFs={'12'}
                    backdrop={true}
                />}
            <div className='fs-11 px-3 py-1 my-1 rounded shadow' style={{ border: '1px solid rgb(0,0,0,0.3)', background: '#d6d9df' }}>
                <Button onClick={() => handleverificar_ruc()} type='button' >Verificar cedula</Button>
                <Form className=''
                    onSubmit={(e) => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false;
                    }}
                >
                    <Row>
                        <Col lg='5' className='bg-white py-1 px-4 shadow'>
                            <Row className='mb-1'>
                                <Col lg='9'>
                                    <Label className='fs-13'>Empresa/Persona</Label>
                                </Col>
                                <Col lg='3'>
                                    <Button
                                        block
                                        outline
                                        size='sm'
                                        className='px-2'
                                        onClick={() => setShowModalCliente(true)}
                                        type='button'
                                    >Cambiar</Button>
                                </Col>
                            </Row>
                            <Row className=''>
                                <Col lg='12'>

                                    <InputCommon
                                        nameInput={'name'}
                                        inputClass={"rounded-0 fs-12"}
                                        validation={validation}
                                        validationValue={validation.values.name}
                                        validationTouched={validation.touched.name}
                                        validationErrors={validation.errors.name}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='2'>
                                    <Label>RUC/Cédula</Label>
                                </Col>
                                <Col >
                                    <InputCommon
                                        nameInput={'dni'}
                                        inputClass={"rounded-0 fs-12"}
                                        validation={validation}
                                        validationValue={validation.values.dni}
                                        validationTouched={validation.touched.dni}
                                        validationErrors={validation.errors.dni}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='2'>
                                    <Label>Teléfono</Label>
                                </Col>
                                <Col lg=''>
                                    <InputCommon
                                        nameInput={'cellPhone'}
                                        inputClass={"rounded-0 fs-12"}
                                        validation={validation}
                                        validationValue={validation.values.cellPhone}
                                        validationTouched={validation.touched.cellPhone}
                                        validationErrors={validation.errors.cellPhone}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='2'>
                                    <Label>Dirección</Label>
                                </Col>
                                <Col>
                                    <InputCommon
                                        nameInput={'address'}
                                        inputClass={"rounded-0 fs-12"}
                                        validation={validation}
                                        validationValue={validation.values.address}
                                        validationTouched={validation.touched.address}
                                        validationErrors={validation.errors.address}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='2'>
                                    <Label>Sector</Label>
                                </Col>
                                <Col>
                                    <InputCommon
                                        nameInput={'sector'}
                                        inputClass={"rounded-0 fs-12"}
                                        validation={validation}
                                        validationValue={validation.values.sector}
                                        validationTouched={validation.touched.sector}
                                        validationErrors={validation.errors.sector}
                                    />
                                </Col>
                            </Row>
                            <Row>

                                <Col lg='2'>
                                    <Label>Email</Label>
                                </Col>
                                <Col>
                                    <InputCommon
                                        nameInput={'email'}
                                        inputClass={"rounded-0 fs-11"}
                                        validation={validation}
                                        validationValue={validation.values.email}
                                        validationTouched={validation.touched.email}
                                        validationErrors={validation.errors.email}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='2'>
                                    <Label>Observación</Label>
                                </Col>
                                <Col>
                                    <Input type='text' className='rounded-0' />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg='4' className='d-flex flex-column justify-content-between gap-1'>

                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={listDocs || []}
                                selectItemRow={setSelectItemRow}
                                divClass='shadow-sm table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0  bg-table '
                                thClass='fs-11 fw-bold text-center'
                                tbodyClass='bg-light'
                                styleHeight='180px'
                                overflowY='scroll'
                            />
                            <Button
                                block
                                style={{ height: '25%', fontWeight: '100', borderRadius: '4px' }}
                                color='light'
                                onClick={() => onCloseClick()}
                                className='fs-4  shadow-sm rounded-0 border-danger text-danger'
                            >REGRESAR</Button>
                        </Col>
                        <Col>
                            <Table className='table-sm table-info' bordered striped hover>
                                <thead className="table-dark">
                                    <tr>
                                        <th colSpan={2} className='text-center'>Documentos</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Consumo Personal</td>
                                        <td>00202</td>
                                    </tr>
                                    <tr >
                                        <td >Factura 001-002</td>
                                        <td>000461</td>
                                    </tr>
                                    <tr >
                                        <td >Factura 001-002</td>
                                        <td>000461</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </Form>
            </div>
            <ToastContainer />
        </>

    )
}

export default CobrarPos