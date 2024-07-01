import { FC } from "react"
import ConfirmationModal from "../../../../Components/Common/Modals/ConfirmationModal"
import ModalAnulacion from "../CompModalFunciones/ModalAnulacionCuenta"
import ConfirmPrecuenta from "../ComponetsMenuPos/ConfirmPrecuenta"
import ModalPersonal from "../ComponetsMenuPos/ModalPersonal"
import ModalReferencia from "../ComponetsMenuPos/ModalReferencia"
import ModalTimbrar from "../ComponetsMenuPos/ModalTimbrar"
import ModalVerCart from "../ComponetsMenuPos/ModalVerCart"
import ModalAnulacionItem from "../Modals/ModalAnulacionItem"
import ModalMensajes from "../ComponetsMenuPos/ModalMensajes"
import ModalReservas from "../ComponetsMenuPos/ModalReservas"
import ModalTMagnetica from "../ComponetsMenuPos/ModalTMagnetica"
import ModalCortesia from "../ComponetsMenuPos/ModalCortesia"
import ModalMudarItem from '../ComponetsMenuPos/ModalMudarItem'
import ModalMudarCuenta from "../ComponetsMenuPos/ModalMudarCuenta"
import ModalFunciones from "../ComponetsMenuPos/ModalFunciones"
import { IPropsMenuPos } from "./InterfaceMenuPos"
import { useSelector } from "react-redux"

const ModalMenuPos: FC<IPropsMenuPos> = ({
    showModalConfirSalir,
    setShowModalConfirSalir,
    confirmSalir,
    showModalVerCart,
    setShowModalVerCart,
    showModalPrecuenta,
    setShowModalPrecuenta,
    setShowModalAnulacion,
    showModalAnulacion,
    item,
    setshowModalItemAnul,
    showModalItemAnul,
    selectedProduct,
    setShowModalPersonal,
    showModalPersonal,
    showModalTimbrar,
    setShowModalTimbrar,
    setShowModalReferencia,
    setItemUniCart,
    showModalReferencia,
    setShowModalMensaje,
    showModalMensaje,
    setShowModalReservas,
    showModalReservas,
    setShowModalTMagnetica,
    showModalTMagnetica,
    setShowModalCortesia,
    showModalCortesia,
    setShowModalMudarItem,
    showModalMudarItem,
    setShowModalFunciones,
    setShowModalMudarCuenta,
    showModalFunciones,
    showModalMudarCuenta


}) => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    return (
        <>
            {/* salir */}
            {showModalConfirSalir &&
                <ConfirmationModal
                    show={showModalConfirSalir}
                    onCloseClick={() => setShowModalConfirSalir(false)}
                    onConfirmClick={() => confirmSalir()}
                    title='Desea Salir'
                />
            }

            {/* Modal Ver carrito */}
            {showModalVerCart &&
                <ModalVerCart
                    show={showModalVerCart}
                    onCloseClick={() => setShowModalVerCart(false)}
                />}
            {/* Modal Precuenta */}
            {showModalPrecuenta &&
                <ConfirmPrecuenta
                    show={showModalPrecuenta}
                    onCloseClick={() => setShowModalPrecuenta(false)}
                    cart={cart}
                />}
            {/* Modal Anulacion */}
            {showModalAnulacion &&
                <ModalAnulacion
                    show={showModalAnulacion}
                    onCloseClick={() => setShowModalAnulacion(false)}

                />
            }
            {/* Modal anulacion item */}
            {showModalItemAnul &&
                <ModalAnulacionItem
                    show={showModalItemAnul}
                    onCloseClick={() => setshowModalItemAnul(false)}
                    item={selectedProduct}
                />}

            {/* Modal personal */}
            {showModalPersonal &&
                <ModalPersonal
                    show={showModalPersonal}
                    onCloseClick={() => setShowModalPersonal(false)}
                />}
            {/* Modal Timbrar */}
            {showModalTimbrar &&
                <ModalTimbrar
                    show={showModalTimbrar}
                    onCloseClick={() => setShowModalTimbrar(false)}
                />}

            {/* Referencias */}
            {showModalReferencia &&
                <ModalReferencia
                    setItemUniCart={setItemUniCart}
                    item={item}
                    show={showModalReferencia}
                    onCloseClick={() => setShowModalReferencia(false)}
                />}
            {/* Modal Mensajes */}
            {setShowModalMensaje &&
                <ModalMensajes
                    show={showModalMensaje}
                    onCloseClick={() => setShowModalMensaje(false)}
                />
            }
            {/* Reservas */}
            {showModalReservas &&
                <ModalReservas
                    show={showModalReservas}
                    onCloseClick={() => setShowModalReservas(false)}
                />}
            {/* Tarjeta Magnetica */}
            {showModalTMagnetica &&
                <ModalTMagnetica
                    show={showModalTMagnetica}
                    onCloseClick={() => setShowModalTMagnetica(false)}
                />}
            {/* Modal Cortesia */}
            {showModalCortesia &&
                <ModalCortesia
                    show={showModalCortesia}
                    onCloseClick={() => setShowModalCortesia(false)}
                    item={item}
                />}
            {
                showModalMudarItem &&
                <ModalMudarItem
                    show={showModalMudarItem}
                    onCloseClick={() => setShowModalMudarItem(false)}
                />


            }

            {/* Modal Mudar Cuenta */}
            {showModalMudarCuenta &&
                <ModalMudarCuenta
                    show={showModalMudarCuenta}
                    onCloseClick={() => setShowModalMudarCuenta(false)}
                />}
            {/* Modal funciones */}
            {showModalFunciones &&
                <ModalFunciones
                    show={showModalFunciones}
                    onCloseClick={() => setShowModalFunciones(false)}
                />}
        </>
    )
}

export default ModalMenuPos