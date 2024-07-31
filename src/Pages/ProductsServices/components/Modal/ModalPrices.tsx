import { FC } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import FormPriceModal from '../Tabs/TabPanes/CompoPrecies/FormPriceModal'
import CardHeaderModal from '../../../../common/CardHeaderModal'
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
            <CardHeaderModal
                onCloseClick={onCloseClick}
                text={`Item ${item?.nombre}`}
                classHeader='py-2 px-3'
            />
            <ModalBody className=''>
                {item && (
                    <FormPriceModal
                        onCloseClick={onCloseClick}
                        item={item}
                        isEditProduct={isEditProduct}
                        validation={validation}
                        setProducts={setProducts}
                        fetchDataProduct={fetchDataProduct}
                        handleClear={handleClear}
                    />
                )}
            </ModalBody>
        </Modal>

    )
}

export default ModalPrices