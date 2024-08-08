import { FC } from 'react'
import { Col, Label, Row } from 'reactstrap'
import InputCommon from '../../../../../common/Inputs/InputCommon'
interface IProp {
    validation: any
}
const FormDocs: FC<IProp> = ({
    validation
}) => {
    const items = [
        {
            id: 1,
            name: 'documento',
            label: 'Documento',
            validationValue: validation.values.documento,
            validationTouched: validation.touched.documento,
            validationErrors: validation.errors.documento,
        },
        //secuencial
        {
            id: 2,
            name: 'secuencial',
            label: 'Secuencial',
            validationValue: validation.values.secuencial,
            validationTouched: validation.touched.secuencial,
            validationErrors: validation.errors.secuencial,
        },
        //numeracion
        {
            id: 3,
            name: 'numeracion',
            label: 'Numeración',
            validationValue: validation.values.numeracion,
            validationTouched: validation.touched.numeracion,
            validationErrors: validation.errors.numeracion,
        },
        //n° Autorizacion
        {
            id: 4,
            name: 'n_autorizacion',
            label: 'N° Autorizacion',
            validationValue: validation.values.n_autorizacion,
            validationTouched: validation.touched.n_autorizacion,
            validationErrors: validation.errors.n_autorizacion,
        },
        //Direccion ip
        {
            id: 5,
            name: 'direccion_ip',
            label: 'Direccion ip',
            validationValue: validation.values.direccion_ip,
            validationTouched: validation.touched.direccion_ip,
            validationErrors: validation.errors.direccion_ip,
        },
        //observacion ip
        {
            id: 6,
            name: 'observacion_ip',
            label: 'ObservaciÓn ip',
            validationValue: validation.values.observacion_ip,
            validationTouched: validation.touched.observacion_ip,
            validationErrors: validation.errors.observacion_ip,
        },
        //desde
        {
            id: 7,
            name: 'desde',
            label: 'Desde',
            validationValue: validation.values.desde,
            validationTouched: validation.touched.desde,
            validationErrors: validation.errors.desde,
        },
        //hasta
        {
            id: 8,
            name: 'hasta',
            label: 'Hasta',
            validationValue: validation.values.hasta,
            validationTouched: validation.touched.hasta,
            validationErrors: validation.errors.hasta,
        },
        //establecimiento
        {
            id: 9,
            name: 'establecimiento',
            label: 'Establecimiento',
            validationValue: validation.values.establecimiento,
            validationTouched: validation.touched.establecimiento,
            validationErrors: validation.errors.establecimiento,
        },
        //sucursal
        {
            id: 10,
            name: 'sucursal',
            label: 'Sucursal',
            validationValue: validation.values.sucursal,
            validationTouched: validation.touched.sucursal,
            validationErrors: validation.errors.sucursal,
        },
        //Dirección
        {
            id: 11,
            name: 'direccion',
            label: 'Dirección',
            validationValue: validation.values.direccion,
            validationTouched: validation.touched.direccion,
            validationErrors: validation.errors.direccion,
        },
    ]
    return (
        <>
            {
                items.map((item: any, key: number) => (
                    <Row className="mb-1" key={key}>
                        <Col lg='3'>
                            <Label className="text-black fs-11 text-capitalize">{item?.label || ''}:</Label>
                        </Col>
                        <Col lg=''>
                            <InputCommon
                                nameInput={item.name}
                                validation={validation}
                                validationValue={item.validationValue}
                                validationTouched={item.validationTouched}
                                validationErrors={item.validationErrors}
                                inputClass={'rounded'}
                            />
                        </Col>
                    </Row>
                ))
            }

        </>
    )
}

export default FormDocs