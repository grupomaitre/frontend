import { FC } from 'react'
import { Card, CardBody, Col, Input, Label, Row, TabPane } from 'reactstrap'
interface IProps {
    tabId: string
}
const PointSaleConfig: FC<IProps> = ({ tabId }) => {
    const config = true
    return (
        <TabPane tabId={tabId}>
            <Card>
                <CardBody className='fondo-sistema text-white'>
                    {
                        config ? <div>null</div> :
                            <Row>
                                <Col>
                                    <div className="form-check form-check-info">
                                        <Input className="form-check-input" type="checkbox" id="pdv" />
                                        <Label className="form-check-label" for="pdv">
                                            Punto de Venta
                                        </Label>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="form-check form-check-info">
                                        <Input className="form-check-input" type="checkbox" id="nAutAnld" />
                                        <Label className="form-check-label" for="nAutAnld">
                                            No Autorizar Anuladas
                                        </Label>
                                    </div>

                                </Col>
                            </Row>}
                </CardBody>
            </Card>
        </TabPane>
    )
}

export default PointSaleConfig