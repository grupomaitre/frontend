import React, { useEffect } from "react";
//import { useTable, useGlobalFilter } from "react-table";
import {
    useTable,
    useGlobalFilter,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
    useRowSelect
} from "react-table"

interface IProps {
    columns: any
    data: any
    divClass?: string
    tableClass?: string
    theadClass?: string
    trClass?: string
    thClass?: string
    tdclass?: string
    selectItem?: any
    setIsEdit?: any
    styleHeight?: string
    inputValue?: any
    //   activeRow?: number
}
const GlobalTablea: React.FC<IProps> = ({
    columns,
    data,
    inputValue,
    divClass, tableClass, theadClass, trClass, thClass, tdclass, styleHeight,
    selectItem, setIsEdit
    // activeRow
}) => {
    interface CustomTableInstance extends ReturnType<typeof useTable> {
        page: any
        prepareRow: any
        state: any
        setGlobalFilter: any
        setPageSize: any
        canPreviousPage: any
        canNextPage: any
        nextPage: any
        previousPage: any
        pageOptions: any
        pageCount: any
        gotoPage: any
        setAllFilters: any
        setFilter: any
        pageIndex: any
    }
    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    ) as CustomTableInstance

    /* 
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            setGlobalFilter
    
    
        } =
            useTable<any>({ columns, data }, useGlobalFilter);
     */
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter,
    } = tableInstance

    const [activeRow, setActiveRow] = React.useState<number>(0)

    //active row
    const handleRowClick = (row: any, rowIndex: number) => {
        setActiveRow(rowIndex)
        selectItem(row.original)

    }


    useEffect(() => {
        setGlobalFilter(inputValue || null)
    }, [inputValue])

    return (
        <>

            {/*  <Input

                type="text"
                onChange={handleFilterChange}
                placeholder={data.length + ' - Buscar'}
            /> */}

            <div className={divClass} style={{ height: styleHeight || '250px', overflowY: 'scroll' }}>
                <table {...getTableProps()} className={tableClass}>
                    <thead className={theadClass}>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={trClass} >
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className={thClass}
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} >
                        {rows.map((row, index: number) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}
                                    onDoubleClick={() => setIsEdit === undefined ? selectItem(row.original) : setIsEdit(true)}
                                    onClick={() => handleRowClick(row, index)}
                                    className={activeRow === index ? 'bg-secondary text-white' : ''}
                                    style={{ cursor: 'pointer', color: activeRow === index ? '#fff' : '' }}
                                >
                                    {
                                        row.cells && (

                                            row.cells.map((cell) => (
                                                <td
                                                    className={tdclass}
                                                    {...cell.getCellProps()}

                                                >
                                                    {cell.render("Cell")}
                                                </td>
                                            ))

                                        )

                                    }
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GlobalTablea;
