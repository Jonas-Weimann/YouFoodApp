import axios from 'axios'



const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const api = axios.create(axiosConfig)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Error en la API", error.message)
        return Promise.reject(error)
    }
)

export default api