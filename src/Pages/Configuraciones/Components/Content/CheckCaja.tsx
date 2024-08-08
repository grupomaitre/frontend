import React from 'react'
import { Col, Input, Label, Row } from 'reactstrap'
import { ListCheckOne } from './DataCheck'

const CheckCaja = () => {
    return (
        <Row>

            <Col>
                {
                    (ListCheckOne || []).map((item: any, key: number) => (
                        <div className="form-check mb-2" key={key}>
                            <Input className="form-check-input" type={item?.type} id={item?.id} />
                            <Label className="form-check-label" for={item?.id}>
                                {item?.label || ''}
                            </Label>
                        </div>
                    ))
                }
            </Col>

            <Col>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
            </Col>
            <Col>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
            </Col>
            <Col>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
                <div className="form-check mb-2">
                    <Input className="form-check-input" type="checkbox" id="formCheck1" />
                    <Label className="form-check-label" for="formCheck1">
                        Default checkbox
                    </Label>
                </div>
            </Col>

        </Row>
    )
}

export default CheckCaja