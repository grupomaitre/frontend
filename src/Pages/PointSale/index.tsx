import { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { getProductsList } from '../../helpers/fakebackend_helper'
import { useDispatch, useSelector } from 'react-redux'
import { setProductList } from '../../slices/Cart/productSlice'
import DetallesUIPos from './components/DetallesUIPos'
import DetallesUIItems from './components/DetallesUIItems'
import BuscadorProductosCliente from './components/BuscadorProductosCliente'
import CobrarPos from './components/CobrarPos'
import OverlayComponent from '../../common/Loading/OverlayComponent'

const index = () => {

    const dispatch = useDispatch()
    const cart = useSelector((state: any) => state.pointSaleSlice.cart)

    const [showCobrar, setShowCobrar] = useState<boolean>(false)

    useEffect(() => {
        getProductsList().then(res => {
            dispatch(setProductList(res.data))
        })
    }, [])

    const handleKeyPress = (event: any) => {
        if (event.key === 'F5') {
            setShowCobrar(!showCobrar)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [cart])

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }, [])

    return (
        <>
            <OverlayComponent show={isLoading}>

                <div className='fs-12' style={{ background: '#fff' }}>

                    <Container fluid>

                        <DetallesUIPos />

                        <DetallesUIItems />

                        {!showCobrar && <BuscadorProductosCliente />}

                        {showCobrar && <CobrarPos onCloseClick={() => setShowCobrar(!showCobrar)} />}

                    </Container>

                </div >

            </OverlayComponent>

        </>
    )
}

export default index