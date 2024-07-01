import { Fragment, FC, useEffect } from 'react'
import { inputsForm } from '../Interfaces/InterfaceTarjetas'
import { Col, Label, Row } from 'reactstrap'
import InputKeyBoard from '../../../../../Cards/CardOrders/InputKeyBoard'
interface Props {
    bank: any
    inputRefs: any
    inputValues: Array<number | string>
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
}

const FormCheque: FC<Props> = ({
    bank,
    inputRefs,
    inputValues,
    handleInputChange,
    handleInputClick,
    handleInputFocus
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
        {
            col: '2',
            label: 'N° Cheque',
            type: 'text',
            ref: inputRefs.current[1],
            value: inputValues[1],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'N° Cuenta',
            type: 'text',
            ref: inputRefs.current[2],
            value: inputValues[2],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Banco',
            type: 'select',
            ref: inputRefs.current[3],
            value: inputValues[3],
            classStyle: 'border-0 rounded-0',
            disabled: false,
            dataSelect: bank
        },
        {
            col: '2',
            label: 'Beneficiario',
            type: 'text',
            ref: inputRefs.current[4],
            value: inputValues[4],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Fecha de Emisión',
            type: 'date',
            ref: inputRefs.current[5],
            value: inputValues[5],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Fecha de Cheque',
            type: 'date',
            ref: inputRefs.current[6],
            value: inputValues[6],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Estado del Cheque',
            type: 'select',
            ref: inputRefs.current[7],
            value: inputValues[7],
            classStyle: 'border-0 rounded-0',
            disabled: false
        },
        {
            col: '2',
            label: 'Ingreso a Bancos',
            type: 'select',
            ref: inputRefs.current[8],
            value: inputValues[8],
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
                            <Label>{item.label}</Label>
                        </Col>
                        <Col lg='4 my-2'>
                            <InputKeyBoard
                                inputRef={item.ref}
                                value={(item.value)}
                                onChange={(event) => handleInputChange(event, key)}
                                handleInputClick={() => handleInputClick(key)}
                                //handleKeydown={handleKeydown}
                                classInput='text-center  rounded-0 fs-15 custom-input'
                                styleInput={{ height: '30px', borderRadius: '0' }}
                                type={item.type}
                                handleInputFocus={() => handleInputFocus(key)}
                                //  bsSize='sm'
                                disabled={item.disabled}
                                dataSelect={item.dataSelect || []}
                            />
                        </Col>
                    </Fragment>
                ))
            }
        </Row>
    )
}

export default FormCheque