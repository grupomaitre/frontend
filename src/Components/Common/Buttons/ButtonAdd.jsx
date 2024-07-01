import React from 'react'
import { Card, CardBody, Row, Col, Button } from 'reactstrap'
const ButtonAdd = ({ onOpenClick }) => {
    return (
        <Card>
            <CardBody>
                <Button
                    onClick={onOpenClick}
                    className="btn  btn-label btn-info  rounded btn-border float-end py-2" >
                    Nuevo Registro
                    <i className="mdi mdi-plus label-icon align-middle fs-2 me-2"></i>

                </Button>
            </CardBody>
        </Card>
    )
}

export default ButtonAdd