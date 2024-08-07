import axios from "axios"

export const saveConfigTerminal = async (data: any): Promise<any> => {
    try {
        const response = await axios.post('/api/v1/add/terminal', data)
        if (response) {
            return response
        }
    } catch (error) {
        console.error(error)
    }
}

export const verifcTerminal = async (maquina: any): Promise<any> => {
    try {
        const response = await axios.get('/api/v1/list/terminales/maquina', {
            params: {
                maquina: maquina
            }
        })
        return response
    } catch (error) {
        console.error(error)
    }
}