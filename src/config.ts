
const api_url = (localStorage.getItem('api_url') || '')
console.log(api_url)
export const api = {
    API_URL: `http://${api_url}`,
    API_URL_SOCKET: "http://127.0.0.1:3000",
}

