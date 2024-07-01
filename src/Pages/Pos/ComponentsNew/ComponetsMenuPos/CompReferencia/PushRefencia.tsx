import { FC, useState } from 'react'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'
/* import { MinusCircle } from 'react-feather'
import { CardBody, ListGroup, ListGroupItem } from 'reactstrap'
import SimpleBar from 'simplebar-react' */
interface Iitems {
    id_referencia_product: number
    name: string
}
interface Irefences {
    item: Array<Iitems>
    setItemRemove?: any
    activeItem?: number
}
const PushRefencia: FC<Irefences> = ({ item, setItemRemove, activeItem }) => {
    const [selectItemRow, setSelectItemRow] = useState<any>()
    const columns = [
        {
            Header: '',
            accessor: 'name',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    style={{ background: activeItem === row.original.id_referencia_product ? '#39698a' : '', color: activeItem === row.original.id_referencia_product ? '#fff' : '' }}

                    onClick={() => setItemRemove(row.original)}>
                    <span
                    >{row.original.name}</span>
                </div>
            ),
        }
    ]
    return (

        <>
            <TableGeneric
                showFilter={false}
                showFooter={false}
                columns={columns || []}
                data={item || []}
                selectItemRow={setSelectItemRow || {}}
                divClass='table-responsive text-black '
                tableClass='cursor-pointer w-100'
                theadClass='position-sticky top-0'
                thClass='fs-13 fw-light border'
                tbodyClass='bg-table'
                styleHeight='250px'
                overflowY='scroll'
            />

        </>
    )
}

export default PushRefencia