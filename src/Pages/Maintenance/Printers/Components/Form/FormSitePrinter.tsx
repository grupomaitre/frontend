import { FC, useEffect, useMemo, useState } from 'react'
import { addSitePrinter, deleteSitePrinter, editSitePrinter, getSitePrinter } from '../../Api/ApiSitePrinter'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, FormFeedback, Input, Label, Row } from 'reactstrap'
import * as Yup from "yup"
import { useFormik } from "formik"
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
interface Iform {
    sitioImpresora: string
    status: boolean
}
interface Ipros {
    onCloseClick: any
    getDocumentWithSitio: () => void
}
const FormSitePrinter: FC<Ipros> = ({ onCloseClick, getDocumentWithSitio }) => {
    const [status, setStatus] = useState(true)
    const [formPrinter, setformPrinter] = useState<Iform>({
        sitioImpresora: '',
        status: false
    })
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    const [setSelecRow, setSetSelecRow] = useState<any>({})
    const [data, setData] = useState([])
    const listSitePrinter = async () => {
        const res: any = await getSitePrinter()
        setData(res.data)
    }
    const columns = useMemo(() => [
        {
            Header: 'sitio_impresora',
            accessor: 'sitio_impresora'
        },

    ], [])
    useEffect(() => {
        listSitePrinter()
    }, [])

    useEffect(() => {

        if (isEdit) {
            setformPrinter(
                {
                    sitioImpresora: setSelecRow?.sitio_impresora,
                    status: setSelecRow?.status
                }
            )
        }

    }, [setSelecRow, isEdit])

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            sitioImpresora: (formPrinter && formPrinter.sitioImpresora) || "",
            status: (formPrinter && formPrinter.status) || "",



        },
        validationSchema: Yup.object({
            sitioImpresora: Yup.string().required("Campo requerido"),


        }),
        onSubmit: (values) => {
            console.log(values)
            if (isEdit) {
                const updateformPrinter = {
                    sitio_impresora: values.sitioImpresora,
                    status: values.status

                }
                editSitePrinter(setSelecRow?.id_sitio_impresora, updateformPrinter).then((data: any) => {
                    if (data.status) {
                        listSitePrinter()
                        getDocumentWithSitio()
                    }
                })
                validation.resetForm();
                setIsEdit(false)
                setIsDelete(false)
                setformPrinter({
                    sitioImpresora: '',
                    status: true
                })
            }
            else {
                const newAsignPrinter = {
                    sitio_impresora: values["sitioImpresora"],
                    status: status,

                };

                addSitePrinter(newAsignPrinter).then((data: any) => {
                    if (data.status) {
                        listSitePrinter()
                        getDocumentWithSitio()
                    }
                })
                validation.resetForm();
            }
        },

    })
    useEffect(() => {
        if (setSelecRow === null) {
            setIsEdit(false)
            setIsDelete(false)
        } else {
            setIsEdit(true)
            setIsDelete(true)
        }

    }, [setSelecRow])
    const handleDetele = () => {
        deleteSitePrinter(setSelecRow?.id_sitio_impresora).then((data: any) => {
            if (data.status) {
                setIsEdit(false)
                setIsDelete(false)
                listSitePrinter()
                getDocumentWithSitio()
                validation.resetForm()
                setformPrinter({
                    sitioImpresora: '',
                    status: true
                })

            }
        })
    }
    const handleResetForm = () => {
        setformPrinter({
            sitioImpresora: '',
            status: true
        })
        validation.resetForm()
        setIsEdit(false)
        setIsDelete(false)
    }
    return (
        <div className='text-white'>
            <Form
                className='text-white'
                onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                }}
            >

                <Card >
                    <CardHeader className='bg-primary text-white'>
                        {'Sitio de Impresora'}
                    </CardHeader>
                    <CardBody className='fs-13'>
                        <Row className=' mb-2'>
                            <Col lg='5'>
                                <Label>Sitio Impresora</Label>
                            </Col>
                            <Col lg='7'>
                                <Input
                                    type="text"
                                    className="form-control shadow-sm"
                                    bsSize='sm'
                                    name="sitioImpresora"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.sitioImpresora || ""}
                                    invalid={
                                        validation.touched.sitioImpresora &&
                                            validation.errors.sitioImpresora
                                            ? true
                                            : false
                                    }
                                />
                                {validation.touched.sitioImpresora &&
                                    validation.errors.sitioImpresora ? (
                                    <FormFeedback type="invalid">
                                        {validation.errors.sitioImpresora}
                                    </FormFeedback>
                                ) : null}
                            </Col>

                        </Row>
                        <Row>
                            <Col lg='5'>
                                <Label htmlFor='estado' className='cursor-pointer'>
                                    {
                                        status ? 'Activo' : 'Desactivo'
                                    }
                                </Label>
                            </Col>
                            <Col lg='7'>
                                <Input
                                    id='estado'
                                    type="checkbox"
                                    className="form-control custom-input"
                                    name="status"
                                    checked={status}
                                    onChange={() => setStatus(!status)}
                                />

                            </Col>
                        </Row>
                        <Row className='my-2'>

                            <TableGeneric
                                showFilter={true}
                                showFooter={false}
                                columns={columns || []}
                                data={data || []}
                                selectItemRow={setSetSelecRow}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-11 fw-light border'
                                tbodyClass='bg-light'
                                styleHeight='130px'
                                overflowY='scroll'
                            />
                        </Row>

                    </CardBody>
                    <CardFooter>
                        <div className='d-flex gap-1'>
                            <Button
                                block
                                color="primary">
                                {
                                    isEdit ? 'Editar' : 'Guardar'
                                }
                            </Button>
                            <Button
                                outline
                                block
                                color="secondary"
                                onClick={() => handleResetForm()}
                            >Limpiar</Button>
                            {isDelete && <Button
                                color='danger'
                                className='border-0 rounded-0'
                                onClick={() => handleDetele()}
                            >
                                Borrar
                            </Button>}
                            <Button
                                outline
                                color='danger'
                                block
                                onClick={() => onCloseClick()}
                            >
                                {'Cerrar'}
                            </Button>

                        </div>
                    </CardFooter>
                </Card>
            </Form>
        </div>
    )
}

export default FormSitePrinter