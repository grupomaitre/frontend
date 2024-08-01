import { FC, useEffect, useState, useMemo } from 'react'
import { TabContent, TabPane } from "reactstrap"
import { GetCategoriasByid } from '../../helpers/GetCategoriasByid';
import Lists from '../../helpers/Lists';
import { ToastContainer } from 'react-toastify'
import { InterfacesProduct } from './TabPanes/Interfaces/InterfacesProduct';

interface Props {
    activeTab: string
    setProducts?: any
    isEditProduct?: any
    validation: any
    isEdit: boolean
    showModal: boolean
    setShowModal: any
    listCartegorias: any[]
    subRubrosOptions: any[]
}

const ItemsTabContent: FC<Props> = ({ activeTab, isEditProduct, validation, setProducts, showModal, setShowModal, listCartegorias, subRubrosOptions }) => {
    //const [item, setItem] = useState<any>()
    const [isID, setIsID] = useState({
        id_sub_rubro: 0,
        id_rubro: 0,
    })

    const [isIDRubro, setIsIDRubro] = useState(0)
    const [opSubCategorias, setOpSetSubCategorias] = useState([]);
    const [nameProduct, setNameProduct] = useState('producto' as any)
    const [dataSend, setDataSend] = useState<InterfacesProduct>({
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
        estado: false,
        editable: false,
        editable_precio: false,
        editable_nombre: false,
        nota: '',
        id_sub_rubro: 0,
        id_rubro: 0,
        id_bodega: null,
        id_marca: null,
        id_medida: null,
        id_precio: null,
        id_sitio_impresora_item: null

    })
    useEffect(() => {
        GetCategoriasByid(isID['id_rubro']).then((data: any) => {
            setOpSetSubCategorias(data.data.map((items: any) => (
                { value: items.id_sub_rubro, label: items.name_sub_rubro }
            )))
        })
    }, [isID['id_rubro']])

    useEffect(() => {
        if (isEditProduct) {
            setDataSend(isEditProduct)
            //setItem(isEditProduct)
        }
    }, [isEditProduct])


    const listTabPane = useMemo(() =>
        Lists({
            opSubCategorias,
            setNameProduct,
            nameProduct,
            setDataSend,
            dataSend,
            isEditProduct,
            validation,
            isIDRubro,
            setIsIDRubro,
            isID,
            setIsID,
            setProducts,
            showModal,
            setShowModal,
            listCartegorias, subRubrosOptions
        }),
        [opSubCategorias, setNameProduct, nameProduct, dataSend, isEditProduct, validation, isIDRubro, setIsIDRubro, isID, setIsID, setProducts,
            showModal, setShowModal, listCartegorias, subRubrosOptions
        ])

    return (
        <>

            <TabContent activeTab={activeTab} className="px-3 py-2" style={{ background: '#f2f2f2' }} >

                {listTabPane.map((item, key) => (
                    <TabPane key={key} tabId={item.tabId} className='' >
                        <div style={{ height: '' }}>
                            {item.componetent}
                        </div>
                    </TabPane>))}

            </TabContent>

            <ToastContainer />



        </>
    )
}

export default ItemsTabContent