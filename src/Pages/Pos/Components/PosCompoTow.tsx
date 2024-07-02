import { FC } from 'react'
import { Col, Row } from 'reactstrap'
import SwiperSubCategorias from '../ComponentsNew/Swipers/SwiperSubCategorias'
import { ISubGroups } from '../Interfaces/InterfaceGroups'
import CardOrders from '../ComponentsNew/Cards/CardOrders'
import BuscadorProductos from '../ComponentsNew/Input/BuscadorProductos'
import TableFacturacion from './Table/TableFacturacion'
interface IProps {
    dataSubRubros: ISubGroups[]
    setDataProducts: any
    products: any
    inputRef: any
    inputValues: any
    handleInputChange: any
    activeInputIndex: any
    clearInvidualInput: any
    handleInputClick: any
    setInputValues: any
    handleInputFocus: any
    setItemUniCart: any
    handleEnter: any
}
const PosCompoTow: FC<IProps> = ({
    dataSubRubros,
    setDataProducts,
    inputRef, inputValues, handleInputChange, activeInputIndex, clearInvidualInput, handleInputClick, setInputValues,
    handleInputFocus,
    setItemUniCart,
    handleEnter,
    products
}) => {
    return (
        <Row className='my-2 mx-1 '>

            <Col lg='5' className='p-0 m-0 ' style={{ background: 'rgb(234, 234, 234)' }}>
                {dataSubRubros && dataSubRubros.length > 0 ?
                    <section className='d-flex  py-1   shadow-lg my-1 border rounded py-2 px-1 bg-white'>
                        <SwiperSubCategorias dataSubRubros={dataSubRubros} setDataProducts={setDataProducts} />
                    </section>

                    : <div className='py-2 h4 text-center text-white bg-white'>Sin Sub Caterorias</div>}



                <CardOrders
                    inputRef={inputRef}
                    inputValues={inputValues}
                    onChangeProp={(event) => handleInputChange(event, activeInputIndex)}
                    clearInvidualInput={(e) => clearInvidualInput(e)}
                    handleInputClick={(e) => handleInputClick(e)}
                    handleKeydown={() => handleEnter()}
                    setInputValues={setInputValues}
                    handleInputFocus={handleInputFocus}
                    activeInputIndex={activeInputIndex}

                />

                <BuscadorProductos
                    inputRef={inputRef}
                    inputValues={inputValues}
                    onChangeProp={(event) => handleInputChange(event, activeInputIndex)}
                    clearInvidualInput={(e) => clearInvidualInput(e)}
                    handleInputClick={(e) => handleInputClick(e)}
                    handleKeydown={() => handleEnter()}
                    setInputValues={setInputValues}
                    handleInputFocus={handleInputFocus}
                    activeInputIndex={activeInputIndex}
                    products={products}

                />

            </Col>
            <TableFacturacion
                setItemUniCartMenu={setItemUniCart}
            />
        </Row>
    )
}

export default PosCompoTow