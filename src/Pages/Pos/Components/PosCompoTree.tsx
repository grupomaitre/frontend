import { FC } from 'react'
import NumericKeyboard from '../common/NumericKeyboardProps'
import { Button, Col, Row } from 'reactstrap'
import BtnBilling from '../ComponentsNew/Buttons/BtnBilling'
import ProductsDetails from '../ComponentsNew/CompoProducts/ProductsDetails'
import { IProducts } from '../Interfaces/InterfaceGroups'
import Facturacion from '../ComponentsNew/Pos/Facturacion'

interface Props {
    handleKeyPress: (value: number | string) => void
    handleDelete: () => void
    getMesa: () => void
    products: IProducts[]
    handleEnter: any
    activeInputIndex: number
    inputValues: any
    inputRefs: any
    ClearInputKeyBoard: (item: number) => void
}


const PosCompoTree: FC<Props> = ({
    handleKeyPress,
    handleDelete,
    getMesa,
    products,
    handleEnter,
    activeInputIndex,
    inputValues,
    inputRefs,
    ClearInputKeyBoard

}) => {
    const onEnter = () => {
        handleEnter()
    }
    return (
        <Row className=' m-0 p-0 mx-2' >
            <Col xl='2' sm='3' className='teclado-row-31 ' >

                <Row className=' d-flex'>
                    <Col className='' xl='9' sm='8'>
                        <NumericKeyboard
                            onKeyPress={handleKeyPress}
                            handleDelete={handleDelete}
                            btnClass={'rounded border-sistema'}
                            heightBtnDelete='80px'
                            heightKey='80px'


                        />
                    </Col>

                    <Col className='ms-0 ps-0' xl='3' sm='3'>
                        <Button
                            color="light"
                            style={{
                                height: '180px',
                                fontSize: '18px',
                                fontWeight: '100'
                            }}
                            className="d-flex flex-column justify-content-center align-items-center border-sistema"
                            onClick={onEnter}
                        >
                            <span className=""> Enter</span>
                        </Button>
                        <BtnBilling
                            getMesa={getMesa}
                        />
                    </Col>
                </Row>


            </Col >

            <Col className='' xl='8' sm='6' >
                <ProductsDetails
                    products={products || []}
                    activeInputIndex={activeInputIndex}
                    inputValues={inputValues}
                    inputRefs={inputRefs}
                    ClearInputKeyBoard={ClearInputKeyBoard}
                />
            </Col>

            <Col className='p-0 m-0' xl='2' sm='3'>
                <Facturacion />

            </Col>

        </Row >
    )
}

export default PosCompoTree