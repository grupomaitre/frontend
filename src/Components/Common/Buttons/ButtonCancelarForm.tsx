import { FC } from 'react'
import { Button } from 'reactstrap'
import { XSquare } from 'react-feather'
interface IButtonCancelarForm {
    onHandleCancelar: () => void
}
const ButtonCancelarForm: FC<IButtonCancelarForm> = ({ onHandleCancelar }) => {
    return (
        <Button color="danger" id="add-btn" className='me-2' onClick={() => onHandleCancelar()} >

            <XSquare />
            <span className='mx-2'>{"Cancelar"}</span>
        </Button>
    )
}

export default ButtonCancelarForm