import { FC } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Card, CardBody } from 'reactstrap'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalCargoHabi: FC<IProps> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='xl'>
            <ModalHeader>
                {'Cargo Habitación'}
            </ModalHeader>
            <ModalBody className='bg-light'>
                <Label className='card p-2'>Cuenta: ?, Elija la Habitacion para cargar Item's</Label>
                <Card>
                    <CardBody style={{ height: '200px' }}>
                        <Label>Habitaciones</Label>
                    </CardBody>
                </Card>
            </ModalBody>

            <ModalFooter>
                <Button color='primary'>Guardar</Button>
                <Button color='light' onClick={() => onCloseClick()}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalCargoHabi