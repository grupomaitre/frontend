import { FC } from 'react'
import { Button } from 'reactstrap'
interface IProps {
    onModalClick: () => void;
}
const BtnOpenModal: FC<IProps> = ({ onModalClick }) => {
    return (
        <div>
            <Button
                onClick={onModalClick}
            >Nuevo Registro</Button>
        </div>
    )
}

export default BtnOpenModal