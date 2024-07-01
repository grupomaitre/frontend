import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import './footer.css'
const Footer = () => {
    return (
        <React.Fragment>


            <footer className="footer-custom  " style={{ background: '#012840' }}>

                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            {new Date().getFullYear()} © Macsi S.A.
                        </Col>
                        <Col sm={6}>
                            Desarrollado por Macsi S.A.
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    )
}

export default Footer