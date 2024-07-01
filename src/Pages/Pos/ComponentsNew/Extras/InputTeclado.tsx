import { FC } from 'react'
import { Input } from 'reactstrap'
interface GlobalTecladoProps {
    inputValue?: any
}
const InputTeclado: FC<GlobalTecladoProps> = ({ inputValue }) => {
    return (
        <Input type="text" value={inputValue} readOnly />
    )
}

export default InputTeclado