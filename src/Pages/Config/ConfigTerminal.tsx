import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SpinnerLoad from '../../Components/Common/Spinner/SpinnerLoad'

const ConfigTerminal = () => {

    const navigate = useNavigate()
    const handleVerficar = async () => {
        const api_url = (localStorage.getItem('api_url') || '')
        try {
            const res: any = await axios.get(`http://${api_url}/api/v1/configuracion/test`)
            if (res.status === 'success') {
                localStorage.setItem('api_fixed', JSON.stringify(true))
                navigate('/login')
            }
        } catch (e: any) {
            navigate('/configuracion')
            localStorage.setItem('api_fixed', JSON.stringify(false))
        }
    }
    useEffect(() => {
        handleVerficar()
    }, [])
    return <SpinnerLoad />
}

export default ConfigTerminal