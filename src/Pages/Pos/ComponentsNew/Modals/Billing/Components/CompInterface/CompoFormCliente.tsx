import React, { FC, Fragment, useState } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { verificarRuc } from '../../../../../../../Func/VerificarCedula'

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
    error?: string | null
}
interface Props {
    cliente: any
    setCliente: any
    onChangeInput: any
    getInputValue: any
    setInputName?: any
    inputName?: string
    focusID?: boolean
    inputRefEmpresa?: any
    inputBtn?: any
    setInputs: any
    inputRefIdentificacion: any
}

const CompoFormCliente: FC<Props> = ({ cliente, onChangeInput, getInputValue, setInputName, inputName, inputRefEmpresa, inputBtn, setInputs, inputRefIdentificacion }) => {
    const inputRefTelefono = React.useRef<HTMLInputElement>(null)
    const inputRefDireccion = React.useRef<HTMLInputElement>(null)
    const inputRefCorreo = React.useRef<HTMLInputElement>(null)
    const inputRefObservaciones = React.useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const consumidorFinal = () => {
        const consumidorLocal = JSON.parse(sessionStorage.getItem('consumidorLocal') || '')

        const inputs = {
            razon_social: consumidorLocal.razon_social,
            identificacion: consumidorLocal.identificacion,
            telefono: consumidorLocal.telefono,
            direccion: consumidorLocal.direccion,
            email: consumidorLocal.email,
            observaciones: '',
            value: consumidorLocal.value,
        }
        setInputs({ ...inputs })


    }
    const FormCliente: FormClienteItem[] = [
        {
            id: 2, ref: inputRefIdentificacion,
            onChange: onChangeInput,
            inputName: "identificacion",
            get: getInputValue('identificacion'),
            label: 'Ruc/Cedula',
            type: 'text',
            value: cliente.identificacion || '',
            error: error
        },

        {
            id: 1, ref: inputRefEmpresa,
            onChange: onChangeInput,
            inputName: "razon_social",
            get: getInputValue('razon_social'),
            label: 'Empresa',
            type: 'text',
            value: cliente.label || '',
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
        {
            id: 3,
            ref: inputRefTelefono,
            onChange: onChangeInput,
            inputName: "telefono",
            get: getInputValue('telefono'),
            label: 'Teléfono',
            type: 'text',
            value: cliente.telefono || ''
        },
        {
            id: 4, ref: inputRefDireccion,
            onChange: onChangeInput,
            inputName: "direccion",
            get: getInputValue('direccion'),
            label: 'Dirección',
            type: 'text',
            value: cliente.direccion || ''
        },
        {
            id: 5, ref: inputRefCorreo,
            onChange: onChangeInput,
            inputName: "email",
            get: getInputValue('email'),
            label: 'Correo',
            type: 'text',
            value: cliente.email || '',
            btn: <Button
                style={{ width: '40px' }}
                color='primary'
                className='fs-10 text-white ms-2'
                onClick={() => console.log()}
            >

                @
            </Button>
        },
        {
            id: 6, ref: inputRefObservaciones,
            onChange: onChangeInput,
            inputName: "observaciones",
            get: getInputValue('observaciones'),
            label: 'Observaciones', type: 'textarea', value: ''
        },
    ]

    //key donw focus
    const handleKeyDown = (e: any, index: number) => {

        if (e.key === 'Enter') {
            e.preventDefault()
            switch (index) {
                case 1:
                    inputRefTelefono.current?.focus()
                    break;
                case 2:

                    const identificacion = cliente.identificacion.trim()

                    if (identificacion.length === 10) {

                        const res = verificarRuc(cliente.identificacion, 1)

                        if (res === undefined) return setError('Cedula no valida')

                        inputRefEmpresa.current?.focus()
                        setError('')
                        return
                    }

                    if (identificacion.length === 13) {

                        const res = verificarRuc(cliente.identificacion, 0)
                        if (res === undefined) return setError('Ruc no valido')

                        inputRefEmpresa.current?.focus()
                        setError('')
                        return
                    }

                    break;
                case 3:
                    inputRefDireccion.current?.focus()
                    break;
                case 4:
                    inputRefCorreo.current?.focus()
                    break;
                case 5:
                    inputRefObservaciones.current?.focus()
                    break;
                case 6:
                    console.log('paso al boton')
                    inputBtn.current?.focus()
                    inputRefObservaciones.current?.blur()
                    break;
                default:
            }


        }
    }
    return (

        <>

            {FormCliente.map((item) => (
                <Fragment key={item.id}>
                    <Row className="mb-3">
                        <Col lg={3} className=''>
                            <Label htmlFor={`input-${item.id}`} className="form-label fs-11">
                                {item.label}:
                            </Label>
                        </Col>
                        <Col className='d-flex flex-column' lg='7'>
                            <Input
                                innerRef={item.ref}
                                type={item.type}
                                className="shadow-sm rounded fs-11 border-sistema"
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
                            <span className='text-danger fs-11'>
                                {item?.error ? error : null}
                            </span>


                        </Col>
                        <Col lg='1'>
                            {

                                item.btn ? item.btn : null
                            }
                        </Col>
                    </Row>
                </Fragment>
            ))}
        </>
    )
}

export default CompoFormCliente
