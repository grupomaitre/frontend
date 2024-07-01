
import { FC, useEffect, useRef } from "react"
import Keyboard from "react-simple-keyboard"
import './styles/teclado.css'
interface IProps {
    inputName: string
    onChangeAll: (input: any) => void
    onKeyPress: (button: string) => void
    refUser?: any
    refPassword?: any
    inputValue?: string
}
const FinalTeclado: FC<IProps> = ({ inputName, onChangeAll, onKeyPress, /* refUser, refPassword, */ inputValue }) => {
    const keyboard = useRef();
    
    useEffect(() => {
        if (keyboard.current) {
            (keyboard.current as any).setInput(inputValue)
        }
    }, [inputValue])

    return (
        <div style={{ width: '' }} className=" d-flex">
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                inputName={inputName}

                layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],

                }}
                display={{
                    '{bksp}': 'Borrar',
                }}

                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
                buttonTheme={[
                    {
                        class: "bg-danger text-white fs-11 fw-light",
                        buttons: "{bksp}"

                    },
                    {
                        class: "keyboard fs-2",
                        buttons: "1 2 3 4 5 6 7 8 9"
                    },
                    {
                        class: "fs-2",
                        buttons: "0"
                    },
                    /*          {
                                 class: "enter-pos",
                                 buttons: "Enter"
                             },
                             {
                                 class: "btn-billing",
                                 buttons: "Guardar Cobrar"
                             },
                             {
                                 class: "fs-6",
                                 buttons: "Enter Guardar Cobrar"
                             } */

                ]}
            />
            {/*   <Button
                color="light"
                onClick={handleEnter}
                style={{ width: '50px', height: '120px', margin: '', background: '#fff' }}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <span className="fs-2s"> Enter</span>
            </Button> */}
        </div>
    )
}

export default FinalTeclado