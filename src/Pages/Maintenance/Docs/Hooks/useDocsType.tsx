import { useQuery } from "react-query";
import axios from "axios";
const getDocsType = async () => {

    try {
        const url = '/api/v1/list/tipo/documentos'
        const response: any = await axios.get(url)
        if (response.status === "success") {
            return response.data
        }

    } catch (e) {
        throw new Error("Error fetching groups");

    }
}



export const useTipoDocs = () => {
    const query = useQuery(['tipoDocumento'], getDocsType, {
        refetchOnWindowFocus: false,

    });
    return query
}