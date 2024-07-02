import { Badge, Table } from 'reactstrap'
import Reloj from '../../../common/Relog'
import moment from 'moment';
const InfoApp = () => {
    const data = JSON.parse(sessionStorage.getItem('authUser') || '{}')
    const terminal = (localStorage.getItem('terminal') || '')
    const api_url = (localStorage.getItem('api_url') || '')
    const fecha = moment().format('L')
    moment.locale("es");
    const fecha_convertida = moment(fecha).format('LL');
    console.log(fecha_convertida)
    return (
        <>
            <Table className='table table-responsive' striped bordered hover dark>
                <tbody >
                    <tr className=''>
                        <td className='d-flex justify-content-between align-items-center'>
                            {'Servidor:'}
                            <Badge color="secondary" className='bg-white text-black text-uppercase'>
                                {api_url}
                            </Badge></td>

                        <td className='text-end'>Nombre Usuario:
                            <Badge className='bg-white text-black text-uppercase'>{data?.name_personal}-{data?.user_name}</Badge>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-capitalize d-flex justify-content-between align-items-center'>{'Maquina :'}
                            <Badge className='bg-white text-black text-uppercase'> {terminal || ' '}</Badge>

                        </td>
                        <td className='text-end'>{'Perfil:'}
                            <Badge className='bg-white text-black text-uppercase'>{data?.profile || 'Admin'}</Badge>
                        </td>
                    </tr>
                    <tr >
                        <td className='d-flex justify-content-between align-items-center'>
                            <span>Fecha:</span>
                            <Badge className='bg-white text-black text-uppercase'>{fecha || ''}</Badge>
                        </td>
                        <td className='text-end'>
                            <Badge className='bg-success fs-14'><Reloj /></Badge>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default InfoApp