import { FC, useEffect, useState, useRef } from 'react'
interface IProps {
    show: boolean
    onCloseClick: () => void
    item: any
}
import { Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { useDispatch } from 'react-redux'
import { addNewDescPos } from '../../../../slices/PointSale/pointSaleSlice'
const ModalDescPos: FC<IProps> = ({
    show, onCloseClick, item
}) => {
    const dispatch = useDispatch()
    // const cart = useSelector((state: any) => state.pointSaleSlice.cart)

    const inputRefDesc = useRef<HTMLInputElement>(null)
    const [inputDesc, setInputDesc] = useState<number>(0)

    const handleFocus = () => inputRefDesc.current?.focus()

    useEffect(() => {
        setTimeout(() => {
            handleFocus()
        }, 100);
    }, [])

    const dispatchDesc = () => {
        if (!item) return
        if (inputDesc > 100) {
            inputRefDesc.current?.focus()
            inputRefDesc.current?.select()

        } else {
            const subTotalItem = item?.cantidad * item?.precio
            const totalDescuento = subTotalItem * inputDesc / 100
            dispatch(addNewDescPos({ item: item, descuento: totalDescuento }))
            onCloseClick()

        }

    }
    //  console.log(cart)
    return (
        <Modal isOpen={show} toggle={onCloseClick} size='sm' centered>
            <ModalHeader toggle={onCloseClick} className='fs-11 p-0 px-2'>
                <span className='fs-12'>Descuento</span>
            </ModalHeader>
            <ModalBody>
                <Label className='fs-12'>Ingrese % Descuento</Label>
                <Input
                    className='w-100'
                    innerRef={inputRefDesc}
                    type='number'
                    bsSize='sm'
                    onChange={(e) => setInputDesc(parseFloat(e.target.value) || 0)} />
            </ModalBody>

            <ModalFooter>

                <BtnPosModal
                    btnClassAceptar='fs-6'
                    divClass=''
                    styleCancelar={{ height: '25px' }}
                    styleAceptar={{ height: '25px' }}
                    onAceptarClick={dispatchDesc}
                    onCloseClick={onCloseClick}
                />
            </ModalFooter>
        </Modal>
    )
}
export default ModalDescPos