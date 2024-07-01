import { FC } from 'react'
import { api } from '../../../../config'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    setImagenCuenta: any
}
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const ModalImgCuenta: FC<IProps> = ({
    show, onCloseClick, item, setImagenCuenta
}) => {
    const url = api.API_URL
    const onSelectImg = (item: any) => {
        if (item.imagen.length > 0) {
            setImagenCuenta(item)
            onCloseClick()
        }
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg'>
            <ModalHeader className='p-0 px-5' toggle={onCloseClick}>
                Mesas
            </ModalHeader>
            <ModalBody>
                <Row>
                    {
                        item.map((item: any, key: number) => (
                            <Col key={key} lg='2' md='2' sm='2' xl='2'>
                                <Button
                                    block
                                    outline
                                    color='black'
                                    onDoubleClick={() => onSelectImg(item)}
                                >
                                    <img src={url + item.imagen} width={60} height={60} />
                                </Button>
                            </Col>
                        ))
                    }
                </Row>
            </ModalBody>
        </Modal>
    )
}
export default ModalImgCuenta