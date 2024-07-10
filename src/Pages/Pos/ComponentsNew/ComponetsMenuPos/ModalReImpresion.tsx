import { FC } from 'react'
import { Button, Modal } from 'reactstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
const ModalReImpresion: FC<IProps> = ({ show, onCloseClick }) => {
    const terminal = (localStorage.getItem('terminal') || '0')
    const { cart, orden, pax, nombreMesa, vendedor } = useSelector((state: any) => ({
        cart: state.cartSlice.cart,
        nombreMesa: state.cartSlice.mesacart,
        orden: state.cartSlice.orden,
        pax: state.cartSlice.pax,
        vendedor: state.cartSlice.vendedor

    }))
    const onGenerar = async () => {

        try {
            await axios.get('api/imprimir-comanda', {
                params: {
                    mesa: nombreMesa,
                    pax: pax,
                    mesero: vendedor,
                    orden: orden,
                    cart: cart,
                    terminal: terminal,
                    reimpresion: 1
                }
            })
            onCloseClick()

        } catch (e) {
            console.log(e)
        }
    }



    return (
        <Modal isOpen={show} toggle={onCloseClick} size="sm" centered  >
            <div className="modal-body text-center">
                <h5>Desea Re-imprimir?</h5>
            </div>

            <div className="d-flex gap-2 justify-content-center mx-2 mb-2">
                <Button
                    onClick={onGenerar}
                    color='success'
                    style={{ background: '#279241' }}
                    className="btn-label w-50" >
                    <i className="mdi mdi-printer label-icon align-middle fs-16 me-2"></i>
                    Si </Button>

                <Button
                    onClick={onCloseClick}
                    color='danger'
                    style={{ background: '#ff1414' }}
                    className="btn-label w-50">
                    <i className="mdi mdi-cancel label-icon align-middle fs-16 me-2"></i>
                    No </Button>

            </div>
        </Modal>
    )
}

export default ModalReImpresion