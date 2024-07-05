//use react query
import axios from "axios";
import { useQuery } from "react-query";
import { toastError } from "../../../Components/Common/Swals/SwalsApi";

//api get rubros url /api/list-rubros
export const getRubros = async () => {

    try {
        const result = await axios.get("/api/list-rubros", { params: { status: 1 } })

        if (result) {
            return result;
        }

    } catch (error) {
        toastError({ message: error || "Error al cargar los rubros" })
    }

}
export const getGrupoByTipo = async (id: number) => {

    try {
        const result: any = await axios.get("/api/v1/grupo/tipo/grupo/id", { params: { id_tipo_grupo: id } })

        if (result.status === 'success') {
            return result;
        }

    } catch (error) {
        toastError({ message: error || "Error al cargar los rubros" })
    }

}

export const useGrupoByTipo = (id: number) => {
    const query = useQuery(['rubros'], () => getGrupoByTipo(id), {
        refetchOnWindowFocus: false,

    });
    return query
}








//export useQuery getRubros
export const useGetRubros = () => {
    return useQuery("rubros", () => getRubros())
}
