import { FC } from 'react'
import { Input } from 'reactstrap'
interface IProps {
    tableInstance: any
    setGlobalFilter: any
    totalRows?: number
}
const InputFilter: FC<IProps> = ({
    tableInstance,
    setGlobalFilter,
    totalRows
}) => {
    return (
        <div className='d-flex justify-content-end my-1'>
            <Input
                bsSize='sm'
                className='form-control rounded-0'
                value={tableInstance.state.globalFilter || ''}
                onChange={(e) => {
                    setGlobalFilter(e.target.value || undefined)
                }}
                placeholder={`Buscar` + '-' + totalRows}
            />
        </div>
    )
}

export default InputFilter