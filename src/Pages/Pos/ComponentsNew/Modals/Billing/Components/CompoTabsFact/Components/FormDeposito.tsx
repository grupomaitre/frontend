import { FC, Fragment, useEffect } from 'react'
import { inputsForm } from '../Interfaces/InterfaceTarjetas'
import { Col, Label, Row } from 'reactstrap'
import InputKeyBoard from '../../../../../Cards/CardOrders/InputKeyBoard'
interface Props {
    inputRefs: any
    inputValues: Array<number | string>
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
}

const FormDeposito: FC<Props> = ({
    inputRefs,
    inputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus,

}) => {
    const inputsForm: inputsForm[] = [
        {
            col: '2',
            label: 'Monto',
            type: 'number',
            ref: inputRefs.current[0],
            value: inputValues[0],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        //N° Tranferencia /Deposito
        {
            col: '2',
            label: 'N° Tranferencia /Deposito',
            type: 'text',
            ref: inputRefs.current[1],
            value: inputValues[1],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Cuenta Acreditada',
            type: 'text',
            ref: inputRefs.current[2],
            value: inputValues[2],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        //Observación

        {
            col: '2',
            label: 'Observación',
            type: 'text',
            ref: inputRefs.current[3],
            value: inputValues[3],
            classStyle: 'border-0 rounded-0',
            disabled: false
        }

    ]
    useEffect(() => {
        const firstInputRef = inputRefs.current[0].current
        if (firstInputRef) {
            firstInputRef.focus()

            setTimeout(() => {
                firstInputRef.select()
            }, 100)
        }
    }, [inputRefs])

    return (
        <Row>
            {
                inputsForm.map((item: inputsForm, key: number) => (
                    <Fragment key={key}>
                        <Col lg='2' className='my-2'>
                            <Label className='fs-11'>{item.label}</Label>
                        </Col>
                        <Col lg='4 my-2 '>
                            <InputKeyBoard
                                inputRef={item.ref}
                                value={(item.value)}
                                onChange={(event) => handleInputChange(event, key)}
                                handleInputClick={() => handleInputClick(key)}
                                //handleKeydown={handleKeydown}
                                classInput='text-center  fs-15 border-sistema shadow-sm'
                                styleInput={{ height: '32px' }}
                                type='text'
                                handleInputFocus={() => handleInputFocus(key)}
                                disabled={item.disabled}
                            />
                        </Col>
                    </Fragment>
                ))
            }
        </Row>
    )
}

export default FormDeposito