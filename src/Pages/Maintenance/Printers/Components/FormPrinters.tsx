import { FC, useEffect, useMemo, useState } from 'react'
import { Form, Row, Col, Label, Input, Button, FormFeedback, Card, CardBody, CardHeader } from 'reactstrap'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { fetchGetPrinter, getTypePrinters } from '../Api/ApiPrinters'
//import ModalTypePrinter from '../Modal/ModalTypePrinter'
import { getDocumentWithSitio } from '../Api/ApiDocumentos'
import { fetchGetNameHost } from '../Api/ApiDevice'
import { Plus } from 'react-feather'
import ModalTypePrinter from './Modal/ModalTypePrinter'
import ModalSitePrinter from './Modal/ModalSitePrinter'
import ModalDocument from './Modal/ModalDocument'
import HeaderTools from '../../../../common/Ui/HeaderTools'
import { getFormtPrinter } from '../Api/ApiFormPrints'
//import ModalSitePrinter from '../Modal/ModalSitePrinter'
interface Ipros {
    validation: any,
    print: any
    isEdit: boolean
    setIsEdit: any
    setformPrinter: any
    isDelete: boolean
    setIsDelete: any
    handleDetele: any
    setIsNameHost: any
}
const FormPrinters: FC<Ipros> = ({ validation, setIsEdit, setformPrinter, setIsDelete, setIsNameHost, handleDetele }) => {

    const [selectRow, setSelecRow] = useState<any>()
    const [typePrinter, setTyPrinter] = useState()
    const [nameHost, setNameHost] = useState()
    const [namesPrinters, setNamesPrinters] = useState([])
    const [showModalTypePrinter, setShowModalTypePrinter] = useState(false)
    const [showSitePrinter, setShowSitePrinter] = useState(false)
    const [showDocs, setShowDocs] = useState(false)
    const [listFormtPrint, setListFormtPrint] = useState<any>([])

    const columns = useMemo(() => [
        {
            Header: 'Servicios Activos',
            accessor: 'name'
        },

    ], [])
    useEffect(() => {
        if ((selectRow?.PortName || '').slice(0, 3) === "USB") {
            validation.setFieldValue('routerPrint', selectRow?.name || '')
        } else {
            validation.setFieldValue('routerPrint', selectRow?.PortName || '')
        }
    }, [selectRow])

    useEffect(() => {
        getTypePrinters().then((data: any) => {
            setTyPrinter(data.map((item: any) => (
                {
                    value: item.id_tipo_impresora,
                    label: item.tipo_impresora
                }
            )))
        })
    }, [])
    useEffect(() => {
        getFormtPrinter().then(data => {
            setListFormtPrint((data?.data || []).map((item: any) => (
                {
                    label: item?.formato_impresora,
                    value: item?.id_formato_impresora
                }
            )))
        })
    }, [])
    const getNameHost = async () => {
        const res: any = await fetchGetNameHost()
        if (res) {
            setNameHost(res?.hostname || null)
            setIsNameHost(res?.hostname || null)
        }
    }

    const getPrintExt = async () => {
        const data = await fetchGetPrinter()
        setNamesPrinters(data?.data || [])
    }

    useEffect(() => {
        getNameHost()
        getPrintExt()
    }, [])

    const [document, setDocumento] = useState<any>([])
    useEffect(() => {
        getDocumentWithSitio().then((data: any) => {
            const array1 = data.data.documentos
            const array2 = data.data.sitios
            const array3 = data.data.impresionPos
            const arrayFinal = [
                ...array1.map((item: any) => ({ value: item.id_documento, label: item.nombre })),
                ...array2.map((item: any) => ({ value: item.id_sitio_impresora, label: item.sitio_impresora, sitio: true })),
                ...array3.map((item: any) => ({ value: item.id, label: item.nombre, sitio: true }))
            ];
            setDocumento(arrayFinal)
            return
        })
    }, [showSitePrinter])
    const handleDocumentChange = (selectedOption: any) => {
        validation.setFieldValue('documento', selectedOption.target.value);
    };

    const handleTypePrintChange = (selectedOption: any) => {
        validation.setFieldValue('typePrint', selectedOption.value);
    };
    const handleResetForm = () => {
        setformPrinter()
        validation.resetForm()
        setIsEdit()
        setIsDelete()
    }
    const itemTools = [
        {
            title: 'Edición', subItems: [
                { text: 'Nuevo', onClick: () => handleResetForm() },
                { text: 'Crear o Guardar', onClick: () => validation.handleSubmit() },
                { text: 'Eliminar', onClick: () => handleDetele() },
                { text: 'Exportar Lista a Excel' },
                { text: 'Salir' }
            ]
        },
    ];
    return (
        <>
            {showModalTypePrinter
                && <ModalTypePrinter
                    show={showModalTypePrinter}
                    onCloseClick={() => setShowModalTypePrinter(false)}
                />}
            {showSitePrinter &&
                <ModalSitePrinter
                    onCloseClick={() => setShowSitePrinter(false)}
                    show={showSitePrinter}
                    getDocumentWithSitio={() => getDocumentWithSitio()}
                />}
            {
                showDocs &&
                <ModalDocument
                    show={showDocs}
                    onCloseClick={() => setShowDocs(false)}
                />
            }
            <div className='w-100 border rounded my-2 bg-white shadow mx-1'>
                <HeaderTools
                    itemTools={itemTools}
                />
            </div>
            <Form
                className='text-white'
                onSubmit={(e) => {
                    e.preventDefault();
                    //  validation.handleSubmit();
                    return false;
                }}
            >

                <Row>
                    <Col>
                        <Card>
                            <CardHeader className='bg-primary text-white p-0 p-1 '>
                                <Label className='text-capitalize fs-13'>Asignación de impresora en: {nameHost || null}</Label>
                            </CardHeader>
                            <CardBody>

                                <Row>
                                    <Col lg='' className='fs-12 '>
                                        <Row className='mb-2'>
                                            <Col lg='4'>
                                                <Label>Codigo</Label>
                                            </Col>
                                            <Col lg=''>
                                                <Input type="text" className="form-control shadow-sm"
                                                    name="code"
                                                    bsSize='sm'
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.code || ""}
                                                    invalid={
                                                        validation.touched.code &&
                                                            validation.errors.code
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.code &&
                                                    validation.errors.code ? (
                                                    <FormFeedback type="valid">
                                                        {validation.errors.code}
                                                    </FormFeedback>
                                                ) : <FormFeedback valid />}
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg='4'>
                                                <Label>Formatos </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    type='select'
                                                    bsSize='sm'
                                                    name='idFormtPrint'
                                                    className='shadow-sm'
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.idFormtPrint || 1}
                                                //  defaultValue={listFormtPrint[0]?.value}
                                                >
                                                    {
                                                        (listFormtPrint || []).map((item: any, key: number) => (
                                                            <option key={key} value={item?.value}>
                                                                {item.label}
                                                            </option>
                                                        ))
                                                    }

                                                </Input>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg='4'>
                                                <Label>Tipo de Impresora </Label>
                                            </Col>
                                            <Col lg='' className='d-flex'>


                                                <select
                                                    className="w-100 py-2 border rounded-end-0 rounded-start-1 shadow-sm"
                                                    onChange={(e) => {
                                                        handleTypePrintChange(e.target)
                                                    }}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.typePrint} // Asigna el valor del select a validation.values.documento
                                                >
                                                    {(typePrinter || []).map((item: any, key: number) => (
                                                        <option
                                                            value={item.value} // Asigna el valor correspondiente a cada opción
                                                            onChange={() => console.log('cambio')}
                                                            className="w-100 border border-bottom border-danger"
                                                            key={key}
                                                        >
                                                            {item.label}
                                                            {item.sitio}
                                                        </option>
                                                    ))}
                                                </select>

                                                <Button
                                                    size='sm'
                                                    color='primary'
                                                    className='rounded-start-0'
                                                    onClick={() => setShowModalTypePrinter(true)}
                                                >
                                                    <Plus size={15}
                                                        color='#fff'
                                                    />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg='4'>
                                                <Label>Dirreción de Impresora </Label>
                                            </Col>
                                            <Col lg=''>

                                                <Input
                                                    type="text"
                                                    className="form-control shadow-sm "
                                                    bsSize='sm'
                                                    name="routerPrint"
                                                    onChange={(e) => {
                                                        validation.handleChange(e);
                                                    }}

                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.routerPrint}
                                                    invalid={
                                                        validation.touched.routerPrint &&
                                                            validation.errors.routerPrint
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.routerPrint &&
                                                    validation.errors.routerPrint ? (
                                                    <FormFeedback type="valid">
                                                        {validation.errors.routerPrint}
                                                    </FormFeedback>
                                                ) : <FormFeedback valid />}
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg='4'>
                                                <Label>Copias Por Default </Label>
                                            </Col>
                                            <Col lg=''>
                                                <Input
                                                    type="text"
                                                    className="form-control shadow-sm  "
                                                    bsSize='sm'
                                                    name="copiesPrint"
                                                    onChange={(e) => {
                                                        validation.handleChange(e);
                                                    }}

                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.copiesPrint}
                                                    invalid={
                                                        validation.touched.copiesPrint &&
                                                            validation.errors.copiesPrint
                                                            ? true
                                                            : false
                                                    }
                                                />

                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>

                                            <Col lg='4'>
                                                <Label>Documento</Label>

                                            </Col>

                                            <Col lg='6' >

                                                <div className='d-flex'>

                                                    <select
                                                        className="w-100 py-1 border rounded-start rounded-end-0 shadow-sm"
                                                        onChange={(e) => {
                                                            handleDocumentChange(e)
                                                        }}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.documento}
                                                    >
                                                        <option value={0}>Selecciona una opción</option>
                                                        {(document || []).map((item: any, key: number) => (
                                                            <option
                                                                value={item.value}
                                                                onChange={() => console.log('cambio')}
                                                                className="w-100 border border-bottom border-danger"
                                                                key={key}
                                                            >
                                                                {item.sitio ? `*** Pos - ${item.label}` : item.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <Button
                                                        className='rounded-start-0'
                                                        onClick={() => setShowDocs(true)}
                                                        color='primary'
                                                    >
                                                        <Plus size={15}
                                                            color='#fff'
                                                        />
                                                    </Button>
                                                </div>
                                            </Col>


                                        </Row>
                                        <Row>
                                            <Col lg='4'>
                                                <Label>Sitio Impresora</Label>
                                            </Col>
                                            <Col lg='2'>
                                                <Button
                                                    color='primary'
                                                    size='sm'
                                                    onClick={() => setShowSitePrinter(true)}
                                                >
                                                    <Plus size={15}
                                                        color='#fff'
                                                    />
                                                </Button>


                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>

                            </CardBody>

                        </Card>

                    </Col>
                    <Col className='' lg=''>

                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={namesPrinters || []}
                            selectItemRow={setSelecRow}
                            divClass='table-responsive text-black bg-table rounded'
                            tableClass='cursor-pointer w-100 p-1'
                            theadClass='position-sticky top-0  '
                            thClass='fs-14 fw-light border p-2 bg-primary text-white'
                            tdClass='fs-12 border px-2 py-1'
                            tbodyClass='bg-white'
                            styleHeight='300px'
                            overflowY='scroll'
                        />
                    </Col>
                </Row >
            </Form >
        </>
    )
}

export default FormPrinters