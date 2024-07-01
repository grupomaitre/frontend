import { Row, Col } from 'reactstrap'
const CardLoading = () => {
    return (

        <Row>

            <Col lg='2' className=' my-1 card card-body ' style={{ cursor: 'pointer', background: '#ffff' }}>

                <div className="d-flex align-items-center ">
                    <div className="avatar-xxl flex-shrink-0">
                        <span className="avatar-title text-white  rounded-circle  fs-19 " style={{ background: '#90a3ac' }}>
                            <span className="placeholder rounded-pill">10</span>

                        </span>
                    </div>
                    <div className="flex-grow-1 ms-3 ">
                        <span className="placeholder col-7 bg-dark rounded-pill"></span>
                    </div>
                </div>
            </Col>

        </Row>
    )
}

export default CardLoading