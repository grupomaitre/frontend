import { FC, useState } from 'react'
import { Card, CardBody, CardHeader, Form } from "reactstrap"
import ItemsTabContent from './ItemsTabContent'
import NavProducts from './Navs/NavProducts'
import HeaderTools from '../../../../common/Ui/HeaderTools'
interface Props {
    isEditProduct: undefined
    setIsEditProduct: any
    setProducts: any
    validation: any
    isEdit: boolean
    isDelete: boolean
    handleClear: any
    handleDetele: any
    fetchDataProduct: any
    showModal: boolean
    setShowModal: any
}
const TabsProducts: FC<Props> = (props) => {
    const { setProducts, isEditProduct, setIsEditProduct, validation, isEdit, handleClear, handleDetele, fetchDataProduct,
        showModal,
        setShowModal } = props
    const [activeTab, setactiveTab] = useState("1")
    const handleRest = () => {
        validation.resetForm()
        handleClear()
        setIsEditProduct(null)
    }
    const itemTools = [
        {
            title: 'Edición', subItems: [
                { text: 'Nuevo', onClick: () => handleRest() },
                { text: 'Crear o Guardar', onClick: () => validation.handleSubmit() },
                { text: 'Eliminar', onClick: () => handleDetele() },
                { text: 'Exportar Lista a Excel' },
                { text: 'Salir' }
            ]
        },
        {
            title: 'Lista de precios', subItems: [
                { color: '#33ff00', text: 'Visualizar' },
                { color: 'blue', text: 'Precios o Factor' },
                { color: 'red', text: 'Fórmulas' },
                { color: 'green', text: 'Reporte De Recargos' },
                { color: 'green', text: 'Aprobación de Costos' },
            ]
        },
        {
            title: 'Herramientas', subItems: [
                { text: 'Items Duplicados ' },
                { text: 'Exportar Items' },
                { text: 'Importar Items (Actualiza Costo y Precio Venta)' },
                { text: 'Agregar nuevos Items' },
                { text: 'Exportar a Pdf Componentes' },
                { text: 'Exportar a Excel Componentes' },
                { text: 'Exportar a Excel Combos' },
                { text: 'Exportar a Excel Items Con ICE' },
                { text: 'Duplicar Item ' },
                { text: 'Imprimir Código Zebra con Precio' },
                { text: 'Imprimir Código Zebra sin Precio' },
            ]
        },
        {
            title: 'Formatos', subItems: [
                { text: 'Agregar nuevos Items ' },

                { text: 'Óptica' }
            ]
        },
    ];
    return (
        <Form
            className='text-white'
            onSubmit={(e) => {
                e.preventDefault()
                validation.handleSubmit()
                return false;
            }}
        >


            <Card className=''>
                <CardHeader className='p-0'>
                    <HeaderTools
                        itemTools={itemTools}
                    />
                </CardHeader>
                <CardBody className=''>

                    <NavProducts
                        activeTab={activeTab}
                        setactiveTab={setactiveTab}
                    />


                    <ItemsTabContent
                        showModal={showModal}
                        setShowModal={setShowModal}
                        activeTab={activeTab}
                        setProducts={setProducts}
                        fetchDataProduct={fetchDataProduct}
                        isEditProduct={isEditProduct}
                        validation={validation}
                        isEdit={isEdit}
                    />

                </CardBody>


            </Card>
        </Form>
    )
}

export default TabsProducts