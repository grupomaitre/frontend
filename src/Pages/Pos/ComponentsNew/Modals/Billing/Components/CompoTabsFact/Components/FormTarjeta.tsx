import { Fragment, FC, useEffect } from 'react'
import { Col, Label } from 'reactstrap'
import { inputsForm } from '../Interfaces/InterfaceTarjetas'
import InputKeyBoard from '../../../../../Cards/CardOrders/InputKeyBoard'

interface Props {
    inputRefs: any
    inputValues: Array<number | string>
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    handleKeydown: () => void
}


const FormTarjeta: FC<Props> = (
    {
        inputRefs,
        inputValues,
        handleInputChange,
        handleInputClick,
        handleInputFocus,
        handleKeydown
    }
) => {

    const inputsForm: inputsForm[] = [
        {
            col: '2',
            label: 'MONTO',
            type: 'number',
            ref: inputRefs.current[0],
            value: inputValues[0],
            classStyle: 'border-0 rounded-0',
            disabled: false

        },
        {
            col: '2',
            label: 'PROPINA',
            type: 'number',
            ref: inputRefs.current[1],
            value: inputValues[1],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'REFERENCIA',
            type: 'text',
            ref: inputRefs.current[2],
            value: inputValues[2],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'LOTE',
            type: 'text',
            ref: inputRefs.current[3],
            value: inputValues[3],
            classStyle: 'border-sistema',
            disabled: false
        }
    ]

    useEffect(() => {

        const firstInputRef = inputRefs.current[0].current;

        if (firstInputRef) {

            firstInputRef.focus();
            setTimeout(() => {
                firstInputRef.select();
            }, 100);
        }

    }, [inputRefs]);



    return (
        <>
            {
                inputsForm.map((item, key) => (
                    <Fragment key={key}>
                        <Col lg={'3'} className='my-2'>
                            <Label className='fw-lighter fs-11'>{item.label}</Label>
                        </Col>
                        <Col lg='3 my-2'>
                            <InputKeyBoard
                                inputRef={item.ref}
                                value={(item.value)}
                                onChange={(event) => handleInputChange(event, key)}
                                handleInputClick={() => handleInputClick(key)}
                                handleKeydown={handleKeydown}
                                classInput='text-center  fs-15 shadow-sm border-sistema'
                                type='number'
                                bsSize={'sm'}
                                handleInputFocus={() => handleInputFocus(key)}
                                disabled={item.disabled}
                            />
                        </Col>

                    </Fragment>))
            }
        </>
    )
}

export default FormTarjeta