import api from '@/api/api'

export const dashboardService = {
  getFinanzasHoy: async () => {
    const [v, g, c] = await Promise.all([
      api.get('/finanzas/ventas'),
      api.get('/finanzas/gastos'),
      api.get('/finanzas/compras')
    ])
    return { 
      ventas: v.data || [], 
      gastos: g.data || [], 
      compras: c.data || [] 
    }
  },

  getVentasSemana: async (inicio, fin) => {
    const { data } = await api.get('/finanzas/ventas/rango', {
      params: { inicio, fin }
    })
    return data || []
  },

  getPedidos: async () => {
    const { data } = await api.get('/pedidos')
    return data || []
  }
}