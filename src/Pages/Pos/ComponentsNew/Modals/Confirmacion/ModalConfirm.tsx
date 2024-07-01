import { FC } from 'react'
import { Modal, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { Trash2 } from 'react-feather'
interface IModalConfirm {
    show: any
    onCloseClick: any
}

const ModalConfirm: FC<IModalConfirm> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} backdrop={'static'}
            id="staticBackdrop" centered>
            <ModalHeader >
                <span className='text-center'>Confirmacion</span>
            </ModalHeader>
            <ModalBody>
                <div className="mt-2 text-center">
                    <Trash2
                        className="mt-4"
                        size={50}
                        style={{
                            strokeWidth: '1px',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            stroke: '#f7b84b',
                            fill: '#f06548',
                        }}
                    />
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Estas segura/a ?</h4>
                        <p className="text-muted mx-4 mb-0">
                            ¿Estás segura/o de que quieres eliminar este registro?
                        </p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button size='lg' block color="primary">
                    Guardar
                </Button>
                <Button block color="light" onClick={onCloseClick}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalConfirm