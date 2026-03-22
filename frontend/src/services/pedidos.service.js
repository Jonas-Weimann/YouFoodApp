import api from '@/api/api'

export const pedidosService = {
  getAll: () => api.get('/pedidos').then(res => res.data),
  getByDate: (fecha) => api.get(`/pedidos/date?fecha=${fecha}`).then(res => res.data),
  updateEstado: (id, nuevoEstado) => api.patch(`/pedidos/${id}`, { estado: nuevoEstado }).then(res => res.data),
  delete: (id) => api.delete(`/pedidos/${id}`).then(res => res.data)
}