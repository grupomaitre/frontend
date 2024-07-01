import React from 'react'
interface Input {
    id: string;
    placeholder: string;
}

interface InputsProps {
    inputs: Input[];
    getInputValue: (inputName: string) => string;
    setInputName: (inputName: string) => void;
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompInputs: React.FC<InputsProps> = ({ getInputValue, setInputName, onChangeInput }) => {

    return (
        <div>
            <input
                id="firstName"
                value={getInputValue("firstName")}
                onFocus={() => setInputName("firstName")}
                placeholder={"First Nameaa"}
                onChange={onChangeInput}
            />
            <input
                id="lastName"
                value={getInputValue("lastName")}
                onFocus={() => setInputName("lastName")}
                placeholder={"Last Name"}
                onChange={onChangeInput}
            />
        </div>
    )
}

export default CompInputs