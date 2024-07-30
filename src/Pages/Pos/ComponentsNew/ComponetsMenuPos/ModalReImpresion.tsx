import { FC, useEffect, useState } from 'react'
import { Button, Modal } from 'reactstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Printer, X } from 'react-feather'
import { SwalInfo, toastSuccess } from '../../../../Components/Common/Swals/SwalsApi'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalReImpresion: FC<IProps> = ({ show, onCloseClick }) => {
    const [itemsFalse, setItemsFalse] = useState(false)
    const terminal = (localStorage.getItem('terminal') || '0')
    const { cart, orden, pax, nombreMesa, vendedor } = useSelector((state: any) => ({
        cart: state.cartSlice.cart,
        nombreMesa: state.cartSlice.mesacart,
        orden: state.cartSlice.orden,
        pax: state.cartSlice.pax,
        vendedor: state.cartSlice.vendedor

    }))
    useEffect(() => {
        const cartSuccess = cart.some((item: any) => item.isCartSuccess === false)
        setItemsFalse(cartSuccess)
    }, [cart])
    const onGenerar = async () => {

        try {
            const res = await axios.get('api/imprimir-comanda', {
                params: {
                    mesa: nombreMesa,
                    pax: pax,
                    mesero: vendedor,
                    orden: orden,
                    cart: cart,
                    terminal: terminal,
                    reimpresion: true
                }
            })
            console.log(res)
            onCloseClick()

        } catch (e) {
            return e
        }
    }



    return (
        <Modal isOpen={show} backdrop='static' size="sm" centered  >
            <div className="modal-body text-center">
                <h5>Desea Re-imprimir?</h5>
            </div>

            <div className="d-flex gap-2 justify-content-center mx-2 mb-2">
                <Button
                    onClick={itemsFalse ? () => SwalInfo({ title: 'Existen Items Sin Guardar' }) : onGenerar}
                    color='success'
                    style={{ background: '#279241' }}
                    className="btn-label w-50" >
                    <i className=" label-icon  me-2">
                        <Printer size={20} />
                    </i>
                    Si </Button>

                <Button
                    onClick={onCloseClick}
                    color='danger'
                    style={{ background: '#ff1414' }}
                    className="btn-label w-50">
                    <i className=" label-icon align-middle me-2">
                        <X size={20} />
                    </i>                    No </Button>

            </div>
        </Modal>
    )
}

export default ModalReImpresion