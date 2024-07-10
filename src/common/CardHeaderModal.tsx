import { FC } from 'react'
import { X } from 'react-feather'
import { Button, CardHeader } from 'reactstrap'
interface IProps {
    onCloseClick: () => void
    text: string
    classHeader?: string
}
const CardHeaderModal: FC<IProps> = ({ onCloseClick, text, classHeader }) => {
    return (
        <CardHeader className={'text-white page-bg d-flex align-items-center justify-content-between ' + classHeader} >
            <span className='fs-6'>{text}</span>
            <Button color='light' className='bg-orange' onClick={onCloseClick} outline>Salir<X /></Button>
        </CardHeader>)
}

export default CardHeaderModal