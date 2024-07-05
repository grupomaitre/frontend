import { FC } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import FormPriceModal from '../Tabs/TabPanes/CompoPrecies/FormPriceModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
    isEditProduct: any
    itmesFormPrices?: any
    setItmesFormPrices?: any
    validation?: any
    setProducts?: any
    fetchDataProduct?: any
    handleClear: () => void
}
const ModalPrices: FC<IProps> = ({ show, onCloseClick, item, validation, setProducts, fetchDataProduct, isEditProduct, handleClear }) => {
    return (
        <Modal isOpen={show} toggle={onCloseClick} backdrop={'static'} style={{ maxWidth: '95%' }}>
            <ModalHeader toggle={onCloseClick} >{item.nombre || ''} </ModalHeader>
            <ModalBody className='fondo-sistema'>
                {item && (<FormPriceModal
                    onCloseClick={onCloseClick}
                    item={item}
                    isEditProduct={isEditProduct}
                    validation={validation}
                    setProducts={setProducts}
                    fetchDataProduct={fetchDataProduct}
                    handleClear={handleClear}
                />)}
            </ModalBody>
        </Modal>

    )
}

export default ModalPrices