import React, { FC, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Modal, ModalBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import BtnPosModal from '../../../../Components/Common/Buttons/BtnPosModal'
import { addMesa, addPax, calculateCartTotal, setIDCart, setIDUser, setIdMesa, setIdOrder, setNewCart, setVendedorSlice } from '../../../../slices/Cart/cartSlice'
import axios from 'axios'
import TableGeneric from '../../../../common/Generics/Table/TableGeneric'
import TableContainer from './TableContainer'
import { joinAccount } from '../ComponetsMenuPos/Api/MudarItems'
import { ToastContainer } from 'react-toastify'
import { socketTest } from '../../Socket/ConctSocket'
//import { addCart, calculateCartTotal, setNewCart } from '../../../../slices/Cart/cartSlice'

interface IProps {
    show?: boolean
    onCloseClick: () => void,
    items: any
}


const ModalMudarItemDetalles: FC<IProps> = ({ show, onCloseClick }) => {
    const dispatch = useDispatch()
    const [dataTempCuent, setDataTempCuent] = useState<any>([])
    const [selectRow2, setSelectItemRow2] = useState<any>()
    const mesacart = useSelector((state: any) => state.cartSlice.mesacart)
    const id_mesa = useSelector((state: any) => state.cartSlice.idMesa)
    //  const [activeRow, setActiveRow] = useState(null)
    const [productInd, setProductInd] = useState<any>([])
    const [selectItem, setSelectItem] = useState<any>([])

    const columns = React.useMemo(() => [
        {
            Header: "Cantidad",
            Cell: ({ row }: any) => <span>{row.original.cantidad}</span>

        },
        {
            Header: "Producto",
            Cell: ({ row }: any) => <span>{row.original.nombre}</span>
        },
        {
            Header: "Precio",
            accessor: "precio",
        }
    ],
        []
    )
    const buscarCartProducts = async (id: number) => {
        if (id === 0) return
        try {
            const res: any = await axios.get('/api/v1/buscar/cart/productos', { params: { id_cart: id } })

            if (res?.status === 'success') {
                setProductInd(res?.data)
                dispatch(setNewCart(res?.data))

            }
        } catch (error) {
            return error
        }
    }
    const getTempCuenta = async () => {
        try {
            const res = await axios.get('/api/v1/buscar/temp-cuentas', {
                params: {
                    id_mesa: id_mesa
                }
            })
            if (res) {
                setDataTempCuent(res?.data || [])
            }
        } catch (error) {
            return error
        }
        return () => {
            setDataTempCuent([])
        }
    }

    useEffect(() => {
        getTempCuenta()
    }, [])

    const handleRow = async (item: any) => {
        const { nombre, resposable } = item
        buscarCartProducts(item.id_cart)
        setProductInd(item?.productos)
        dispatch(setIdOrder(item?.id_order))
        dispatch(addPax(item?.pax))
        dispatch(setIDCart(item?.id_cart))
        dispatch(setVendedorSlice(resposable))
        dispatch(setIDUser(item?.id_user))
        dispatch(setIdMesa(item?.id_mesa))
        dispatch(addMesa(nombre))
        onCloseClick()
    }
    const handleJoinAcc = async () => {
        if (selectItem.length == 0) return
        const idCart: any = selectItem.map((item: any) => ({ id_cart: item.id_cart }))
        const total = selectItem.length > 0 ? Number(selectItem[0].total) * selectItem.length : 0;
        const res: any = await joinAccount(idCart[0], id_mesa, total)
        if (res) {
            socketTest.emit('actualizarMesas')
            onCloseClick()
        }
    }
    return (
        <>
            <Modal isOpen={show} centered={false} size="lg" >

                <ModalBody className='bg-gray rounded'>
                    <Card>
                        <CardHeader className='d-flex justify-content-around bg-orange text-white p-0'>
                            <span className=''>N° Cuenta {mesacart || ''}</span>
                            <span className=''>Total:{calculateCartTotal(dataTempCuent).toFixed(2)}</span>
                        </CardHeader>
                        <CardBody className='p-0 px-1 py-1'>

                            <TableContainer
                                items={dataTempCuent}
                                /* double Click */
                                handleRow={handleRow}
                                selectItem={selectItem}
                                setSelectItem={setSelectItem}
                                /* buscar cartproducs */ buscarCartProducts={buscarCartProducts}
                            />
                            <div>
                                <Button
                                    onClick={() => handleJoinAcc()}
                                    block
                                    color='primary'>
                                    {'Unir Cuentas'}
                                </Button>
                            </div>
                        </CardBody>
                        <CardFooter className='bg-black'>

                            <span className='float-end text-end w-100 fs-6' style={{ color: '#c50000' }}>Total({dataTempCuent.length}) {calculateCartTotal(dataTempCuent).toFixed(2)}   </span>

                        </CardFooter>
                    </Card>
                    <Card className=''>
                        <CardHeader className='p-0 px-1 text-center bg-orange text-white'>
                            Productos
                        </CardHeader>
                        <CardBody className='p-0 rounded'>
                            <TableGeneric
                                showFilter={false}
                                showFooter={false}
                                columns={columns || []}
                                data={productInd || []}
                                selectItemRow={setSelectItemRow2}
                                divClass='table-responsive text-black bg-table'
                                tableClass='cursor-pointer w-100'
                                theadClass='position-sticky top-0 bg-table '
                                tdClass={'fs-11 border'}
                                thClass='fs-11 page-bg text-white border'
                                tbodyClass='bg-light'
                                styleHeight='130px'
                                overflowY='scroll'
                            />
                        </CardBody>
                        <CardFooter>
                            <BtnPosModal
                                onAceptarClick={() => onCloseClick()}
                                onCloseClick={onCloseClick}
                            />
                        </CardFooter>
                    </Card>

                </ModalBody>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default ModalMudarItemDetalles