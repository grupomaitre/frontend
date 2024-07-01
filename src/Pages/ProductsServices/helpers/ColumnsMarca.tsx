import { useMemo } from 'react'
import { Trash2 } from 'react-feather'
import { Badge } from 'reactstrap'

const ColumnsMarca = (props: any) => {
    const { handleEdit, handleDelete } = props
    const columns = useMemo(
        () => [
            {
                Header: 'Marca',
                Cell: (props: any) => {
                    return (
                        <div className='d-flex justify-content-between' style={{ cursor: 'pointer' }} onClick={() => handleEdit(props.row.original)}>
                            <span>{props.row.original.nombre}</span>
                        </div>
                    )
                }
            },
            {
                Header: 'Codigo',
                accessor: 'codigo'
            },
            {
                Header: 'Acciones',
                Cell: (props: any) => {
                    return (
                        <div className='d-flex justify-content-between' style={{ cursor: 'pointer' }} onClick={() => handleDelete(props.row.original)}>
                            <Badge color='danger' pill>
                                <Trash2 size={15} /> {'Eliminar'}
                            </Badge>
                        </div>
                    )
                }
            }

        ],
        []
    )
    return columns
}

export default ColumnsMarca