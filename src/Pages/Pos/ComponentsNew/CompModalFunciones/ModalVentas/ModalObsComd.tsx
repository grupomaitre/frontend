import { FC } from 'react'
import { Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalObsComd: FC<IProps> = ({ show, onCloseClick }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg'>
            <ModalHeader toggle={onCloseClick}>

            </ModalHeader>
            <ModalBody>

                <Card>
                    <CardHeader className='bg-primary text-white'>
                        Mensajse Comanda
                    </CardHeader>
                    <CardBody>
                        <Input
                            type='textarea'
                            style={{ maxHeight: '200px', height: '150px' }}
                        />
                    </CardBody>
                    <CardFooter>
                        <BtnPosModal
                            onAceptarClick={() => console.log('first')}
                            onCloseClick={() => onCloseClick()}
                        />
                    </CardFooter>
                </Card>

            </ModalBody>
        </Modal>
    )
}

export default ModalObsComd