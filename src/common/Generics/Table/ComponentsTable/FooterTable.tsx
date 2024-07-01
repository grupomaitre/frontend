import { FC } from 'react'
import { Button, Input } from 'reactstrap'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';
interface IProps {
    pageCount: number
    tableInstance: any
    pageIndex: number,
    pageSize: number
}
const FooterTable: FC<IProps> = ({
    pageCount,
    tableInstance,
    pageIndex,
    pageSize
}) => {
    return (
        <div className='my-2'>
            {
                pageCount > 1 &&
                <div>

                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Button className="mx-1" size='sm' color="light" onClick={() => tableInstance.gotoPage(0)} disabled={!tableInstance.canPreviousPage}>
                                <ChevronsLeft />
                            </Button>{' '}
                            <Button className="mx-1" size='sm' color="light" onClick={() => tableInstance.previousPage()} disabled={!tableInstance.canPreviousPage}>
                                <ChevronLeft />
                            </Button>{' '}
                            <Button className="mx-1" size='sm' color="light" onClick={() => tableInstance.nextPage()} disabled={!tableInstance.canNextPage}>
                                <ChevronRight />
                            </Button>{' '}
                            <Button className="mx-1" size='sm' color="light" onClick={() => tableInstance.gotoPage(pageCount - 1)} disabled={!tableInstance.canNextPage}>
                                <ChevronsRight />
                            </Button>{' '}
                        </div>
                        <span className='fs-13'>
                            Pagina{' '}
                            <span>
                                {pageIndex + 1} de {pageCount}
                            </span>{' '}
                        </span>
                        <span className='fs-13 d-flex'>
                            <span> | Ir a la pagina:{' '}</span>
                            <Input
                                className='fs-11 w-25 rounded-0'
                                bsSize='sm'
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    tableInstance.gotoPage(page)
                                }}
                            />
                        </span>{' '}
                        <select
                            className='fs-15 p-1 rounded-1'
                            value={pageSize}
                            onChange={(e) => {
                                tableInstance.setPageSize(Number(e.target.value))
                            }}
                        >
                            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Ver {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

            }
        </div>
    )
}

export default FooterTable