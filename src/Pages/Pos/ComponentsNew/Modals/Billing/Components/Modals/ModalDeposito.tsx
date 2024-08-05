import { FC, useState, useEffect, useRef, createRef } from 'react'
import TabPaneDeposito from '../CompoTabsFact/TabPaneDeposito'
import axios from 'axios'
import { toastError } from '../../../../../../../Components/Common/Swals/SwalsApi'
import { deleteItemDepo, getDesositos, updateItemDeposito } from '../CompoTabsFact/Api/ApiDepositos'
import { useDispatch, useSelector } from 'react-redux'
import { setIDDeposito } from '../../../../../../../slices/Orders/OrdersSlice'
interface IrefInput {
    current: HTMLInputElement | null
}
interface Props {

    total: number
    setInputDeposito: any
    testVuelto: any
}
const ModalDeposito: FC<Props> = ({ total, setInputDeposito, testVuelto }) => {
    const dispatch = useDispatch()
    const [items, setItems] = useState<any>([])
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        try {
            const res = await axios.post('api/add-factura-deposito', { items: data })
            if (res.status) {
                dispatch(setIDDeposito(res.data.id_factura_deposito))
                getDataDeposito()
                setIsLoading(false)
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
            //isLoading
            isLoading={isLoading}
        />

    )
}

export default ModalDeposito