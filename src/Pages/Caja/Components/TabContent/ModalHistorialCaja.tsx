import { FC } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import DetalleCaja from '../DetalleCaja'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalHistorialCaja: FC<IProps> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg'>
            <ModalHeader toggle={onCloseClick}></ModalHeader>
            <ModalBody className='page-bg'>
                < DetalleCaja setOntabs={'1'} />
            </ModalBody>
            <BtnPosModal
                onAceptarClick={onCloseClick}
                onCloseClick={onCloseClick}
            />
        </Modal>

    )
}

export default ModalHistorialCaja