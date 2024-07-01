import { Col, Label, Row } from 'reactstrap'
import { FC } from 'react'
import InputCommon from '../../../../../../common/Inputs/InputCommon'
interface Props {
    itmesFormPrices: Object
    setItmesFormPrices: Object
    dataSend?: any
    validation: any
}
const FormPrices: FC<Props> = ({ validation }) => {
    return (

        <>

            <Row>
                <Col>
                    <Label>P. Costo</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'precio_costo'}
                        validation={validation}
                        validationValue={Math.round(validation.values.precio_costo * 100) / 100 || '0.00'}
                        validationTouched={validation.touched.precio_costo}
                        validationErrors={validation.errors.precio_costo}

                    />
                </Col>
                <Col>
                    <Label>FREE</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'precio_costo'}
                        validation={validation}
                        validationValue={validation.values.precio_costo || '0.00'}
                        validationTouched={validation.touched.precio_costo}
                        validationErrors={validation.errors.precio_costo}

                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>P.V.P</Label>
                </Col>
                <Col>
                    <InputCommon
                        type='number'
                        nameInput={'precio'}
                        validation={validation}
                        validationValue={validation.values.precio}
                        validationTouched={validation.touched.precio}
                        validationErrors={validation.errors.precio}

                    />
                </Col>
                <Col>
                    <Label>P.V.P 4</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'pvp_3'}
                        validation={validation}
                        validationValue={validation.values.pvp_3}
                        validationTouched={validation.touched.pvp_3}
                        validationErrors={validation.errors.pvp_3}

                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Label>P.V.P 4</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'pvp_4'}
                        validation={validation}
                        validationValue={validation?.values?.pvp_4 || '0.00'}
                        validationTouched={validation?.touched.pvp_4}
                        validationErrors={validation?.errors.pvp_4}

                    />
                </Col>
                <Col>
                    <Label>PROMO 1</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'promo_1'}
                        validation={validation}
                        validationValue={validation?.values.promo_1 || '0.00'}
                        validationTouched={validation.touched.promo_1}
                        validationErrors={validation.errors.promo_1}

                    />
                </Col>
            </Row>



            <Row>
                <Col>
                    <Label>PROMO 2</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'promo_2'}
                        validation={validation}
                        validationValue={validation?.values.promo_2 || '0.00'}
                        validationTouched={validation.touched.promo_2}
                        validationErrors={validation.errors.promo_2}

                    />
                </Col>
                <Col>
                    <Label>% Comision</Label>
                </Col>
                <Col>
                    <InputCommon
                        nameInput={'comision'}
                        validation={validation}
                        validationValue={validation?.values.comision || '0.00'}
                        validationTouched={validation.touched.comision}
                        validationErrors={validation.errors.comision}

                    />
                </Col>
            </Row>
            {/*  
        
           
            
           
 */}

        </>

    )
}

export default FormPrices