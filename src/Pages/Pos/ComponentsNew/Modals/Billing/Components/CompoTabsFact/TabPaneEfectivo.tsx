import { FC } from 'react'
import NumericKeyboard from '../../../../../common/NumericKeyboardProps'
import { Button, Col, Label, Row } from 'reactstrap'
interface Props {
    onKeyPress: any
    handleDelete: any
}
export const TabPaneEfectivo: FC<Props> = ({ onKeyPress, handleDelete }) => {

    return (

        <>
            <Row className='d-flex justify-content-start  border-sistema'>

                <Col lg='9' className='rounded-1 d-flex align-items-start px-0 gap-1 px-5 py-3' style={{ background: '' }}>
                    <NumericKeyboard
                        handleDelete={() => handleDelete()}
                        onKeyPress={(e) => onKeyPress(e)}
                        btnClass={'p-5 cursor-pointer keyBoard rounded'}
                        widthKey='90px'
                        heightKey='90px'
                        fontSizeKey='1.55rem'
                        heightBtnDelete='90px'
                        fondoKey='#e6ecec'
                        colorKeys='#13284e'
                        widthBorrar='90px'
                        gridColumn='span 1'
                        sizeBorrar={'0.9rem'}
                        bgDelete={'#e6ecec'}
                        colorDelete={'#13284e'}
                        keyboards={[
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", '.'
                        ]}
                    />
                    <Button
                        color='light'
                        className='fs-11  border-sistema '
                        style={{ width: '90px', height: '98%', marginTop: '3px', textAlign: 'center' }}
                    >                Enter
                    </Button>
                </Col>
                <Col className='border d-flex flex-column  justify-content-around'>
                    <div className='border mt-2 rounded shadow-sm text-center p-2'>
                        <Button block color='primary'>
                            Ver Items
                        </Button>
                    </div>
                    <div className='border mt-2 rounded shadow-sm text-center p-2'>
                        <Button block color='primary'>
                            Puntos
                        </Button>
                    </div>
                    <div className='border mt-2 rounded shadow-sm text-center p-2'>
                        <Label>Cobra:Camarero</Label>
                        <Label>Camarero 1</Label>
                    </div>

                </Col>

            </Row>
            <Row className='mt-4'>
                <Col className=''>
                    <Button block className='py-3' outline>Efectivo</Button>
                </Col>
                <Col className=''>
                    <Button block className='py-3' outline>0</Button>
                </Col>
                <Col className=''>
                    <Button block className='py-3' outline>1</Button>
                </Col>
                <Col className=''>
                    <Button block className='py-3' outline>5</Button>
                </Col>
                <Col className=''>
                    <Button block className='py-3' outline>10</Button>
                </Col>
                <Col className=''>
                    <Button block className='py-3' outline>20</Button>
                </Col>
            </Row>
        </>
    )
}
