import { Col, Label, Row, Table } from 'reactstrap'
import Reloj from '../../../common/Relog'

const InfoApp = () => {
    const data = JSON.parse(sessionStorage.getItem('authUser') || '{}')
    return (

        <>

            <Table className='rounded table-dark'   bordered   hover>
                <tbody >
                    <tr className=''>
                        <td>{'Servidor-127.0.0.1'}</td>

                        <td className='text-end'>Nombre Usuario: {data?.name_personal}-{data?.user_name}</td>
                    </tr>
                    <tr>
                        <td>{'Maquina-'}</td>
                        <td className='text-end'>Perfil: {data?.profile || 'Admin'}</td>
                    </tr>
                    <tr >
                        <td>Fecha: 2024-04-17</td>
                        <td className='text-end'><Reloj /></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default InfoApp