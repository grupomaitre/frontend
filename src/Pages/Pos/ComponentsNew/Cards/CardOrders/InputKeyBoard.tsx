import React, { FC } from 'react'
import { Input } from 'reactstrap'
interface InputCantProps {
    inputRef: React.RefObject<HTMLInputElement>
    value: string | number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    clearInvidualInput?: (index: number) => void
    handleInputClick: (index: number | string) => void
    //handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    handleKeydown?: any
    //style
    classInput?: string
    styleInput?: any
    disabled?: boolean
    type?: string | any
    handleInputFocus?: (index: number) => void
    bsSize?: string | any
    dataSelect?: any
    placeholder?: string
}
const InputKeyBoard: FC<InputCantProps> = (props) => {
    const { inputRef, value, onChange, handleInputClick, handleKeydown, classInput, styleInput, handleInputFocus, bsSize, dataSelect, placeholder } = props
    const handleFunctioKey = (e: any) => {
        if (e.key === 'Enter') {
            handleKeydown()
        }
    }
    return (
        <>
            {
                props.type === 'select' ?

                    <select className='w-100' style={{ height: '30px' }}>
                        {
                            dataSelect.map((item: any, key: number) => (
                                <option key={key} value={item.value}>{item.label}</option>
                            ))
                        }
                    </select>

                    :
                    <Input
                        placeholder={placeholder}
                        bsSize={bsSize}
                        className={classInput}
                        style={styleInput}
                        innerRef={inputRef}
                        type={props.type}
                        value={value}
                        onChange={onChange && onChange}
                        onClick={() => handleInputClick(0)}
                        onKeyDown={handleFunctioKey}
                        disabled={props.disabled}
                        onFocus={() => handleInputFocus && handleInputFocus(0)}
                    />
            }
        </>
    )
}

export default InputKeyBoard