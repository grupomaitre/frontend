import { Button, Col, Form, Input, Label, Row } from 'reactstrap'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import InputCommon from '../../../../common/Inputs/InputCommon'
import HeaderTools from '../../../../common/Ui/HeaderTools'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { useDocs } from './useDocuments'
import useColumnsDocs from './useColumnsDocs'

const UseFormDocs = () => {
    const inputRefDoc = useRef<HTMLInputElement>(null)
    useEffect(() => {

        inputRefDoc.current?.focus()

    }, [])

    const [isEdit, setIsEdit] = useState(false)
    const [selectRow, setSelecRow] = useState<any>()
    const [itmesForm, setItemsForm] = useState({
        documento: '',
        secuencial: '',
        numeracion: '',
        autorizacion: '',
        direccion_ip: '',
        observacion_ip: '',
        desde: '',
        hasta: '',
        establecimiento: '',
        sucursal: '',
        direccion: '',
    })
    //Formik
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            documento: (itmesForm && itmesForm?.documento) || '',
            secuencial: (itmesForm && itmesForm?.secuencial) || '',
            numeracion: (itmesForm && itmesForm?.numeracion) || '',
            autorizacion: (itmesForm && itmesForm?.autorizacion) || '',
            direccion_ip: (itmesForm && itmesForm?.direccion_ip) || '',
            observacion_ip: (itmesForm && itmesForm?.observacion_ip) || '',
            desde: (itmesForm && itmesForm?.desde) || '',
            hasta: (itmesForm && itmesForm?.hasta) || '',
            establecimiento: (itmesForm && itmesForm?.establecimiento) || '',
            sucursal: (itmesForm && itmesForm?.sucursal) || '',
            direccion: (itmesForm && itmesForm?.direccion) || '',
        },
        validationSchema: Yup.object({
            //validaciones
            documento: Yup.string().required('Campo requerido'),
            secuencial: Yup.string().required('Secuencial Incorrecto'),
        }),
        //send form
        onSubmit: (values) => {
            if (isEdit) {
                //editar
                const updateForm = {
                    documento: values.documento,
                    secuencial: values.secuencial,
                    numeracion: values.numeracion,
                    autorizacion: values.autorizacion,
                    direccion_ip: values.direccion_ip,
                    observacion_ip: values.observacion_ip,
                    desde: values.desde,
                    hasta: values.hasta,
                    establecimiento: values.establecimiento,
                    sucursal: values.sucursal,
                    direccion: values.direccion,
                }
                console.log(updateForm)
            }
            else {
                const newValues = {
                    documento: values['documento'],
                    secuencial: values["secuencial"],
                    numeracion: values["numeracion"],
                    autorizacion: values["autorizacion"],
                    direccion_ip: values["direccion_ip"],
                    observacion_ip: values["observacion_ip"],
                    desde: values["desde"],
                    hasta: values["hasta"],
                    establecimiento: values["establecimiento"],
                    sucursal: values["sucursal"],
                    direccion: values["direccion"],
                }
                console.log(newValues)
                query.isRefetching
                validation.resetForm()
                inputRefDoc.current?.focus()

            }
        }
    })
    useEffect(() => {
        setItemsForm({
            documento: '',
            secuencial: '',
            numeracion: '',
            autorizacion: '',
            direccion_ip: '',
            observacion_ip: '',
            desde: '',
            hasta: '',
            establecimiento: '',
            sucursal: '',
            direccion: '',
        })
    }, [isEdit])
    const itemTools = [
        {
            title: 'Herramientas', subItems: [
                { text: 'Limpiar', onClick: () => console.log('/printers') },
                { text: 'Crear o Guardar', onClick: () => validation.handleSubmit() },
                { text: 'Eliminar', onClick: () => console.log(true) },
                { text: 'Salir', onClick: () => console.log(true) },
            ]
        },
    ]
    const checkbox = [
        { label: 'Activo', value: 'Activo' },
        { label: 'Visible', value: 'Visible' },
        { label: 'Imprime', value: 'Imprime' },
        { label: 'No contabilizar', value: 'No contabilizar' },
        { label: 'Imprimir sin confirmacion', value: 'Imprimir sin confirmacion' },
    ]

    const query = useDocs()
    const columns = useColumnsDocs()
    return (
        <>
            <Row>
                <div className='bg-gray  mb-3'>
                    <HeaderTools
                        itemTools={itemTools}
                        classToggle='p-0 px-1 py-1'
                    />
                </div>
            </Row>
            <Row>
                <Col>

                    <Form className=''
                        onSubmit={(e) => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false;
                        }}
                    >
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">Documentos:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    innerRef={inputRefDoc}
                                    nameInput={'documento'}
                                    validation={validation}
                                    validationValue={validation.values.documento}
                                    validationTouched={validation.touched.documento}
                                    validationErrors={validation.errors.documento}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">secuencial:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'secuencial'}
                                    validation={validation}
                                    validationValue={validation.values.secuencial}
                                    validationTouched={validation.touched.secuencial}
                                    validationErrors={validation.errors.secuencial}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">numeracion:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'numeracion'}
                                    validation={validation}
                                    validationValue={validation.values.numeracion}
                                    validationTouched={validation.touched.numeracion}
                                    validationErrors={validation.errors.numeracion}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">autorizacion:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'autorizacion'}
                                    validation={validation}
                                    validationValue={validation.values.autorizacion}
                                    validationTouched={validation.touched.autorizacion}
                                    validationErrors={validation.errors.autorizacion}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">direccion_ip:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'direccion_ip'}
                                    validation={validation}
                                    validationValue={validation.values.direccion_ip}
                                    validationTouched={validation.touched.direccion_ip}
                                    validationErrors={validation.errors.direccion_ip}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">observacion_ip:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'observacion_ip'}
                                    validation={validation}
                                    validationValue={validation.values.observacion_ip}
                                    validationTouched={validation.touched.observacion_ip}
                                    validationErrors={validation.errors.observacion_ip}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">desde:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'desde'}
                                    validation={validation}
                                    validationValue={validation.values.desde}
                                    validationTouched={validation.touched.desde}
                                    validationErrors={validation.errors.desde}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">hasta:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'hasta'}
                                    validation={validation}
                                    validationValue={validation.values.hasta}
                                    validationTouched={validation.touched.hasta}
                                    validationErrors={validation.errors.hasta}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">establecimiento:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'establecimiento'}
                                    validation={validation}
                                    validationValue={validation.values.establecimiento}
                                    validationTouched={validation.touched.establecimiento}
                                    validationErrors={validation.errors.establecimiento}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">sucursal:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'sucursal'}
                                    validation={validation}
                                    validationValue={validation.values.sucursal}
                                    validationTouched={validation.touched.sucursal}
                                    validationErrors={validation.errors.sucursal}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-1" >
                            <Col lg='4'>
                                <Label className=" text-capitalize">direccion:</Label>
                            </Col>
                            <Col lg=''>

                                <InputCommon
                                    nameInput={'direccion'}
                                    validation={validation}
                                    validationValue={validation.values.direccion}
                                    validationTouched={validation.touched.direccion}
                                    validationErrors={validation.errors.direccion}
                                />
                            </Col>
                        </Row>

                    </Form>
                </Col>
                <Col lg='6' className="text-center">
                    {query.isFetching ? (
                        <span className="text-center">Cargando...</span>
                    ) : query.isError ? (
                        <span className="text-danger text-center">Error al Cargar</span>
                    ) : (
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={query.data || []}
                            selectItemRow={setSelecRow}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-bold border'
                            tdClass={'fs-10'}
                            tbodyClass='bg-light'
                            styleHeight='130px'
                            overflowY='scroll'
                        />
                    )}

                    <div className="d-flex align-items-center justify-content-start flex-wrap my-2">
                        {
                            checkbox.map((item, key) => (
                                <div className="form-check  mx-1" key={key} >
                                    <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={item.value}
                                    />
                                    <Label
                                        className="form-check-label"
                                        htmlFor={item.value}
                                    >
                                        {item.label}
                                    </Label>
                                </div>
                            ))
                        }
                    </div>
                    {/* select rows  */}
                    {false && <>
                        <Row>
                            <Col lg='12 '>
                                <Label className="bg-black text-capitalize w-100 text-center p-2"
                                    style={{ color: '#00cccc' }}
                                >Comprobantes Auxiliares:</Label>

                            </Col>
                        </Row>
                        <Row className="mb-3 d-flex align-items-center" >
                            <Col lg='2'>
                                <Label className=" text-capitalize">Serie:</Label>
                            </Col>
                            <Col lg='4'>
                                <Input type="text"
                                    className="custom-input rounded-0"
                                />
                            </Col>
                            <Col lg='3'>
                                <Input type="checkbox" />
                                <Label className=" text-capitalize mx-1">No Contabiliza</Label>
                            </Col>
                            <Col lg='3'>
                                <Input type="checkbox" />
                                <Label className=" text-capitalize mx-1">No Ats</Label>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg='2'>
                                <Label className=" text-capitalize">Descripción</Label>
                            </Col>
                            <Col lg=''>
                                <Input type="text"
                                    className="rounded-0"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col lg='6'>
                                <Input type="checkbox" />
                                <Label className=" text-capitalize">Prederterminado</Label>
                            </Col>
                            <Col lg='6' >
                                <div className="float-end">
                                    <Button color="light" size="sm" className="me-2 ">Agregar</Button>
                                    <Button color="light" size="sm" >Eliminar</Button>
                                </div>
                            </Col>
                        </Row>
                        {/*   <Row>
                                      <TableGeneric
                                          showFilter={false}
                                          showFooter={false}
                                          columns={[
                                              {
                                                  Header: 'serie',
                                                  accessor: 'serie',
                                              },
                                              {
                                                  Header: 'predeterminado',
                                                  accessor: 'predeterminado',
                                              },
                                              {
                                                  Header: 'No Cont',
                                                  accessor: 'no_cont',
                                              },
                                              {
                                                  Header: 'no ats',
                                                  accessor: 'no_ats',
                                              },
        
                                          ] || []}
                                          data={[]}
                                          selectItemRow={setSelecRow}
                                          divClass='table-responsive text-black bg-table'
                                          tableClass='cursor-pointer w-100'
                                          theadClass='position-sticky top-0 bg-table '
                                          thClass='fs-11 fw-bold border'
                                          tdClass={'fs-10'}
                                          tbodyClass='bg-light'
                                          styleHeight='100px'
                                          overflowY='hidden'
                                      />
                                  </Row> */}
                    </>}
                </Col>
            </Row>
        </>
    )
}
export default UseFormDocs