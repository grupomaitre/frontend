
const ColumnRight = (props: any) => {
    const { activeRow, setProductLeft } = props
    const columns = [
        {
            Header: 'Cant',
            accessor: 'cantidad',
        },
        {
            Header: 'Detalle',
            accessor: 'nombre',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'
                    style={{ background: activeRow === row.original.id_product ? '#39698a' : '', color: activeRow === row.original.id_product ? '#fff' : '' }}
                    onClick={() => setProductLeft(row.original)}>
                    <span >{row.original.nombre}</span>

                </div>
            ),

        },
        {
            Header: 'P.Unit',
            accessor: 'precio',
            Cell: ({ row }: any) => {
                const precio = parseFloat(row.original.precio) * parseFloat(row.original.cantidad)
                return (precio).toFixed(2)
            },
        }
    ]
    return columns
}

export default ColumnRight