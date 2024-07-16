import { FC } from 'react'
import { Button, Col, Label } from 'reactstrap'
import InputKeyBoard from '../../Cards/CardOrders/InputKeyBoard'
interface IProps {
    inputRefs: any
    inputValues: any
    handleInputChange: any
    handleInputClick: any
    handleEnter: any
    handleInputFocus: any
    handleClearCuentaMain: any
    disabledCuenta1: boolean
}
const InputCuentaOneMudarItems: FC<IProps> = ({
    inputRefs,
    inputValues,
    handleInputChange,
    handleInputClick,
    handleEnter,
    handleInputFocus,
    handleClearCuentaMain,
    disabledCuenta1
}) => {
    return (
        <>
            <Col lg='3'>
                <Label>Cuenta</Label>
                <div className='d-flex align-items-center'>
                    <InputKeyBoard
                        inputRef={inputRefs.current[0]}
                        value={inputValues[0]}
                        onChange={handleInputChange}
                        handleInputClick={handleInputClick}
                        handleKeydown={handleEnter}
                        classInput='text-center border-sistema rounded fs-6'
                        disabled={disabledCuenta1}
                        type='text'
                        handleInputFocus={() => handleInputFocus(0)}
                        bsSize='sm'
                        styleInput={{ height: '40px', borderRadius: '0' }}
                    />
                    <Button className='ms-1 rounded-0'
                        color='danger'
                        onClick={() => handleClearCuentaMain()}
                    >
                        X
                    </Button>

                </div>
            </Col>
        </>
    )
}

export default InputCuentaOneMudarItems