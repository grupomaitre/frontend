import axios from 'axios'
export const getMedidas = async () => {
    try {
        const response = await axios.get('/api/list-medida', {
            params: {
                status: 1
            }
        })
        if (response.status) {
            return response
        }


    } catch (error) {
        console.error(error)
    }
}