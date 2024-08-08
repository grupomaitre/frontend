import axios from 'axios';
import { useQuery } from 'react-query';
export const getFormasPay = async (forma: string, id_caja: number) => {
    let formaPago = ''
    forma === 'Efectivo' ? formaPago = 'efectivo' : formaPago = 'tarjeta'
    try {
        const result: any = await axios.get('api/buscar/Orden/forma/pago', {
            params: {
                forma_pago: forma,
                id_caja: id_caja,
                tipo: formaPago
            }
        })
        if (result.status) {
            return result
        }
    } catch (e) {
        return e
    }

}

export const useFormaPago = (forma: string, id_caja: number) => {
    const query = useQuery(["uniFormaPago"], () => getFormasPay(forma, id_caja), {

        refetchOnWindowFocus: false,

    });
    return query
}