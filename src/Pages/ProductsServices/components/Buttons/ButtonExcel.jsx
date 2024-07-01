import React from 'react'
import { Button, Row, Col, Card, CardBody } from 'reactstrap'
const ButtonExcel = ({ onModalExcel }) => {
    return (
        <Row>
            <Col>
                <Card>
                    <CardBody>
                        <Button
                            onClick={onModalExcel}
                            className='btn  btn-label btn-info  rounded btn-border'>
                            <i className="mdi mdi-plus label-icon align-middle fs-2 me-2"></i>
                            Agregar Excel
                        </Button>


                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default ButtonExcel