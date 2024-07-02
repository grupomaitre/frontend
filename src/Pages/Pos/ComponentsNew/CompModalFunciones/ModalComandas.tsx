import React, { FC } from 'react'
import { Card, CardBody, CardHeader, Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { useSelector } from 'react-redux'
import axios from 'axios'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalComandas: FC<IProps> = ({ show, onCloseClick }) => {
    const [data, setData] = React.useState<any>()
    const [selectItemRow, setSelectItemRow] = React.useState<any>()
    console.log('delet', selectItemRow)
    const id_cart = useSelector((state: any) => state.cartSlice.idCart)

    const columns = React.useMemo(
        () => [
            {
                Header: 'Sec',
                accessor: 'secuencial',
            },
            {
                Header: 'Fecha',
                accessor: 'fecha_hora',
            },
            {
                Header: 'Cuenta',
                accessor: 'cuenta',
            },
            {
                Header: 'Cantidad',
                accessor: 'cantidad',
            },
            {
                Header: 'Item',
                accessor: 'item',
            },
            {
                Header: 'Vendedor',
                accessor: 'vendedor',
            },
            {
                Header: 'Sitio de Impreción',
                accessor: 'sitio_impresion',
            }
        ],
        []
    )

    const getCartProducts = async () => {
        try {
            const result = await axios.get('api/v1/reporte-ver-comandas', {
                params: {
                    id_cart: id_cart
                }
            })
            if (result.data) {
                setData(result.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    React.useEffect(() => {
        getCartProducts()
    }, [])
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='xl'>
            <ModalHeader toggle={onCloseClick} />
            <ModalBody className='rounded bg-gray' >

                <Card>
                    <CardHeader>
                        Lista Comandas
                    </CardHeader>
                    <CardBody>
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            data={data || []}
                            selectItemRow={setSelectItemRow}
                            divClass='table-responsive text-black bg-table'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky top-0 bg-table '
                            thClass='fs-14 fw-light border'
                            tbodyClass='bg-table-td'
                            styleHeight='300px'
                            overflowY='scroll'
                        />

                    </CardBody>
                </Card>
                <BtnPosModal
                    onAceptarClick={onCloseClick}
                    onCloseClick={onCloseClick}
                />
            </ModalBody>
        </Modal>
    )
}

export default ModalComandas