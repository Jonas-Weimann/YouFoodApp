import { pedidosService } from "@/services/pedidos.service"
import { finanzasService } from "@/services/finanzas.service"

 export const colorDeEstado = (estado) => {
    if (estado == 'Completado') {
      return 'green-400'
    } else if (estado == 'Enviado') {
      return 'blue-400'
    } else if (estado == 'Cancelado') {
      return 'red-400'
    } else {
      return 'orange-400'
    }
  }

 export const actualizarEstado = async (id_pedido, estado_actual) => {
    let nuevoEstado
    switch (estado_actual) {
      case 'Completado':
        nuevoEstado = 'Pendiente'
        await finanzasService.deleteVentaByPedido(id_pedido)
        break
      case 'Pendiente':
        nuevoEstado = 'Enviado'
        break
      case 'Enviado':
        nuevoEstado = 'Completado'
        break
      default:
        nuevoEstado = estado_actual
    }
    await pedidosService.updateEstado(id_pedido, nuevoEstado)
  }