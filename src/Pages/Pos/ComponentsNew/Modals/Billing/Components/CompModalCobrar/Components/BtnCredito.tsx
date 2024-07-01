import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import ModalConfirmCred from './Modals/ModalConfirmCred'
const BtnCredito = () => {
    const idCliente = useSelector((state: any) => state.clientesSlice.idcliente)
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal &&
                <ModalConfirmCred
                    onCloseClick={() => setShowModal(false)}
                    show={showModal}
                />
            }
            <Button
                disabled={idCliente > 0 ? false : true}
                color='secondary'
                outline
                className='fs-11 mx-2 rounded'
                onClick={() => setShowModal(true)}
            >CRÉDITO</Button>
        </>
    )
}

export default BtnCredito