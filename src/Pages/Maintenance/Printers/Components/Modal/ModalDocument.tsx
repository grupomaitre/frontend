import { FC } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import Docs from '../../../Docs/Docs'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalDocument: FC<IProps> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg' className='mt-1'>
            <ModalHeader toggle={onCloseClick} />
            <ModalBody>
                <Docs />
            </ModalBody>
        </Modal>
    )
}

export default ModalDocument