import { FC } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap'
interface ModalPosActiveProps {
    show: boolean,
}
const ModalPosActive: FC<ModalPosActiveProps> = ({ show }) => {
    return (
        <Modal isOpen={!show} centered size='md'>
            <ModalBody>

                <div className='d-flex align-items-center justify-content-center'>
                    <img src="images/informacion.png" alt="logo" width={75} />
                    <span className='fs-2'> No se ha  aperturado una caja</span>
                </div>
            </ModalBody>
            <Button
            //  onClick={() => navigate('/caja')}
            >
                Regresar
            </Button>
        </Modal>
    )
}

export default ModalPosActive