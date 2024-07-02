import { useState, useCallback, useMemo, useEffect, FC } from 'react'
import { Col } from 'reactstrap'
import VerticalTable from '../../ComponentsNew/Table/VerticalTable'
import ColumnsTablePos from '../../Helpers/Columns/ColumnsTablePos'
import { removeCart } from '../../../../slices/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import ModalCart from '../../ComponentsNew/Modals/ModalCart'
import ModalReferencia from '../../ComponentsNew/ComponetsMenuPos/ModalReferencia'
import ModalAnulacionItem from '../../ComponentsNew/Modals/ModalAnulacionItem'
import ModalDescuento from '../ModalDescuento'
import ModalDetailsItem from './Modales/ModalDetailsItem'
import ModalAnulacion from '../../ComponentsNew/Modals/ModalAnulacion'
interface IProps {
    setItemUniCartMenu: any
}

const TableFacturacion: FC<IProps> = ({ setItemUniCartMenu }) => {
    const cart = useSelector((state: any) => state.cartSlice.cart)
    const dispatch = useDispatch()
    const [showModalCart, setShowModalCart] = useState(false)
    const [showModalRefecias, setShowModalRefecias] = useState(false)
    const [showModalAnulacion, setShowModalAnulacion] = useState(false)
    const [showModalItemAnul, setshowModalItemAnul] = useState(false)
    const [showModalDescuento, setshowModalDescuento] = useState(false)
    const [itemDescuento, setItemDescuento] = useState({})
    const [itemUniCart, setItemUniCart] = useState([])
    const [showDetailItem, setShowDetailItem] = useState(false)
    const handleModalCart = useCallback((item: any) => {
        setItemUniCart(item.original)
        if (item.original.isCartSuccess) {
            setShowModalAnulacion(true)
        }
        else if (item.original.cantidad > 1) {
            setshowModalItemAnul(true)
        } else {
            dispatch(removeCart(item.original))

        }
    }, [setShowModalCart, itemUniCart])


    const handleDescuento = (item: any) => {
        setshowModalDescuento(true)
        setItemDescuento(item)
    }
    const handleDetailItem = (item: any) => {
        console.log(item?.preferences)
        setShowDetailItem(true)
        setItemUniCart(item)
    }
    const [activeItem, setActiveItem] = useState<any>(0)
    const columns = ColumnsTablePos({ setItemUniCart, handleModalCart, activeItem, setshowModalDescuento, handleDescuento, handleDetailItem })

    const memoizedItemUniCart = useMemo(() => itemUniCart, [itemUniCart, cart])
    useEffect(() => {
        setItemUniCartMenu(memoizedItemUniCart)
        setActiveItem(memoizedItemUniCart)
    }, [memoizedItemUniCart])


    return (
        <>
            {showModalCart && <ModalCart
                show={showModalCart}
                onCloseClick={() => setShowModalCart(false)}
                item={memoizedItemUniCart}
            />}
            {showModalDescuento &&
                <ModalDescuento
                    show={showModalDescuento}
                    onCloseClick={() => setshowModalDescuento(false)}
                    item={itemDescuento}

                />}          {showModalRefecias &&
                    <ModalReferencia
                        show={showModalRefecias}
                        onCloseClick={() => setShowModalRefecias(false)}
                        item={memoizedItemUniCart}
                        setItemUniCart={setItemUniCart}

                    />
            }
            {showModalAnulacion &&
                <ModalAnulacion
                    show={showModalAnulacion}
                    onCloseClick={() => setShowModalAnulacion(false)}
                    item={itemUniCart}

                />}

            {showModalItemAnul &&
                <ModalAnulacionItem
                    item={itemUniCart}
                    show={showModalItemAnul}
                    onCloseClick={() => setshowModalItemAnul(false)}
                />}

            {
                showDetailItem &&
                <ModalDetailsItem
                    show={showDetailItem}
                    onCloseClick={() => setShowDetailItem(false)}
                    item={itemUniCart}
                />
            }
            <Col className='' lg=''>
                <VerticalTable
                    columns={columns || []}
                    data={cart || []}
                    divClass="table-responsive bg-black"
                    tableClass=" mb-0 table-sm table-borderless table-dark bg-black rounded-0 align-middle  cursor-pointer"
                    theadClass="position-sticky top-0 bg-light text-dark "
                    thClass="fs-13  fw-lighter border border"
                    tdclass="p-0 m-0 text-capitalize fs-12 text-center color-td-table-old "

                />

            </Col>
        </>
    )
}

export default TableFacturacion