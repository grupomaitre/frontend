import { FC, useState, useEffect, useRef, createRef } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import TabPaneDeposito from '../CompoTabsFact/TabPaneDeposito'
import axios from 'axios'
import { toastError } from '../../../../../../../Components/Common/Swals/SwalsApi'
import { deleteItemDepo, getDesositos, updateItemDeposito } from '../CompoTabsFact/Api/ApiDepositos'
import { useSelector } from 'react-redux'
interface IrefInput {
    current: HTMLInputElement | null
}
interface Props {
    show: boolean
    onCloseClick: () => void
    total: number
    setInputDeposito: any
    testVuelto: any
}
const ModalDescuento: FC<Props> = ({ show, onCloseClick, total, setInputDeposito, testVuelto }) => {
    const [items, setItems] = useState<any>([])
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)

    const getDataDeposito = async () => {
        const res: any = await getDesositos(id_order)
        if (res.status) {
            setItems(res.data)
            const totalDeposito = res.data.reduce((acc: number, el: any) => acc + parseFloat(el.monto), 0)
            setInputDeposito(totalDeposito)
        }
    }

    useEffect(() => {
        getDataDeposito()
    }, [])

    const saveDeposito = async (data: any) => {
        try {
            const res = await axios.post('api/add-factura-deposito', { items: data })
            if (res.status) {
                //  dispatch(setIDDeposito(res.data.id_factura_deposito))
                getDataDeposito()
                //    onCloseClick()
            }
        } catch (e) {
            toastError({ message: e })
        }
    }

    const editDeposito = async (id: number, data: any) => {
        const res: any = await updateItemDeposito(id, data)
        res && getDataDeposito()

    }

    const deleteDeposito = async (id: number) => {
        const res: any = await deleteItemDepo(id)
        res && getDataDeposito()
    }

    //keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', ''])
    const [activeInputIndex, setActiveInputIndex] = useState(0)
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()))
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] += value
        setInputValues(newInputValues)
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues]
        newInputValues[activeInputIndex] = ''
        inputRefs.current[activeInputIndex].current?.focus()
        setInputValues(newInputValues)
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues]
        newInputValues[index] = event.target.value
        setInputValues(newInputValues)
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index)
    }

    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index)
    }
    //end keyboard


    useEffect(() => {
        const newInputValues = [...inputValues]
        newInputValues[0] = total.toString()
        setInputValues(newInputValues || total)
    }, [])

    useEffect(() => {
        if (items.length > 0) {
            const totalDeposito = items.reduce((acc: number, el: any) => acc + parseFloat(el.monto), 0)
            setInputDeposito(totalDeposito)
            setInputValues([items.length > 0 || testVuelto > 0 ? testVuelto : 0, '', '', ''])
            setTimeout(() => {
                inputRefs.current[0].current?.focus()
                inputRefs.current[0].current?.select()
            }, 100)

        } else {
            setInputValues([testVuelto >= 0 ? testVuelto : total.toString(), '', '', ''])
        }
    }, [items, total, testVuelto])


    return (
        <Modal isOpen={show} backdrop={'static'} size='lg' fade={false} className='mt-3'>
            <ModalHeader toggle={onCloseClick} className='p-0 px-3 '>
                <span className='fs-11'>{`Deposito / Transferencias: ${total}`}</span>
            </ModalHeader>
            <ModalBody className='page-bg'>
                <TabPaneDeposito
                    testVuelto={testVuelto}
                    items={items}
                    total={total}
                    setInputDeposito={setInputDeposito}
                    //keyboard
                    inputRefs={inputRefs}
                    activeInputIndex={activeInputIndex}
                    setActiveInputIndex={setActiveInputIndex}
                    inputValues={inputValues}
                    setInputValues={setInputValues}
                    onKeyPress={onKeyPress}
                    handleDelete={handleDelete}
                    handleInputChange={handleInputChange}
                    handleInputClick={handleInputClick}
                    handleInputFocus={handleInputFocus}
                    //btn modal
                    saveDeposito={saveDeposito}
                    editDeposito={editDeposito}
                    deleteDeposito={deleteDeposito}
                    onCloseClick={onCloseClick}
                />
            </ModalBody>

        </Modal>
    )
}

export default ModalDescuento