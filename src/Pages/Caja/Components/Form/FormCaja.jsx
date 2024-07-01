import React from 'react'
import { Form, Row, Col, Label, Input, Button, FormFeedback } from 'reactstrap'
const FormCaja = ({ validation }) => {
    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
            }}
        >
            <Row className='mb-3'>
                <Col>
                    <Label>Saldo Inicial</Label>
                    <Input type="number" className="form-control"
                        name="saldo_inicial"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.saldo_inicial || ""}
                        invalid={
                            validation.touched.saldo_inicial &&
                                validation.errors.saldo_inicial
                                ? true
                                : false
                        }
                    />
                    {validation.touched.saldo_inicial &&
                        validation.errors.saldo_inicial ? (
                        <FormFeedback type="valid">
                            {validation.errors.saldo_inicial}
                        </FormFeedback>
                    ) : <FormFeedback valid />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button block type="submit">  {'Aceptar'}</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default FormCaja