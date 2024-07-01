import { FC, useEffect, useState, useRef } from 'react'
import { useTable, useGlobalFilter, useSortBy, useFilters, useExpanded, usePagination, useRowSelect } from "react-table";
import InputFilter from './ComponentsTable/InputFilter';
import FooterTable from './ComponentsTable/FooterTable';
import { CustomTableInstance, IPropsTable } from './Interfaces/Interfaces';
import { setSelectedProduct } from '../../../slices/Cart/productSlice';
import { useDispatch } from 'react-redux';

const TableGeneric: FC<IPropsTable> = ({
    columns,
    data,
    selectItemRow,
    divClass,
    tableClass,
    theadClass,
    tbodyClass,
    trClass,
    thClass,
    tdClass,
    styleHeight,
    showFilter,
    showFooter,
    showInputExt,
    valueSearch,
    overflowY,
    doubleClick
}) => {
    const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);
    const [selected, setSelected] = useState<any>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectItem, setSelectItem] = useState<any>(null);
    const dispatch = useDispatch()
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
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = tableInstance

    useEffect(() => {
        if (!showFooter) {
            tableInstance.setPageSize(Number(1000))
        }
    }, [data])

    const pageCount = Math.ceil(data.length / pageSize)
    const totalRows = data.length
    const handleRowClick = (row: any) => {
        // console.log(row.original)
        setSelectItem(row.original || null)
        setSelectedRow(row.index === selectedRow ? null : row.index);
        setSelected(row.index === selected ? null : row.index);

    }

    const handleRowDoubleClick = () => {
        //     console.log(row?.original)
        doubleClick && doubleClick()
    }

    useEffect(() => {
        selectItemRow && selectItemRow(selectItem || null)

    }, [selectItem])
    useEffect(() => {
        showInputExt && setGlobalFilter(valueSearch)
        /*         const selectedProduct = data[selected]
        
                console.log(selectedProduct) */
    }, [valueSearch])

    const handleKeyDown = (e: any) => {
        //      console.log(e.key)
        if (e.key === 'ArrowDown' && selected < data.length - 1) {
            //  console.log("ArrowDown")
            setSelected(selected + 1);
        } else if (e.key === 'ArrowUp' && selected > 0) {
            //    console.log('ArrowUp')
            setSelected(selected - 1);
        } else if (e.key === 'Enter') {
            //   console.log("Enter")
            //   console.log('selectedProduct', selectedProduct)
            setSelectItem(selectedProduct)

        }
    };
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedRow, selected]);
    const selectedProduct = data[selected]
    useEffect(() => {
        if (tableBodyRef.current) {
            tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
        }

        // Automatically select the last row when data changes
        if (data.length > 0) {
            setSelectedRow(data.length - 1);
            data.map((row: any, index: number) => {
                if (index === data.length - 1) {
                    dispatch(setSelectedProduct(row.original))
                }
            })
        }
    }, [data, selectItemRow])

    return (
        <>

            {/* input filter */}
            {showFilter &&
                <InputFilter
                    setGlobalFilter={setGlobalFilter}
                    tableInstance={tableInstance}
                    totalRows={totalRows}
                />}

            <div className={divClass} style={{ height: styleHeight || '250px', overflowY: overflowY || 'scroll' }} >
                <table {...getTableProps()} className={tableClass} style={{ background: '#f5f5f5' }}>
                    <thead className={theadClass}>
                        {headerGroups.map((headerGroup, i) => (
                            <tr {...headerGroup.getHeaderGroupProps()} className={trClass} key={i} >
                                {headerGroup.headers.map((column, key: number) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        key={key}
                                        className={thClass}                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody {...getTableBodyProps()} className={tbodyClass}>
                        {
                            data && page.map((row: any, index: number) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}
                                        key={index}
                                        className={trClass}
                                        style={{ background: index === selected ? '#1b566a' : '', color: index === selected ? '#fff' : '' }}
                                        onClick={() => handleRowClick(row)}
                                        onDoubleClick={() => handleRowDoubleClick()}
                                    >
                                        {row.cells.map((cell: any, key: number) => {
                                            return (
                                                <td {...cell.getCellProps()}
                                                    key={key}
                                                    className={tdClass}>
                                                    {cell.render("Cell")}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })
                        }
                    </tbody>


                </table>
            </div>
            {showFooter &&
                < FooterTable
                    pageCount={pageCount}
                    tableInstance={tableInstance}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                />

            }
        </>
    )
}

export default TableGeneric