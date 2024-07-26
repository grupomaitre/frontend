import React from 'react'
import { Button } from 'reactstrap';

const ColumnCajas = (props: any) => {
    const { setShowModalHisCaja } = props
    const columns = React.useMemo(
        () => [
            {
                Header: 'Caja',
                accessor: 'id_caja_diaria',
            },
           
            {
                Header: 'Responsable',
                accessor: 'nombre_creador',
            },
            {
                Header: 'Saldo Inicial',
                accessor: 'saldo_inicial',
            },
            {
                Header: 'Fecha creación',
                accessor: 'fecha_creacion',
            },
            {
                Header: 'Fecha finalizacion',
                accessor: 'fecha_finalizacion',
            },
            {
                Header: 'Observación',
                accessor: 'Observacion',
            },
            {
                Header: "Estado",
                Cell: (cellProps: any) => {
                    return (
                        <>
                            {
                                cellProps.row.original.status == true ?
                                    <span className="badge badge-outline-success text-uppercase">{'Caja abierta'}</span>
                                    : cellProps.row.original.status == false ?
                                        <span className="badge badge-outline-danger text-uppercase">{'Caja cerrada'}</span>
                                        : null
                            }
                        </>
                    )
                },
                id: '1',
            },

            {
                Header: "Ver",
                Cell: () => {
                    return (
                        <div>
                            <ul className="list-inline  gap-0 mb-0">
                                <li className="list-inline-item" title="View">
                                    <Button outline size='sm' className="  align-bottom fs-11" onClick={() => { setShowModalHisCaja((true)) }} >Ver Caja</Button>
                                </li>
                            </ul>
                        </div>
                    )
                },
            },
        ],
        []
    );
    return columns
}

export default ColumnCajas