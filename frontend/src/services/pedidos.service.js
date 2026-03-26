import api from '@/api/api'

export const pedidosService = {
  getAll: async () => {
    const { data } = await api.get('/pedidos')
    return data
  },

  getByDate: async (fecha) => {
    const { data } = await api.get('/pedidos/fecha', {
      params: { fecha }
    })
    return data
  },

  getByRange: async (inicio, fin) => {
    const { data } = await api.get('/pedidos/rango', {
      params: { inicio, fin }
    })
    return data
  },

  updateEstado: async (id, nuevoEstado) => {
    const { data } = await api.patch(`/pedidos/${id}`, { 
      estado: nuevoEstado 
    })
    return data
  },

  updatePedido: async (nuevaData) => {
    const { data } = await api.put(`/pedidos/${nuevaData.id_pedido}`, nuevaData)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`/pedidos/${id}`)
    return data
  }
}