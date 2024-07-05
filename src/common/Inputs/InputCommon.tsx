import React, { FC } from 'react'
import { FormFeedback, Input } from 'reactstrap'
interface IProp {
    nameInput: string
    validationValue: any
    validation: any
    validationTouched: any
    validationErrors: any
    disabled?: boolean
    readOnly?: boolean
    onFocus?: any
    handleInputClick?: any
    handleInputChange?: any
    inputClass?: any
    innerRef?: React.RefObject<HTMLInputElement>
    type?: any
    bsSize?: any
}
const InputCommon: FC<IProp> = ({
    nameInput,
    validationValue,
    validation,
    validationTouched,
    validationErrors,
    disabled,
    readOnly,
    onFocus,
    handleInputClick,
    handleInputChange,
    inputClass,
    innerRef,
    type,
    bsSize
}) => {
    return (
        <>
            <Input
                innerRef={innerRef}
                type={type || "text"}
                style={{ height: '25px' }}
                className={inputClass || 'fs-12'}
                name={nameInput}
                bsSize={bsSize}
                onChange={validation.handleChange || handleInputChange}
                onBlur={validation.handleBlur}
                value={validationValue || ""}
                onFocus={onFocus}
                onClick={handleInputClick}

                disabled={disabled}
                readOnly={readOnly}
                invalid={
                    validationTouched &&
                        validationErrors
                        ? true
                        : false
                } />
            {validationTouched && validationErrors ? (
                <FormFeedback type="invalid" className='text-danger'>
                    {validationErrors}
                </FormFeedback>
            ) : null}

        </>
    )
}

export default InputCommon