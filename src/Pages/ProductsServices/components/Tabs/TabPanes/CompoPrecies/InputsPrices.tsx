
import { FC } from 'react'
import { Col, Label } from 'reactstrap'
import { IInputForm } from './InterfacePrices'
import InputCommon from '../../../../../../common/Inputs/InputCommon'
interface Props {
    item: IInputForm
    itmesFormPrices?: any
    setItmesFormPrices?: any
    dataSend?: any
    validation: any
}
const InputsPrices: FC<Props> = ({ item, validation }) => {
    console.log(validation)
    return (
        <>
            <Col lg='3'>
                <Label>{item.label}</Label>
            </Col>
            <Col lg='3'>
                <InputCommon
                    nameInput={item.label}
                    validation={validation}
                    validationValue={item.label}
                    validationTouched={item.label}
                    validationErrors={item.label}

                />

                {/*    <Input type="text" className="form-control custom-input rounded-0"
                    name="code"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.precio || ""}
                    invalid={
                        validation.touched.precio &&
                            validation.errors.precio
                            ? true
                            : false
                    }
                /> */}

                {/*    <Input
                    value={itmesFormPrices[item.name]}
                    onChange={(e) => setItmesFormPrices({ ...itmesFormPrices, [item.name]: e.target.value })}
                    className='rounded-0 border-0 custom-input text-fs-11'

                /> */}
            </Col>
        </>
    )
}

export default InputsPrices