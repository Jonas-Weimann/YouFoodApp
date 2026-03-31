import api from '@/api/api'

export const productosService = {
    getAll: async () => {
        const { data } = await api.get('/productos')
        return data
    },
    getByCat: async (categoria) => {
        const { data } = await api.get(`/productos/cat/${categoria}`)
        return data
    },
    create: async (productoData) => {
        const { data } = await api.post('/productos', productoData)
        return data
    }
}