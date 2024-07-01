import { useQuery } from "react-query";
import { toastError } from "../../../../Components/Common/Swals/SwalsApi";
import axios from "axios";
const getDocumentosType = async () => {

    try {
        const url = '/api/v1/list/documentos/tipos'
        const response: any = await axios.get(url)
        if (response.status === "success") {
            return response.data
        }

    } catch (e) {
        toastError({ message: e })
        throw new Error("Error fetching groups");

    }
}



export const useDocs = () => {
    const query = useQuery(['documentosType'], getDocumentosType, {
        refetchOnWindowFocus: false,

    });
    return query
}