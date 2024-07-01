import React, { FC, useRef, useState } from "react"
import Keyboard from "react-simple-keyboard"
import { Input } from "reactstrap"
import "react-simple-keyboard/build/css/index.css"

/* interface InputProps {
    inputName: string;
    value: string;
    onFocus: () => void;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */
interface IProps {
    inputName?: any
    onChangeAll?: (input: any) => void
    onKeyPress?: (button: string) => void
    typeIndividual?: boolean
    typeRow?: boolean
    customLayout: any
    setPruebaInput?: any
    ArrayInputs?: any
    allinputs?: any
    inputNameTest?: any
}
const Teclado: FC<IProps> = ({ /* inputName, onChangeAll, onKeyPress, */ customLayout, ArrayInputs, setPruebaInput, allinputs, inputNameTest, typeRow }) => {
    const keyboard = useRef()
    const [inputs, setInputs] = useState<Record<string, string>>({})
    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default")
   // const [input, setInput] = useState("default")
    const onChangeAll = (inputs: Record<string, string>) => {
        setInputs({ ...inputs })
        setPruebaInput({ ...allinputs })
    }

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default"
        setLayoutName(newLayoutName)
    }

    const onKeyPress = (button: string) => {
        if (button === "{shift}" || button === "{lock}") handleShift()
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {

        const inputVal = event.target.value
        setInputs({
            ...inputs,
            [inputNameTest]: inputVal
        })
        setPruebaInput({
            ...inputs,
            [inputNameTest]: inputVal
        })

        if (keyboard.current) {
            (keyboard.current as any).setInput(inputVal)
        }
    }

    const getInputValue = (inputName: string): string => {
        return inputs[inputName] || ""
    }
    return (
        <div className="App">
            {typeRow && (ArrayInputs || []).map((item: any, index: any) => (
                <Input
                    key={index}
                    id={item.inputName}
                    value={getInputValue(item.inputName)}
                    onFocus={() => setInputName(item.inputName)}
                    placeholder={item.placeholder}
                    type={item.type}
                    onChange={onChangeInput}
                    className="mb-2"
                />
            ))}
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                inputName={inputName}
                layout={customLayout}
                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
                display={{
                    '{bksp}': 'Borrar',
                    '{enter}': 'Enter',
                    '{shift}': 'Shift',
                    '{lock}': 'Mayus',
                    '{space}': 'Espacio',
                    '{tab}': 'Tab',
                    '{esc}': 'Esc',
                    '{alt}': 'Alt'
                }}
                buttonTheme={[
                    {
                        class: "h-100 bg-danger text-white fs-4 fw-light",
                        buttons: "{bksp}"

                    }
                ]}
            />
        </div>
    )
}

export default Teclado
