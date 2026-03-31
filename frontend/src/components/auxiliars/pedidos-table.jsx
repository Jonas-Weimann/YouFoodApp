import React from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableFooter 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { formatearMoneda, formatearFecha, parsearFechaLocal } from "@/utilities/formatters"
import { colorDeEstado, actualizarEstado } from "@/utilities/estado.js"
import { es } from "date-fns/locale"

export const PedidosTable = ({ pedidos, onUpdateFecha, onUpdateStatus }) => {
  
  const totalGeneral = pedidos.reduce((acc, p) => acc + Number(p.monto), 0)

  return (
    <Table className="text-(--text) rounded-2xl">
      <TableHeader>
        <TableRow className="text-base bg-(--accent-trans) border-none">
          <TableHead className="rounded-tl-2xl pl-8 py-2.5">Fecha de Entrega</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="text-center">Estado</TableHead>
          <TableHead className="text-right rounded-tr-2xl pr-8">Monto</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="text-(--text-dark) text-base bg-(--background-transer)">
        {pedidos.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-10 opacity-50">
              No se encontraron pedidos en este rango.
            </TableCell>
          </TableRow>
        ) : (
          pedidos.map((pedido) => (
            <TableRow key={pedido.id_pedido} className="border border-(--background-lighter)">
              <TableCell className="p-0 border-l border-l-(--background-lighter)">
                <div className="flex items-center gap-2 h-12 pl-8">
                  <Popover>
                    <PopoverTrigger asChild>
                      <CalendarIcon className="cursor-pointer hover:text-(--accent) transition-colors size-4" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-(--background-light)" align="start">
                      <Calendar
                        locale={es}
                        mode="single"
                        selected={parsearFechaLocal(pedido.fecha_entrega)}
                        onSelect={(newDate) => newDate && onUpdateFecha(pedido, newDate)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {formatearFecha(pedido.fecha_entrega)}
                </div>
              </TableCell>

              <TableCell>{pedido.cliente.nombre}</TableCell>

              <TableCell className="text-center align-middle">
                <Badge 
                  onClick={async () => {
                    await actualizarEstado(pedido.id_pedido, pedido.estado)
                    onUpdateStatus()
                  }}
                  variant="outline" 
                  className={`cursor-pointer text-sm p-2 px-3 border-${colorDeEstado(pedido.estado)} text-${colorDeEstado(pedido.estado)} hover:bg-(--background-dimmed)`}
                >
                  {pedido.estado}
                </Badge>
              </TableCell>

              <TableCell className="text-right pr-8 border-r border-r-(--background-lighter) font-medium">
                {formatearMoneda(pedido.monto)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      <TableFooter className="text-(--accent) text-base border-t border-(--accent)">
        <TableRow className="bg-(--background-trans)">
          <TableCell colSpan={3} className="rounded-bl-2xl pl-8 font-bold">Total</TableCell>
          <TableCell className="text-right rounded-br-2xl pr-8 font-black text-xl">
            {formatearMoneda(totalGeneral)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}