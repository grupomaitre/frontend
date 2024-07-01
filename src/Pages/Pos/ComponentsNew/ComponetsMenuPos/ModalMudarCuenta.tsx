import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, Input, Card, CardBody, Row, Col, Label } from 'reactstrap'
import axios from 'axios'
import { getListMesas } from '../../Helpers/getListMesas'
import { getAllMesas } from '../../Helpers/GetMesas'
import { useDispatch, useSelector } from 'react-redux'
import { setMesa } from '../../../../slices/Facturacion/Mesa/mesaSlice'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
interface IModalMudarCuenta {
    show: boolean,
    onCloseClick: () => void,
}
const ModalMudarCuenta: React.FC<IModalMudarCuenta> = ({ show, onCloseClick }) => {
    const mesas = useSelector((state: any) => state.mesaSlice.mesa)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const dispatch = useDispatch()
    const [cuentaActual, setCuentaActual] = useState('')
    const [cuentaNueva, setCuentaNueva] = useState('')
    const [idCart, setIdCart] = useState('')
    const MoveCuenta = async () => {
        try {
            const result = await axios.post('/api/v1/mover-cuenta', {
                id_cart: idCart,
                id_mesa_new: cuentaNueva,
                id_mesa_old: cuentaActual
            })
            if (result) {
                getAllMesas().then((res) => {
                    res && dispatch(setMesa(res))
                    onCloseClick()
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleCuentaActual = async (item: any) => {
        try {

            const res = await getListMesas(item.id_mesa);
            setIdCart(res.id_cart);
            setCuentaActual(item.id_mesa)


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='lg' fade={false}>
            <ModalHeader>
                {'Mover Cuenta'}
            </ModalHeader>
            <ModalBody style={{ background: '#23486b' }}>
                <Card style={{ background: "#3a5e80" }}>
                    <CardBody>
                        <Row className='text-white'>
                            <Col lg='6'>
                                <Label>Cuenta Actual :</Label>

                                <Input value={cuentaActual || mesacart} disabled />
                            </Col>
                            <Col lg='6'>
                                <Label>Cuenta Nueva</Label>
                                <Input value={cuentaNueva} disabled />
                            </Col>
                        </Row>

                    </CardBody>
                </Card>
                <div className='gridContainerMesas card py-1'>
                    {
                        mesas.map((item: any, key: number) => (
                            <span key={key}
                                className={" rounded d-flex flex-column align-items-center  spanMesa border border-light shadow text-center  " +
                                    (item.status ? 'backgroundSuccess fw-bold' : 'bg-white text-black fw-medium')}
                                style={{ width: '40px', height: '40px' }}
                                onClick={item.status ? () => handleCuentaActual(item) : () => setCuentaNueva(item.id_mesa)}
                            >
                                <span >{item.nombre_mesa}</span>
                            </span>
                        ))
                    }
                </div>
            </ModalBody>
            {/*        <ModalFooter>
                <Button block color='primary' size='lg' onClick={MoveCuenta}>Guardar</Button>
                <Button block color='light' onClick={onCloseClick}>Cancelar</Button>

            </ModalFooter> */}
            <BtnPosModal
                onAceptarClick={MoveCuenta}
                onCloseClick={onCloseClick}
            />
        </Modal>
    )
}

export default ModalMudarCuenta