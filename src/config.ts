
const api_url = (localStorage.getItem('api_url') || '')
const api_socket = api_url.slice(0, -5)
export const api = {
    API_URL: `http://${api_url}`,
    API_URL_SOCKET: `http://${api_socket}:3201`,
}

