import { FC, useEffect, useState } from 'react'
import { Button } from 'reactstrap'

interface iProps {
    options: any
    optionSelect: any
    btnClear: boolean
    validationValue?: any

}

const SelectGeneric: FC<iProps> = ({ options, optionSelect, btnClear, validationValue }) => {
    const [optiones, setOpciones] = useState<null>()
    useEffect(() => { setOpciones(options) },)
    return (
        <div className='d-flex'>
            <select className="w-100 py-1 border rounded-end-0 rounded-start"
                onChange={(e) => { optionSelect(e.target.value) }}
                value={validationValue || options[0]}
            >
                {/*      <option value={options[0]}>{options[0]?.label || ''}</option> */}

                {
                    (optiones || []).map((item: any, key: number) => (
                        <option
                            value={item?.value}
                            onClick={() => console.log('cambio')}
                            className="w-100 border border-bottom border-danger" key={key}>
                            {item.label}
                        </option>
                    ))
                }
            </select>
            {btnClear && <Button
                className='rounded-start-0'
                color='primary'
                onClick={() => setOpciones(null)}
                size='sm'>
                x

            </Button>}
        </div>
    )
}

export default SelectGeneric