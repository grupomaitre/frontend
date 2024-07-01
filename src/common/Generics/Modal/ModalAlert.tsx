import { FC } from 'react'
import { Check, Info, X } from 'react-feather'
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
interface IProps {
    show: boolean
    onCloseClick: () => void
    onAceptar: () => void
    onCancelar: () => void
    backdrop?: boolean
    centered?: boolean
    fade?: boolean
    size?: string
    text?: string
    textFs?: string
    showAceptar: boolean
    showCancelar: boolean

}
const ModalAlert: FC<IProps> = ({
    show,
    onCloseClick,
    onAceptar,
    onCancelar,
    backdrop,
    centered,
    fade,
    size,
    text,
    textFs,
    showAceptar,
    showCancelar
}) => {
    return (
        <Modal isOpen={show} toggle={() => onCloseClick()} backdrop={backdrop || false} centered={centered || true} fade={fade || false}
            size={size || 'sm'}
        >
            <ModalHeader toggle={() => onCloseClick()} className='m-0 p-0 px-2 py-1'>
                <span className='fs-14'>
                    {'Mensaje'}
                </span>
            </ModalHeader>
            <ModalBody className='shadow-modal rounded'
                style={{ background: '#d6d9df' }}
            >
                <Row className='mb-3 d-flex align-items-center' >
                    <Col lg='3'>
                        <Info
                            size={50}
                            fill='#416abb'
                            color='white'
                            className='shadow-icon rounded-pill'
                        />

                    </Col>
                    <Col>
                        <span className={`ms-4 fs-${textFs || 14}`}>
                            {text || 'Campo querido'}
                        </span>

                    </Col>

                </Row>
                <Row className=''>
                    {showAceptar &&
                        <Col lg={showAceptar && 6} >
                            <Button
                                block
                                onClick={onAceptar}
                                className={'d-flex justify-content-around align-items-center  float-end border border-info rounded-pill fs-13'}
                                color='primary'
                                size='lg'
                            >
                                <Check size={15} />
                                {'Aceptar'}
                            </Button>
                        </Col>
                    }
                    {showCancelar && <Col>
                        <Button
                            onClick={onCancelar}
                            block
                            color='danger'
                            size='lg'
                            className='d-flex justify-content-around  align-items-center rounded-pill border border-white fs-13'
                        >
                            <X size={15} />
                            {'Cancelar'}
                        </Button>

                    </Col>}
                </Row>
            </ModalBody>
        </Modal >
    )
}

export default ModalAlert