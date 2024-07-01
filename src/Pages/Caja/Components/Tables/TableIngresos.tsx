import React, { FC, useEffect, useState } from 'react'
import HeaderTest from './HeaderTest'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import { Card, CardBody, CardFooter, CardHeader, Label, Row } from 'reactstrap'
import ModalInfoFormas from '../Modals/ModalInfoFormas'
interface Props {
    totalCaja: number
    data: any
}
const TableIngresos: FC<Props> = ({ data }) => {
    console.log(data)
    const [selectItemRow, setSelectItemRow] = useState<any>({})
    const [totalIngreso, setTotalIngreso] = useState<any>()
    const [showModal, setShowModal] = useState(false)
    const columns = React.useMemo(
        () => [
            {
                Header: 'Tipo de ingreso',
                Cell: ({ row }: any) => <span style={{ cursor: 'pointer' }} className='text-uppercase'>{row.original.ingreso || 'null'}</span>,
            },
            {
                Header: 'Cantidad',
                accessor: 'count',
                Cell: ({ row }: any) => {
                    return <div className='text-center'>{row.original.count || 0}</div>
                }
            },
            {
                Header: 'Propina',
                accessor: 'propinas',
                Cell: ({ row }: any) => {
                    return <div className='text-center'>{row.original.propinas || 0}</div>
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
    );

    useEffect(() => {
        const totalcaja = data.reduce((accumulator: any, item: any) => {
            return accumulator + parseFloat(item.total);
        }, 0);
        setTotalIngreso(totalcaja)
    }, [data])

    const openMOdal = () => {
        setShowModal(true)
    }
    return (
        <>
            {showModal &&
                <ModalInfoFormas
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    formaPago={selectItemRow?.ingreso}

                />
            }

            <Card className='m-0 shadow'>
                <CardHeader className='p-0 text-center page-bg text-white rounded-0'>
                    Ingresos
                </CardHeader>
                <CardBody className='p-0 m-0'>
                    <TableGeneric
                        data={data || []}
                        columns={columns || []}
                        showFilter={false}
                        showFooter={false}
                        selectItemRow={setSelectItemRow}
                        doubleClick={openMOdal}
                        divClass='table-responsive border-blue text-black'
                        tableClass='cursor-pointer w-100'
                        theadClass='position-sticky top-0 bg-table '
                        thClass='fs-11 fw-bold border-blue  px-2'
                        tdClass={'fs-11 border'}
                        tbodyClass='bg-light'
                        styleHeight='130px'
                        overflowY='scroll'

                    />
                </CardBody>
                <CardFooter className='p-0 text-white px-2 text-end bg-black m-0 rounded-0'>
                    <span className=''>Total Vendido: {Math.round(totalIngreso * 100) / 100 || 0}</span>
                </CardFooter>
            </Card>


        </>
    )
}

export default TableIngresos