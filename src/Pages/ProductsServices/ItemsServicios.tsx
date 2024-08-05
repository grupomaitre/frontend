import { useState, useEffect, Suspense } from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Row, Col, Card, CardBody } from "reactstrap"
import TabsProducts from './components/Tabs/TabsProducts'
import ColumnsData from './components/interfaces/ColumnsData'
import { addProduct, editProduct, useAllProducts } from "./Api/ApiProducts"
import Header from "../../Layouts/Header"
//import { socketTest } from "../Pos/Socket/ConctSocket"
import TableGeneric from "../../common/Generics/Table/TableGeneric"
import axios from "axios";
import ModalPrices from "./components/Modal/ModalPrices";
import { toastError, toastSuccess } from "../../Components/Common/Swals/SwalsApi";
import { useDispatch } from "react-redux";
import { setIDTipoRubro } from "../../slices/rubros/reducer";
import { ToastContainer } from "react-toastify";
import { usefetchGroupsMain } from "../Pos/Api/ApiGroups";
const ItemsServicios = () => {
    //    const id_tipo_rubro = 9
    const dispatch = useDispatch()
    const columns = ColumnsData()
    const id_tipo_rubro = JSON.parse(localStorage.getItem('IdTipoRubro') || '0')
    const { data: productos, isLoading, refetch: refetchProductos } = useAllProducts(id_tipo_rubro)
    const { data: grupos, isLoading: isLoadingGrupos, isFetching } = usefetchGroupsMain(1)
    //grupos-subgrupos
    const [listCartegorias, setListCategorias] = useState<any>([])

    const [showModal, setShowModal] = useState(false)
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
        id_sub_rubro: 0,
        id_rubro: 81,
        id_bodega: null,
        id_marca: null,
        id_medida: null,
        id_precio: null,
        id_sitio_impresora_item: null
    })
    const [subRubrosOptions, setSubRubrosOptions] = useState<any>([]);



    /*   useEffect(() => {

        socketTest.on('productosActualizados', (data: any) => {
            setProducts(data.data)
        });
        return () => {
            socketTest.off('productosActualizados');
        };
    }, []); */
    useEffect(() => {
        if (isEdit) {
            handleNewDataProducto(isEditProduct)
        }

    }, [isEditProduct, isEdit])

    const handleNewDataProducto = (item: any) => {
        setFormData((pre: any) => (
            {
                ...pre,
                cod_fabrica: item?.cod_fabrica || null,
                nombre: item?.nombre || null,
                precio: parseFloat(item?.precio).toFixed(2) || null,
                precio_costo: item?.precio_costo || null,
                precio_venta: item?.precio_venta || null,
                pvp_1: item?.pvp_1 || null,
                pvp_2: item?.pvp_2 || null,
                pvp_3: item?.pvp_3 || null,
                cantidad: item?.cantidad || null,
                cantidad_desgloce: item?.cantidad_desgloce || null,
                stock: item?.stock || null,
                stock_minimo: item?.stock_minimo || null,
                stock_maximo: item?.stock_maximo || null,
                servicio: item?.servicio || null,
                iva: item?.iva || null,
                tipo_impuesto: item?.tipo_impuesto || null,
                url_imagen: item?.url_imagen || null,
                estado: item?.status || null,
                editable: item?.editable || false,
                editable_precio: item?.editable_precio || null,
                editable_nombre: item?.editable_nombre || null,
                nota: item?.nota || null,
                id_rubro: item?.id_rubro,
                id_sub_rubro: item?.id_sub_rubro,
                id_bodega: item?.id_bodega || null,
                id_marca: item?.id_marca || null,
                id_medida: item?.id_medida || null,
                id_precio: item?.id_precio || null,
                id_sitio_impresora_item: null
            }
        )
        )
    }

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
        onSubmit: async (values) => {
            if (isEdit) {
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
                    id_rubro: values.id_rubro,
                    id_sub_rubro: values.id_sub_rubro,
                    id_bodega: values.id_bodega,
                    id_marca: values.id_marca,
                    id_medida: values.id_medida,
                    id_precio: values.id_precio,
                    id_sitio_impresora_item: values.id_sitio_impresora_item

                }
                console.log(updateProduct)
                const resEdit: any = await editProduct(isEditProduct?.id_product, updateProduct)
                if (resEdit.status) {
                    handleNewDataProducto(resEdit.data)
                    setIsEdit(true)
                    //setIsEditProduct(null)
                    //socketTest.emit('actualizarProductos')
                    refetchProductos()
                    //   validation.resetForm();
                    // setIsEdit(false)
                }



            }
            else {

                const newProductos = {

                    cod_fabrica: values['cod_fabrica'],
                    nombre: values['nombre'],
                    precio: values['precio'] || 0,
                    precio_costo: values['precio_costo'] || 0,
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
                    id_rubro: values['id_rubro'],
                    id_sub_rubro: values['id_sub_rubro'],
                    id_tipo_rubro: id_tipo_rubro,
                    id_bodega: values['id_bodega'],
                    id_marca: values['id_marca'],
                    id_medida: values['id_medida'],
                    id_precio: values['id_precio'],
                };
                //console.log(newProductos)
                //return
                const res: any = await addProduct(newProductos)
                if (res.status) {

                    handleNewDataProducto(res.data)
                    setIsEdit(true)
                    refetchProductos()
                    setProductsitem(res.data)
                    setShowModal(true)
                    //    socketTest.emit('actualizarProductos')
                    //    validation.resetForm();
                    toastSuccess({ message: 'Producto Guardado' })
                }


            }
        },

    })
    useEffect(() => {
        if (!isFetching && grupos) {
            const id = grupos[0].id_rubro
            const id_sub_rubro = grupos[0]?.sub_rubros[0].id_sub_rubro
            setFormData({ ...formData, id_rubro: id, id_sub_rubro: id_sub_rubro })
            const rubros = ((grupos || []).map((item: any) => (
                {
                    value: item.id_rubro,
                    label: item.name_rubro,
                    sub_rubros: item?.sub_rubros

                }
            )))
            setListCategorias(rubros)



        }
    }, [grupos])
    useEffect(() => {
        if (isEdit) {
            const IdRubro = parseFloat(formData.id_rubro)
            const isIdSubRubro = parseFloat(formData.id_sub_rubro)
            validation.setFieldValue('id_sub_rubro', isIdSubRubro)
            return
            if (IdRubro && listCartegorias.length > 0) {
                const categoria = listCartegorias.find((categoria: any) => categoria.value === IdRubro);
                validation.setFieldValue('id_sub_rubro', categoria?.sub_rubros[0].id_sub_rubro)
                if (categoria) {
                    const subRubros = categoria?.sub_rubros.map((subRubro: any) => ({
                        value: subRubro.id_sub_rubro,
                        label: subRubro.name_sub_rubro
                    }));
                    setSubRubrosOptions(subRubros);
                } else {
                    setSubRubrosOptions([]);
                }
            } else {
                setSubRubrosOptions([]);
            }
        } else {
            console.log('else')
            const IdRubro = parseFloat(validation.values.id_rubro);
            if (IdRubro && listCartegorias.length > 0) {
                const categoria = listCartegorias.find((categoria: any) => categoria.value === IdRubro);
                validation.setFieldValue('id_sub_rubro', categoria?.sub_rubros[0].id_sub_rubro)
                if (categoria) {
                    const subRubros = categoria?.sub_rubros.map((subRubro: any) => ({
                        value: subRubro.id_sub_rubro,
                        label: subRubro.name_sub_rubro
                    }));
                    setSubRubrosOptions(subRubros);
                } else {
                    setSubRubrosOptions([]);
                }
            } else {
                setSubRubrosOptions([]);
            }
        }
    }, [validation.values.id_rubro, listCartegorias, isEdit, isEditProduct, grupos])

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
                //    socketTest.emit('actualizarProductos')
                setFormData({ ...formData, id_rubro: res.data.id_rubro, id_sub_rubro: res.data.id_sub_rubro })

                refetchProductos()
                setIsEditProduct(null)
                toastSuccess({ message: 'Producto Borrado' })
                //validation.resetForm();
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
                    fetchDataProduct={() => refetchProductos()}
                    handleClear={() => console.log('')}
                />}

            {!isLoadingGrupos &&
                <div className='' style={{ background: '#ecf0f1' }}>
                    <Header link="/dashboard" handleSalir={handleSalir} />
                    <Row className="m-0">
                        <Col className="mx-2">
                            <Card body className=" my-2 py-1 page-bg text-white">
                                Item: {productos?.length === 0 ? null : isEditProduct?.nombre || null}
                            </Card>
                        </Col>

                    </Row>
                    <Row className="m-0">
                        <Col lg='' className="mx-2" >
                            <TabsProducts
                                isEditProduct={isEditProduct}
                                setIsEditProduct={setIsEditProduct}
                                validation={validation}
                                isEdit={isEdit}
                                isDelete={isDelete}
                                handleClear={() => console.log(8)}
                                handleDetele={handleDetele}
                                showModal={showModal}
                                setShowModal={() => setShowModal(!showModal)}
                                listCartegorias={listCartegorias}
                                subRubrosOptions={subRubrosOptions}
                                setIsEdit={() => setIsEdit(false)}
                                fetchDataProduct={() => refetchProductos()}


                            />
                        </Col>
                    </Row>
                    <Row className="m-0">
                        <Col className="mx-2 ">
                            {
                                !isLoading ?
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Card className="">
                                            <CardBody>

                                                <TableGeneric
                                                    showFilter={true}
                                                    showFooter={false}
                                                    columns={columns || []}
                                                    data={productos || []}
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

                </div >}
        </>
    )
}
export default ItemsServicios