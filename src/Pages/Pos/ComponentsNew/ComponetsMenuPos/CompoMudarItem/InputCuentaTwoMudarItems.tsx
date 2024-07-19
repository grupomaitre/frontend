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
    handleClearCuenta: any
    inputDisabledCuenta2: boolean
}
const InputCuentaTwoMudarItems: FC<IProps> = ({
    inputRefs,
    inputValues,
    handleInputChange,
    handleInputClick,
    handleEnter,
    handleInputFocus,
    handleClearCuenta,
    inputDisabledCuenta2
}) => {
    return (
        <>
            <Col lg='3'>
                <Label>Cuenta 2</Label>
                <div className='d-flex align-items-end'>
                    <InputKeyBoard
                        inputRef={inputRefs.current[1]}
                        value={inputValues[1]}
                        onChange={(event) => handleInputChange(event, 1)}
                        handleInputClick={() => handleInputClick(1)}
                        handleKeydown={handleEnter}
                        classInput='text-center border-sistema rounded fs-6 rounded-end-0'
                        type={'text'}
                        handleInputFocus={() => handleInputFocus(1)}
                        bsSize='sm'
                        styleInput={{ height: '40px', borderRadius: '0' }}
                        disabled={inputDisabledCuenta2}
                    />

                    <Button
                        className='rounded-start-0 fs-17'
                        color='danger'
                        onClick={() => handleClearCuenta()}
                    >
                        X
                    </Button>
                </div>

            </Col>
        </>
    )
}

export default InputCuentaTwoMudarItems