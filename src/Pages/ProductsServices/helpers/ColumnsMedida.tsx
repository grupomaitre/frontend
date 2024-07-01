import { useMemo } from 'react'

const ColumnsMedida = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Medida',
                accessor: 'nombre'
            },
            {
                Header: 'Cantidad',
                accessor: 'cantidad'
            },
            {
                Header: 'medida',
                accessor: 'm'
            },
        ],
        []
    )
    return columns
}

export default ColumnsMedida