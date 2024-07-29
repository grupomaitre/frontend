import { useState, FC, useRef, createRef, useEffect } from 'react'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { Card, CardBody, CardFooter, CardHeader, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import NumericKeyboard from '../../../Pos/common/NumericKeyboardProps'
import ClassCrudCaja from '../../Api/ClassCrudCaja'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { SwalSuccess } from '../../../../Components/Common/Swals/SwalsApi'
import { BuscarUser } from '../../../Pos/Helpers/ApiUser'
import ModalAlert from '../../../../common/Generics/Modal/ModalAlert'
import axios from 'axios'
interface Props {
    onCloseClick: any
    show: boolean
    isEdit?: boolean
    saveCaja: any
}
interface IrefInput {
    current: HTMLInputElement | null
}
const ModalCrud: FC<Props> = ({ onCloseClick, show, isEdit }) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState<Array<string>>(['', ''])
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const [error, setError] = useState('')
    const userData = JSON.parse(sessionStorage.getItem('authUser') || '{}')
    const [userPrint, setUserPrint] = useState('')
    const newCaja = {
        saldo_inicial: inputValues[0] || 0,
        nombre_creador: userData.name_personal || null,
        id_user: userData.id_user || null,
        status: true,

    }

    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
        }, 100);
    }, [show])

    const handleSaveCaja = async () => {

        const res: any = await ClassCrudCaja.addCaja(newCaja)

        if (res.status === 'success') {
            localStorage.setItem("idCaja", JSON.stringify(res.data.id_caja_diaria))
            SwalSuccess({ title: 'Caja Abierta' })
            onCloseClick()
            navigate('/dashboard')
        }

    }
    //keyboard
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index);
    }
    //on focus function
    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }

    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
        setInputValues(newInputValues);
    }
    const handleKeyDown = async (e: any, op: number) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            switch (op) {
                case 0:
                    inputRefs.current[1].current?.focus();
                    break;
                case 1:
                    const res: any = await BuscarUser(inputValues[1])
                    if (res === 'No existe Vendedor') {
                        setError(res)
                        console.log('clear')
                        setInputValues([inputValues[0], ''])
                    } else {
                        setUserPrint(res?.persona.name + '-' + res.persona.last_name)
                        setShowConfirm(true)
                        setError('')
                    }
                    break;
                default:
                    console.log('Opción no reconocida');
                    break;
            }
        }
    }
    const handleAcept = async () => {
        const maquina = (localStorage.getItem('terminal') || '')
        handleSaveCaja()
        onCloseClick()
        await axios.post('api/imprimir/saldo/inicial', {
            saldo: inputValues[0] || 0,
            usuario: userPrint || null,
            maquina: maquina
        })
    }

    const handleClose = () => {
        onCloseClick()
        setShowConfirm(false)
        setInputValues(['', ''])
        handleSaveCaja()

    }

    return (
        <>
            {showConfirm &&
                <ModalAlert
                    onAceptar={() => handleAcept()}
                    show={showConfirm}
                    onCancelar={() => handleClose()}
                    onCloseClick={() => handleClose()}
                    text='Desea Imprimir'
                    showAceptar={true}
                    showCancelar={true}
                    backdrop={true}
                />}
            <Modal isOpen={show} toggle={onCloseClick} size='sm'>
                <ModalHeader className='text-center'>
                    <span>{isEdit ? 'Editar caja' : 'Nueva Caja'}</span>
                </ModalHeader>
                <ModalBody style={{ background: '#c2c2c2' }} className='m-0 p-0'>
                    <Card className='rounded-0 m-0'>
                        <CardHeader >
                            <Label>Saldo Inicial</Label>
                            <Input
                                innerRef={inputRefs.current[0]}
                                value={inputValues[0]}
                                onClick={() => handleInputClick(0)}
                                onChange={(e) => handleInputChange(e, 0)}
                                onFocus={() => handleInputFocus(0)}
                                className='mb-3 text-center border-sistema'
                                onKeyDown={(e) => handleKeyDown(e, 0)}
                            />
                            <Label>Ingrese Clave</Label>
                            <Input
                                innerRef={inputRefs.current[1]}
                                value={inputValues[1]}
                                onClick={() => handleInputClick(1)}
                                onChange={(e) => handleInputChange(e, 1)}
                                onFocus={() => handleInputFocus(1)}
                                onKeyDown={(e) => handleKeyDown(e, 1)}
                                className='text-center border-sistema'
                                type='password'

                            />
                            <span className='text-danger text-center'>{error && error}</span>

                        </CardHeader>
                        <CardBody >
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}
                                btnClass='rounded'

                            />
                        </CardBody>
                        <CardFooter style={{ background: '#cecece' }}>
                            <BtnPosModal
                                onAceptarClick={() => handleSaveCaja()}
                                onCloseClick={onCloseClick}
                                vertical={false}
                            />
                        </CardFooter>
                    </Card>
                </ModalBody>

                <ToastContainer />

            </Modal >
        </>
    )
}

export default ModalCrud