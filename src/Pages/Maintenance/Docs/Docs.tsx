import { Card, CardBody, Col, Row } from "reactstrap"
import { ToastContainer } from "react-toastify"
import UseFormDocs from "./Hooks/UseFormDocs"

const Docs = () => {


    return (
        <>
            <Card>

                <CardBody>

                    <Row className="fs-12">
                        <Col lg='12'>
                            <UseFormDocs />
                        </Col>
                    </Row>

                </CardBody>

            </Card>
            <ToastContainer />
        </>
    )
}

export default Docs