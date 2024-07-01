import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Input, Button, Label, ButtonGroup } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import axios from 'axios'
import { SwalInfo } from '../../../../Components/Common/Swals/SwalsApi'
import TestTelcado from './Components/TestTelcado'
import { Printer, Menu } from 'react-feather'
/* interface IStitio {
    name: string
} */
interface IProps {
    show: boolean
    onCloseClick: () => void
}
const ModalMensajes: React.FC<IProps> = ({ show, onCloseClick }) => {
    //   const [activeItem, setActiveItem] = useState({})
    const [showKeyBoard, setShowKeyBoard] = useState(false)
    const [sitioImpre, setSitioImpre] = useState('')
    const [mensaje, setMensaje] = useState('')
    const nombreMesa = useSelector((state: any) => state.cartSlice.nombreMesa)

    const sitio: any = [
        { name: 'Bebidas', icon: <Printer /> },
        { name: 'Cocinas', icon: <Printer /> },
        { name: 'Postres', icon: <Printer /> },
    ]
    const msmDefecto = [
        { name: 'Mensaje 1' },
        { name: 'Mensaje 2' },
        { name: 'Mensaje 3' },
    ]
    /*  const handleItemClick = (item: object) => {
         setActiveItem(item)
     } */
    const onPrint = async () => {

        try {
            const msmTeclado = inputs.preferencias || '';

            const print = await axios.get('/api/mensaje-print', {
                params: {
                    placePrint: sitioImpre,
                    nombreMesa: nombreMesa,
                    mensaje: mensaje + ' ' + msmTeclado,
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
        <Modal isOpen={show} toggle={onCloseClick} size='md' className='mt-0' fade={false}>
            <ModalHeader toggle={onCloseClick} >
                {'Sitio de Impreción : ' + sitioImpre}
            </ModalHeader>
            <ModalBody className='bgcolorTheme'>

                <div className=''>
                    <ButtonGroup vertical className='bg-white rounded w-100'>
                        {
                            sitio.map((item: any, key: number) => (
                                <Button
                                    key={key}
                                    onClick={() => setSitioImpre(item.name)}
                                    block
                                    color='light'
                                    className=' mx-0 p-1  d-flex  rounded-0 d-flex justify-content-between border'
                                >
                                    <span>{item.name}</span>
                                    <span>{item.icon}</span>
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
                    <Label className='text-white'> {'Mesa :' + nombreMesa}</Label>

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