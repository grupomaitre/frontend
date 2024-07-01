import { FC } from 'react'
import { Box, Check, Clock, Info, Smile, User, X } from 'react-feather'
import { useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
const ModalDetailsItem: FC<IProps> = ({
    show,
    onCloseClick,
    item
}) => {
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    console.log(item.preferences)
    return (
        <Modal isOpen={show} backdrop={false} centered={true} fade={false} size='sm'  >
            <ModalHeader toggle={() => onCloseClick()} className='m-0 p-0 px-2 py-1'>
                <span className='fs-14'>
                    {'Mensaje'}
                </span>
            </ModalHeader>
            <ModalBody className='shadow-modal rounded'
                style={{ background: '#d6d9df' }}
            >
                <Row className='mb-3 d-flex align-items-center' >
                    <Col lg='2'>
                        <Info
                            size={40}
                            fill='#416abb'
                            color='white'
                            className='shadow-icon rounded-pill'
                        />

                    </Col>
                    <Col className='fs-11'>
                        <span >Información</span>
                        <ul >

                            <li className='text-lowercase'>

                                <span className='fw-bold text-capitalize'>
                                    <Box size={11} />
                                    {' '} Item: </span>
                                {item?.nombre || null} </li>
                            <li>
                                <span className='fw-bold text-capitalize'><Clock size={11} /> {' '}
                                    Hora : </span>
                                {item?.fecha_inicio || null}</li>
                            <li>
                                <span className='fw-bold text-capitalize'>
                                    <User size={11} />
                                    {' '}Vendedor : </span>

                                {vendedor || null}</li>
                        </ul>

                    </Col>
                </Row>
                {item?.status_preference || item?.preferences ? <Row>
                    <Col lg='2'>
                        <Smile
                            size={35}
                            color='#ff9c3a'
                            className='shadow-icon rounded-pill'
                        />
                    </Col>
                    <Col>

                        <>
                            <span className='fs-11'>Preferencias</span>
                            <ul className='fs-11'>
                                {
                                    (item?.preferences || []).map((item: any, key: number) => (
                                        <li key={key}>{
                                            item?.name || null
                                        }</li>
                                    ))
                                }
                            </ul>
                        </>
                    </Col>
                </Row> : null}
                <Row className=''>
                    <Col  >
                        <Button
                            block
                            className={'d-flex justify-content-around align-items-center  float-end border border-info rounded-pill fs-13'}
                            color='primary'
                            size='lg'
                            onClick={onCloseClick}
                        >
                            <Check size={15} />
                            {'Aceptar'}
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            block
                            color='danger'
                            size='lg'
                            className='d-flex justify-content-around  align-items-center rounded-pill border border-white fs-13'
                            onClick={onCloseClick}
                        >
                            <X size={15} />
                            {'Cerrar'}
                        </Button>

                    </Col>
                </Row>
            </ModalBody>
        </Modal >
    )
}

export default ModalDetailsItem