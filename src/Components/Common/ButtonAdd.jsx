import React from 'react'
import { Col, Card, CardBody, Button } from "reactstrap";

const ButtonAdd = () => {
    return (
        <Col lg={12}>
            <Card>
                <CardBody>
                    <Button
                        className="btn bttn-blue text-white  add-btn"
                        onClick={addPersonal}
                    >
                        <i className="mdi mdi-plus-thick me-1 align-bottom"></i>{" "}
                        Nuevo registro
                    </Button>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ButtonAdd