import api from '@/api/api'

export const finanzasService = {
  getVentas: () => api.get('/finanzas/ventas').then(res => res.data),
  getGastos: () => api.get('/finanzas/gastos').then(res => res.data),
  getCompras: () => api.get('/finanzas/compras').then(res => res.data),
  getVentasRango: (desde, hasta) => api.get(`/finanzas/ventas/rango?desde=${desde}&hasta=${hasta}`).then(res => res.data)
}