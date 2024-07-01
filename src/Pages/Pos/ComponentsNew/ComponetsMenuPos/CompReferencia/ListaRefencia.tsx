import { FC, useState } from 'react'
import TableGeneric from '../../../../../common/Generics/Table/TableGeneric'

interface Iitems {
    id_referencia_product: number
    name: string
}
interface Irefences {
    item: Array<Iitems>
    activeItem: number
    setItemRemove?: any
}

const ListaRefencia: FC<Irefences> = ({ item, activeItem, setItemRemove }) => {

    const [selectItemRow, setSelectItemRow] = useState()

    const columns = [
        {
            Header: '',
            accessor: 'name',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    style={{ background: activeItem === row.original.id_referencia_product ? '#39698a' : '', color: activeItem === row.original.id_referencia_product ? '#fff' : '' }}
                    onClick={() => setItemRemove(
                        row.original
                    )}>
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
                selectItemRow={setSelectItemRow}
                divClass='table-responsive text-black '
                tableClass='cursor-pointer w-100'
                theadClass='position-sticky top-0'
                thClass='fs-13 fw-light border-bottom'
                tbodyClass='bg-gray'
                styleHeight='250px'
                overflowY='scroll'
            />
        </>
    )
}

export default ListaRefencia