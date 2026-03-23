import { Kpi } from "@/components/ui/kpi" 
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { formatearMoneda } from "@/utilities/formatters"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, YAxis, CartesianGrid } from 'recharts'
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { useAuthStore } from "@/hooks/use-auth"

export const DashboardPage = () => {
  const { user } = useAuthStore()
  const { data, isLoading, error, isError, refetch } = useDashboardData()

  if (isLoading) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-(--accent) w-12 h-12" />
      <p className="text-(--text) opacity-50 animate-pulse">Cargando cocina...</p>
    </div>
  )

  if (isError) return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center p-6">
      <AlertCircle className="text-red-500 w-16 h-16" />
      <h2 className="text-xl font-bold text-(--text)">Vaya, algo salió mal</h2>
      <p className="text-muted-foreground max-w-xs">
        {typeof error === 'string' ? error : (error?.message || "Error de conexión")}
      </p>
      <button onClick={() => refetch()} className="px-4 py-2 bg-(--accent) text-(--background) rounded-lg cursor-pointer">
        Reintentar
      </button>
    </div>
  )

  return (
    <div className="space-y-6 animate-(--animation-fade-in)">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-(--text)">
          ¡Hola, {user?.nombre?.split(' ')[0]}!
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi title="Ventas Hoy" color="text-green-500" >{formatearMoneda(data?.kpis?.ventas || 0)}</Kpi>
        <Kpi title="Gastos Hoy" color="text-red-400" >{formatearMoneda(data?.kpis?.gastos || 0)}</Kpi>
        <Kpi title="Pedidos Activos" color="text-(--accent)" >{(data?.kpis?.pedidos || 0)}</Kpi>
        <Kpi title="Balance Neto" color="text-blue-400" >{formatearMoneda(data?.kpis?.balance || 0)}</Kpi>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-(--background-trans) border-none shadow-xl">
          <CardHeader><CardTitle className="text-xs  font-bold text-(--accent-foreground) text-lg">Flujo Semanal</CardTitle></CardHeader>
          <CardContent className="h-80 min-h-[300px] w-full"> 
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.grafico?.length > 0 ? data.grafico : [{d: 'Hoy', t: data?.kpis?.ventas || 0}]} className="bg-(--background-trans)">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(78, 56, 58)" />
                <XAxis dataKey="Día" axisLine={false} tickLine={false} tick={{fill: 'gray', fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)'}} contentStyle={{backgroundColor: '#1a1a1a', color:'salmon', border: 'none', borderRadius: 16}} className="text-xl" formatter={(value) => formatearMoneda(value)}/>
                <Bar name="Ventas" dataKey="Ventas" fill="rgb(206, 103, 110)" radius={[6, 6, 0, 0]} barSize={40} activeBar={{fill: 'rgb(235, 130, 137)', stroke: 'salmon', strokeWidth: 1, cursor: 'pointer'}} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl overflow-hidden bg-(--background-trans)">
          <CardHeader className="border-b border-white/5 ">
            <CardTitle className="text-lg font-bold text-(--accent-foreground) ">Pedidos Recientes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {data?.pedidos?.length > 0 ? data.pedidos.slice(0, 6).map((p, index) => (
                  <TableRow key={p.id_pedido || p._id || index} className="border-b border-white/5">
                    <TableCell className="py-4 pl-6 text-slate-200">{p.cliente?.nombre || 'Cliente Final'}</TableCell>
                    <TableCell><Badge variant="outline" className="border-(--accent) text-(--accent) text-[12px]">{p.estado}</Badge></TableCell>
                    <TableCell className="text-right pr-6 font-mono text-(--text)">
                      {formatearMoneda(p.total || p.monto || 0)}
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell className="text-center py-10 opacity-50">Sin pedidos</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MiniLista titulo="Ventas" items={data?.listas?.ventas} color="text-green-400" />
        <MiniLista titulo="Compras" items={data?.listas?.compras} color="text-orange-400" />
        <MiniLista titulo="Gastos Extra" items={data?.listas?.gastos} color="text-red-400" />
      </div>
    </div>
  )
}

const MiniLista = ({ titulo, items = [], color }) => (
  <Card className="bg-(--background-trans) border-none shadow-lg">
    <CardHeader className="py-4 border-b border-white/5 text-lg text-(--accent-dimmed)">
      <CardTitle className="text-base font-bold">{titulo}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 pt-4">
      {items && items.length > 0 ? items.map((i, index) => (
        <div key={i.id_venta || i.id_gasto || i._id || index} className="flex justify-between items-center text-sm">
          <span className="truncate max-w-[140px] text-slate-300">{i.descripcion || 'Sin descripción'}</span>
          <span className={`font-mono font-bold ${color}`}>{formatearMoneda(i.monto || i.total || 0)}</span>
        </div>
      )) : <p className="text-xs text-muted-foreground italic text-center py-2">Sin movimientos</p>}
    </CardContent>
  </Card>
)