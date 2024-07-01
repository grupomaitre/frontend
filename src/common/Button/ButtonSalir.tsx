import axios from 'axios'
import { FC } from 'react'
import { LogOut } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import { setIDTipoRubro } from '../../slices/rubros/reducer'
interface Props {
    link: string
    text: string
}
const ButtonSalir: FC<Props> = ({
    link,
    text
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = JSON.parse(sessionStorage.getItem('authUser') || '{}')
    const handleSalir = () => {
        dispatch(setIDTipoRubro(0))
    }
    const quitApp = async () => {
        try {
            if (link === '/') {

                const result = await axios.post('/api/edit-acceso-sistema', data)

                if (result.status) {
                    navigate(link)
                    sessionStorage.clear()
                    localStorage.removeItem("idCaja");
                }
            } else {
                navigate(link)
                handleSalir && handleSalir()
            }
        } catch (e) {
            alert(e)
        }


    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <Button
                block
                size='sm'
                color='#dc3545'
                className="custom-toggle rounded-circle p-3  border-white"
                onClick={quitApp} >
                <LogOut color='#fff' size={20} />
            </Button>
            <span className="icon-on fs-13">  {text}</span>
        </div>
    )
}

export default ButtonSalir