import { FC, useEffect, useState } from 'react'
import Select from 'react-select'
import { Button, Col, Label, Row, TabPane } from "reactstrap"
import { getRefencias } from '../../../../Pos/Helpers/ApiReferencias'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
import ModalReferencia from '../../../../Pos/ComponentsNew/ComponetsMenuPos/ModalReferencia'
import { deletePrefProduct, listPrefProduct, savePrefProduct } from '../../../Api/ApiPreferenciaProduct'
interface Props {
    tabId: string
    isEditProduct: any
    fetchDataProduct: any
    validation: any
}
const Preferences: FC<Props> = ({ tabId, isEditProduct, fetchDataProduct }) => {
    const [opPreference, setOpPreference] = useState([])
    const [opData, setOpData] = useState<any>()
    const [data, setData] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState<any>()
    const [showModal, setShowModal] = useState(false)
    const columns = [
        {
            Header: 'Preferencias',
            accessor: 'preferecencias.name',
        }
    ]
    const handleGetref = async () => {

        getRefencias().then(data => (
            setOpPreference(data.map((item: any) => (
                {
                    label: item.name,
                    value: item.id_referencia_product
                }
            )))
        ))
    }
    const getPreference = async () => {
        const res: any = await listPrefProduct(isEditProduct?.id_product)
        console.log(res)
        if (res?.status === 'success') {
            setData(res?.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        getPreference()
    }, [isEditProduct])

    useEffect(() => {
        getRefencias().then(data => (
            setOpPreference(data.map((item: any) => (
                {
                    label: item.name,
                    value: item.id_referencia_product
                }
            )))
        ))

    }, [])

    const handleAdd = async () => {
        const saveRef: any = await savePrefProduct(isEditProduct?.id_product, opData.value)
        if (saveRef?.status === 'success') {
            fetchDataProduct()
            getPreference()
        }

    }
    const handleChange = (e: any) => {
        setOpData({ value: e.value, label: e.label });
    }

    const handleRemove = async () => {
        const res: any = await deletePrefProduct(selectItemRow?.id_preferencias_productos)
        if (res?.status === 'success') {
            getPreference()
        }
        return null
    }
    return (
        <>
            {showModal &&
                <ModalReferencia
                    item={{}}
                    onCloseClick={() => setShowModal(false)}
                    show={showModal}
                    setItemUniCart={{}}
                    moduleItems={true}
                />
            }
            <TabPane tabId={tabId} id="settings" style={{ fontSize: '10px' }}>
                <Row className='mb-3'>

                    <Col lg='2'>
                        <Label>Preferencias</Label>
                    </Col>

                    <Col lg='4'>
                        <Select
                            options={opPreference}
                            className='text-black  fs-13'
                            onChange={handleChange}
                            onMenuOpen={handleGetref}
                            placeholder=''
                        />
                    </Col>

                    <Col>
                        <Button size='sm' block color='light'
                            onClick={handleAdd}
                        >Agregar</Button>
                    </Col>

                    <Col>
                        <Button size='sm' block color='light'
                            onClick={handleRemove}
                        >Eliminar</Button>
                    </Col>

                    <Col>
                        <Button size='sm' block color='light'
                            onClick={() => setShowModal(true)}
                        >Nueva Preferencia</Button>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={data || []}
                            selectItemRow={setSelectItemRow}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-13 fw-bold border'
                            tdClass={'fs-12'}
                            tbodyClass='bg-light'
                            styleHeight='130px'
                            overflowY='scroll'
                        />
                    </Col>
                </Row>
            </TabPane>
        </>
    )
}

export default Preferences