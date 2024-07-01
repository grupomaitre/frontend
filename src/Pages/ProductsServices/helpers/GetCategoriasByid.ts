import axios from 'axios'
import { SwalError } from '../../../Components/Common/Swals/SwalsApi';
export const GetCategoriasByid = async (id_rubro: any) => {
    try {
        const response = await axios.get('/api/list-categorias-id', {
            params: { id_rubro }
        });
        if (response.status) {
            return response;
        }

    } catch (error) {
        SwalError({ title: error })
    }
}
