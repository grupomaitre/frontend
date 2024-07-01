import { useMemo } from 'react'
import { Smile, Tag } from 'react-feather'
import { Button } from 'reactstrap'

const ColumnsTablePos = (props: any) => {
    const { setItemUniCart, handleModalCart, handleDescuento, handleDetailItem } = props
    const handleDetaills = (item: any) => {
        console.log(item)
        return
    }

    const columns = useMemo(() => [
        {
            Header: "-",
            Cell: ({ row }: any) => {
                return (
                    row.original.isCartSuccess && (
                        <span className='text-success text-end fs-5 ms-1'>
                            {'*'}
                        </span>
                    )
                )
            }
        },
        {
            Header: "Cant",
            assessor: "cantidad" as keyof any,
            Cell: ({ row }: any) => <Button
                outline
                className='border-0 text-white'
                onClick={() => handleModalCart(row)} style={{ cursor: 'pointer', }}>{row.original.cantidad || '-'}</Button>,
        },

        {
            Header: "Detalle",
            Cell: ({ row }: any) =>
                <Button
                    onClick={() => handleDetaills(row.original)}
                    style={{
                        color: '#33ff00',
                        width: '100%',
                        textAlign: 'left',
                        background: 'transparent',
                        fontWeight: "100"
                    }}
                    className='text-start rounded-0 border-0 text-uppercase fs-11'
                    size='sm'
                    outline
                >
                    {row.original.status_cortesia ? (
                        <span className='text-warning text-start' >
                            <Tag size={13} /> {row.original.nombre || 'N/A'}  {row.original.cortesia_obseracion}

                        </span>
                    ) : row.original?.preferences?.length || 0 > 0 || row.original.status_preference ? (
                        <span className='text-info'
                            onDoubleClick={() => handleDetailItem(row.original)}
                            onClick={() => setItemUniCart(row.original)} style={{ cursor: 'pointer' }}>
                            <Smile size={13} /> {row.original.nombre || 'N/A'}

                        </span>
                    )


                        : (
                            <div

                                className='rounded-0 border-0 w-100 text-start'
                                onDoubleClick={() => handleDetailItem(row.original)} style={{ cursor: 'pointer', color: '#d5f5f4', background: 'transparent' }}>{row.original.nombre || 'N/A'}</div>
                        )}
                </Button>
        },
        {
            Header: "P.Unit",
            accessor: "precio",
            Cell: ({ row }: any) => {
                const precio = parseFloat(row.original.precio) * parseFloat(row.original.cantidad)
                //  return Math.round((Subtotal * 100) / 100)
                return (precio).toFixed(2)
            },
        },

        {
            Header: "Iva",
            /*    accessor: "total_iva", */
            Cell: ({ row }: any) => {
                const subTotal = ((parseFloat(row.original.precio) * parseFloat(row.original.cantidad)) - row.original.descuento || 0)
                const totalIva = (subTotal * 15) / 100
                return (totalIva).toFixed(2)
            }

        },
        {
            Header: "Servicio",
            accessor: "tota_servicio",
            Cell: ({ row }: any) => {

                const subTotal = ((row.original.precio * row.original.cantidad) - row.original.descuento)
                const totalServicio = subTotal * parseFloat(row.original.servicio) / 100
                return Math.round((totalServicio * 100) / 100).toFixed(2)
            }
        },
        {
            Header: "Total",
            Cell: ({ row }: any) => {
                const subTotal = ((row.original.precio * row.original.cantidad) - row.original.descuento)
                const totalIva = subTotal * 15 / 100 || 0
                const totalServicio = subTotal * row.original.servicio / 100 || 0
                return Math.round((subTotal + totalIva + totalServicio) * 100) / 100
            },


        },

        {
            Header: "Desc",
            accessor: 'descuento',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    onClick={() => handleDescuento(row.original)}>
                    <span >{Math.round((row.original.descuento * 100) / 100).toFixed(2)}</span>
                </div>
            ),
            /*          Cell: ({ row }: any) =>
                         < div >
                             <Button
                                 size='sm'
                                 outline
                                 className='rounded-0 fs-11 border-0 w-100 text-center'
                                 style={{
                                     color: '#33ff00',
                                     background: row.original.tipo_descuento ? 'rgb(16, 80, 158, 0.5)' : 'transparent',
         
                                 }} onClick={() => handleDescuento(row.original)}
                             >
         
                                 {
                                     row.original.tipo_descuento === 'porcentaje' ?
                                         <span className='px-2'><Percent size={11} /> {row.original.descuento} </span>
                                         : row.original.tipo_descuento === 'valor' ?
                                             <span className='px-2'
                                             ><Hash size={11} /> {row.original.descuento} </span>
                                             : <span>{'0.00'}</span>
                                 }
                             </Button>
                         </div > */

        },

    ], [])

    return columns
}
export default ColumnsTablePos