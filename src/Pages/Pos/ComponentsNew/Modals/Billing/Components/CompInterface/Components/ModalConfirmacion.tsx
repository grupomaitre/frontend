import { FC } from 'react'
import { Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnPosModal from '../../../../../../../../Components/Common/Buttons/BtnPosModal'
interface Props {
    show: boolean
    onCloseClick: () => void
    confirmar: any
}
const ModalConfirmacion: FC<Props> = ({ show, onCloseClick, confirmar }) => {
    return (
        <Modal isOpen={show} size='md' backdrop={'static'} >
            <ModalHeader> Confirmación </ModalHeader>
            <ModalBody className='fondo2' style={{ background: '' }}>
                <Input type='text' placeholder='Ingrese su clave' />
            </ModalBody>
            <BtnPosModal
                onAceptarClick={confirmar}
                onCloseClick={onCloseClick}
            />
        </Modal>
    )
}

export default ModalConfirmacion