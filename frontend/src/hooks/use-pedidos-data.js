import { useQuery } from '@tanstack/react-query'
import { pedidosService } from '@/services/pedidos.service'
import { format, subDays } from 'date-fns'

export const usePedidosData = () => {
  return useQuery({
    queryKey: ['pedidos-all'],
    queryFn: async () => {
      const hoy = new Date()
      const fechaFin = format(hoy, 'yyyy-MM-dd')
      const fechaInicio = format(subDays(hoy, 6), 'yyyy-MM-dd')

      const [pedidosHoy, pedidosRaw, pedidosSemana] = await Promise.all([
        pedidosService.getByDate(format(hoy, 'yyyy-MM-dd')),
        pedidosService.getAll(),
        pedidosService.getByRange(fechaInicio, fechaFin)
      ])

      const semanaArr = Array.isArray(pedidosSemana) ? pedidosSemana : []

      const totalPedidosHoy = (Array.isArray(pedidosHoy) ? pedidosHoy : []).length
      
      const montoTotal = (pedidosRaw?.reduce((acc, curr) => {
        const valor = Number(curr.monto) || 0;
        return acc + valor;
      }, 0) || 0).toFixed(2)

      const diasSemana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
      
      const graficoData = Array.from({ length: 7 }).map((_, i) => {
        const d = subDays(hoy, 6 - i)
        const fechaStr = format(d, 'yyyy-MM-dd')
        
        const sumaDia = semanaArr
          .filter(p => {
            const fechaPedido = p.fecha_entrega || p.fecha
            return fechaPedido && format(new Date(fechaPedido), 'yyyy-MM-dd') === fechaStr
          })
          .reduce((acc, curr) => acc + (Number(curr.monto || curr.total) || 0), 0)
        
        const cantidadDia = semanaArr
          .filter(p => {
            const fechaPedido = p.fecha_entrega || p.fecha
            return fechaPedido && format(new Date(fechaPedido), 'yyyy-MM-dd') === fechaStr
          })
          .reduce((acc, curr) => acc + 1, 0)

        return {
          Día: diasSemana[d.getDay()],
          Monto: sumaDia,
          Cantidad:  cantidadDia
        }
      })

      

      return {
        pedidosHoy: totalPedidosHoy,
        pedidos: pedidosRaw,
        grafico: graficoData,
        montoTotal: montoTotal
      }
    },
    refetchInterval: 60000
  })
}