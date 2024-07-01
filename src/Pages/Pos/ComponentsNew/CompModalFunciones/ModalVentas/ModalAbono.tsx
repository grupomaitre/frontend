import { FC, useEffect, useState } from 'react'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
import axios from 'axios'
import { InterfaceGetApi } from '../../../../../interfaces/IApi'
import HeaderTools from '../../../../../common/Ui/HeaderTools'
import { toastError } from '../../../../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'
const ModalAbono: FC<IProps> = ({
    show, onCloseClick, item
}) => {
    const [data, setData] = useState([])
    const [selectItemRow, setSelectItemRow] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const columns = [
        {
            Header: 'Pago',
            accessor: 'pago',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => console.log(row.original)}>
                    <span >{row.original.nombre}</span>
                </div>
            ),
        },
        { Header: 'Valor', accessor: 'monto' },
        { Header: 'Fecha Ingreso', accessor: 'fecha_inreso' },
        { Header: 'Fecha Documento', accessor: 'fecha_documento' },
        { Header: 'Comprobante', accessor: 'comprobante' },
        { Header: 'Observación', accessor: 'observacion' },
    ]
    const getFormaPago = async () => {
        if (!item?.factura) return
        try {
            const res: InterfaceGetApi = await axios.get('/api/v1/reporte/ventas/bonos', {

                params: {
                    id_order: item?.factura
                }
            })
            if (res.status === 'success') {
                setIsLoading(false)
                setData(res?.data)
            }
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getFormaPago()
    }, [])
    const dropdownData = [
        {
            title: 'Edición', subItems: [

                { text: 'Eliminar Abono', onClick: () => selectItemRow ? onCloseClick() : toastError({ message: 'Selecione Documento' }) },
                { text: 'Convertir a Pago Devuelto (DEP/VENTAS)', onClick: () => console.log('Limpiar') },
                { text: 'Nota de Crédito', onClick: () => console.log('Limpiar') },
                { text: 'Salir', onClick: () => console.log('Limpiar') }
            ]
        },
    ];
    return (
        <>
            <Modal isOpen={show} toggle={onCloseClick}>
                <ModalHeader className='p-0 bg-primary text-white px-3' toggle={onCloseClick}>
                    <HeaderTools
                        itemTools={dropdownData}
                        classToggle='text-white'
                    />
                </ModalHeader>
                <ModalBody>
                    {
                        isloading ? 'Cargado..' : 'datos here'
                    }
                    <TableGeneric
                        showFilter={false}
                        showFooter={false}
                        columns={columns || []}
                        data={data || []}
                        selectItemRow={setSelectItemRow}
                        divClass='table-responsive text-black bg-table'
                        tableClass='cursor-pointer w-100'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-12 fw-light border'
                        tdClass='fs-11 border'
                        tbodyClass='bg-light'
                        styleHeight='130px'
                        overflowY='hidden'
                    />
                </ModalBody>

            </Modal>
            <ToastContainer />
        </>
    )
}
export default ModalAbono