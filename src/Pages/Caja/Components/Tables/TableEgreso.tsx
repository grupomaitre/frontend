import React, { FC, useState } from 'react'
import HeaderTest from './HeaderTest'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { Card, CardBody, CardHeader } from 'reactstrap'
interface Props {
    totalCaja: number
    caja: any
}
const TableEgreso: FC<Props> = ({ caja }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Tipo Egreso',
                accessor: 'egresos',
                Cell: ({ row }: any) => <span style={{ cursor: 'pointer' }} className='text-uppercase'>{row.original.egresos || 'N/A'}</span>,

            },
            {
                Header: 'Cantidad',
                accessor: 'count',
            },
            {
                Header: 'Total',
                accessor: 'total',

            }
        ], []
    )
    const [selectItemRow, setSelectItemRow] = useState<any>()
    return (
        <>
            <Card className='m-0 '>
                <CardHeader className='p-0 fs-14 page-bg text-center text-white rounded-0'>
                    Egresos
                </CardHeader>
                <CardBody className='p-0'>
                    <TableGeneric
                        showFilter={false}
                        showFooter={false}
                        columns={columns || []}
                        data={caja || []}
                        selectItemRow={setSelectItemRow}
                        divClass='table-responsive border-blue text-black w-100'
                        tableClass='cursor-pointer w-100'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-11 fw-bold border-blue   px-2'
                        tdClass={'fs-11 border'}
                        tbodyClass='bg-light'
                        styleHeight='130px'
                        overflowY='scroll'
                    />
                </CardBody>
            </Card>



        </>
    )
}

export default TableEgreso