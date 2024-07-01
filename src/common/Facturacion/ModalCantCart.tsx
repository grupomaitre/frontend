import { FC, useEffect, useRef, useState } from 'react'
import { Input, Label, Modal, ModalBody, ModalFooter } from 'reactstrap'
import BtnPosModal from '../../Components/Common/Buttons/BtnPosModal'
interface IProps {
    show: boolean
    onCloseClick: () => void
    handleDeleteMulpl: (cant: number) => void
    cantidad: number
}
const ModalCantCart: FC<IProps> = ({
    show, onCloseClick, cantidad, handleDeleteMulpl
}) => {
    const inputCantRef = useRef<HTMLInputElement>(null)
    const [inputCantidad, setCantidad] = useState(cantidad)

    useEffect(() => {
        setTimeout(() => {
            inputCantRef.current?.focus()
            inputCantRef.current?.select()
        }, 100);
    }, [show])

    return (
        <Modal isOpen={show} toggle={onCloseClick} size='sm' centered>
            <ModalBody>
                <Label>Ingrese Cantidad a Eliminar</Label>
                <Input
                    innerRef={inputCantRef}
                    type='number'
                    value={inputCantidad}
                    onChange={(e) => setCantidad(parseFloat(e.target.value))} />
            </ModalBody>
            <ModalFooter>
                <BtnPosModal
                    divClass='w-100'
                    onAceptarClick={() => handleDeleteMulpl((inputCantidad))}
                    onCloseClick={onCloseClick}
                />
            </ModalFooter>
        </Modal>
    )
}

export default ModalCantCart