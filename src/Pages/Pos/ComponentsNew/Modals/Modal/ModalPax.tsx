import { FC, useEffect, useState, useRef } from 'react'
import { Modal, ModalHeader, ModalBody, Input, Col, Row, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { addPax } from '../../../../../slices/Cart/cartSlice'
import BtnPosModal from '../../../../../Components/Common/Buttons/BtnPosModal'
import GlobalTeclado from '../../Extras/GlobalTeclado'
import { setOncantidad } from '../../../../../slices/Cart/tecladoSlice'
interface ModalPaxProps {
    show: boolean,
    onCloseClick: () => void
}

const ModalPax: FC<ModalPaxProps> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const [pax, setPax] = useState<any>('')
    const [error, setError] = useState(false)
    const inputRefPax = useRef<HTMLInputElement>(null)
    //const onCantidad = useSelector((state: any) => state.tecladoSlice.onCantidad)
    //const vendedor = useSelector((state: any) => state.cartSlice.vendedor);
    const handlePax = () => {
        dispatch(setOncantidad(true))
        const parsedPax = Number(pax)
        dispatch(addPax(parsedPax))
        onCloseClick()

    }
    const handleKeyUp = (event: any) => {
        if (event.key === 'Enter') {
            dispatch(addPax(pax))
            onCloseClick()
        }
        if (event.target.value === '') {
            setError(true)
        }
    }
    const [sera, setSera] = useState(false)
    useEffect(() => {
        setSera(true)
    }, [show])
    useEffect(() => {
        if (sera) {
            inputRefPax.current?.focus();
        }
    }, [sera])

    return (
        <Modal isOpen={show} size="md" backdrop={'static'}  >
            <ModalHeader toggle={onCloseClick} >
                Ingrese Pax
            </ModalHeader>
            <ModalBody style={{ background: "#416683" }}>
                <Row className=''>
                    <Col className='d-flex flex-column ' lg='5' xxl='5' sm='12'>
                        <div className='d-flex align-items-center'>
                            <Label className='text-white'>No.PAX</Label>
                            <Input
                                innerRef={inputRefPax}
                                maxLength={2}
                                type='number'
                                onChange={(e) => setPax(e.target.value)}
                                onKeyDown={handleKeyUp}
                                value={pax}
                                className='mb-4 ms-3'
                            />
                        </div>
                        {error && <span className='text-danger'>Campo requerido</span>}
                        <BtnPosModal
                            onAceptarClick={handlePax}
                            onCloseClick={onCloseClick}
                            vertical={true}
                        />
                    </Col>
                    <Col lg='6' xxl='6' sm='12' className='m-0 p-0 '>
                        <GlobalTeclado
                            setInputTeclado={setPax}
                            gFunction={handlePax}
                        />

                    </Col>
                </Row>
            </ModalBody>

        </Modal>
    )
}

export default ModalPax