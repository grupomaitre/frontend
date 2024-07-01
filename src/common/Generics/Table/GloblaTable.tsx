import { FC, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTable } from "react-table";
import { setSelectedProduct } from "../../../slices/Cart/productSlice";

interface Props {
    columns: any;
    data: any;
    divClass?: string;
    tableClass?: string;
    theadClass?: string;
    trClass?: string;
    thClass?: string;
    tdclass?: string;
    customPageSize?: number;
    styleHeight?: string;
    setSelectItemRowInv: any
}

const GloblaTable: FC<Props> = ({
    columns,
    data,
    divClass,
    tableClass,
    theadClass,
    trClass,
    thClass,
    tdclass,
    styleHeight,
    setSelectItemRowInv
}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<any>({ columns, data });

    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (tableBodyRef.current) {
            tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
        }
    }, [data])


    const handleRowClick = (row: any) => {
        //dispacth here  (row.original)
        localStorage.setItem('itemIndividual', JSON.stringify(row.original))
        dispatch(setSelectedProduct(row.original))
        setSelectedRow(row.index === selectedRow ? null : row.index);
        setSelectItemRowInv(row.original)

    };
    //useeffect add new item scroll to bottom select row
    useEffect(() => {
        //  console.log('handleRowClick add invItem', invItem)
        window.scrollTo(0, document.body.scrollHeight);
        setSelectedRow(rows.length - 1);
        if (tableBodyRef.current) {
            tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
        }
    }, [rows.length]);
    //useeffect setInvItem to data last item
    useEffect(() => {
        if (tableBodyRef.current) {
            tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
        }

        // Automatically select the last row when data changes
        if (rows.length > 0) {
            setSelectedRow(rows.length - 1);
            rows.map((row: any, index: number) => {
                if (index === rows.length - 1) {
                    dispatch(setSelectedProduct(row.original))
                    setSelectItemRowInv(row.original)
                    localStorage.setItem('itemIndividual', JSON.stringify(row.original))

                }
            })
        }
    }, [data])
    /*     const handleKeyPress = (e: any) => {
            console.log("key???", e.key)
        } */
    return (
        <div className={divClass} style={{ height: styleHeight || '250px', background: '#000', overflowY: 'scroll' }} ref={tableBodyRef} onKeyDown={(e) => console.log(e)}>

            <table {...getTableProps()} className={tableClass} style={{ width: '100%' }}>
                <thead className={theadClass} style={{ boxShadow: ' -8px -12px 10px -9px rgba(0,0,0,0.40) inset' }}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className={trClass}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()} className={thClass}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} id='tableBody'>
                    {rows.map((row: any, index: number) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}
                                // onKeyDown={(e) => handleKeyPress(e)}
                                onKeyDownCapture={(e) => console.log(e)}
                                onClick={() => handleRowClick(row)} className={trClass}
                                style={{ background: index === selectedRow ? '#3095b7' : '', color: index === selectedRow ? '#fff' : '' }}>
                                {
                                    row.cells && (
                                        row.cells.map((cell: any) => (
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
        </div >
    );
}

export default GloblaTable;
