import { FC, useEffect, useState } from 'react'
import { Button, ButtonGroup, Row } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { MinusCircle, PlusCircle } from 'react-feather'
import { addCart, minusCart } from '../../../../slices/Cart/cartSlice'
interface IBtnPlusMinus {
    item: any
    cart: any
    activeBtnPlus: any
}


const BtnPlusMinus: FC<IBtnPlusMinus> = ({ item, cart, activeBtnPlus }) => {
    const dispatch = useDispatch()
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [errorQuantity, setErrorQuantity] = useState(false)
    useEffect(() => {
        setErrorQuantity(false)
    }, [])
    const filteredProduct = cart.filter((product: any) => product.id_product === item.id_product);
    const totalQuantity = filteredProduct.map((product: any) => parseFloat(product.cantidad.toFixed(2)))
    useEffect(() => {
        if (totalQuantity == 1) {
            setBtnDisabled(true)
        }

        return () => {
            setBtnDisabled(false)
        }

    }, [cart])
    /*   const handleUpdateQuantity = (e: any) => {
          const quantity = parseFloat(e.target.value)
          if (quantity <= 0 || isNaN(quantity)) {
              setErrorQuantity(true)
              return;
          }
  
          dispatch(updateQuantity({ item, quantity: quantity || 1 }));
          setErrorQuantity(false)
  
      } */

    return (
        <>
            <Row>
                <ButtonGroup>
                    {activeBtnPlus ? null : <Button
                        size='lg'
                        color='success' onClick={() => dispatch(addCart(item))}>
                        <PlusCircle />
                    </Button>}


                    <Button disabled={btnDisabled} color='danger' onClick={() => dispatch(minusCart(item))} style={{ background: '#c24645' }} >

                        <MinusCircle />
                    </Button>

                </ButtonGroup>
            </Row>
            <Row>
                {errorQuantity && <span className='text-danger'>Ingrese una cantidad valida</span>}

            </Row>
        </>
    )
}

export default BtnPlusMinus