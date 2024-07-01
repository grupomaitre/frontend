import { FC, useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, Row, Col, Label, Button, Card, CardHeader, CardFooter, CardBody } from 'reactstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getTypePrinters } from '../../Api/ApiPrinters';
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric';

interface FormValues {
    id_tipo_impresora?: number
    tipo_impresora?: string,
    sw_matricial?: boolean,
    sw_lacer?: boolean,
    sw_inkjet?: boolean,
    sw_termica?: boolean,
    sw_punto_venta?: boolean,
    sw_matriz?: boolean,
    height?: number,
    width?: number,

}
interface Ipros {
    show: boolean
    onCloseClick: any
}
const ModalTypePrinter: FC<Ipros> = ({ show, onCloseClick }) => {
    const [selectRow, setSelecRow] = useState<any>({})
    const [dataFrom, setDataFrom] = useState<FormValues>({
        tipo_impresora: '',
        sw_matricial: false,
        sw_lacer: false,
        sw_inkjet: false,
        sw_termica: false,
        sw_punto_venta: false,
        sw_matriz: false,
        height: 0,
        width: 0,
    })
    const [testTypePrinter, setTestTypePrinter] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const initialValues: any = {
        /*    tipo_impresora: dataFrom?.tipo_impresora,
           sw_matricial: dataFrom?.sw_matricial,
           sw_lacer: dataFrom?.sw_lacer,
           sw_inkjet: dataFrom?.sw_inkjet,
           sw_termica: dataFrom?.sw_termica,
           sw_punto_venta: dataFrom?.sw_punto_venta,
           sw_matriz: dataFrom?.sw_matriz,
           height: dataFrom?.height,
           width: dataFrom?.width, */
    };
    useEffect(() => {
        setDataFrom({
            ...dataFrom,
            tipo_impresora: selectRow?.tipo_impresora,
            sw_matricial: selectRow?.sw_matricial,
            sw_lacer: selectRow?.sw_lacer,
            sw_inkjet: selectRow?.sw_inkjet,
            sw_termica: selectRow?.sw_termica,
            sw_punto_venta: selectRow?.sw_punto_venta,
            sw_matriz: selectRow?.sw_matriz,
            height: selectRow?.height,
            width: selectRow?.width,
        })

    }, [selectRow])

    const fieldFrom = [
        {
            id: 0,
            label: "Tipo Impresora",
            name: "tipo_impresora",
            type: "text",
        },
        {
            id: 1,
            label: "Width",
            name: "width",
            type: "number"
        },
        {
            id: 2,
            label: "height",
            name: "height",
            type: "number"
        },
        {
            id: 3,
            label: "Matricial",
            name: "sw_matricial",
            type: "checkbox"
        },
        {
            id: 4,
            label: 'Lacer',
            name: "sw_lacer",
            type: "checkbox"
        },
        {
            id: 5,
            label: 'inkjet',
            name: "sw_inkjet",
            type: "checkbox"
        },
        {
            id: 6,
            label: 'Termica',
            name: "sw_termica",
            type: "checkbox"
        },
        {
            id: 7,
            label: 'Punto venta',
            name: "sw_punto_venta",
            type: "checkbox"
        },
        {
            id: 7,
            label: 'Matriz',
            name: "sw_matriz",
            type: "checkbox"
        },

    ]


    const SignupSchema = Yup.object().shape({
        tipo_impresora: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Campo Requerido'),
    });

    fieldFrom.forEach((field: any) => {
        initialValues[field.name] = null;
    });
    const sendDA = (values: any) => {
        if (isEdit) {
            console.log('edit')
        } else {
            const data: FormValues = {
                tipo_impresora: values.tipo_impresora,
                sw_matricial: values.sw_matricial,
                sw_lacer: values.sw_lacer,
                sw_inkjet: values.sw_inkjet,
                sw_termica: values.sw_termica,
                sw_punto_venta: values.sw_punto_venta,
                sw_matriz: values.sw_matriz,
                height: values.height,
                width: values.width,
            }
            console.log(data)
        }
    }



    const columns = [
        {
            Header: "Tipo Impresora",
            accessor: "tipo_impresora"
        }
    ]
    useEffect(() => {
        getTypePrinters().then(data => {
            setTestTypePrinter(data)

        })

    }, [])

    useEffect(() => {
        if (selectRow?.id_tipo_impresora > 0) {
            console.log('La propiedad existe en el objeto.');
            setIsEdit(true)

            setDataFrom({
                ...dataFrom,
                tipo_impresora: selectRow?.tipo_impresora
            })

        }
    }, [selectRow])
    const handleReset = (func?: any) => {

    }
    const itemTools = [
        {
            title: 'Edición', subItems: [

                { text: 'Guardar', onClick: () => console.log('Limpiar') },
                { text: 'Eliminar', onClick: () => handleReset() },
                { text: 'Salir', onClick: () => console.log('Limpiar') },
            ]
        },
    ];
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='md' >
            <ModalHeader toggle={onCloseClick}>

            </ModalHeader>
            <ModalBody className='fs-12 bg-gray rounded text-white'>

                <Formik
                    initialValues={initialValues}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        sendDA(values)
                    }}
                >
                    {({ values, errors, touched, resetForm }) => (

                        <Form>

                            <Card>
                                <CardHeader className='bg-primary text-white'>
                                    Tipo Impresora {dataFrom?.tipo_impresora}
                                </CardHeader>
                                <CardBody>
                                    {fieldFrom.map((item) => (
                                        <Row key={item.name} className='mb-1'>
                                            <Col lg='5'>
                                                <Label className=''>{item.label}</Label>
                                            </Col>
                                            <Col lg=''>
                                                <Field
                                                    name={item.name}
                                                    type={item.type}
                                                    className={
                                                        errors[item.name] && 'border-danger'
                                                    }
                                                />
                                                <ErrorMessage name={item.name} component="div" className='text-danger' />
                                            </Col>
                                        </Row>
                                    ))}
                                    <div>

                                        <TableGeneric
                                            showFilter={false}
                                            showFooter={false}
                                            columns={columns || []}
                                            data={testTypePrinter || []}
                                            selectItemRow={setSelecRow}
                                            divClass='table-responsive text-black bg-table'
                                            tableClass='cursor-pointer w-100'
                                            theadClass='position-sticky top-0 bg-table '
                                            thClass='fs-11 fw-light border'
                                            tbodyClass='bg-light'
                                            styleHeight='130px'
                                            overflowY='scroll'
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className='d-flex justify-content-around gap-2'>

                                        <Button
                                            color='primary'
                                            type="submit"
                                        >Guardar</Button>
                                        <Button
                                            outline
                                            color='black'
                                            onClick={() => resetForm()}
                                        >Limpiar</Button>
                                        <Button
                                            outline
                                            color='danger'
                                            onClick={() => onCloseClick()}
                                        >
                                            Cerrar
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Form>
                    )}

                </Formik>

            </ModalBody>
        </Modal >
    )
}

export default ModalTypePrinter