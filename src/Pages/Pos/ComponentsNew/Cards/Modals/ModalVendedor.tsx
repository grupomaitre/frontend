import { FC, useState, useMemo, useEffect } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Modal, ModalBody, ModalHeader } from 'reactstrap'
import axios from 'axios'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
interface ModalVendedorProps {
    show: boolean
    onCloseClick: () => void
}
const ModalVendedor: FC<ModalVendedorProps> = ({ show, onCloseClick }) => {
    const [data, setData] = useState<any>()
    const [selectItemVendedor, setSelectItemVendedor] = useState<any>()
    const [selectItemCart, setselectItemCart] = useState<any>([])
    //columns useMeno
    const columns = useMemo(
        () => [
            {
                Header: 'Nombre',
                accessor: 'Usuario',
                Cell: ({ row }: any) => {
                    return (
                        <div className='d-flex justify-content-between' style={{ cursor: 'pointer' }} onClick={() => console.log(row.original.cartProducts)}>
                            <span>{row.original.Usuario}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Cliente',
                accessor: 'Cliente',
            },
            {
                Header: 'Cuenta',
                accessor: 'cuenta',
            },
            {
                Header: 'Total',
                accessor: 'total',
            }
        ],
        []
    )
    const columnsCartPro = useMemo(
        () => [
            {
                Header: 'Cantidad',
                accessor: 'cantidad',
            },
            {
                Header: 'Producto',
                accessor: 'nombre',
            },


            {
                Header: 'Total',
                accessor: 'total',
            }
        ],
        []
    )
    //get data /api/v1/reporte-cuenta-vendedor try catch
    const getData = async () => {
        try {
            const response = await axios.get('/api/v1/reporte-cuenta-vendedor')
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        setselectItemCart(selectItemVendedor?.cartProducts || [])
    }, [selectItemVendedor])
    return (
        <Modal isOpen={show} size='lg'  >
            <ModalHeader toggle={onCloseClick}></ModalHeader>
            <ModalBody className='bg-gray rounded'>

                <Card>
                    <CardHeader className='p-1 text-white fw-bold' style={{ background: 'rgb(0, 118, 238)' }}>
                        <span className=''>Vendedor</span>

                    </CardHeader>
                    <CardBody className='p-0'>
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columns || []}
                            selectItemRow={setSelectItemVendedor}
                            data={data || []}
                            divClass='table-responsive text-black  bg-table-light'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky bg-table fw-bold'
                            thClass='fs-13  border '
                            tbodyClass='bg-table-td'
                            styleHeight='130px'
                            overflowY='scroll'
                        />

                    </CardBody>
                </Card>
                <Card className='mb-0'>
                    <CardHeader className='p-1 text-white fw-bold' style={{ background: 'rgb(0, 120, 212)' }}>
                        Productos
                    </CardHeader>
                    <CardBody className='p-0'>
                        <TableGeneric
                            showFilter={false}
                            showFooter={false}
                            columns={columnsCartPro || []}
                            data={selectItemCart || []}
                            selectItemRow={setselectItemCart}
                            divClass='table-responsive text-black bg-table-light'
                            tableClass='cursor-pointer w-100'
                            theadClass='position-sticky bg-table fw-bold'
                            thClass='fs-12 border'
                            tbodyClass='bg-table-td'
                            styleHeight='130px'
                            overflowY='scroll'
                        />
                    </CardBody>
                    <CardFooter>
                        <BtnPosModal
                            onAceptarClick={onCloseClick}
                            onCloseClick={onCloseClick}
                        />
                    </CardFooter>
                </Card>
            </ModalBody>


        </Modal>
    )
}

export default ModalVendedor