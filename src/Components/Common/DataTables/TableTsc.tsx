import React from "react";
import { useTable } from "react-table";
import { Table } from 'reactstrap'
interface TableData {
    Cliente: string;
    Cuenta: number;
    Documento: string;
    Factura: string;
    Orden: string;
    Servicio: string;
    Total: string;
    Salado: string;
    Efectivo: string;
    Cheque: string;
}

const TableTsc: React.FC = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: "Cliente",
                accessor: "Cliente" as keyof TableData,
            },
            {
                Header: "Cuenta",
                accessor: "Cuenta" as keyof TableData,
            },
            {
                Header: "Orden",
                accessor: "Orden" as keyof TableData,
            },
            {
                Header: "Documento",
                accessor: "Documento" as keyof TableData,
            },
            {
                Header: "Factura",
                accessor: "Factura" as keyof TableData,
            },
            {
                Header: "Servicio 10%",
                accessor: "Servicio" as keyof TableData,
            },
            {
                Header: "Total",
                accessor: "Total" as keyof TableData,
            },
            {
                Header: "Salado",
                accessor: "Salado" as keyof TableData,
            },
            {
                Header: "Efectivo",
                accessor: "Efectivo" as keyof TableData,
            },
            {
                Header: "Cheque",
                accessor: "Cheque" as keyof TableData,
            },
        ],
        []
    );

    const data: TableData[] = [
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",

        },
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",
        },
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",
        },
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",
        },
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",
        },
        {
            Cliente: "John Doe",
            Cuenta: 1,
            Documento: "0000000001",
            Factura: "0000000001",
            Orden: "0000000001",
            Servicio: "0000000001",
            Total: "0000000001",
            Salado: "0000000001",
            Efectivo: "0000000001",
            Cheque: "0000000001",
        },

    ];

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable<TableData>({ columns, data });

    return (
        <div className="table-responsive table-card">
            <Table {...getTableProps()} className="table-nowrap table-striped mb-0 table-bordered">
                <thead className="table-light">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: "1px solid gray",
                                        padding: "8px",
                                        background: "lightgray",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            borderBottom: "1px solid gray",
                                            padding: "8px",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default TableTsc;
