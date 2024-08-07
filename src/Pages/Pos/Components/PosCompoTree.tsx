import { FC } from 'react'
import NumericKeyboard from '../common/NumericKeyboardProps'
import { Button } from 'reactstrap'
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
        <div className='pos-row-3'>
            <div className='teclado-row-3  d-flex rounded' style={{ background: '#ebebeb' }}>

                <div className=''>
                    <NumericKeyboard
                        onKeyPress={handleKeyPress}
                        handleDelete={handleDelete}
                        btnClass='rounded'

                    />
                </div>

                <div className='btn-billing-group my-1'>
                    <Button
                        color="light"
                        style={{ width: '100%', height: '143px', marginBottom: '2px', background: '#fff' }}
                        className="d-flex flex-column justify-content-center align-items-center border-sistema"
                        onClick={onEnter}
                    >
                        <span className=""> Enter</span>
                    </Button>
                    <BtnBilling
                        getMesa={getMesa}
                    />
                </div>


            </div>

            <div className='product-details-row-3'>
                <ProductsDetails
                    products={products || []}
                    activeInputIndex={activeInputIndex}
                    inputValues={inputValues}
                    inputRefs={inputRefs}
                    ClearInputKeyBoard={ClearInputKeyBoard}
                />
            </div>

            <div className='facturacion-row-3 '>
                <Facturacion />
            </div>

        </div>
    )
}

export default PosCompoTree