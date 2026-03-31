import { useState, useEffect } from "react"
import { usePedidosData } from "@/hooks/use-pedidos-data"
import { pedidosService } from "@/services/pedidos.service"
import { subDays } from "date-fns"

export const usePedidosLogic = () => {
  const { data, isLoading, isError, error, refetch } = usePedidosData()
  const [pedidosMostrar, setPedidosMostrar] = useState([])
  const [date, setDate] = useState({ from: subDays(new Date(), 6), to: new Date() })

  useEffect(() => {
    if (data?.pedidos) setPedidosMostrar(data.pedidos)
  }, [data])

  const fetchPedidosRange = async (inicio, fin) => {
    if (!inicio || !fin) return refetch()
    try {
      const res = await pedidosService.getByRange(inicio, fin)
      setPedidosMostrar(res)
    } catch (err) {
      console.error("Error al filtrar por rango", err)
    }
  }

  const actualizarFecha = async (pedido, nuevaFecha) => {
    try {
      await pedidosService.updatePedido({ ...pedido, fecha_entrega: nuevaFecha })
      refetch()
    } catch (err) {
      console.error("Error al actualizar fecha", err)
    }
  }

  return {
    data, isLoading, isError, error, refetch,
    pedidosMostrar, date, setDate,
    fetchPedidosRange, actualizarFecha
  }
}