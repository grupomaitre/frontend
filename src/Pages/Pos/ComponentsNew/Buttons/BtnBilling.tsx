import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditcaFunction from './editcaFunction'
import BtnSaveCart from './BtnSaveCart'
import BtnCobrar from './BtnCobrar'
interface IProps {
    getMesa: () => void
}
const BtnBilling: React.FC<IProps> = () => {
    const [btnIsCartSuccess, setBtnIsCartSuccess] = useState(false)

    const id_cart = useSelector((state: any) => state.cartSlice.idCart)
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const orden = useSelector((state: any) => state.cartSlice.orden)
    const pax = useSelector((state: any) => state.cartSlice.pax)
    const id_caja = useSelector((state: any) => state.cajaSlice.caja)
    const vendedor = useSelector((state: any) => state.cartSlice.vendedor)
    const id_user = useSelector((state: any) => state.cartSlice.id_user)
    const cantidad = cart.reduce((acc: any, item: any) => acc + item.cantidad, 0)

    useEffect(() => {
        const cartSuccess = cart.some((item: any) => item.isCartSuccess === true);
        setBtnIsCartSuccess(cartSuccess)
    }, [cart])

    return (
        <>

            {btnIsCartSuccess ?
                <EditcaFunction
                    cart={cart}
                    id_cart={id_cart}
                /> :
                <BtnSaveCart
                    cantidad={cantidad}
                    cart={cart}
                    id_caja={id_caja}
                    id_mesa={id_mesa}
                    id_user={id_user}
                    mesacart={mesacart}
                    orden={orden}
                    pax={pax}
                    vendedor={vendedor}
                />}

            <BtnCobrar
                btnIsCartSuccess={btnIsCartSuccess}
                cantidad={cantidad}
                cart={cart}
                id_caja={id_caja}
                id_mesa={id_mesa}
                id_user={id_user}
                orden={orden}
                pax={pax}
                vendedor={vendedor}
            />



        </>
    )
}


export default BtnBilling