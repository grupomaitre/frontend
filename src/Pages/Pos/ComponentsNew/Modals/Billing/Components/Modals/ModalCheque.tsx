import React, { FC, useEffect, useRef, createRef, useState } from 'react'
import TabPaneCheque from '../CompoTabsFact/TabPaneCheque'
import { useDispatch, useSelector } from 'react-redux'
import { createItemCheque, deleteItemCheque, getCheques, updateItemCheque } from '../CompoTabsFact/Api/ApiCheque'
import { setIDCheque } from '../../../../../../../slices/Orders/OrdersSlice'
interface IrefInput {
    current: HTMLInputElement | null
}

interface Props {
    total: number
    setInputChequeTab: any
    testVuelto: any

}
const ModalCheque: FC<Props> = ({ total, setInputChequeTab, testVuelto }) => {
    const dispatch = useDispatch()
    const [items, setItems] = React.useState<any>([])
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)
    const getDataCheque = async () => {
        const res: any = await getCheques(id_order)
        if (res.status) {
            setItems(res.data)
            setTimeout(() => {
                const totalCheque = res.data.reduce((a: any, b: any) => parseFloat(a) + parseFloat(b.monto), 0)
                setInputChequeTab((totalCheque))
            }, 100);
        }
    }
    useEffect(() => {
        getDataCheque()
    }, [])
    const [isLoading, setIsLoading] = useState(false)
    const saveCheque = async (dataChueque: any) => {
        setIsLoading(true)
        const res: any = await createItemCheque(dataChueque)
        if (res.status) {
            setIsLoading(false)
            dispatch(setIDCheque(res.data.id_factura_cheque))
            getDataCheque()
            setInputValues(['', '', '', '', '', '', '', '', ''])
            // onCloseClick()
        }
    }

    const editCheque = async (id: number, data: any) => {
        console.log(id, data)
        const res: any = await updateItemCheque(id, data)
        res && getDataCheque()
    }
    const deleteCheque = async (id: number) => {
        const res: any = await deleteItemCheque(id)
        res && getDataCheque()
    }
    //keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', '', '', '', '', '', ''])
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
        setInputValues(newInputValues)
    }, [total])

    useEffect(() => {
        if (items.length > 0) {
            const totalCheque = items.reduce((acc: number, el: any) => acc + parseFloat(el.monto), 0)
            setInputChequeTab(totalCheque)
            setInputValues([items.length > 0 || testVuelto > 0 ? testVuelto : 0, '', '', '', '', '', '', '', ''])
            setTimeout(() => {
                inputRefs.current[0].current?.focus()
                inputRefs.current[0].current?.select()
            }, 100)

        } else {
            console.log('second')
            setInputValues([testVuelto >= 0 ? testVuelto : total.toString(), '', '', '', '', '', '', '', ''])
        }
    }, [items, total, testVuelto])


    return (

        <>
            <TabPaneCheque
                items={items}
                total={total}
                setInputChequeTab={setInputChequeTab}
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
                //
                editCheque={editCheque}
                saveCheque={saveCheque}
                deleteCheque={deleteCheque}
                //isLoading
                isLoading={isLoading}
            />

        </>
    )
}

export default ModalCheque