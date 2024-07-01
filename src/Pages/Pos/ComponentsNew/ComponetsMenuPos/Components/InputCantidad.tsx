import React from "react";
import { Input } from "reactstrap"
interface InputProps {
    inputName: string;
    value: string;
    onFocus: () => void;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCantidad: React.FC<InputProps> = ({
    inputName,
    value,
    onFocus,
    placeholder,
    onChange,
}) => {
    return (
        <Input
            id={inputName}
            value={value}
            onFocus={onFocus}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default InputCantidad;
