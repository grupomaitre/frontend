import { FC } from 'react'
import { Button } from 'reactstrap'
interface IProps {
    inputValues: Array<string>
    btnDisabled: boolean
    setbtnDisabled: (value: boolean) => void
    login: () => void
}
const BtnLogin: FC<IProps> = ({ btnDisabled, login
}) => {

    const handleClick = () => {

        login()
    }

    return (
        <Button
            block
            onClick={handleClick}
            disabled={btnDisabled}
            size='lg'
            color='primary'
            className=" shadow-lg  border border-1 border-light"
            type="submit"
        >
            Aceptar
        </Button>
    )
}

export default BtnLogin