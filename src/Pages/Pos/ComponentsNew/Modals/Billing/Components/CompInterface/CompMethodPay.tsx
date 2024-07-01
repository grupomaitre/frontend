import { FC } from 'react'
import { Button, Card, CardBody, Col, /* Input, Label, Row */ } from 'reactstrap'
//import TotalWidgets from './Components/TotalWidgets'
interface CompMethodPayProps {
    methodPay: string
    setMethodPay: (methodPay: string) => void
}
/* interface Icart {
    cantidad: number
    id_cart: number
    id_producto: number
    isCartSuccess: boolean
    nombre: string
    precio: string
    status: number
} */
const CompMethodPay: FC<CompMethodPayProps> = ({ methodPay, setMethodPay }) => {
    const ItemsMethodPay = [
        { id: 1, label: 'Efectivo', value: 'Efectivo', icon: 'las la-money-bill', color: 'text-success' },
        { id: 3, label: 'Tarjeta', value: 'Tarjeta', icon: ' las la-credit-card', color: 'text-warning' },
        /*     { id: 4, label: 'Crédito', value: 'Crédito' },
        { id: 2, label: 'Cheque', value: 'Cheque' },
        { id: 5, label: 'Tranferencia', value: 'Tranferencia' }, */
    ]
    //  const cart = useSelector((state: any) => state.cartSlice.cart)
    /*   const total = cart.reduce((acc: number, el: { cantidad: number, precio: string }) => {
          const subtotal = el.cantidad * parseFloat(el.precio)
          return acc + subtotal
      }, 0) */
    return (
        <>
            {/*  <TotalWidgets total={total} /> */}

            <Card className='card-neo mb-2' style={{ background: '', color: '#000' }}>
                <CardBody>
                    <span className='h4 text-white '>Forma de pago :  {methodPay} </span>
                    <Col className='  py-2 text-center d-flex flex-row '>
                        {ItemsMethodPay.map((item, key) => (
                            <div className="mx-2 " key={key}>
                                <Button

                                    className='py-1 px-4 d-flex flex-column align-items-center justify-content-center border-0 shadow btn-soft-secondary '
                                    onClick={() => setMethodPay(item.label)}
                                >
                                    <i className={"fs-1  " + item.icon + " " + item.color}></i>
                                    <span className='text-white'>{item.label}</span>
                                </Button>
                            </div>
                        ))}

                    </Col>
                </CardBody>
            </Card>
        </>

    )
}

export default CompMethodPay