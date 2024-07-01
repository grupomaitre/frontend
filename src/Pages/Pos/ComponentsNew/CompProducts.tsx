import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { IProducts } from '../Interfaces/InterfaceGroups'
import { addCart } from '../../../slices/Cart/cartSlice'
import ModalAlert from '../../../common/Generics/Modal/ModalAlert'
import ModalReferencia from './ComponetsMenuPos/ModalReferencia'
import ModalProductEditable from './Modals/Modal/ModalProductEditable'


interface ICompProducts {
    item: IProducts
    color: string
    inputRefs: any
    ClearInputKeyBoard: (item: number) => void

}

const CompProducts: FC<ICompProducts> = ({ item, color, inputRefs, ClearInputKeyBoard }) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalPrefe, setShowModalPrefe] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const dispatch = useDispatch()
    const id_user = useSelector((state: any) => state.cartSlice.id_user)

    const handleModalCart = useCallback(() => {
        localStorage.setItem('itemCart', JSON.stringify(item))

        if (id_user === 0) {
            inputRefs.current[1].current?.focus();
            setShowModal(true);
        }
        else if (item?.preferencias?.length > 0) {
            setShowModalPrefe(true);
            dispatch(addCart(item));
        }
        else if (item?.editable) {
            setShowModalEdit(true)
        }
        else {
            dispatch(addCart(item));
            ClearInputKeyBoard(2);
            inputRefs.current[2].current?.focus();
        }
    }, [dispatch, item, id_user]);

    return (

        <>
            {showModalPrefe &&
                <ModalReferencia
                    item={item}
                    show={showModalPrefe}
                    onCloseClick={() => setShowModalPrefe(false)}
                    listPrefer={item?.preferencias}
                />
            }
            {showModalEdit &&
                <ModalProductEditable
                    show={showModalEdit}
                    item={item}
                    onCloseClick={() => setShowModalEdit(false)}

                />
            }
            {showModal &&
                <ModalAlert
                    show={showModal}
                    onCloseClick={() => setShowModal(false)}
                    onAceptar={() => setShowModal(false)}
                    onCancelar={() => setShowModal(false)}
                    text='Ingrese Vendedor'
                    showAceptar={true}
                    showCancelar={true}
                />}
            <div
                onClick={handleModalCart}
                className="text-center  border-producto  d-flex align-items-center justify-content-center "
                style={{ width: "", height: '50px', cursor: 'pointer', backgroundColor: color, lineHeight: '10px' }}
            >
                <span className='fw-normal m-0 p-0 text-uppercase text-break' style={{ fontSize: '9px', color: '#000', userSelect: 'none' }}>
                    {item.nombre}
                </span>

            </div>

        </>


    )
}

export default CompProducts