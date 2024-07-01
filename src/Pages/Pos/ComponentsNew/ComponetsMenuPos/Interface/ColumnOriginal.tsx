
const ColumnOriginal = (props: any) => {
    const { activeRow, setProductRight } = props
    const columns1 = [
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
                    onClick={() => setProductRight(row.original)}>
                    <span >{row.original.nombre}</span>
                </div>
            ),
        },
        {
            Header: 'Precio',
            accessor: 'precio',
            Cell: ({ row }: any) => (
                <span>{parseFloat(row.original.precio).toFixed(2)} </span>
            ),

        }

    ]
    return columns1
}

export default ColumnOriginal