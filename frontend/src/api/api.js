import axios from 'axios'

const axiosConfig = {
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const api = axios.create(axiosConfig)


api.interceptors.request.use((config) => {
    const authData = JSON.parse(localStorage.getItem('auth-storage'))
    const token = authData?.state?.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

)
api.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = error.response.data.message || "Error inesperado";
      return Promise.reject(errorMessage);
    }
)

export default api