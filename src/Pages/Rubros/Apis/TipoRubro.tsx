import axios from "axios"
import { toastError } from "../../../Components/Common/Swals/SwalsApi"

export const getTipoRubroByID = (id: number) => {
    try {
        const res: any = axios.post('/api/list/tipo/rubro/id',
            {
                id_tipo_rubro: id
            }
        )
        if (res.status === 'success') {
            return res
        }
    } catch (error) {
        return toastError({ message: "select type", error })
    }
}