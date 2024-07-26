import { useState, FC, useRef, createRef, useEffect } from 'react'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import NumericKeyboard from '../../../Pos/common/NumericKeyboardProps'
import ClassCrudCaja from '../../Api/ClassCrudCaja'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { SwalSuccess } from '../../../../Components/Common/Swals/SwalsApi'
import ModalConfimacion from '../../../Pos/ComponentsNew/ComponetsMenuPos/Components/ModalConfimacion'
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

    const userData = JSON.parse(sessionStorage.getItem('authUser') || '{}')

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

    return (
        <>
            <ModalConfimacion
                //confirmar={() => console.log(0)}
                onCloseClick={() => setShowConfirm(false)}
                show={showConfirm}
            />
            <Modal isOpen={show} toggle={onCloseClick} size='sm'>
                <ModalHeader  >
                    {isEdit ? 'Editar caja' : 'Nueva Caja'}
                </ModalHeader>
                <ModalBody style={{ background: '#c2c2c2' }} className='m-0 p-0'>
                    <Card className='rounded-0 m-0'>
                        <CardHeader >
                            <Input
                                innerRef={inputRefs.current[0]}
                                value={inputValues[0]}
                                onClick={() => handleInputClick(0)}
                                onChange={(e) => handleInputChange(e, 0)}
                                onFocus={() => handleInputFocus(0)}
                                className='mb-3'
                                placeholder='Saldo Inicial'
                            />
                            <Input
                                innerRef={inputRefs.current[1]}
                                value={inputValues[1]}
                                onClick={() => handleInputClick(1)}
                                onChange={(e) => handleInputChange(e, 1)}
                                onFocus={() => handleInputFocus(1)}
                                placeholder='Usuario'
                            />

                        </CardHeader>
                        <CardBody >
                            <NumericKeyboard
                                handleDelete={() => handleDelete()}
                                onKeyPress={(e) => onKeyPress(e)}

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