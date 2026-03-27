import { useState } from "react"
import { Kpi } from "@/components/ui/kpi" 
import { usePedidosData } from "@/hooks/use-pedidos-data"
import { formatearMoneda, formatearFecha, parsearFechaLocal } from "@/utilities/formatters"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableRow, TableHeader, TableHead, TableFooter } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, YAxis, CartesianGrid } from 'recharts'
import { Loader2, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/hooks/use-auth"
import { colorDeEstado, actualizarEstado } from "@/utilities/estado.js"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { pedidosService } from "@/services/pedidos.service"
import { es } from "date-fns/locale"

export const PedidosPage = () => {
  const [pedidoAbierto, setPedidoAbierto] = useState(null)
  const { user } = useAuthStore()
  const { data, isLoading, error, isError, refetch } = usePedidosData()

  if (isLoading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-(--accent) w-12 h-12" />
      <p className="text-(--text) opacity-50 animate-pulse">Cargando pedidos...</p>
    </div>
  )

  if (isError) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center p-6">
      <AlertCircle className="text-red-500 w-16 h-16" />
      <h2 className="text-xl font-bold text-(--text)">Ha ocurrido un error.</h2>
      <p className="text-muted-foreground max-w-xs">
        {typeof error === 'string' ? error : (error?.message || "Error de conexión")}
      </p>
      <button onClick={() => refetch()} className="px-4 py-2 bg-(--accent) text-(--background) rounded-lg cursor-pointer">
        Reintentar
      </button>
    </div>
  )

  const actualizarFecha = async (pedido, nuevaFecha) => {
    try {
      if (!nuevaFecha) return;
      await pedidosService.updatePedido({...pedido, fecha_entrega: nuevaFecha})
      refetch()
      toggleCalendario(pedido.id_pedido)
    } catch (err) {
      console.error("Error al actualizar fecha", err)
    }
  }

  const toggleCalendario = (id) => {
    setPedidoAbierto(prevId => (prevId === id ? null : id));
  }


  return (
    <div className="space-y-6 animate-(--animation-fade-in)">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-(--text)">
          ¡Hola, {user?.nombre?.split(' ')[0]}!
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1">
        <Kpi title="Pedidos a entregar Hoy" color="text-green-500" >{data.pedidosHoy}</Kpi>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="lg:col-span-2 bg-(--background-trans) border shadow-xl border-(--accent) ">
          <CardHeader><CardTitle className="text-xs  font-bold text-(--accent-foreground) text-lg">Flujo Semanal</CardTitle></CardHeader>
          <CardContent className="h-80 min-h-[300px] w-full"> 
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.grafico?.length > 0 ? data.grafico : [{d: 'Hoy', t: data?.pedidosHoy || 0}]} margin={{left:12, right:12}} className="bg-(--background-trans)">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(78, 56, 58)" />
                <XAxis dataKey="Día" axisLine={false} tickLine={false} tick={{fill: 'gray', fontSize: 12}} tickMargin={8} tickFormatter={(value) => value.slice(0,3)}/>
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)'}} contentStyle={{backgroundColor: '#1a1a1a', color:'salmon', border: 'none', borderRadius: 16}} className="text-xl" formatter={(value) => value}/>
                <defs>
                  <linearGradient id="fillPedidos" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="15%"
                      stopColor="var(--accent)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="85%"
                      stopColor="var(--background)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="Cantidad"
                  type="natural"
                  fill="url(#fillPedidos)"
                  fillOpacity={0.4}
                  stroke="var(--ring)"
                  stackId="a"
                />
                
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 " >

        <Table className="text-(--text) rounded-2xl">
          <TableHeader>
            <TableRow className="text-base bg-(--accent-trans) border-none">
              <TableHead className="rounded-tl-2xl pl-8 py-2.5">Fecha de Entrega</TableHead>
              <TableHead >Cliente</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right rounded-tr-2xl pr-8">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-(--text-dark) text-base bg-(--background-transer)">
              {data.pedidos.map((pedido) => (
              <TableRow key={pedido.id_pedido} className="border border-(--background-lighter)">
                <TableCell className="p-0 border-l border-l-(--background-lighter)" >
                  <div className="flex items-center gap-2 h-12 pl-8 ">
                  { pedidoAbierto == pedido.id_pedido && 
                  <Calendar
                  locale={es}
                  mode="single"
                  selected={parsearFechaLocal(pedido.fecha_entrega)}
                  classNames={{day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors"}}
                  onSelect={(newDate) => {
                    if (!newDate) return;
                    actualizarFecha(pedido, newDate);
                  }}
                  className="z-15 absolute top-10 left-10 rounded-lg border bg-(--background-lighter)"
                  />}
                  <CalendarIcon cursor="pointer" onClick={() => toggleCalendario(pedido.id_pedido)} />
                  {formatearFecha(pedido.fecha_entrega)}
                  </div>
                </TableCell>
                <TableCell>{pedido.cliente.nombre}</TableCell>
                <TableCell className="text-center align-middle">
                  <Badge 
                    onClick={ async () =>{
                      await actualizarEstado(pedido.id_pedido, pedido.estado)
                      refetch()
                    }}
                    variant="outline" 
                    className={`cursor-pointer text-base p-3.5 border-${colorDeEstado(pedido.estado)} text-${colorDeEstado(pedido.estado)}`}>{pedido.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8 border-r border-r-(--background-lighter)">{formatearMoneda(pedido.monto)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="text-(--accent) text-base border-t border-(--accent)">
            <TableRow className="bg-(--background-trans)">
              <TableCell colSpan={3} className="rounded-bl-2xl pl-8">Total</TableCell>
              <TableCell className="text-right rounded-br-2xl pr-8">{formatearMoneda(data.montoTotal)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
