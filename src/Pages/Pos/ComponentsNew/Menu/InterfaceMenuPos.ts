export interface IPropsMenuPos {
    showModalConfirSalir: boolean
    setShowModalConfirSalir: (f: boolean) => void
    confirmSalir: () => void
    showModalVerCart: boolean
    setShowModalVerCart: (f: boolean) => void
    showModalPrecuenta: boolean
    setShowModalPrecuenta: (f: boolean) => void
    showModalAnulacion: boolean
    setShowModalAnulacion: (f: boolean) => void
    item: any
    cart: any
    getMesa: any
    showModalItemAnul: boolean
    setshowModalItemAnul: (f: boolean) => void
    selectedProduct: any
    showModalPersonal: boolean
    setShowModalPersonal: (f: boolean) => void
    showModalTimbrar: boolean
    setShowModalTimbrar: (f: boolean) => void
    showModalReferencia: boolean
    setShowModalReferencia: (f: boolean) => void
    setItemUniCart: any
    showModalMensaje: boolean
    setShowModalMensaje: (f: boolean) => void
    showModalReservas: boolean
    setShowModalReservas: (f: boolean) => void
    showModalTMagnetica: boolean
    setShowModalTMagnetica: (f: boolean) => void
    showModalCortesia: boolean
    setShowModalCortesia: (f: boolean) => void
    showModalMudarItem: boolean
    setShowModalMudarItem: (f: boolean) => void
    showModalMudarCuenta: boolean
    setShowModalMudarCuenta: (f: boolean) => void
    showModalFunciones: boolean
    setShowModalFunciones: (f: boolean) => void
}