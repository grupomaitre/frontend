import axios from "axios";
import { toastError } from "../../../Components/Common/Swals/SwalsApi"
import { addNewCajas } from "../../../helpers/fakebackend_helper";

class CrudCajas {
    async getCajas() {
        try {
            const result = await axios.get('/api/caja-activa')
            if (result)
                return result.data;
        } catch (e) {
            toastError({ message: e || 'Error al listar items' });
        }
    }

    async addCaja(data: any) {
        try {
            const result = await addNewCajas(data)
            if (result.status) {
                return result
            }
        } catch (e) {
            toastError({ message: e || '' })
        }
    }

    async editCaja(id: number, data: any) {
        try {
            const result = await axios.patch(`/${id}`, data)
            if (result.status) {
                return result
            }
        } catch (e) {
            toastError({ message: e || 'Error al editar item' })
        }
    }

    async deleteCaja(id: number) {
        try {
            const result = await axios.delete(`/${id}`)
            if (result.status) {
                return result
            }
        } catch (e) {
            toastError({ message: e || 'Error al eliminar' })
        }
    }

}

export default new CrudCajas() 