import { useState } from 'react'
import { Airplay, Book, BookOpen, Codesandbox, CornerUpLeft, Cpu, Edit3, Inbox, MinusCircle, Package, PlusCircle } from 'react-feather'
import { Button } from 'reactstrap'
import ModalAlert from '../../../common/Generics/Modal/ModalAlert'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCartPos, clearCartPos, removeCartItemPos, removeCartPos } from '../../../slices/PointSale/pointSaleSlice'
import ModalCantCart from '../../../common/Facturacion/ModalCantCart'

const ItemsMenuPos = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showModalConfirSalir, setShowModalConfirSalir] = useState(false)
    const [showCantidad, setShowCantidad] = useState(false)
    const [cantidad, setCantidad] = useState('')
    const menu = [
        { name: 'Calculadora', icon: Cpu, colorIcon: "#31d2f2", function: () => console.log('first') },
        { name: 'Stock', icon: Package, colorIcon: "#b19a66", function: () => console.log('first') },
        { name: 'Caja Chica', icon: Inbox, colorIcon: "#ff7f01", function: () => console.log('first') },
        {
            name: 'Otros =', icon: PlusCircle, colorIcon: "#33ff00"/* , fill: '#33ff00' */, function: () => handleAddCart()
        },
        { name: 'Comprobantes', icon: BookOpen, colorIcon: "#61afef", function: () => console.log('first') },
        { name: 'Cajon Dinero', icon: Airplay, colorIcon: "", function: () => console.log('first') },
        { name: 'Historial', icon: Book, colorIcon: "#f75858", function: () => console.log('first') },
        { name: 'Preparados', icon: Codesandbox, colorIcon: "#0d6efd", function: () => console.log('first') },
        { name: 'Eliminar Item', icon: MinusCircle, colorIcon: "#ff1414", fill: '#ff1414', function: () => handleRemoveCart() },
        { name: 'Notas', icon: Edit3, colorIcon: "#ff7f01", function: () => console.log('first') },
        { name: 'Salir', icon: CornerUpLeft, colorIcon: "#fff", color: '#ff1414', function: () => setShowModalConfirSalir(true) },

    ]
    const handleAddCart = () => {
        const item = JSON.parse(localStorage.getItem('itemCart') || '')
        dispatch(addCartPos(item))
    }
    const handleRemoveCart = () => {
        const item = JSON.parse(localStorage.getItem('itemCart') || '')
        setCantidad(item.cantidad)
        if (item.cantidad > 1) {
            setShowCantidad(true)
        } else {
            dispatch(removeCartItemPos({ producto: item, cantidad: 1 }))
        }
    }
    const handleClick = (funcion: any): void => {
        if (typeof funcion === 'function') {
            funcion()
        }
    }
    const handleSalir = () => {
        dispatch(clearCartPos())
        setShowModalConfirSalir(true)
        navigate('/dashboard')
    }
    const handleDeleteMulpl = (cant: number) => {

        const item = JSON.parse(localStorage.getItem('itemCart') || '')
        dispatch(removeCartItemPos({ producto: item, cantidad: cant }))
        setShowCantidad(false)

    }
    return (
        <>
            {
                showCantidad &&
                <ModalCantCart
                    show={showCantidad}
                    onCloseClick={() => setShowCantidad(false)}
                    cantidad={parseFloat(cantidad)}
                    handleDeleteMulpl={handleDeleteMulpl}

                />
            }
            {/* salir */}

            {
                showModalConfirSalir &&
                <ModalAlert
                    show={showModalConfirSalir}
                    onCloseClick={() => setShowModalConfirSalir(false)}
                    onAceptar={() => handleSalir()}
                    onCancelar={() => setShowModalConfirSalir(false)}
                    showAceptar={true}
                    showCancelar={true}
                    text='Desea Salir?'
                    backdrop={true}
                />
            }



            <div className='d-flex justify-content-between align-items-center p-1 px- text-center border-bottom rounded border-1 border-white'>
                {
                    (menu || []).map((item, key) => (

                        <Button key={key}

                            className='d-flex flex-column justify-content-center align-items-center border-icons'
                            style={{
                                userSelect: 'none',
                                width: '75px',
                                height: '46px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                background: item.color ? item.color : '#ffff',
                                color: item.color ? '#ffff' : '#000'
                            }}
                            onClick={() => handleClick(item.function)}
                        >


                            {
                                item.icon ? <item.icon
                                    size={25}
                                    color={item.colorIcon ? item.colorIcon : '#000'}
                                    className='fs-4 ' style={{ color: item.color ? '#fff' : '#000', userSelect: 'none', strokeWidth: '1', }} /> : null
                            }

                            <span className=' px-1  text-truncate ' style={{ fontWeight: '', fontSize: '0.68rem', userSelect: 'none' }}>{item.name}</span>
                        </Button>
                    ))
                }
            </div >
        </>
    )
}

export default ItemsMenuPos