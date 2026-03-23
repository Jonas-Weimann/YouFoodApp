import api from '@/api/api'

export const finanzasService = {
  getVentas: async () => {
    const { data } = await api.get('/finanzas/ventas')
    return data
  },

  getGastos: async () => {
    const { data } = await api.get('/finanzas/gastos')
    return data
  },

  getCompras: async () => {
    const { data } = await api.get('/finanzas/compras')
    return data
  },

  getVentasRango: async (desde, hasta) => {
    const { data } = await api.get('/finanzas/ventas/rango', {
      params: { desde, hasta }
    })
    return data
  }
}