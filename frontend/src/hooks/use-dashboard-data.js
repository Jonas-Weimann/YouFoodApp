import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'
import { format, subDays } from 'date-fns' // Librería recomendada, o usá Date nativo

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard-all'],
    queryFn: async () => {
      const hoy = new Date()
      const fechaFin = format(hoy, 'yyyy-MM-dd')
      const fechaInicio = format(subDays(hoy, 6), 'yyyy-MM-dd')

      const [finanzas, pedidosRaw, ventasSemana] = await Promise.all([
        dashboardService.getFinanzasHoy(),
        dashboardService.getPedidos(),
        dashboardService.getVentasSemana(fechaInicio, fechaFin)
      ])

      const totalVentasHoy = finanzas.ventas.reduce((acc, curr) => acc + (Number(curr.monto || curr.total) || 0), 0)
      const totalGastosHoy = finanzas.gastos.reduce((acc, curr) => acc + (Number(curr.monto || curr.total) || 0), 0)

      const diasSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
      
      const graficoData = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(hoy, 6 - i)
        const fechaStr = format(d, 'yyyy-MM-dd')
        
        const ventasDelDia = ventasSemana
          .filter(v => format(new Date(v.fecha), 'yyyy-MM-dd') === fechaStr)
          .reduce((acc, curr) => acc + (Number(curr.monto || curr.total) || 0), 0)

        return {
          Día: diasSemana[d.getDay()],
          Ventas: ventasDelDia 
        }
      })

      return {
        kpis: {
          ventas: totalVentasHoy,
          gastos: totalGastosHoy,
          pedidos: pedidosRaw.filter(p => p.estado === 'Pendiente').length,
          balance: totalVentasHoy - totalGastosHoy
        },
        listas: finanzas,
        pedidos: pedidosRaw,
        grafico: graficoData
      }
    },
    refetchInterval: 60000
  })
}