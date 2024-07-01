import { FC } from "react"
import { Check, X } from "react-feather"
import { Button, Modal } from "reactstrap"
interface IConfirmationModalProps {
    show: boolean
    onCloseClick: () => void
    onConfirmClick: () => void
    title?: string
    message?: string
    icon?: string
    size?: string
}


const ConfirmationModal: FC<IConfirmationModalProps> = ({ show, onConfirmClick, onCloseClick, title, size }) => {
    return (
        <Modal isOpen={show} size={size || 'sm'} centered>
            <div className="modal-body text-center">
                <h5>{title || 'Confirmar'}</h5>
            </div>
            <div className="d-flex gap-2 justify-content-center mx-2 mb-2">
                <Button
                    onClick={onConfirmClick}
                    color='success'
                    style={{ background: '#279241' }}
                    className="btn-label w-50" >
                    SI
                </Button>

                <Button
                    onClick={onCloseClick}
                    color='danger'
                    style={{ background: '#ff1414' }}
                    className="btn-label w-50">

                    NO </Button>

            </div>
        </Modal>
    )
}


export default ConfirmationModal