import { FC } from 'react'
import { Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap'
import FormSitePrinter from '../Form/FormSitePrinter'

interface Ipros {
    show: boolean
    onCloseClick: () => void
    getDocumentWithSitio: () => void
}

const ModalSitePrinter: FC<Ipros> = ({ show, onCloseClick, getDocumentWithSitio }) => {


    return (
        <Modal isOpen={show} toggle={onCloseClick} size='md'>
            <ModalHeader toggle={onCloseClick} />
            <ModalBody className='page-bg'>
                <Row>
                    <Col>
                        <FormSitePrinter
                            onCloseClick={onCloseClick}
                            getDocumentWithSitio={getDocumentWithSitio}
                        />
                    </Col>
                </Row>

            </ModalBody>
        </Modal>
    )
}

export default ModalSitePrinter