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
                        classInput='text-center input-border fs-6 text-uppercase'
                        type={'text'}
                        handleInputFocus={() => handleInputFocus(1)}
                        bsSize='sm'
                        styleInput={{ height: '40px', borderRadius: '0' }}
                        disabled={inputDisabledCuenta2}
                    />

                    <Button className='ms-1 rounded-0'
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