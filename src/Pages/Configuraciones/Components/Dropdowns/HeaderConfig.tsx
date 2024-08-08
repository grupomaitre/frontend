import React from 'react'
import { ButtonGroup, Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap'
import { toastError } from '../../../../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'

const HeaderConfig = () => {
    const handleSave = () => {
        toastError({ message: "Error 500" })
    }
    return (
        <Row>
            <Col lg={12}>
                <Card>

                    <CardBody>
                        <div className="live-preview">
                            <div className="d-flex flex-wrap gap-3">
                                <ButtonGroup>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-light">
                                            Edición <i className="mdi mdi-chevron-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                onClick={() => handleSave()}
                                            >Guardar</DropdownItem>
                                            <DropdownItem>Actualizar Configuración</DropdownItem>
                                            <DropdownItem>Menu item</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ButtonGroup>

                                <ButtonGroup>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-light">
                                            Máquina Selecionada <i className="mdi mdi-chevron-down"></i>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Darwin-PC</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ButtonGroup>

                            </div>
                        </div>


                    </CardBody>
                </Card>
            </Col>
            <ToastContainer />
        </Row>
    )
}

export default HeaderConfig