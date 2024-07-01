import { useTable } from "react-table";

export interface IPropsTable {
    columns: any;
    data: any;
    selectItemRow?: any;
    divClass?: any;
    tableClass?: any;
    theadClass?: any;
    tbodyClass?: any;
    trClass?: any;
    thClass?: any;
    tdClass?: any
    customPageSize?: any;
    styleHeight?: string;
    showFilter: boolean
    showFooter: boolean
    showInputExt?: boolean
    valueSearch?: any
    addCartTest?: any
    overflowY?: any
    doubleClick?: () => void
}


export interface CustomTableInstance extends ReturnType<typeof useTable> {
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

