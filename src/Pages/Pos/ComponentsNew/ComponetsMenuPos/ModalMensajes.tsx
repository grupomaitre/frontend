import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Input, Button, Label, ButtonGroup } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import { SwalInfo } from '../../../../Components/Common/Swals/SwalsApi'
import TestTelcado from './Components/TestTelcado'
import { Printer, Menu } from 'react-feather'
import { useSitioImpresion } from './Api/ApiMensajes'
/* interface IStitio {
    name: string
} */
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalMensajes: React.FC<IProps> = ({ show, onCloseClick }) => {
    //   const [activeItem, setActiveItem] = useState({})
    const [sitios, setSitios] = useState([])
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    const [sitioImpre, setSitioImpre] = useState({ direccion_impresora: null, sitio: null })
    const [mensaje, setMensaje] = useState('')
    const nombreMesa = useSelector((state: any) => state.cartSlice.mesacart)
    const query = useSitioImpresion()
    useEffect(() => {
        if (!query.isFetching) {
            setSitios(query.data)
        }
    }, [])

    const msmDefecto = [
        { name: 'Mensaje 1' },
        { name: 'Mensaje 2' },
        { name: 'Mensaje 3' },
    ]
    /*  const handleItemClick = (item: object) => {
         setActiveItem(item)
     } */
    const onPrint = async () => {
        const terminal = (localStorage.getItem('terminal') || '')
        try {
            const msmTeclado = inputs.preferencias || '';

            const print = await axios.get('/api/mensaje-print', {
                params: {
                    direccion_impresora: sitioImpre.direccion_impresora,
                    sitio: sitioImpre.sitio,
                    nombreMesa: nombreMesa,
                    mensaje: mensaje + ' ' + msmTeclado,
                    terminal: terminal || ''
                }
            })

            if (print) {
                setMensaje('')
                setInputs({})
                onCloseClick()
            }
        } catch (e) {
            SwalInfo({ title: e, text: e })
        }
    }
    /*Teclado funciones */
    const keyboard = useRef();
    const [inputs, setInputs] = useState<any>({})
    const [layoutName, setLayoutName] = useState("default")
    const [inputName, setInputName] = useState("default");

    const onChangeAll = (inputs: any) => {
        setInputs({ ...inputs })
    }

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default"
        setLayoutName(newLayoutName)
    }

    const onKeyPress = (button: any) => {
        // console.log("Button pressed", button)
        if (button === "{shift}" || button === "{lock}") handleShift()
    }
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const newMensaje = inputValue + mensaje;
        setInputs({
            ...inputs,
            [inputName]: inputValue,
        });
        if (keyboard.current) {
            (keyboard.current as any).setInput(newMensaje);
        }
    };

    const getInputValue = (inputName: string) => {
        return inputs[inputName] || ""
    }

    const customTeclas = {
        default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L Ñ",
            "Z X C V B N M {bksp}",
            "{space}"
        ],
        shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L Ñ",
            "{shiftactivated} Z X C V B N M {bksp}",
            "{space}"
        ]
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='md' className='' fade={false}>
            <ModalHeader toggle={onCloseClick} >
                {'Sitio de Impreción  '}
            </ModalHeader>
            <ModalBody className='bg-gray'>

                <div className=''>
                    <ButtonGroup vertical className='bg-white rounded w-100'>
                        {
                            sitios.map((item: any, key: number) => (
                                <Button
                                    key={key}
                                    onClick={() => setSitioImpre({ direccion_impresora: item.direccion_impresora, sitio: item.sitio_impresora })}
                                    block
                                    disabled={item.direccion_impresora === null ? true : false}
                                    color='light'
                                    className=' mx-0 p-1 text-uppercase d-flex  rounded-0 d-flex justify-content-between border'
                                >
                                    {
                                        item.direccion_impresora === null
                                            ? <span>{item.sitio_impresora} - <span className='fs-10 text-lowercase'>Impresora No Asignada</span>  </span>
                                            : item.sitio_impresora
                                    }
                                    <Printer />
                                </Button>

                            ))
                        }
                    </ButtonGroup>
                    <Label className='w-100   px-1 my-1 mb-0' style={{ background: '#d6d9df' }}>Opciones por defecto</Label>
                    <ButtonGroup vertical className='bg-white rounded w-100'>
                        {
                            msmDefecto.map((item: any, key: number) => (
                                <Button
                                    key={key}
                                    onClick={() => setMensaje(item.name)}
                                    block
                                    color='light'
                                    className=' mx-0 p-1  d-flex  rounded-0 d-flex justify-content-between border' >
                                    <span className='py-1'>{item.name}</span>
                                </Button>
                            ))
                        }
                    </ButtonGroup>

                </div>
                <div className='d-flex justify-content-between'>
                    <Label className='text-white'> {'Mesa :' + nombreMesa || ''}</Label>

                </div>
                <div className='d-flex align-items-center'>

                    <Button color="info" className="d-flex align-items-center btn-label rounded-0 rounded-start" onClick={() => setShowKeyBoard(!showKeyBoard)}
                    >
                        <Menu className='label-icon align-middle mt-2' />
                        <span>Teclado</span>
                    </Button>

                    <Input
                        className='rounded-0'
                        type="text"
                        id="preferencias"
                        value={getInputValue("preferencias")}
                        onFocus={() => setInputName("preferencias")}
                        onChange={onChangeInput}
                        placeholder={'Mesa :' + nombreMesa + ' ' + mensaje}
                    />
                </div>

            </ModalBody>
            {
                showKeyBoard && <TestTelcado
                    customLayout={customTeclas}
                    inputName={inputName}
                    onChangeAll={onChangeAll}
                    onKeyPress={onKeyPress}
                />
            }
            <BtnPosModal
                text='Enviar'
                onAceptarClick={() => onPrint()}
                onCloseClick={onCloseClick}
            />
        </Modal>
    )
}

export default ModalMensajes