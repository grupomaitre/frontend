import { useState } from 'react'
import { Input } from 'reactstrap'
import './style.css'
import { addMesa, setIdMesa } from '../../../../slices/Cart/cartSlice'
import { useDispatch } from 'react-redux'

interface IProps {
    items: any[]
    handleRow: (item: any) => void
    setSelectItem: any
    selectItem: any
    buscarCartProducts: (id: number) => void
}

function TableContainer(props: IProps) {
    const { items, handleRow, selectItem, setSelectItem, buscarCartProducts } = props
    console.log(items)
    const [seleccion, setSeleccion] = useState<number[]>([])
    const dispatch = useDispatch()
    const toggleSeleccion = (index: number, item: any) => {
        buscarCartProducts(item.id_cart)
        dispatch(setIdMesa(item?.id_mesa))
        dispatch(addMesa(item?.nombre))
        if (seleccion.includes(index)) {
            setSeleccion(seleccion.filter((itemIndex) => itemIndex !== index))
            setSelectItem(selectItem.filter((selectedItem: any) => selectedItem !== item))

        } else {
            setSeleccion([...seleccion, index])
            setSelectItem([...selectItem, item])
        }
    }
    const toggleAll = () => {
        if (seleccion.length === items.length) {
            setSeleccion([])
            setSelectItem([])
        } else {
            setSeleccion(items.map((_, index) => index))
            setSelectItem([...items])
        }
    }
    return (
        <div style={{ height: '150px', overflowY: 'scroll' }} >
            <table className='w-100 p-1 my-3 border'>
                <thead>
                    <tr className='border page-bg fs-12 text-white'>
                        <th>
                            <Input
                                type="checkbox"
                                checked={seleccion.length === items.length}
                                onChange={toggleAll}
                            />
                        </th>
                        <th>Cuenta</th>
                        <th>Comprobante</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Precuenta</th>
                    </tr>
                </thead>
                <tbody className='fs-11'>
                    {items.map((item: any, index: number) => (
                        <tr
                            key={index}
                            onClick={() => toggleSeleccion(index, item)}
                            className={seleccion.includes(index) ? 'seleccionada' : ''}
                            onDoubleClick={() => handleRow(item)}
                        >
                            <td>
                                <Input
                                    type="checkbox"
                                    checked={seleccion.includes(index)}
                                    onChange={() => { }}
                                    onClick={() => toggleSeleccion(index, item)}
                                />
                            </td>
                            <td className='text-uppercase'>{item.sub_orden}</td>
                            <td>{'Pendiente'}</td>
                            <td>{'Consumidor final'}</td>
                            <td>{item.total}</td>
                            <td>{''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableContainer
