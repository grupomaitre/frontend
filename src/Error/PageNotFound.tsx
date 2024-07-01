import { ArrowLeftCircle } from 'react-feather'
import error from '../assets/images/error.svg'
import { Container, Card, CardBody, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
    return (
        <div className='page-content'>
            <Container>
                <Card>
                    <CardBody>
                        <Row className='d-flex justify-content-center mx-auto flex-colmun'>
                            <h1 className='text-center'>Error 404</h1>
                            <img src={error} height="350px" />
                            <Link to='/dashboard' className='btn btn-primary text-center'>
                                <span className='fs-3 fw-bold'>
                                    <ArrowLeftCircle className='mx-4' size={40} />
                                    Regregar al inicio</span>
                            </Link>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </div>)
}

export default PageNotFound