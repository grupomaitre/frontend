import axios from "axios"
import { useQuery } from 'react-query';

import { SwalError } from "../../../Components/Common/Swals/SwalsApi"


export const getProduct = async (): Promise<any> => {
    try {
        const response = await axios.get('api/list-product')
        if (response.status) {
            return response.data
        }
    } catch (error) {
        SwalError({ title: 'Error al obtener Productos', text: error })
    }
}
/* const getProduct2 = async (): Promise<any> => {
    const response = await axios.get('api/list-product');
    return response.data;
};
 */
export const useProductData = () => {
    return useQuery('productData', getProduct, {
        cacheTime: 6 * 60 * 60 * 1000,
        staleTime: 6 * 60 * 60 * 1000,
    });
};