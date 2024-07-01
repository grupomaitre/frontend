import { FC, useEffect, useRef, useState, createRef } from 'react'
import { Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem } from '../../../../slices/Cart/cartSlice'
import NumericKeyboard from '../../common/NumericKeyboardProps'
import InputKeyBoard from '../Cards/CardOrders/InputKeyBoard'

interface IrefInput {
    current: HTMLInputElement | null
}


interface IProps {
    item: any
    show: boolean
    onCloseClick: () => void
}
const ModalAnulacionItem: FC<IProps> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const selectedProduct = useSelector((state: any) => state.productSlice.selectedProduct)

    //keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));

    useEffect(() => {

        if (show) {
            inputRefs.current[0].current?.focus()
            inputRefs.current[0].current?.select()
        }
    }, [selectedProduct, show])


    /*end keyBoard */
    const handleAnularItem = () => {
        dispatch(removeCartItem({ producto: selectedProduct, cantidad: inputValues[0] || 1 }))
        onCloseClick()
        setInputValues([''])
    }
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

    const handleClose = () => {
        onCloseClick()
        setInputValues([''])
    }


    return (
        <Modal isOpen={show} size='sm' fade={false}>
            <ModalHeader toggle={onCloseClick} >
                <span className='fs-15'>{"Eliminar item"}</span>
            </ModalHeader>
            <ModalBody style={{ background: '#2f4f68' }}>
                <div className='text-white d-flex justify-content-between flex-column fs-12'>
                    <Label className='text-info bg-black text-center p-1'>
                        Producto:    {selectedProduct.nombre}
                    </Label>
                    <Label className='bg-black text-warning p-1 text-center fs-13' >
                        Cantidad: #  {selectedProduct.cantidad}
                    </Label>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center'>

                    <div className='w-100'>
                        <InputKeyBoard
                            inputRef={inputRefs.current[0]}
                            value={inputValues[0]}
                            onChange={(event) => handleInputChange(event, 0)}
                            handleInputClick={() => handleInputClick(0)}
                            //handleKeydown={handleKeydown}
                            classInput='text-center  rounded-0 fs-15'
                            styleInput={{ fontSize: '1.7rem' }}
                            type='number'
                            handleInputFocus={() => handleInputFocus(0)}
                            bsSize='sm'

                        />
                    </div>
                    <div className='my-2 text-center '>
                        <NumericKeyboard
                            handleDelete={() => handleDelete()}
                            onKeyPress={(e) => onKeyPress(e)}
                        />
                    </div>
                </div>
            </ModalBody>
            <BtnPosModal
                onAceptarClick={handleAnularItem}
                onCloseClick={handleClose}
            />
        </Modal>
    )
}

export default ModalAnulacionItem