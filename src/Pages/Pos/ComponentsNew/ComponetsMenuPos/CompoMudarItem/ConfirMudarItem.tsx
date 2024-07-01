import { FC } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
interface Ipros {
    show?: boolean
    isMismaCuenta: boolean
    onCloseClick?: () => void;
    onMismaCuentaClick?: () => void;
    onOtraCuentaClick?: () => void;
    mesaCart: string | number
}

const ConfirMudarItem: FC<Ipros> = ({
    show,
    isMismaCuenta,
    onMismaCuentaClick,
    onCloseClick,
    onOtraCuentaClick,
    mesaCart
}) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} centered={true} size="sm" fade={false}>
            <ModalHeader toggle={onCloseClick}>

            </ModalHeader>
            <ModalBody className="page-bg" >

                <div className='d-flex flex-column justify-content-around' style={{ maxHeight: '400px', height: '600px' }}>
                    {!isMismaCuenta && < Button
                        size='lg'
                        block
                        color='light'
                        onClick={onMismaCuentaClick}
                        className="h-25 mb-3"
                    >

                        Misma Cuenta {mesaCart}
                    </Button>
                    }
                    <Button
                        size='lg'
                        block
                        color='light'
                        onClick={onOtraCuentaClick}
                        className="h-25">
                        Otra cuenta {mesaCart}
                    </Button>
                </div>

            </ModalBody>
        </Modal >)
}

export default ConfirMudarItem