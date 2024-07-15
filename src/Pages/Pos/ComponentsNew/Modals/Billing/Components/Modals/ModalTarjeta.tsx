import React, { FC, useEffect, useState, useRef, createRef } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import TabPaneTarjeta from '../CompoTabsFact/TabPaneTarjeta'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItemTarjeta, getTarjetas, updateItemTarjeta } from '../CompoTabsFact/Api/ApiTarjetas'
import { setIDTarjeta } from '../../../../../../../slices/Orders/OrdersSlice'
interface Props {
    show: boolean
    onCloseClick: () => void
    total: number
    setInputTarjeta?: any
    inputValues?: any
    testVuelto: any
}

interface IrefInput {
    current: HTMLInputElement | null
}


const ModalTarjeta: FC<Props> = ({ show, onCloseClick, total, setInputTarjeta, testVuelto }) => {
    const dispatch = useDispatch()
    const [newData, setNewData] = React.useState<any>([])
    const [items, setItems] = React.useState<any>([])
    const id_order = useSelector((state: any) => state.cartSlice.idOrder)

    const getCards = async () => {
        const res: any = await getTarjetas(id_order)
        if (res.status === "success") {
            setItems(res.data)
            const totalCheque = res.data.reduce((a: any, b: any) => parseFloat(a) + parseFloat(b.monto), 0)
            setInputTarjeta((totalCheque))
            return res
        }

    }
    useEffect(() => {
        getCards()
    }, [])


    const [loading, setLoading] = useState(false);

    const saveTarjeta = async (data: any) => {
        setLoading(true)

        try {
            const result = await axios.post('api/add-factura-tarjeta', { items: data })
            console.log(result)
            if (result.status) {
                dispatch(setIDTarjeta(result.data.id_factura_tarjeta))
                getCards()
                setLoading(false)
            }
        } catch (error) { return error }
    }

    const editTarjeta = async (id: any, data: any) => {

        const res: any = await updateItemTarjeta(id, data)

        res && getCards()
    }
    //delete item tarjeta
    const deleteTarjeta = async (id: number) => {
        const res: any = await deleteItemTarjeta(id)
        console.log(res)
        getCards()
    }

    //keyboard
    const [inputValues, setInputValues] = useState<Array<string>>(['', '', '', '']);
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputRefs = useRef<IrefInput[]>(inputValues.map(() => createRef()));
    const onKeyPress = (value: number | string) => {
        const newInputValues = [...inputValues];
        newInputValues[activeInputIndex] += value;
        setInputValues(newInputValues);
    }
    const handleDelete = () => {
        const newInputValues = [...inputValues];
        /*  newInputValues[activeInputIndex] = newInputValues[activeInputIndex].slice(0, -1);
         setInputValues(newInputValues); */
        newInputValues[activeInputIndex] = ''
        inputRefs.current[activeInputIndex].current?.focus()
        setInputValues(newInputValues);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = event.target.value;
        setInputValues(newInputValues);
    }
    const handleInputClick = (index: number) => {
        setActiveInputIndex(index);
    }

    const handleInputFocus = (index: number) => {
        setActiveInputIndex(index);
    }
    //end keyboard
    useEffect(() => {
        const newInputValues = [...inputValues]
        newInputValues[0] = total.toString()
        setInputValues(newInputValues)
    }, [total])

    useEffect(() => {
        if (items.length > 0) {
            const totalTarjeta = items.reduce((acc: number, el: any) => acc + parseFloat(el.monto), 0)
            setInputTarjeta(totalTarjeta)
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

        <Modal isOpen={show} backdrop={'static'} size='lg' fullscreen={false} className='mt-1 mb-0'>
            <ModalHeader toggle={onCloseClick}  >
                <span className='text-danger'>
                    {`Tarjeta: ${(total).toFixed(2)}`}
                </span>
            </ModalHeader>
            <ModalBody style={{ background: '#405c71' }} className='p-2 rounded'>
                <TabPaneTarjeta
                    total={total}
                    setNewData={setNewData}
                    newData={newData}
                    items={items}
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
                    editTarjeta={editTarjeta}
                    saveTarjeta={saveTarjeta}
                    deleteTarjeta={deleteTarjeta}
                    onCloseClick={onCloseClick}
                    //loading
                    loading={loading}
                />

            </ModalBody>

        </Modal>
    )
}

export default ModalTarjeta