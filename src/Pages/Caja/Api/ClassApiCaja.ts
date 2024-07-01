import axios from "axios";
import { toastError } from "../../../Components/Common/Swals/SwalsApi"

class CajaRepository {
    async getCajaActive() {
        try {
            const result = await axios.get('/api/caja-activa')
            if (result)
                return result.data;
        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }

    async getReportCajaCuenta(id_caja: number) {
        try {
            const result = await axios.get('api/v1/reporte-cajas-cuenta', {
                params: {
                    id_caja_diaria: id_caja
                }
            })
            return result.data
        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }
    async getReportCajaIngreso(id_caja: number) {
        try {
            const result = await axios.get('api/v1/reporte-cajas-ingresos', {
                params: {
                    id_caja_diaria: id_caja
                }
            })
            return result.data
        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }
    async getReportCajaEgreso(id_caja: number) {
        try {
            const result = await axios.get('api/v1/reporte-cajas-egresos', {
                params: {
                    id_caja_diaria: id_caja
                }
            })
            return result.data
        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }
    async getCuentasCount() {
        try {
            const result = await axios.get('api/list-mesa-active', { params: { status: 1 } })
            if (result.status) {
                return result.data
            }

        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }

}

export default new CajaRepository();
