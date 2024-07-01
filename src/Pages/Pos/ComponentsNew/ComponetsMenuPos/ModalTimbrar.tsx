import { FC, useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { XSquare } from 'react-feather'
import { BuscarUser } from '../../Helpers/ApiUser'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import NumericKeyboard from '../../common/NumericKeyboardProps'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalTimbrar: FC<IProps> = ({ show, onCloseClick }) => {
    const [time, setTime] = useState(new Date());
    const [user, setUser] = useState('')
    const [personal, setPersonal] = useState<string>('')
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const currentDate = new Date();
    useEffect(() => {
        const intervalID = ''
        show && setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalID);
        };
    }, [show]);
    const formattedTime = time.toLocaleTimeString();
    const handleUserKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            BuscarUser(user).then((res: any) => {
                setPersonal(res.persona.last_name + ' ' + res.persona.name)
                setDisabled(true)

            }).catch((err: any) => {

                console.log(err)
                setError(true)

            })
        }
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} fullscreen={false} size='md'
            backdrop={true} fade={false}
        >
            <ModalHeader toggle={onCloseClick}>
                {'Timbrar'}
            </ModalHeader>
            <ModalBody className='fondo-sistema text-white'>
                <Row>
                    <Col>
                        {show && currentDate.toISOString().slice(0, 10)}   - {show && formattedTime}
                    </Col>
                </Row>
                <Row className='text-white mb-3'>
                    <Col lg='12'>
                        <Label>Personal de la Empresa</Label>
                        <h5 className='text-white'>Codigó Usuario</h5>
                        <div className='d-flex align-items-center'>
                            <Input
                                onKeyDown={handleUserKeyDown}
                                onChange={(e: any) => setUser(e.target.value)}
                                value={user}
                                disabled={disabled}
                            />
                            <XSquare size={40} className=' cursor-pointer'
                                onClick={() => {
                                    setUser('')
                                    setDisabled(false)
                                    setPersonal('')
                                    setError(false)
                                }}
                            />
                        </div>
                        {personal && <span className='text-info text-capitalize'>{personal}</span>}
                        {error && <h5 className='text-danger'>Usuario no encontrado</h5>}
                        <Button color='primary' block className='mt-3'>Entrada</Button>

                    </Col>

                </Row>
                <Row >
                    <Col lg='7'>
                        <NumericKeyboard
                            onKeyPress={() => { }}
                            handleDelete={() => { }}
                        />
                    </Col>
                </Row>
                <BtnPosModal
                    onAceptarClick={onCloseClick}
                    onCloseClick={onCloseClick}
                />
            </ModalBody>
        </Modal>
    )
}

export default ModalTimbrar