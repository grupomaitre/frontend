import { FC, useEffect, useRef, useState } from 'react'
interface IProps {
    show: boolean
    onCloseClick: () => void
}
import { api } from '../../../config'

import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { GetMesasPosition, UpdateMesaPosition } from '../Helpers/GetMesas'
import Draggable from 'react-draggable'
import Select from 'react-select'
import { fetchImagenCuenta, fetchTipoCuenta } from '../Api/TipoCuenta/ApiTipoCuenta'
import HeaderTools from '../../../common/Ui/HeaderTools'
import ModalImgCuenta from '../Components/Cuenta/ModalImgCuenta'
import { fetchSaveCuenta } from '../Api/Cuenta/ApiCuenta'
const ModalConfigMesas: FC<IProps> = ({
    show, onCloseClick
}) => {
    const urlBase = (localStorage.getItem('api_url') || '')
    const nodeRef = useRef<any>(null)
    //const [selectItemRow, setSelectItemRow] = useState()
    const [bgColor, setBgColor] = useState<string>('#fff')
    const [isIDMesa, setIsIDMesa] = useState<number>(0)
    const [nombreCuenta, setNombreCuenta] = useState<string>('')
    const [tipoMesa, setTipoMesa] = useState<any>()
    const [mesas, setMesas] = useState<any>([])
    const [opTipoCuenta, setOpTipoCuenta] = useState([])
    const [opImgCuenta, setOpImgCuenta] = useState([])
    const [showModalImg, setShowModalImg] = useState(false)
    const [imagenCuenta, setImagenCuenta] = useState<any>('')
    const [position, setPositon] = useState({ x: 0, y: 0 })
    const [isEdit, setIsEdit] = useState(false)
    const getCuentas = async () => {
        const res: any = await GetMesasPosition()
        setMesas(res)
    }
    const getTipoCuenta = async () => {
        const res: any = await fetchTipoCuenta()
        setOpTipoCuenta(res.map((item: any) => ({ value: item.id_tipo_cuenta, label: item.tipo_cuenta })))
    }

    const getImagenCuenta = async () => {
        const res: any = await fetchImagenCuenta()
        setOpImgCuenta(res)


    }
    useEffect(() => {
        getCuentas()
        getTipoCuenta()
        getImagenCuenta()

    }, [])



    const itemTools = [
        {
            title: 'Edición', subItems: [

                { text: 'Guardar', onClick: () => isEdit ? handleEditMesa() : handleSaveCuenta() },
                { text: 'Limpiar', onClick: () => handleClearCuenta() }
            ]
        },
    ];

    const handleSaveCuenta = async () => {
        const res: any = await fetchSaveCuenta(nombreCuenta, tipoMesa.label, tipoMesa.value, '1', '', imagenCuenta.imagen)
        if (res) {
            getCuentas()
            setNombreCuenta('')
            setTipoMesa(null)
            setImagenCuenta('')
        }
    }
    const handleClearCuenta = () => {
        setNombreCuenta('')
        setTipoMesa(null)
        setImagenCuenta('')
    }

    const handleEditMesa = async () => {
        const res: any = await UpdateMesaPosition(isIDMesa, position)
        if (res) {
            getCuentas()

            console.log('isEdit', position, isIDMesa)
        }
    }

    const url = api.API_URL

    const handleDrag = (e: any, data: any, mesa: any) => {
        console.log(e, data, mesa)
        setPositon({ ...position, x: e.offsetX, y: e.offsetY })
    }
    const handleMesaSet = (mesa: any) => {
        setIsEdit(true)
        setNombreCuenta(mesa.nombre_mesa)
        setIsIDMesa(mesa.id_mesa)
    }
    return (
        <>
            {showModalImg &&
                <ModalImgCuenta
                    show={showModalImg}
                    onCloseClick={() => setShowModalImg(false)}
                    item={opImgCuenta}
                    setImagenCuenta={setImagenCuenta}
                />
            }
            <Modal isOpen={show} toggle={onCloseClick} size='xl' fullscreen>
                <ModalHeader toggle={onCloseClick}>
                    Configuración Mesas
                </ModalHeader>
                <ModalBody>

                    <Card className='fs-12'>
                        <CardHeader className='m-0 p-0'>
                            <HeaderTools
                                itemTools={itemTools}
                            />

                        </CardHeader>
                        <CardBody>
                            <Row className='mb-1 align-items-center'>
                                <Col lg='2'>
                                    <Label>Cuenta</Label>
                                </Col>
                                <Col lg='2'>
                                    <Input
                                        value={nombreCuenta}
                                        bsSize='sm'
                                        onChange={(e) => setNombreCuenta(e.target.value)} />
                                </Col>
                                <Col lg='2' className=''>
                                    <div
                                        className="form-check form-check-success"
                                    >
                                        <Label
                                            className="form-check-label"
                                            htmlFor="formCheck9"

                                        >
                                            Sin servicio
                                        </Label>
                                        <Input
                                            className="form-check-input "
                                            type="checkbox"
                                            id="formCheck9"
                                        />

                                    </div>
                                </Col>
                                <Col lg='3'>
                                    <Button size='sm' className='border' color='white'>Desbloquear Cuentas</Button>
                                </Col>
                            </Row>
                            <Row className='mb-1'>
                                <Col lg='2'>
                                    <Label>Nivel Cuenta</Label>
                                </Col>
                                <Col lg='2'>
                                    <Input type='select' bsSize='sm' />
                                </Col>

                            </Row>
                            <Row className='mb-2'>
                                <Col lg='2'>
                                    <Label>Tipo </Label>
                                </Col>
                                <Col lg='2'>
                                    <Select
                                        className='border'
                                        options={opTipoCuenta}
                                        onChange={setTipoMesa}
                                    />
                                </Col>
                                <Col lg='1'>Fondo</Col>
                                <Col lg='1'>
                                    <Input type='color'
                                        onChange={(e) => setBgColor(e.target.value)}
                                    />
                                </Col>
                                <Col className='' lg=''>
                                    <Button
                                        outline
                                        color='primary'
                                        onClick={() => setShowModalImg(true)}
                                    >Imagenes Mesa
                                    </Button>

                                </Col>
                                {imagenCuenta && <Col>
                                    <img src={url + imagenCuenta?.imagen} className='avatar-sm' />
                                </Col>}
                            </Row>
                            <Row>
                                <Col className='border p-2 ' style={{ background: bgColor, height: '60vh' }} lg='12'>
                                    <Row className='gap-2' >
                                        {
                                            (mesas || []).map((item: any, key: number) => (
                                                <Draggable
                                                    // positionOffset={{ x: '-589', y: '424' }}
                                                    /*  positionOffset={{ x: item.position.x || '-589', y: item.position.y || '424' }} */
                                                    onDrag={(e: any, data) => handleDrag(e, data, item)}
                                                    key={key}
                                                    //nodeRef={nodeRef}
                                                    ref={nodeRef}
                                                    defaultClassName='cursor-pointer'>
                                                    <Col
                                                        onDoubleClick={() => handleMesaSet(item)}
                                                        className='  d-flex align-items-center justify-content-between flex-column ' ref={nodeRef}>
                                                        <img src={`http://${urlBase}${item.imagen}`} className='avatar-sm' />
                                                        <div
                                                            style={{ position: 'absolute', marginTop: '7px' }}
                                                            className='fs-12 fw-bold'>{item.nombre_mesa}</div>
                                                    </Col>
                                                </Draggable>
                                            ))
                                        }
                                    </Row>
                                </Col>
                                <Col lg='2' className=''></Col>
                            </Row>
                        </CardBody>
                        <CardFooter>

                        </CardFooter>
                    </Card>
                </ModalBody>
            </Modal >
        </>
    )
}
export default ModalConfigMesas