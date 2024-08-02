import { FC, useEffect, useState } from 'react'
import { Button, Col, Label, Row, TabPane } from "reactstrap"
import FormPrices from './CompoPrecies/FormPrices'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
import axios from 'axios'
interface Props {
    tabId: string
    setDataSend?: any
    dataSend?: any
    validation: any
    showModal: boolean
    setShowModal: any

}
const Prices: FC<Props> = ({ tabId, setDataSend, dataSend, validation, setShowModal }) => {
    const [data, setData] = useState<any>([])
    const [selectItemRow, setSelectItemRow] = useState<boolean>(false)
    /*    const columns = [
           {
               Header: 'Empresa',
               accessor: 'proveedor',
           },
           {
               Header: 'Costo',
               accessor: 'costo',
           },
           {
               Header: 'D1',
               accessor: 'D1',
           },
           {
               Header: 'D1',
               accessor: 'feD1cha',
           },
           {
               Header: 'D3',
               accessor: 'D3',
           },
           {
               Header: 'Total',
               accessor: 'Total',
           },
           {
               Header: 'Ultimo',
               accessor: 'Ultimo',
           },
           {
               Header: 'Cantidad',
               accessor: 'Cantidad',
           },
       ] */
    const columns2 = [
        {
            Header: 'Fecha Creación',
            accessor: 'created_at',
        },
        {
            Header: 'Precio Anterior',
            accessor: 'updated_at',
        },
        {
            Header: 'Precio Nuevo',
            accessor: 'D1',
        },
        {
            Header: 'Precio',
            accessor: 'p_venta',
        },
        {
            Header: 'Usuario',
            accessor: 'D3',
        }
    ]
    /*     const [itmesFormPrices, setItmesFormPrices] = useState<IInputFormPrices>({
            id_product: 0,
            pCosto: 0,
            free: 0,
            pvp: 0,
            pvp4_1: 0,
            pvp4_2: 0,
            promo1: 0,
            promo2: 0,
            comision: 0,
            iva: 0,
            servicio: 0,
    
        })
     */

    const fecthPriceProd = async () => {

        try {
            const res: any = await axios.get('/api/lista/precio/producto', {
                params: {
                    id_product: dataSend?.id_product
                }
            })
            if (res.status === 'success') {
                setData(res.data)
            }
        } catch (e) {
            return e
        }

    }


    useEffect(() => {
        dataSend?.id_product === undefined ? null : fecthPriceProd()
    }, [dataSend?.id_product])
    return (
        <>
         {/*    {showModal && <ModalPrices
                item={dataSend || {}}
                show={showModal}
                onCloseClick={() => setShowModal(false)}
                itmesFormPrices={itmesFormPrices}
                setItmesFormPrices={setItmesFormPrices}
                fetchDataProduct={fetchDataProduct}
            />} */}
            <TabPane tabId={tabId} id={tabId} style={{ fontSize: '10px' }} className=''>


                <Row className=''>
                    <Col lg='6'>

                        <FormPrices
                            itmesFormPrices={dataSend}
                            setItmesFormPrices={setDataSend}
                            dataSend={dataSend}
                            validation={validation}
                        />

                        {tabId === '2' && <Row className='my-2'>
                            <Col>
                                <Button
                                    onClick={setShowModal}
                                    block
                                    size='sm'
                                    color='primary'
                                >
                                    {'Edición de precios'}
                                </Button>

                            </Col>
                        </Row>}
                        <Row className='my-2 d-flex align-items-center '>
                            <Col lg='8'>
                                <div className='bg-black w-100 text-center py-2 text-white'>Últimos Cosoto / Descuento por proveedor</div>
                            </Col>
                            <Col lg='4'>
                                <Button block color='primary' size='sm' outline>Ver más</Button>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </Col>

                    <Col lg='6'>
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns2 || []}
                            data={data || []}
                            selectItemRow={setSelectItemRow}
                            divClass='table-responsive text-black border bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-11 fw-light border'
                            tdClass='border'
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

export default Prices