import { FC } from 'react'
import { Modal, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { socketTest } from '../../Socket/ConctSocket'
import axios from 'axios'
import { getAllMesas } from '../../Helpers/GetMesas'
import { setMesa } from '../../../../slices/Facturacion/Mesa/mesaSlice'
import { SwalError } from '../../../../Components/Common/Swals/SwalsApi'
import { Printer, X } from 'react-feather'
interface IProps {
    show: boolean,
    onCloseClick: () => void
    cart: any
}
const ConfirmPrecuenta: FC<IProps> = ({ show, onCloseClick, cart }) => {
    const dispatch = useDispatch()
    // const [btnDisabled, setBtnDisabled] = React.useState(false)
    const { orden, pax, nombreMesa, vendedor, idMesa, idCart } = useSelector((state: any) => ({
        nombreMesa: state.cartSlice.mesacart,
        orden: state.cartSlice.orden,
        pax: state.cartSlice.pax,
        vendedor: state.cartSlice.vendedor,
        idMesa: state.cartSlice.idMesa,
        idCart: state.cartSlice.idCart

    }))
    const subFinal = cart.reduce((acc: number, el: any) => acc + ((parseFloat(el.cantidad) * parseFloat(el.precio))), 0)
    const totaldescuento = cart.reduce((acc: any, el: any) => acc + (parseFloat(el.descuento)), 0)
    const subServiciototal = cart.reduce((acc: any, el: any) => acc + ((parseFloat(el.cantidad) * parseFloat(el.precio) - parseFloat(el.descuento)) * el.servicio / 100), 0)

    const subTotal = (subFinal - totaldescuento) || 0
    const totalIva = subTotal * 15 / 100

    const onGenerar = async () => {
        const terminal = (localStorage.getItem('terminal') || '')
        const empresa: any = JSON.parse(sessionStorage.getItem('authUser') || '')
        try {

            const statusMesa = await axios.post('/api/status-precuenta-mesa', {
                id_mesa: idMesa,
                status: 0,
                status_precuenta: 1
            })
            if (statusMesa) {
                onCloseClick()
                getAllMesas().then((res) => {
                    socketTest.emit('actualizarMesas')
                    res && dispatch(setMesa(res))

                })
                await axios.get('/api/precuenta', {
                    params: {
                        nombreMesa: nombreMesa,
                        pax: pax,
                        orden: orden,
                        mesero: vendedor,
                        cart: cart,
                        subTotal: subTotal.toFixed(2),
                        descuento: totaldescuento.toFixed(2),
                        iva: totalIva,
                        servicio: subServiciototal,
                        total: (subTotal + subServiciototal + totalIva).toFixed(2),
                        terminal: terminal,
                        empresa: empresa?.company || ''
                    }
                })

            }


        } catch (e) {
            SwalError({ icon: 'error', title: 'Oops...', text: e || 'Error al imprimir la precuenta' })
        }
    }
    return (
        <Modal isOpen={show} size="sm" centered>
            <div className="modal-body text-center">
                <h5>
                    {
                        idCart === 0 ? 'Debe Guardar la cuenta primero'
                            : 'Desea Imprimir PreCuenta?'
                    }
                </h5>
            </div>
            <div className="d-flex gap-2 justify-content-center mx-2 mb-2">
                <Button
                    disabled={idCart === 0 ? true : false}
                    onClick={onGenerar}
                    color='success'
                    style={{ background: '#279241' }}
                    className="btn-label w-50" >
                    <i className=" label-icon  me-2">
                        <Printer size={20} />
                    </i>
                    SI </Button>

                <Button
                    onClick={onCloseClick}
                    color='danger'
                    style={{ background: '#ff1414' }}
                    className="btn-label w-50">
                    <i className=" label-icon align-middle me-2">
                        <X size={20} />
                    </i>
                    NO </Button>

            </div>
        </Modal>
    )
}

export default ConfirmPrecuenta