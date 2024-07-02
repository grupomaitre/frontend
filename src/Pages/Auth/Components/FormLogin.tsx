import React, { FC, useEffect } from 'react'
import InputKeyBoard from '../../Pos/ComponentsNew/Cards/CardOrders/InputKeyBoard'
import { Label } from 'reactstrap'
interface IrefInput {
    current: HTMLInputElement | null
}
interface IProps {
    inputValues: Array<string>
    inputRefs: React.MutableRefObject<IrefInput[]>
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    handleInputClick: (index: number) => void
    handleInputFocus: (index: number) => void
    handleEnter: () => void
}
const FormLogin: FC<IProps> = ({
    inputValues,
    inputRefs,
    handleInputChange,
    handleInputClick,
    handleInputFocus,
    handleEnter
}) => {

    const InputsLogin = [

        {
            label: 'Nombre de Usuario',
            icon: null,
            type: 'text'
        },
        {
            label: 'Contraseña',
            icon: null,
            type: 'password'
        }

    ]
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100);
    }, [])
    return (


        <>
            {
                InputsLogin.map((item, index) => (
                    <div className="mb-3 text-black text-center" key={index}>
                        <Label htmlFor="username" className=" fs-12">
                            {item.icon} {item.label}
                        </Label>

                        <div>
                            <InputKeyBoard
                                inputRef={inputRefs.current[index]}
                                value={inputValues[index]}
                                onChange={(event) => handleInputChange(event, index)}
                                handleInputClick={() => handleInputClick(index)}
                                handleKeydown={handleEnter}
                                classInput='text-center  fs-6 border-black'
                                //   disabled={inputDisabledcuenta}
                                type={item.type}
                                handleInputFocus={() => handleInputFocus(index)}
                                bsSize='sm'
                            />
                        </div>
                    </div>
                ))
            }
        </>




    )
}

export default FormLogin