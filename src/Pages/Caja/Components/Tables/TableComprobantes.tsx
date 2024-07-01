import React, { FC, useEffect, useState } from 'react'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { Card, CardBody, CardFooter, CardHeader, Label, Row } from 'reactstrap'

interface Props {
    totalCaja: number
    documentos: any
}
const TableComprobantes: FC<Props> = ({ documentos }) => {
    const [selectItemRow, setSelectItemRow] = useState()
    const [totalDocs, setTotalDocs] = useState<any>()
    const columns = React.useMemo(
        () => [
            {
                Header: 'Comprobante',
                accessor: 'documento',
            },
            {
                Header: 'Cantidad',
                accessor: 'count',
                Cell: ({ row }: any) => {
                    return <div className='text-center'>{row.original.count || 0}</div>
                }
            },
            {
                Header: 'Total',
                accessor: 'total',
                Cell: ({ row }: any) => {
                    const totalFinal1 = Math.round((row.original.total) * 100) / 100;
                    return totalFinal1
                }

            }
        ], []
    )

    useEffect(() => {
        const totalcaja = documentos.reduce((accumulator: any, item: any) => {
            return accumulator + parseFloat(item.total);
        }, 0);
        setTotalDocs(totalcaja)
    }, [documentos])

    return (
        <>
            <Card className=' mb-0 shadow-md'>
               
                <CardBody className='p-0'>
                    <TableGeneric
                        data={documentos || []}
                        columns={columns || []}
                        showFilter={false}
                        showFooter={false}
                        selectItemRow={setSelectItemRow}
                        divClass='table-responsive border-blue text-black'
                        tableClass='cursor-pointer w-100'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-11 fw-bold border-blue page-bg text-white px-2'
                        tdClass={'fs-11 border'}
                        tbodyClass='bg-light'
                        styleHeight='130px'
                        overflowY='scroll'

                    />
                </CardBody>
                <CardFooter className='text-white px-2  text-end bg-black p-0 rounded-0'>
                    <span >Total Vendido: {Math.round(totalDocs * 100) / 100 || 0}</span>

                </CardFooter>
            </Card>

        </>
    )
}

export default TableComprobantes