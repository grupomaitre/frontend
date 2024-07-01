import React from 'react'
import Flatpickr from "react-flatpickr";
import { Card, CardBody, Label, Row, Col, Button } from 'reactstrap';
import Select from 'react-select';
const FilterDate = ({ text }) => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col lg={4}>
                        <Label>Fecha inicio</Label>
                        <div className="input-group">
                            <Flatpickr

                                options={{
                                    dateFormat: "Y-m-d",
                                }}
                                className="form-control  dash-filter-picker "
                            />
                            <div className="input-group-text bg-primary border-primary text-white"><i className="mdi mdi-calendar-month-outline"></i></div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Label>Fecha fin</Label>
                        <div className="input-group">
                            <Flatpickr
                                className="form-control  dash-filter-picker "
                            />
                            <div className="input-group-text bg-primary border-primary text-white"><i className="mdi mdi-calendar-month-outline"></i></div>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Label>{text || 'Persona'}</Label>
                        <Select
                        />
                    </Col>

                </Row>
                <Row className='mt-3'>
                    <Col >
                        <Button className=' float-end  px-5 btn-label  rounded btn-border'>
                            <i className="mdi mdi-archive-search label-icon align-middle fs-4 me-2"></i>
                            Consultar
                        </Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default FilterDate