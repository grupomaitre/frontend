import axios from "axios"
import { GET_GROUPS_LIST } from "../Urls/ApiUrls"
import { IGroups } from "../Interfaces/InterfaceGroups"
import { useQuery } from "react-query"


export const fetchGroups = async (status: number): Promise<IGroups[]> => {
    try {
        const { data } = await axios.get(GET_GROUPS_LIST, { params: { status } })
        if (!data) throw new Error("Error fetching groups");
        return data
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}
export const fetchGroupsTipo = async (status: number): Promise<IGroups[]> => {
    try {
        const { data } = await axios.get("api/list/rubros/pos", { params: { status } })
        if (!data) throw new Error("Error fetching groups");
        return data
    } catch (error) {
        throw new Error("Error fetching groups");
    }
}

export const usefetchGroupsMain = (status: number) => {
    const query: any = useQuery(['rubrosMain'], () => fetchGroups(status), {
        refetchOnWindowFocus: false,

    });
    return query
}