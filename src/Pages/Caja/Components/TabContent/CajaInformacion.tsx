import { FC } from 'react'
import { Button, Col, Label, Row } from 'reactstrap'
import img1 from '../../../../assets/images/macsi/CAJAS.png'
import img2 from '../../../../assets/images/macsi/PRODUCTOS.png'
interface Props { openModal: () => void }
const CajaInformacion: FC<Props> = ({ openModal }) => {
    return (
        <>
            <Row className='d-flex justify-content-center align-items-center gap-5'>
                <Col lg='4' >
                    <div className="d-flex flex-column justify-content-center align-items-center border rounded shadow-lg  ">
                        <img src={img1} alt="" className="mb-3 p-5" width={300} height={300} />
                        <Button
                            className='page-bg fs-4'
                            onClick={openModal}
                            block
                            style={{ height: '75px' }}

                        >
                            Nueva caja
                        </Button>
                    </div>
                </Col>
                <Col lg='4'>
                    <div className="d-flex flex-column justify-content-center align-items-center border rounded shadow-lg ">
                        <img src={img2} className="mb-3 p-5" width={300} height={300} />
                        <Button
                            className='page-bg fs-4'
                            block
                            style={{ height: '75px' }}
                        >
                            Abrir Cajon De Dinero
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CajaInformacion