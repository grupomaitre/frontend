import { useMemo } from 'react'

const ColumnsData = () => {
    const columns = useMemo(() => [
        {
            Header: 'Cod Fábrica',
            accessor: 'cod_fabrica'
        },
        {
            Header: 'Nombre',
            accessor: 'nombre'
        },
        {
            Header: 'Medida',
            accessor: 'medida.nombre'
        },
        {
            Header: 'Utilidad Costo',
            accessor: 'utilidad_costo'
        },
        {
            Header: 'Costo promedio',
            accessor: 'costo_promedio',
        },
        {
            Header: 'Precio Venta',
            accessor: 'precio',
            Cell: ({ row }: any) => (
                <div className='d-flex align-items-center'

                    onClick={() => console.log(row.original)}>
                    <span >{parseFloat(row.original.precio).toFixed(2)}</span>

                </div>
            ),

        }

    ], [])
    return columns
}

export default ColumnsData