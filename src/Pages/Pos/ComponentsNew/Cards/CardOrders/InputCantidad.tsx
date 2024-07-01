import React, { FC } from 'react'
interface InputCantProps {
    inputRef: React.RefObject<HTMLInputElement>
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleInputClick: (index: number) => void
    handleKeydown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
const InputCantidad: FC<InputCantProps> = (props) => {
    const { inputRef, value, onChange, handleInputClick, handleKeydown } = props
    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onChange}
            onClick={() => handleInputClick(0)}
            onKeyDown={handleKeydown}
        />
    )
}

export default InputCantidad