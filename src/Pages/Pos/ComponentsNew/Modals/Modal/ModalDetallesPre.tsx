import { FC } from 'react'
import { Modal } from 'reactstrap'
interface ModalDetallesPreProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
const ModalDetallesPre: FC<ModalDetallesPreProps> = ({
    show,
    /* onCloseClick,
    item */
}) => {
    return (
        <Modal isOpen={show}>

        </Modal>
    )
}

export default ModalDetallesPre