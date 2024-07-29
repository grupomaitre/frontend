import Header from '../../Layouts/Header'
import ItemsMenu from './Components/ItemsMenu'
import './css/index.css'
import { useQuery } from 'react-query'
import { getCajasDiarias } from '../Pos/Helpers/ApiCajas'
import { useDispatch } from 'react-redux'
import { setCaja, setCajaObj } from '../../slices/Cart/cajaSlice'
import Footer from '../../Layouts/Footer'
import { Container } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import InfoApp from './Components/InfoApp'
import HeaderTools from '../../common/Ui/HeaderTools'
import { useState } from 'react'
import ModalConfigMesas from '../Pos/common/ModalConfigMesas'
import { enterFullScreen } from '../../common/FullScreenDropdown'
const Dashboard = () => {
    const dispatch = useDispatch()
    const navitage = useNavigate()
    const [showModalMesas, setShowModalMesas] = useState(false)
    const { refetch: refetchCaja } = useQuery(["cajas"], getCajasDiarias, {
        cacheTime: 6 * 60 * 60 * 1000,
        staleTime: 6 * 60 * 60 * 1000,
        onSuccess: (data) => {
            dispatch(setCaja(data?.caja || 0))
            dispatch(setCajaObj(data?.dataCajas || {}))
            sessionStorage.setItem('dataCaja', JSON.stringify(data?.dataCajas))
        },
    })
    const itemTools = [
        {
            title: 'Herramientas', subItems: [
                { text: 'Impresiones', onClick: () => navitage('/printers') },
                { text: 'Plano de mesas', onClick: () => setShowModalMesas(true) },
                { text: 'Pantalla Completa', onClick: () => enterFullScreen() },

            ]
        },

    ]
    return (
        <>
            {
                showModalMesas && <ModalConfigMesas
                    show={showModalMesas}
                    onCloseClick={() => setShowModalMesas(false)}
                />
            }
            <div className='' style={{ height: '100vh' }}>
                <div className=' ' >

                    <div className='text-white   bg-gray'>
                        <HeaderTools
                            itemTools={itemTools}
                            classToggle='p-0 px-1 py-1'
                        />
                    </div>
                    <Header link='/' />
                    <Container className=''>

                        <div className='mt-5 d-flex gap-5 justify-content-start align-items-end'>


                            <div style={{ width: '60%' }}>

                                <InfoApp />

                            </div>

                            <div style={{ width: '40%', marginLeft: '' }} >
                                <ItemsMenu
                                    refetchCaja={refetchCaja}
                                />
                            </div>

                        </div>

                    </Container>


                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Dashboard