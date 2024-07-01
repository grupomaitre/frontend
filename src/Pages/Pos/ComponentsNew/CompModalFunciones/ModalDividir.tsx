import { FC, createRef, useEffect, useRef, useState } from 'react'
import { Modal, ModalBody, ModalHeader, Label, ModalFooter } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import { IrefInput } from '../ComponetsMenuPos/Interface/InterMudarItem'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'
import { totalCart } from '../../Func/FuncCart'
import { useDispatch, useSelector } from 'react-redux'
import { updateDividirCuenta } from './Api/ApiDividirCuenta'
import { setInputMesa, setInputVendedor } from '../../../../slices/Cart/cartStatusSlice'
import { clearCart, clearIDMesa, setIDUser, setIsPreference, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import { socketTest } from '../../Socket/ConctSocket'
interface IProps {
    show: boolean
    onCloseClick: () => void
    onCloseFuncModal: () => void
}
const ModalDividir: FC<IProps> = ({ show, onCloseClick, onCloseFuncModal }) => {

    const dispatch = useDispatch()
    const idCart = useSelector((state: any) => state.cartSlice.idCart)
    const idMesa = useSelector((state: any) => state.cartSlice.idMesa)
    const totalComp = totalCart()
    const [totalDiv, setTotalDiv] = useState(totalComp)
    const [total, setTotal] = useState<number>()
    useEffect(() => {
        setTotal(totalComp)
    }, [show])
    //keyboard
    const [inputValues, setInputValues] = useState<Array<string | number | any>>(['', '1']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {

        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);


    }
    const handleDelete = () => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
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

    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }
    /*   const ClearInputKeyBoard = (item: number) => {
          const nuevosValores = [...inputValues];
          nuevosValores[item] = '';
          setInputValues(nuevosValores);
      } */
    //end keyboard
    useEffect(() => {
        setTimeout(() => {
            inputRefs.current[0].current?.focus()
            inputRefs.current[0].current?.select()
        }, 100);
    }, [show])

    useEffect(() => {

        const divisor = inputValues[0].length === 0 ? 1 : inputValues[0];

        setTotalDiv(totalComp / divisor)

    }, [inputValues[0]])


    useEffect(() => {

        if (inputValues[0] > 10) {
            inputRefs.current[0].current?.select()
            setInputValues([''])
        }

    }, [inputValues[0]])
    const handleDividirCuenta = async () => {
        const res: any = await updateDividirCuenta(inputValues[0], idMesa, idCart)
        if (res) {
            socketTest.emit('actualizarMesas');
            handleClearAllCart()
            onCloseFuncModal()
            onCloseClick()
        }
    }
    const handleClearAllCart = () => {

        dispatch(setInputMesa(false))
        dispatch(setInputVendedor(true))
        dispatch(clearCart())
        dispatch(setVendedorSlice(''))
        dispatch(clearIDMesa(0))
        dispatch(setIDUser(0))
        dispatch(setIsPreference(false))
    }
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='sm'>
            <ModalHeader className='d-flex bg-orange text-warning d-flex justify-content-center '>
                <span className='text-white'>Total: ${total?.toFixed(2)}</span>
            </ModalHeader>

            <ModalBody className='bg-gray'>

                <Label className='text-center bg-black w-100 rounded text-danger fs-6'>{'Maximo de 10'}</Label>
                <InputKeyBoard
                    inputRef={inputRefs.current[0]}
                    value={inputValues[0]}
                    onChange={(event) => handleInputChange(event, 0)}
                    handleInputClick={() => handleInputClick(0)}
                    classInput='text-center  fs-15 border shadow-lg'
                    type='number'
                    handleInputFocus={() => handleInputFocus(0)}
                />
                <Label className='text-warning bg-black w-100 text-center py-1 mt-2 rounded'>
                    <span>{'Resultado '}: {(totalDiv).toFixed(2)}</span>
                </Label>

                <div className='d-flex w-100  gap-5 justify-content-center align-items-center'>
                    <NumericKeyboard
                        handleDelete={() => handleDelete()}
                        onKeyPress={(e) => onKeyPress(e)}
                        widthKey='70px'
                        heightKey='70px'
                        fontSizeKey='1.55rem'
                        heightBtnDelete='70px'
                        fondoKey='#e6ecec'
                        colorKeys='#13284e'
                        widthBorrar='70px'
                        gridColumn='span 1'
                        sizeBorrar={'0.9rem'}
                        bgDelete={'#e6ecec'}
                        colorDelete={'#13284e'}
                        keyboards={[
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'
                        ]}
                    />
                </div>


            </ModalBody>
            <ModalFooter >
                <BtnPosModal
                    onAceptarClick={() => handleDividirCuenta()}
                    onCloseClick={onCloseClick}
                    divClass='w-100'
                    btnClassAceptar='page-bg'
                />
            </ModalFooter>
        </Modal>
    )
}

export default ModalDividir