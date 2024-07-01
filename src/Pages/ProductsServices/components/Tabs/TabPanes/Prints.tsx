import { FC, useEffect, useState } from 'react'
import { Button, Col, Label, Row, TabPane } from "reactstrap"
import Select from 'react-select'
import { getSitePrinter } from '../../../Api/ApiSitePrinter'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
import { deleteImpresorasProduct, listPrintsfProduct, saveImpresoraProduct } from '../../../Api/ApiPrintsProducts'
interface Props {
    tabId: string
    setDataSend?: any
    dataSend?: any
    isEditProduct: any
    validation: any
    fetchDataProduct: any
}
const Prints: FC<Props> = ({ tabId, dataSend, isEditProduct, fetchDataProduct }) => {
    const [listPrinters, setListPrinters] = useState<any[]>([])
    const [selectItemRow, setSelectItemRow] = useState<any>()
    const [data, setData] = useState<any>([])
    const [opData, setOpData] = useState<any>()
    const getPrinters = async () => {
        try {
            const res: any = await getSitePrinter()
            setListPrinters(res.data.map((item: any) => ({ value: item.id_sitio_impresora, label: item.sitio_impresora })))
        } catch (e) {
            console.log(e)
        }
    }
    const getPrintsProd = async () => {
        const res: any = await listPrintsfProduct(isEditProduct?.id_product)
        if (res?.status === 'success') {
            setData(res?.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        getPrintsProd()
    }, [isEditProduct])

    useEffect(() => {
        getPrinters()
    }, [])
    const columns = [
        {
            Header: 'Sitio Impresion',
            accessor: 'impresora.sitio_impresora'
        }
    ]

    const handleToggleField = (e: any) => {
        setOpData({ value: e.value, label: e.label });
    }
    const handleAdd = async () => {
        const saveRef: any = await saveImpresoraProduct(isEditProduct?.id_product, opData?.value)
        console.log(saveRef)
        if (saveRef?.status === 'success') {
            fetchDataProduct()
            getPrintsProd()
        }

    }
    const handleRemove = async () => {
        const res: any = await deleteImpresorasProduct(selectItemRow?.id_sitio_impresora_item)
        console.log(res)
        if (res?.status === 'success') {
            getPrintsProd()
        }
        return null
    }


    return (
        <TabPane tabId={tabId} id="prints" style={{ fontSize: '10px' }} className=''>
            <Row className='mb-2'>
                <Col lg='3'>
                    <Label className='text-uppercase fs-12'>Sitio de Impresion :{dataSend?.nombre}</Label>
                </Col>
                <Col lg='2'>
                    <Select
                        options={listPrinters}
                        className='text-black rounded fs-13'
                        onChange={(e) => handleToggleField(e)}
                        placeholder=''
                    />
                </Col>
                <Col lg='2'>
                    <Button size='sm' block color='light'
                        onClick={handleAdd}
                    >Agregar</Button>
                </Col>

                <Col lg='2'>
                    <Button size='sm' block color='light'
                        onClick={handleRemove}
                    >Eliminar</Button>
                </Col>
            </Row>
            <Row>
                <Col lg='5'>
                    {
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns}
                            data={data}
                            selectItemRow={setSelectItemRow}
                            divClass='table-responsive text-black bg-table '
                            tableClass='cursor-pointer w-100 '
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-13 fw-bolder border'
                            tdClass='fs-12 border'
                            tbodyClass='bg-light '
                            styleHeight='130px'
                            overflowY='scroll'
                        />
                    }
                </Col>
            </Row>



        </TabPane>
    )
}

export default Prints