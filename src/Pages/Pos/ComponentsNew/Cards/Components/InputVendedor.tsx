import { FC } from 'react'
import { Edit, XCircle } from 'react-feather'
import { Col, Label } from 'reactstrap'
import InputKeyBoard from '../CardOrders/InputKeyBoard'
import { useDispatch, useSelector } from 'react-redux'
import { setInputVendedor } from '../../../../../slices/Cart/cartStatusSlice'
interface IProps {
    inputRef: any
    inputValues: any
    setInputValues: any
    onChangeProp: any
    handleInputClick: any
    handleKeydown: any
    handleInputFocus: any
    setShowModalPersonal: any
}
const InputVendedor: FC<IProps> = ({
    inputRef,
    inputValues,
    setInputValues,
    onChangeProp,
    handleInputClick,
    handleKeydown,
    handleInputFocus,
    setShowModalPersonal
}) => {
    const dispatch = useDispatch()
    const inputVendedor = useSelector((state: any) => state.cartStatusSlice.inputVendedor)

    const handleInvInputValues = (index: number) => {
        inputRef.current[index].current?.select()
        const updatedValues = [...inputValues]
        updatedValues[index] = ''
        setInputValues(updatedValues)
    }

    const handleClearUser = () => {
        inputRef.current[1].current?.focus()
        handleInvInputValues(1)
        dispatch(setInputVendedor(false))

    }
    return (
        <>
            <Col lg='6' className='d-flex justify-content-center align-items-center'>
                <div className=''>
                    <Label className='fs-11'>Vendedor
                        <Edit
                            onClick={setShowModalPersonal}
                            style={{ cursor: 'pointer' }}
                            size={18}
                            className="  rounded btn-x-custom text-warning "
                        />
                    </Label>

                    <InputKeyBoard
                        inputRef={inputRef.current[1]}
                        value={inputValues[1]}
                        onChange={(event) => onChangeProp(event, 1)}
                        handleInputClick={() => handleInputClick(1)}
                        handleKeydown={handleKeydown}
                        classInput='text-center input-border rounded input'
                        styleInput={{ fontSize: '1.7rem' }}
                        type='password'
                        handleInputFocus={() => handleInputFocus(1)}
                        disabled={inputVendedor}

                    />
                </div>

                {
                    !inputVendedor &&
                    <XCircle
                        fill='#ff0000'
                        color='#fff'
                        size={28}
                        onClick={() => handleClearUser()}
                        className="position-absolute bottom-0 end-0 btn-x-custom  rounded" style={{ cursor: 'pointer' }}
                    />

                }
            </Col>
        </>
    )
}

export default InputVendedor