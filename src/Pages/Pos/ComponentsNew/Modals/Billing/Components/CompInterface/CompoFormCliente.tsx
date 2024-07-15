import React, { FC } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'

interface FormClienteItem {
    id: number
    label: string
    type: 'text' | 'number' | 'email' | 'password' | 'textarea'
    value: string
    get: any
    onChange?: any
    inputName: string
    ref?: any
    btn?: any
    isInput?: any
}
interface Props {
    cliente: any
    setCliente: any
    onChangeInput: any
    getInputValue: any
    setInputName?: any
    inputName?: string
    focusID?: boolean
    inputreftes?: any
    inputBtn?: any
    setInputs: any
    consumidorFinalData: any
}

const CompoFormCliente: FC<Props> = ({ cliente, consumidorFinalData,/* setCliente, */ onChangeInput, getInputValue, setInputName, inputName, /* focusID, */ inputreftes, inputBtn, setInputs }) => {
    //  const inputRefEmpresa = React.useRef<HTMLInputElement>(null)
    const inputRefIdentificacion = React.useRef<HTMLInputElement>(null)
    const inputRefTelefono = React.useRef<HTMLInputElement>(null)
    const inputRefDireccion = React.useRef<HTMLInputElement>(null)
    const inputRefCorreo = React.useRef<HTMLInputElement>(null)
    const inputRefObservaciones = React.useRef<HTMLInputElement>(null)
    const consumidorFinal = () => {
        const inputs = {
            razon_social: consumidorFinalData.razon_social,
            identificacion: consumidorFinalData.identificacion,
            telefono: consumidorFinalData.telefono,
            direccion: consumidorFinalData.direccion,
            correo: consumidorFinalData.email,
            observaciones: '',
            value: consumidorFinalData.value,
        }
        setInputs(inputs)


    }
    const FormCliente: FormClienteItem[] = [
        { id: 2, ref: inputRefIdentificacion, onChange: onChangeInput, inputName: "identificacion", get: getInputValue('identificacion'), label: 'Ruc/Cedula', type: 'text', value: cliente.identificacion || '' },

        {
            id: 1, ref: inputreftes, onChange: onChangeInput, inputName: "razon_social", get: getInputValue('razon_social'), label: 'Empresa', type: 'text', value: cliente.label || '',
            btn:
                <Button
                    style={{ width: '40px' }}
                    color='primary'
                    className='fs-10 text-white ms-2'
                    onClick={() => consumidorFinal()}
                >

                    CF
                </Button>
        },
        { id: 3, ref: inputRefTelefono, onChange: onChangeInput, inputName: "telefono", get: getInputValue('telefono'), label: 'Teléfono', type: 'text', value: cliente.telefono || '' },
        { id: 4, ref: inputRefDireccion, onChange: onChangeInput, inputName: "direccion", get: getInputValue('direccion'), label: 'Dirección', type: 'text', value: cliente.direccion || '' },
        {
            id: 5, ref: inputRefCorreo, onChange: onChangeInput, inputName: "correo", get: getInputValue('correo'), label: 'Correo', type: 'text', value: cliente.email || '',
            btn: <Button
                style={{ width: '40px' }}
                color='primary'
                className='fs-10 text-white ms-2'
                onClick={() => console.log()}
            >

                @
            </Button>
        },
        { id: 6, ref: inputRefObservaciones, onChange: onChangeInput, inputName: "observaciones", get: getInputValue('observaciones'), label: 'Observaciones', type: 'textarea', value: '' },
    ]

    //key donw focus
    const handleKeyDown = (e: any, index: number) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (index === 1) {
                inputRefIdentificacion.current?.focus()
                e.preventDefault()
            }
            if (index === 2) {
                inputRefTelefono.current?.focus()
                e.preventDefault()
            }
            if (index === 3) {
                inputRefDireccion.current?.focus()
                e.preventDefault()
            }
            if (index === 4) {
                inputRefCorreo.current?.focus()
            }
            if (index === 5) {
                inputRefObservaciones.current?.focus()
            }
            if (index === 6) {
                console.log('paso al boton')
                inputBtn.current?.focus()
                inputRefObservaciones.current?.blur()
            }

        }
    }
    return (

        <>

            {FormCliente.map((item) => (
                <Row className="mb-3" key={item.id}>
                    <Col lg={3} className=''>
                        <Label htmlFor={`input-${item.id}`} className="form-label fs-11">
                            {item.label}:
                        </Label>
                    </Col>
                    <Col className='d-flex' >
                        <Input
                            innerRef={item.ref}
                            type={item.type}
                            bsSize='sm'
                            className="form-control shadow rounded fs-11"
                            style={{
                                maxHeight: '56px',
                                borderRadius: '2px',
                                color: '#000000',
                                borderBottom: inputName === item.inputName ? '5px solid red' : '1px solid #ffff',
                            }}
                            onChange={onChangeInput}
                            id={item.inputName}
                            placeholder={item.value}
                            value={item.get}
                            onFocus={() => setInputName(item.inputName)}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                        />
                        {

                            item.btn ? item.btn : null
                        }

                    </Col>
                    <Col lg='12' className=''>
                        {
                            item.isInput ? item.isInput : null
                        }
                    </Col>
                </Row>

            ))}
        </>
    )
}

export default CompoFormCliente
