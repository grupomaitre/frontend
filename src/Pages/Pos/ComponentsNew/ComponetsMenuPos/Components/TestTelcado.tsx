
import { FC, useEffect, useRef } from "react"
import Keyboard from "react-simple-keyboard"

import "react-simple-keyboard/build/css/index.css"
interface IProps {
    inputName: string
    onChangeAll: (input: any) => void
    onKeyPress: (button: string) => void
    customLayout: any
    inputValue?: string
}
const TestTelcado: FC<IProps> = ({ inputName, onChangeAll, onKeyPress, customLayout, inputValue }) => {
    const keyboard = useRef()

    useEffect(() => {
        if (keyboard.current) {
            (keyboard.current as any).setInput(inputValue)
        }
    }, [inputValue])

    return (
        <div className="Apap">

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

export default TestTelcado
