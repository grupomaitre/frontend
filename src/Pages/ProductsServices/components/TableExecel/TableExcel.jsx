import React from 'react'
import { Card, CardBody, Table } from 'reactstrap';
/* import ButtonSave from './ButtonSave'; */
const TableExcel = (props) => {
    const { idempresa, idsucursal, idbodega, items, show, transaccion } = props
    const columns = [
        {
            Header: "codigo",
            accessor: "codigo"
        },
        {
            Header: "producto",
            accessor: "producto"
        },
        {
            Header: "unidad_entrada",
            accessor: "unidad_entrada"
        },
        {
            Header: "existencia_maxima",
            accessor: "existencia_maxima"
        },
        {
            Header: "existencia_minima",
            accessor: "existencia_minima"
        },
        {
            Header: "numero_unidad",
            accessor: "numero_unidad"
        },
        {
            Header: "iva",
            accessor: "iva"
        },
        {
            Header: "ice",
            accessor: "ice"
        },
        {
            Header: "precio_unitario",
            accessor: "precio_unitario"
        },
        {
            Header: "descuento",
            accessor: "descuento"
        },
        {
            Header: "image",
            accessor: "image"
        },
        {
            Header: "costo_producto",
            accessor: "costo_producto"
        },

    ]
    return (
        <>
            {
                items.length ?
                    <Card>
                        <CardBody>

                        </CardBody>
                    </Card>

                    : <span className='border p-3 text-center fs-4 text-muted rounded'> Esperando excel ... </span>
            }
        </>
    )
}

export default TableExcel