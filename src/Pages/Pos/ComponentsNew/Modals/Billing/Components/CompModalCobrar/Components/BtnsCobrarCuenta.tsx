import { FC } from 'react'
import { Button, ButtonGroup, Row } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, onErrorCart } from '../../../../../../../../slices/Cart/cartSlice';
import { deleteFacDocs } from '../../CompoTabsFact/Api/ApiFacturacion';
import BtnCredito from './BtnCredito'
import BtnCerrarCuenta from './Buttons/BtnCerrarCuenta'
interface Props {
    error: boolean
    total2: number
    closeModals: () => void
    innerBtnCobrar: any
}


const BtnCobrar: FC<Props> = ({
    error,
    closeModals,
    innerBtnCobrar
}) => {
    const dispatch = useDispatch()
    const idOrder = useSelector((state: any) => state.cartSlice.idOrder)

    const handleCancelOrder = () => {
        deleteFacDocs(idOrder).then((res: any) => {
            if (res.status) {
                closeModals()
                dispatch(onErrorCart(true))
                dispatch(clearCart())
            }

        })
    }
    return (
        <>
            <Row className='mt-1'>
                <ButtonGroup style={{ height: '95px' }}>
                    <BtnCerrarCuenta
                        closeModals={closeModals}
                        error={error}
                        innerBtnCobrar={innerBtnCobrar}
                    />
                    <BtnCredito />
                    <Button
                        outline
                        color='dark'
                        onClick={handleCancelOrder}
                        className='rounded'>
                        Cancelar
                    </Button>
                </ButtonGroup>

            </Row>
        </>
    )
}

export default BtnCobrar