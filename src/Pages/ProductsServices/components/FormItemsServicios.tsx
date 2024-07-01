import { Plus } from 'react-feather'
import { Form, Input, Row, Col, Label, Button, FormFeedback } from 'reactstrap'
import * as Yup from "yup"
import { useFormik } from "formik"
import { FC, useState } from 'react'
import Select from 'react-select'
import ButtonCancelarForm from '../../../Components/Common/Buttons/ButtonCancelarForm'
import TableProductsADD from './TableProductsADD'
import { ToastContainer } from "react-toastify"
import { MyFormValues, IFormItemsServicios, INewItem, ISubCategoria } from './interfaces/InterFormItems'

const FormItemsServicios: FC<IFormItemsServicios> = ({ isEdit, onHandleCancelar, caregorias, isCategoria, handleChangeCategoria, opSubCategorias, opBodegas }) => {
    const [productServcs, setProductServcs] = useState<MyFormValues>()
    // const [errors, setErrors] = useState(false)
    // const [priceUni, setPriceUni] = useState()
    //const [nameProduct, setnameProduct] = useState()
    // const [code, setCode] = useState('')
    const [subCategoria, setSubcategorias] = useState<string>()
    const [bodegas, setBodegas] = useState<string>('')
    const [isIdSubRubro, setIsIdSubRubro] = useState<number>()
    const [fileImage, setFile] = useState<string | null | undefined>(null)
    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            code: (productServcs && productServcs.code) || "",
            producto: (productServcs && productServcs.producto) || "",
            price: (productServcs && productServcs.price) || "10.10",
            cantidad: (productServcs && productServcs.producto) || "20",

        },
        validationSchema: Yup.object({
            code: Yup.string().required("Campo requerido"),
            producto: Yup.string().required("Campo requerido"),
            price: Yup.string().required("Campo requerido"),
            cantidad: Yup.string().required("Campo requerido"),

        }),
        onSubmit: (values) => {
            setProductServcs(values)
            const newItem: INewItem = {
                code: values["code"],
                producto: values['producto'],
                category: isCategoria,
                price: values['price'],
                cantidad: values['cantidad'],
                subCategory: subCategoria,
                imagen: selectedImage,
                bodegas: bodegas,
                status: true,
                url_imagen: fileImage,
                id_sub_rubro: isIdSubRubro,
            }
            addItems(newItem)
            validation.resetForm()
        },
    })
    const [selectedImage, setSelectedImage] = useState<any>()
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files = event.target.files;
        if (files && files.length > 0) {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
            fileReader.onload = (event) => {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    setFile(result);
                } else {
                    setFile(null);
                }
            };
            setSelectedImage(URL.createObjectURL(files[0]));
        } else {
            setFile(null);
            setSelectedImage('');
        }
    };
    const [value, setValue] = useState<Array<INewItem>>([])

    const addItems = (newItem: INewItem) => {
        setValue([...value, newItem])

    }
    const handledeleteItem = (/* index: number */) => {
        console.log('borrar item')
        /*  const newValue = value.filter((item, i) => i !== index)
         setValue(newValue) */
    }
    const handleChangeSubCategoria = (e: ISubCategoria) => {
        setSubcategorias(e.label)
        setIsIdSubRubro(e.value)
    }
    const columns = [
        { name: "Codigo" },
        { name: "Nombre" },
        { name: "Categoria" },
        { name: "Sub Categoria" },
        { name: "Imagen" },
        { name: "Precio" },
        { name: "Cantidad" },
        { name: "Bodega" },
        { name: "Acciones", style: "text-center" },
    ]
    return (
        <>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                }}
                action="#">
                <Row className='mb-4'>
                    <h2> {!!isEdit ? "Editar Producto o Servicio" : "Crear Producto o Servicio"}</h2>
                </Row>
                <Row className='mb-3'>
                    <Col lg={7}>
                        <div className="text-center float-end">
                            <div className="position-relative d-inline-block  cursor-pointer " >
                                <div className="position-absolute  bottom-0 end-0">
                                    <Label htmlFor="customer-image-input" className="mb-0">
                                        <div className="avatar-xs">
                                            <div className="avatar-title bg-light border rounded-circle text-muted">
                                                <i className="mdi mdi-plus fs-1"></i>
                                            </div>
                                        </div>
                                    </Label>
                                    <Input className="form-control d-none" id="customer-image-input"
                                        type="file" name="url_imagen"
                                        onChange={handleImageChange}
                                        accept="image/png, image/gif, image/jpeg"

                                    />
                                </div>
                                <div className="avatar-xl p-1">
                                    <div className="avatar-title bg-light rounded-circle">
                                        <img src={selectedImage} alt={selectedImage} id="customer-img" className="avatar-md rounded-circle object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col lg={3} >
                        <Label htmlFor="nameInput" className="form-label">Codigo ID :</Label>
                    </Col>
                    <Col lg={9} >
                        <Input
                            type="text"
                            className="form-control"
                            name="code"
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
                <Row className="mb-3">
                    <Col lg={3} >
                        <Label htmlFor="websiteUrl" className="form-label">Nombre :</Label>
                    </Col>
                    <Col lg={9} >
                        <Input type="text" className="form-control"
                            // defaultValue={nameProduct}
                            name="producto"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.producto || ""}
                            invalid={
                                validation.touched.producto &&
                                    validation.errors.producto
                                    ? true
                                    : false
                            }
                        />
                        {validation.touched.producto &&
                            validation.errors.producto ? (
                            <FormFeedback type="valid">
                                {validation.errors.producto}
                            </FormFeedback>
                        ) : <FormFeedback valid />}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={3} >
                        <Label htmlFor="websiteUrl" className="form-label">Bodega :</Label>
                    </Col>
                    <Col lg={9} >

                        <Select
                            className='bg-white text-light'
                            options={opBodegas}
                            onChange={(e: any) => setBodegas(e.label)}

                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={3} >
                        <Label htmlFor="websiteUrl" className="form-label">Categoias / Sub Categorias :</Label>
                    </Col>
                    <Col lg={4} >
                        <Label className="form-label">Categorias</Label>
                        <Select
                            options={caregorias}
                            onChange={(e) => handleChangeCategoria(e)}

                        />
                    </Col>

                    <Col lg={5} >
                        <Label className="form-label">Sub Categorias</Label>
                        <Select
                            options={opSubCategorias}
                            onChange={(e: any) => handleChangeSubCategoria(e)}
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col lg={3} >
                        <Label htmlFor="contactNumber" className="form-label">Imagen</Label>
                    </Col>
                    <Col lg={9} className=' ' >
                        <Input className="form-control"
                            type="file" name="url_imagen"
                            onChange={handleImageChange}
                        />

                    </Col>
                </Row>


                <Row className='mb-3'>
                    <Col lg={3} >
                        <Label
                            htmlFor="correo-field"
                            className="form-label"
                        >
                            Cantidad
                        </Label>
                    </Col>
                    <Col lg={9}>
                        <div>
                            <Input
                                className="form-control"
                                type="number"
                                name="cantidad"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.cantidad || ""}
                                invalid={
                                    validation.touched.cantidad &&
                                        validation.errors.cantidad
                                        ? true
                                        : false
                                }
                            />
                            {validation.touched.cantidad &&
                                validation.errors.cantidad ? (
                                <FormFeedback type="valid">
                                    {validation.errors.cantidad}
                                </FormFeedback>
                            ) : <FormFeedback valid />}
                        </div>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col lg={3} >
                        <Label
                            htmlFor="correo-field"
                            className="form-label"
                        >
                            Precio Unitario
                        </Label>
                    </Col>
                    <Col lg={9}>
                        <div>
                            <Input
                                className="form-control"
                                type="number"
                                //   defaultValue={priceUni}
                                name="price"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.price || ""}
                                invalid={
                                    validation.touched.price &&
                                        validation.errors.price
                                        ? true
                                        : false
                                }
                            />
                            {validation.touched.price &&
                                validation.errors.price ? (
                                <FormFeedback type="valid">
                                    {validation.errors.price}
                                </FormFeedback>
                            ) : <FormFeedback valid />}
                        </div>
                    </Col>
                </Row>

                <Row>
                    <div className="text-end">
                        <Col lg={12}>
                            {!!isEdit ?
                                <ButtonCancelarForm
                                    onHandleCancelar={onHandleCancelar}

                                />
                                : null}
                            <Button type='submit' outline color="info"  >

                                <Plus className='border-1 border-end border-info ' />
                                <span className='mx-3'>{!!isEdit ? "Editar" : "Añadir Item"}</span>
                            </Button>

                        </Col>
                    </div>
                </Row>
            </Form >
            <hr />
            <TableProductsADD
                value={value}
                columns={columns}
                handledeleteItem={handledeleteItem}
            />
            <ToastContainer closeButton={false} limit={1} />
        </>
    )
}

export default FormItemsServicios