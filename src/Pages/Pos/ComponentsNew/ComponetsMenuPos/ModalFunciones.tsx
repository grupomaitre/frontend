import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { AlertTriangle, BellOff, Book, BookOpen, Box, Code, DivideSquare, Eye, LogOut, Monitor, Power, Tablet, User, Users } from 'react-feather'
import ModalDocCobrar from '../CompModalFunciones/ModalDocCobrar'
import ModalAnulacion from '../CompModalFunciones/ModalAnulacionCuenta'
import ModalCargoHabi from '../CompModalFunciones/ModalCargoHabi'
import ModalDelete from '../../../../Components/Common/DeleteModal'
import ModalAnuCuenta from '../CompModalFunciones/ModalAnuCuenta'
import ModalComandas from '../CompModalFunciones/ModalComandas'
import ModalDividir from '../CompModalFunciones/ModalDividir'
import ModalGastosCaja from '../CompModalFunciones/ModalGastosCaja'
import ModalCarta from '../CompModalFunciones/ModalCarta'
import { SwalInfo } from '../../../../Components/Common/Swals/SwalsApi'
import ModalObsComd from '../CompModalFunciones/ModalVentas/ModalObsComd'
import axios from 'axios'
interface IProps {
    show: boolean,
    onCloseClick: () => void
}
interface ItemsMenu {
    name: string
    icon?: any
    function?: any
    color?: string
}

const ModalFunciones: React.FC<IProps> = ({ show, onCloseClick }) => {
    const [showModalDocCobrar, setShowModalDocCobrar] = useState(false)
    const [showModalAnulacion, setShowModalAnulacion] = useState(false)
    const [showModalCargoHabi, setShowModalCargoHabi] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalAnuCuenta, setShowModalAnuCuenta] = useState(false)
    const [showModalComandas, setShowModalComandas] = useState(false)
    const [showModalDividir, setShowModalDividir] = useState(false)
    const [showModalGastosCaja, setShowModalGastosCaja] = useState(false)
    const [showModalCarta, setShowModalCarta] = useState(false)
    const [showModalObs, setshowModalObs] = useState(false)
    //cart cartSlice
    const cart = useSelector((state: any) => state.cartSlice.cart)

    const item: ItemsMenu[] = [
        { name: 'Ventas', icon: BookOpen, color: '#744530', function: () => setShowModalDocCobrar(true) },
        { name: 'Abre Cajon', icon: Box, color: '#ffe747', function: () => handleAbrirCajon() },
        { name: 'Anular factura', icon: Power, color: "#ff0000", function: () => setShowModalAnulacion(true) },
        { name: 'Art, sin serv', icon: Users, color: '#61afef' },
        { name: 'Cargo Habitación', icon: BellOff, color: '#ff8000', function: () => setShowModalCargoHabi(true) },
        { name: 'Cargo Individual', icon: User, color: '#2856c3' },
        {
            name: 'Anular Cuenta', icon: AlertTriangle, color: '#e88464',
            function: () => cart.length > 0 ? setShowModalDelete(true) : SwalInfo({ title: 'Selecione Una Cuenta' })
        },
        { name: 'Ver Comandas', icon: Book, color: "#0d6efd", function: () => cart.length > 0 ? setShowModalComandas(true) : SwalInfo({ title: 'Selecione Una Cuenta' }) },
        { name: 'Dividir', icon: DivideSquare, color: "#fcc422", function: () => cart.length > 0 ? setShowModalDividir(true) : SwalInfo({ title: 'Selecione Una Cuenta' }) },
        { name: 'Gastos Caja', icon: Monitor, color: "#219de2", function: () => setShowModalGastosCaja(true) },
        { name: 'Cliente', icon: User, color: "#fe8000" },
        //  { name: 'Carta', icon: Table, function: () => setShowModalCarta(true) },
        { name: 'Comprobantes electronicos', icon: Tablet },
        { name: 'App', icon: Code, color: "#249543" },
        { name: 'Observaciones', icon: Eye, color: "#61afef", function: () => cart.length > 0 ? setshowModalObs(true) : SwalInfo({ title: 'Selecione Una Cuenta' }) },
        { name: 'Salir', icon: LogOut, color: "#ff0000", function: () => onCloseClick() },
    ]

    const handleClick = (funcion: any | undefined): void => {
        if (typeof funcion === 'function') {
            funcion()
        }
    }
    const showAnulacionCnt = (): Promise<void> => {
        return new Promise<void>((resolve) => {
            setShowModalDelete(!showModalDelete)
            setShowModalAnuCuenta(!showModalAnuCuenta)
            resolve()
        })
    }
    const handleAbrirCajon = async () => {
        try {
            await axios.get('/api/abrir/cajo')

        } catch (error) {
            return error
        }
    }
    return (
        <>
            {showModalDocCobrar &&
                <ModalDocCobrar
                    show={showModalDocCobrar}
                    onCloseClick={() => setShowModalDocCobrar(false)}
                />
            }
            {showModalAnulacion &&
                <ModalAnulacion
                    show={showModalAnulacion}
                    onCloseClick={() => setShowModalAnulacion(false)}
                />
            }
            {
                showModalCargoHabi &&
                <ModalCargoHabi
                    show={showModalCargoHabi}
                    onCloseClick={() => setShowModalCargoHabi(false)}
                />
            }
            {showModalDelete &&
                <ModalDelete
                    show={showModalDelete}
                    onCloseClick={() => setShowModalDelete(false)}
                    onDeleteClick={() => showAnulacionCnt()}
                />
            }
            {showModalAnuCuenta &&
                <ModalAnuCuenta
                    show={showModalAnuCuenta}
                    onCloseClick={() => setShowModalAnuCuenta(false)}
                    onCloseFunct={() => onCloseClick()}
                />
            }
            {showModalComandas &&
                <ModalComandas
                    show={showModalComandas}
                    onCloseClick={() => setShowModalComandas(false)}
                />
            }
            {showModalDividir &&
                <ModalDividir
                    show={showModalDividir}
                    onCloseClick={() => setShowModalDividir(false)}
                    onCloseFuncModal={onCloseClick}
                />
            }

            {showModalGastosCaja &&
                <ModalGastosCaja
                    show={showModalGastosCaja}
                    onCloseClick={() => setShowModalGastosCaja(false)}
                />
            }
            {showModalCarta &&
                <ModalCarta
                    show={showModalCarta}
                    onCloseClick={() => setShowModalCarta(false)}
                />
            }
            {
                showModalObs &&
                < ModalObsComd
                    show={showModalObs}
                    onCloseClick={() => setshowModalObs(false)}
                />


            }


            <Modal isOpen={show} toggle={onCloseClick} size='xl' fullscreen style={{ maxHeight: '29vh' }} fade={false}>

                <ModalBody className='bg-orange'>
                    <div className='' style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)' }}>
                        {
                            (item || []).map((item, key) => (
                                <div key={key} className='m-1  d-flex flex-column align-items-center btn bg-white border-icons shadow-lg'
                                    onClick={() => handleClick(item.function)}
                                >
                                    {
                                        item.icon ? <item.icon
                                            size={23}
                                            color={item.color ? item.color : '#000'}
                                            className='' style={{ color: item.color ? '#fff' : '#000', userSelect: 'none', strokeWidth: '2', }} /> : null
                                    }
                                    <span className='text-capitalize fs-11'>{item.name}</span>
                                </div>
                            ))
                        }

                    </div>
                </ModalBody>

            </Modal>
        </>
    )
}

export default ModalFunciones