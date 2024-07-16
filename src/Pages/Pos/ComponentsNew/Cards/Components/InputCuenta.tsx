import { FC } from 'react'
import { Col, Label } from 'reactstrap'
import InputKeyBoard from '../CardOrders/InputKeyBoard'
import { XCircle } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { setInputMesa, setInputVendedor } from '../../../../../slices/Cart/cartStatusSlice'
import { clearCart, clearIDMesa, clearMesa, setIDUser, setIsPreference, setVendedorSlice } from '../../../../../slices/Cart/cartSlice'
interface IProps {
    inputRef: any
    inputValues: any
    setInputValues: any
    onChangeProp: any
    handleInputClick: any
    handleKeydown: any
    handleInputFocus: any
}
const InputCuenta: FC<IProps> = ({
    inputRef,
    inputValues,
    setInputValues,
    onChangeProp,
    handleInputClick,
    handleKeydown,
    handleInputFocus,
}) => {
    const dispatch = useDispatch()
    const inputMesa = useSelector((state: any) => state.cartStatusSlice.inputMesa)

    const handleInvInputValues = (index: number) => {
        inputRef.current[index].current?.select()
        const updatedValues = [...inputValues]
        updatedValues[index] = ''
        setInputValues(updatedValues)
    }
    const handleClearMesa = () => {
        handleInvInputValues(0)
        dispatch(setInputMesa(false))
        dispatch(setInputVendedor(true))
        dispatch(clearCart())
        dispatch(clearMesa())
        setInputValues(['', '', '', ''])
        dispatch(setVendedorSlice(''))
        dispatch(clearIDMesa(0))
        dispatch(setIDUser(0))
        dispatch(setIsPreference(false))

        setTimeout(() => {
            inputRef.current[0].current?.focus()
        }, 100)

    }

    return (
        <>
            <Col lg='6' className='d-flex justify-content-center align-items-center text-center'>
                <div className=''>
                    <Label className='fs-14'>Cuenta</Label>

                    <InputKeyBoard
                        inputRef={inputRef.current[0]}
                        value={inputValues[0]}
                        onChange={(event) => onChangeProp(event, 0)}
                        handleInputClick={() => handleInputClick(0)}
                        handleKeydown={handleKeydown}
                        classInput='text-center input-border rounded-2 shadow text-uppercase'
                        styleInput={{ fontSize: '1.7rem' }}
                        disabled={inputMesa}
                        type='text'
                        handleInputFocus={() => handleInputFocus(0)}
                    />
                </div>

                <div
                    onClick={handleClearMesa}
                    className="position-absolute bottom-0 end-0 btn-x-custom  rounded " style={{ cursor: 'pointer' }}>
                    <XCircle
                        fill='#ff0000'
                        color='#fff'
                        size={28}
                    />

                </div>

            </Col>
        </>
    )
}

export default InputCuenta