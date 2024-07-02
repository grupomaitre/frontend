import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ModalAlert from '../../../common/Generics/Modal/ModalAlert'
import { setCaja } from '../../../slices/Cart/cajaSlice'
import '../css/index.css'
import ModalTipoRubro from '../../Rubros/Components/Modal/ModalTipoRubro'
import { toastError } from '../../../Components/Common/Swals/SwalsApi'
import { ToastContainer } from 'react-toastify'
import { useQuery } from 'react-query'
import { getItemsMenuDash } from '../ItemsMenu'
interface IProps {
    refetchCaja: () => void
}

const ItemsMenu: FC<IProps> = ({ refetchCaja }) => {
    const [showModalAlert, setShowModalAlert] = useState(false)
    const [showModalTipoRubro, setShowModalTipoRubro] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const IDtipoRubro = useSelector((state: any) => state.rubrosSlice.IDtipoRubro)

    const { data: itemsMenuDash } = useQuery(['itemsMenuDash'], getItemsMenuDash, {
        cacheTime: Infinity,
        staleTime: Infinity,
    });
    const goToLink = async (item: any) => {
        const res: any = await refetchCaja()
        if (item.link === 'pos') {

            if (res.data.caja > 0) {
                dispatch(setCaja(res.data.caja || 0))
                localStorage.setItem("idCaja", JSON.stringify(res.data.caja));
                navigate(`/${item.link}`)
            } else {
                setShowModalAlert(true)
            }

        } else if (item.link === 'cajas') {
            dispatch(setCaja(res.data.caja || 0))
            localStorage.setItem("idCaja", JSON.stringify(res.data.caja));
            navigate(`/${item.link}`)
        } else if (item.link === 'items') {
            setShowModalTipoRubro(true)
        }

        else {
            navigate(`/${item.link}`)
        }

    }
    const handleOpenItems = () => {
        if (IDtipoRubro > 0) {
            setShowModalTipoRubro(false)
            navigate('/items')
            return
        }
        if (IDtipoRubro === 0) {
            toastError({ message: 'Selecione un Tipo de Rubro' })

        }
    }
    return (
        <>
            {showModalTipoRubro &&
                <ModalTipoRubro
                    show={showModalTipoRubro}
                    onCloseClick={() => setShowModalTipoRubro(false)}
                    handleOpenItems={handleOpenItems}

                />}
            {showModalAlert && <ModalAlert
                onAceptar={() => navigate('/cajas')}
                onCancelar={() => setShowModalAlert(false)}
                onCloseClick={() => setShowModalAlert(false)}
                show={showModalAlert}
                showAceptar={true}
                showCancelar={true}
                text='No se Ha Creado Caja'
                backdrop={true}
            />}
            <div className=''
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)'
                }}
            >
                {(itemsMenuDash || []).map((item, key: number) => (
                    <div className="
                     d-flex 
                     gap-2
                     m-3
                     flex-column 
                     justify-content-center
                     align-items-center
                     text-center
                     cursor-pointer
                     neo-card
                     p-1
                     "
                        key={key}
                        onClick={() => goToLink(item)}
                        style={{
                            borderRadius: '15px',
                            width: "60%",
                            height: "90%"
                        }}

                    >
                        <img
                            src={item.img === '' ? "" : item.img}
                            width="43%"
                            height="43%"
                            alt={item.name}
                        />
                        <span
                            className='text-uppercase fs-11  mt-2'
                            style={{ fontWeight: '900' }}
                        > {item.name}</span>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    )
}

export default ItemsMenu