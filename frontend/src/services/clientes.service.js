import api from '@/api/api'

export const clientesService = {
  getAll: async () => {
    const { data } = await api.get('/clientes')
    return data
  },
  getById: async (id) => {
    const { data } = await api.get(`/clientes/${id}`)
    return data
  },
  create: async (clienteData) => {
    const { data } = await api.post('/clientes', clienteData)
    return data
  }
}