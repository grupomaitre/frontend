import axios from 'axios'
import { SwalError } from '../../../Components/Common/Swals/SwalsApi';
export const GetAnulacion = async (status) => {
    try {
        const response = await axios.get('api/list-mesa-position');
        return response.data;
    } catch (error) {
        SwalError({ title: 'Error', text: error || 'error' })
    }
}