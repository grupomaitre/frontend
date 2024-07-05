import { useFormik } from "formik";
import { useState, useEffect, useMemo } from "react"
import * as Yup from "yup";

import FormPrinters from "./Components/FormPrinters";
import { getPrinterList } from "./Api/ApiPrinters"
import TableGeneric from "../../../common/Generics/Table/TableGeneric";
import { addAssignPrinter, editAssignPrinter, getAssignPrinter } from "./Api/ApiAssignPrinter"
import { deleteDocument } from "./Api/ApiDocumentos";
import Header from "../../../Layouts/Header";
import { Card, CardBody, Col, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
const Printers = () => {
    const terminal = (localStorage.getItem('terminal') || '')
    const [hostname, setNameHost] = useState('')
    const [data, setData] = useState([])
    const [listAsigPrint, setListAsigPrint] = useState([])
    const [isEditProduct, setIsEditProduct] = useState<any>()
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [formPrinter, setformPrinter] = useState<any>({
        code: 0,
        typePrint: '',
        routerPrint: '',
        copiesPrint: 0,
        documento: null,
        idFormtPrint: 0,
        tipo_puerto: ''
    })
    useEffect(() => {

        if (isEdit) {
            setformPrinter({
                code: isEditProduct?.id_asignacion_impresora || null,
                typePrint: isEditProduct?.id_tipo_impresora || null,
                routerPrint: isEditProduct?.direccion_impresora || null,
                copiesPrint: isEditProduct?.copias || null,
                documento: isEditProduct?.id_documento || null,
                idFormtPrint: isEditProduct?.id_formato_impresora,
            })
        }

    }, [isEditProduct, isEdit])
    const getPrint = async () => {
        const result = await getPrinterList()
        setData(result)
    }
    useEffect(() => { getPrint() }, [])
    const columns = useMemo(() => [
        {
            Header: 'Dirección impresora',
            accessor: 'direccion_impresora'
        },
        {
            Header: 'Documento',
            accessor: 'nombre'
        },

    ], [])

    const listPrintAsgin = async () => {
        getAssignPrinter().then((data: any) => {
            setListAsigPrint(data.data)
        })
    }

    useEffect(() => {
        listPrintAsgin()
    }, [])


    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            code: (formPrinter && formPrinter.code) || "",
            typePrint: (formPrinter && formPrinter.typePrint) || "",
            routerPrint: (formPrinter && formPrinter.routerPrint) || "",
            copiesPrint: (formPrinter && formPrinter.copiesPrint) || 1,
            documento: (formPrinter && formPrinter.documento) || "",
            idFormtPrint: (formPrinter && formPrinter.idFormtPrint),
            tipo_puerto: (formPrinter && formPrinter.tipo_puerto),

        },
        validationSchema: Yup.object({
            routerPrint: Yup.string().required("Campo requerido"),


        }),
        onSubmit: (values) => {

            if (isEdit) {
                const updateformPrinter = {
                    idFormtPrint: values.typePrint,
                    id_tipo_impresora: values.typePrint,
                    direccion_impresora: values.routerPrint,
                    copias: values.copiesPrint,
                    id_documento: values.documento,
                    sw_informacion: null,
                    sw_empresa: null,
                    sw_productos: null,
                    maquina: hostname,
                    id_empresa: null,
                    sw_totales: null,

                }
                editAssignPrinter(values.code, updateformPrinter).then((data: any) => {
                    if (data.status) {
                        listPrintAsgin()
                    }
                })
                validation.resetForm();
                setIsEdit(false)
                setIsDelete(false)
                setformPrinter({})
            }
            else {
                const newAsignPrinter = {
                    idFormtPrint: values["idFormtPrint"] || 1,
                    id_tipo_impresora: values["typePrint"],
                    direccion_impresora: values['routerPrint'],
                    tipo_puerto: values['tipo_puerto'],
                    copias: values["copiesPrint"],
                    id_documento: values["documento"],
                    sw_informacion: null,
                    sw_empresa: null,
                    sw_productos: null,
                    maquina: terminal,
                    id_empresa: null,
                    sw_totales: null,
                };

                addAssignPrinter(newAsignPrinter).then((data: any) => {
                    if (data.status) {
                        listPrintAsgin()
                    }
                })
                validation.resetForm();
            }
        },

    })
    useEffect(() => {
        if (isEditProduct) {
            setIsEdit(true)
            setIsDelete(true)
        }

    }, [isEditProduct])
    const handleDetele = () => {
        deleteDocument(formPrinter.code).then((data: any) => {
            if (data.status) {
                setIsEdit(false)
                setIsDelete(false)
                listPrintAsgin()
                validation.resetForm()
                setformPrinter({})
            }
        })
    }


    return (
        <div className='' style={{ background: '#ecf0f1' }}>
            <Header link="/dashboard" />

            <Row className="mb-1">
                <Col className="mx-2">
                    <BreadCrumb
                        pageTitle="Matenimiento / Comandas"
                        title="Comandas"
                    />
                </Col>
            </Row>


            <Row className="">
                <Col className="mx-2">
                    <FormPrinters
                        validation={validation || null}
                        print={data || []}
                        isEdit={isEdit}
                        setIsEdit={() => setIsEdit(false)}
                        setformPrinter={() => setformPrinter({})}
                        isDelete={isDelete}
                        setIsDelete={() => setIsDelete(false)}
                        handleDetele={handleDetele}
                        setIsNameHost={setNameHost}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="mx-2">
                    <Card>
                        <CardBody>

                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={listAsigPrint || []}
                                selectItemRow={setIsEditProduct}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                thClass='fs-12 fw-light border-light border page-bg text-white p-1'
                                tdClass='fs-11 border px-1 py-1'
                                tbodyClass='bg-light'
                                styleHeight='130px'
                                overflowY='scroll'
                            />
                        </CardBody>
                    </Card>

                </Col>
            </Row>
        </div>
    )
}
export default Printers