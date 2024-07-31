import { useState, useEffect, Suspense } from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Row, Col, Card, CardBody } from "reactstrap"
import TabsProducts from './components/Tabs/TabsProducts'
import ColumnsData from './components/interfaces/ColumnsData'
import { addProduct, editProduct, getProductsInv } from "./Api/ApiProducts"
import Header from "../../Layouts/Header"
import { socketTest } from "../Pos/Socket/ConctSocket"
import TableGeneric from "../../common/Generics/Table/TableGeneric"
import axios from "axios";
import ModalPrices from "./components/Modal/ModalPrices";
import { toastError, toastSuccess } from "../../Components/Common/Swals/SwalsApi";
import { useDispatch } from "react-redux";
import { setIDTipoRubro } from "../../slices/rubros/reducer";
import { ToastContainer } from "react-toastify";
const ItemsServicios = () => {
    //    const id_tipo_rubro = 9
    const id_tipo_rubro = JSON.parse(localStorage.getItem('IdTipoRubro') || '0')
    const id_rubro = JSON.parse(sessionStorage.getItem('id_rubro') || '0')
    const id_sub_rubro =  JSON.parse(sessionStorage.getItem('id_sub_rubro') || '0')
    const [showModal, setShowModal] = useState(false)
    const [products, setProducts] = useState([])
    const [productsItem, setProductsitem] = useState({})
    const [isEditProduct, setIsEditProduct] = useState<any>(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [formData, setFormData] = useState<any>({
        cod_fabrica: '',
        nombre: '',
        precio: 0,
        precio_costo: 0,
        precio_venta: 0,
        pvp_1: 0,
        pvp_2: 0,
        pvp_3: 0,
        cantidad: 0,
        cantidad_desgloce: 0,
        stock: 0,
        stock_minimo: 0,
        stock_maximo: 0,
        servicio: 0,
        iva: 0,
        tipo_impuesto: 0,
        url_imagen: '',
        estado: true,
        editable: false,
        editable_precio: false,
        editable_nombre: false,
        nota: '',
        id_sub_rubro: id_sub_rubro,
        id_rubro: id_rubro,
        id_bodega: null,
        id_marca: null,
        id_medida: null,
        id_precio: null,
        id_sitio_impresora_item: null
    })

    const dispatch = useDispatch()

    const handleClear = () => {
        setFormData({
            cod_fabrica: '',
            nombre: '',
            precio: 0,
            precio_costo: 0,
            precio_venta: 0,
            pvp_1: 0,
            pvp_2: 0,
            pvp_3: 0,
            cantidad: 0,
            cantidad_desgloce: 0,
            stock: 0,
            stock_minimo: 0,
            stock_maximo: 0,
            servicio: 0,
            iva: 0,
            tipo_impuesto: 0,
            url_imagen: '',
            estado: true,
            editable: false,
            editable_precio: false,
            editable_nombre: false,
            nota: '',
            id_sub_rubro: id_rubro,
            id_rubro: id_sub_rubro,
            id_bodega: null,
            id_marca: null,
            id_medida: null,
            id_precio: null,
            id_sitio_impresora_item: null
        })
        setIsEdit(false)
        setIsDelete(false)
    }
    const columns = ColumnsData()
    const fetchDataProduct = async () => {
        const res: any = await getProductsInv(id_tipo_rubro)
        setProducts(res.data || [])
    }
    useEffect(() => {

        socketTest.on('productosActualizados', (data: any) => {
            setProducts(data.data)
        });
        return () => {
            socketTest.off('productosActualizados');
        };
    }, []);

    useEffect(() => {
        fetchDataProduct()
    }, [])
    const handleAddFecth = (data: any) => {
        setIsEditProduct({
            cod_fabrica: data?.cod_fabrica || null,
            nombre: data?.nombre || null,
            precio: parseFloat(data?.precio).toFixed(2) || null,
            precio_costo: data?.precio_costo || null,
            precio_venta: data?.precio_venta || null,
            pvp_1: data?.pvp_1 || null,
            pvp_2: data?.pvp_2 || null,
            pvp_3: data?.pvp_3 || null,
            cantidad: data?.cantidad || null,
            cantidad_desgloce: data?.cantidad_desgloce || null,
            stock: data?.stock || null,
            stock_minimo: data?.stock_minimo || null,
            stock_maximo: data?.stock_maximo || null,
            servicio: data?.servicio || null,
            iva: data?.iva || null,
            tipo_impuesto: data?.tipo_impuesto || null,
            url_imagen: data?.url_imagen || null,
            estado: data?.status || null,
            editable: data?.editable || false,
            editable_precio: data?.editable_precio || null,
            editable_nombre: data?.editable_nombre || null,
            nota: data?.nota || null,
            id_sub_rubro: data?.id_sub_rubro || null,
            id_rubro: data?.id_rubro || null,
            id_bodega: data?.id_bodega || null,
            id_marca: data?.id_marca || null,
            id_medida: data?.id_medida || null,
            id_precio: data?.id_precio || null,
            id_sitio_impresora_item: null
        })
    }
    useEffect(() => {
        if (isEdit) {
            setFormData({
                cod_fabrica: isEditProduct?.cod_fabrica || null,
                nombre: isEditProduct?.nombre || null,
                precio: parseFloat(isEditProduct?.precio).toFixed(2) || null,
                precio_costo: isEditProduct?.precio_costo || null,
                precio_venta: isEditProduct?.precio_venta || null,
                pvp_1: isEditProduct?.pvp_1 || null,
                pvp_2: isEditProduct?.pvp_2 || null,
                pvp_3: isEditProduct?.pvp_3 || null,
                cantidad: isEditProduct?.cantidad || null,
                cantidad_desgloce: isEditProduct?.cantidad_desgloce || null,
                stock: isEditProduct?.stock || null,
                stock_minimo: isEditProduct?.stock_minimo || null,
                stock_maximo: isEditProduct?.stock_maximo || null,
                servicio: isEditProduct?.servicio || null,
                iva: isEditProduct?.iva || null,
                tipo_impuesto: isEditProduct?.tipo_impuesto || null,
                url_imagen: isEditProduct?.url_imagen || null,
                estado: isEditProduct?.status || null,
                editable: isEditProduct?.editable || false,
                editable_precio: isEditProduct?.editable_precio || null,
                editable_nombre: isEditProduct?.editable_nombre || null,
                nota: isEditProduct?.nota || null,
                id_rubro: isEditProduct?.id_rubro || null,
                id_sub_rubro: isEditProduct?.id_sub_rubro || null,
                id_bodega: isEditProduct?.id_bodega || null,
                id_marca: isEditProduct?.id_marca || null,
                id_medida: isEditProduct?.id_medida || null,
                id_precio: isEditProduct?.id_precio || null,
                id_sitio_impresora_item: null
            })
        }

    }, [isEditProduct, isEdit])
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            cod_fabrica: (formData && formData.cod_fabrica) || '',
            nombre: (formData && formData.nombre) || '',
            precio: (formData && formData.precio) || 0,
            precio_costo: (formData && formData.precio_costo) || 0,
            precio_venta: (formData && formData.precio_venta) || 0,
            pvp_1: (formData && formData.pvp_1) || 0,
            pvp_2: (formData && formData.pvp_2) || 0,
            pvp_3: (formData && formData.pvp_3) || 0,
            cantidad: (formData && formData.cantidad) || 0,
            cantidad_desgloce: (formData && formData.cantidad_desgloce) || 0,
            stock: (formData && formData.stock) || 0,
            stock_minimo: (formData && formData.stock_minimo) || 0,
            stock_maximo: (formData && formData.stock_maximo) || 0,
            servicio: (formData && formData.servicio) || 0,
            iva: (formData && formData.iva) || 0,
            tipo_impuesto: (formData && formData.tipo_impuesto) || 0,
            url_imagen: (formData && formData.url_imagen) || '',
            estado: (formData && formData.estado),
            editable: (formData && formData.editable) || false,
            editable_precio: (formData && formData.editable_precio) || false,
            editable_nombre: (formData && formData.editable_nombre) || false,
            nota: (formData && formData.nota) || '',
            id_sub_rubro: (formData && formData.id_sub_rubro) || null,
            id_rubro: (formData && formData.id_rubro) || null,
            id_bodega: (formData && formData.id_bodega) || null,
            id_marca: (formData && formData.id_marca) || null,
            id_medida: (formData && formData.id_medida) || null,
            id_precio: (formData && formData.id_precio) || null,
            id_sitio_impresora_item: null
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("Campo requerido"),


        }),
        onSubmit: (values) => {

            if (isEditProduct != null) {
                const updateProduct = {
                    cod_fabrica: values.cod_fabrica,
                    nombre: values.nombre,
                    precio: values.precio,
                    precio_costo: values.precio_costo,
                    precio_venta: values.precio_venta,
                    pvp_1: values.pvp_1,
                    pvp_2: values.pvp_2,
                    pvp_3: values.pvp_3,
                    cantidad: values.cantidad,
                    cantidad_desgloce: values.cantidad_desgloce,
                    stock: values.stock,
                    stock_minimo: values.stock_minimo,
                    stock_maximo: values.stock_maximo,
                    servicio: values.servicio,
                    iva: values.iva,
                    tipo_impuesto: values.tipo_impuesto,
                    url_imagen: values.url_imagen,
                    status: values.estado,
                    editable: values.editable,
                    editable_precio: values.editable_precio,
                    editable_nombre: values.editable_nombre,
                    nota: values.nota,
                    id_rubro: parseInt(id_rubro),
                    id_sub_rubro: (id_sub_rubro),
                    id_bodega: values.id_bodega,
                    id_marca: values.id_marca,
                    id_medida: values.id_medida,
                    id_precio: values.id_precio,
                    id_sitio_impresora_item: values.id_sitio_impresora_item

                }
          /*       console.log(updateProduct.id_rubro)
                return */
                editProduct(isEditProduct?.id_product, updateProduct).then((data: any) => {
                    if (data.status) {
                        handleClear()
                        socketTest.emit('actualizarProductos')
                        fetchDataProduct()
                        validation.resetForm();
                        setIsEdit(false)
                    }
                })


            }
            else {

                const newAsignPrinter = {

                    cod_fabrica: values['cod_fabrica'],
                    nombre: values['nombre'],
                    precio: values['precio'],
                    precio_costo: values['precio_costo'],
                    precio_venta: values['precio_venta'],
                    pvp_1: values['pvp_1'],
                    pvp_2: values['pvp_2'],
                    pvp_3: values['pvp_3'],
                    cantidad: values['cantidad'],
                    cantidad_desgloce: values['cantidad_desgloce'],
                    stock: values['stock'],
                    stock_minimo: values['stock_minimo'],
                    stock_maximo: values['stock_maximo'],
                    servicio: values['servicio'],
                    iva: values['iva'],
                    tipo_impuesto: values['tipo_impuesto'],
                    url_imagen: values['url_imagen'],
                    status: values['estado'],
                    editable: values['editable'],
                    editable_precio: values['editable_precio'],
                    editable_nombre: values['editable_nombre'],
                    nota: values['nota'],
                    id_sub_rubro: id_sub_rubro || values['id_sub_rubro'],
                    id_rubro: id_rubro || values['id_rubro'],
                    id_tipo_rubro: id_tipo_rubro,
                    id_bodega: values['id_bodega'],
                    id_marca: values['id_marca'],
                    id_medida: values['id_medida'],
                    id_precio: values['id_precio'],
                };

                addProduct(newAsignPrinter).then((data: any) => {
                    console.log(data)
                    if (data.status) {
                        handleAddFecth(data)
                        setProductsitem(data.data)
                        setShowModal(true)
                        fetchDataProduct()
                        socketTest.emit('actualizarProductos')
                        validation.resetForm();
                        toastSuccess({ message: 'Producto Guardado' })
                    }

                })
            }
        },

    })
    useEffect(() => {
        if (isEditProduct) {
            setIsEdit(true)
            setIsDelete(true)
        }

    }, [isEditProduct])
    const handleDetele = async () => {
        try {
            const res = await axios.delete(`api/delete-product/${isEditProduct.id_product}`)
            if (res.status) {
                handleClear()
                socketTest.emit('actualizarProductos')
                toastSuccess({ message: 'Producto Borrado' })
                validation.resetForm();
            }
        } catch (e) {
            toastError({ message: 'selecione un producto' })
        }
    }

    const handleSalir = () => {
        dispatch(setIDTipoRubro(0))
    }
    return (

        <>
            {showModal &&
                <ModalPrices
                    item={productsItem || {}}
                    isEditProduct={isEditProduct || {}}
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    validation={validation}
                    setProducts={setProducts}
                    fetchDataProduct={() => fetchDataProduct()}
                    handleClear={() => handleClear()}
                />}

            <div className='' style={{ background: '#ecf0f1' }}>
                <Header link="/dashboard" handleSalir={handleSalir} />
                <Row className="m-0">
                    <Col className="mx-2">
                        <Card body className=" my-2 py-1 page-bg text-white">
                            Item: {products?.length === 0 ? null : isEditProduct?.nombre || null}
                        </Card>
                    </Col>

                </Row>
                <Row className="m-0">
                    <Col lg='' className="mx-2" >
                        <TabsProducts
                            setProducts={setProducts}
                            fetchDataProduct={fetchDataProduct}
                            isEditProduct={isEditProduct}
                            setIsEditProduct={setIsEditProduct}
                            validation={validation}
                            isEdit={isEdit}
                            isDelete={isDelete}
                            handleClear={handleClear}
                            handleDetele={handleDetele}
                            showModal={showModal}
                            setShowModal={() => setShowModal(!showModal)}
                        />
                    </Col>
                </Row>
                <Row className="m-0">
                    <Col className="mx-2 ">
                        {
                            products?.length > 0 ?
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Card className="">
                                        <CardBody>

                                            <TableGeneric
                                                showFilter={true}
                                                showFooter={false}
                                                columns={columns || []}
                                                data={products || []}
                                                selectItemRow={setIsEditProduct}
                                                divClass='table-responsive text-black bg-table '
                                                tableClass='cursor-pointer w-100 '
                                                theadClass='position-sticky top-0 bg-table '
                                                thClass='fs-13 fw-bolder border'
                                                tdClass='fs-12 border'
                                                tbodyClass='bg-light '
                                                styleHeight='200px'
                                                overflowY='scroll'
                                            />

                                        </CardBody>
                                    </Card>
                                </Suspense>
                                :
                                <div className="text-center text-info card card-body text-uppercase">
                                    {'sin registros...'}
                                </div>
                        }
                    </Col>
                </Row>

                <ToastContainer />

            </div >
        </>
    )
}
export default ItemsServicios