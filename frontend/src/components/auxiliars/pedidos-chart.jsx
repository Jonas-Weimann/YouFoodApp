import { Area, AreaChart, XAxis, ResponsiveContainer, Tooltip, YAxis, CartesianGrid } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const PedidosChart = ({ data, pedidosHoy }) => {
  const chartData = data?.grafico?.length > 0 ? data.grafico : [{ Día: 'Hoy', Cantidad: pedidosHoy || 0 }]

  return (
    <Card className="bg-(--background-trans) border shadow-xl border-(--accent)">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-(--accent-foreground)">Flujo Semanal</CardTitle>
      </CardHeader>
      <CardContent className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgb(78, 56, 58)" />
            <XAxis dataKey="Día" axisLine={false} tickLine={false} tick={{ fill: 'gray', fontSize: 12 }} tickMargin={8} tickFormatter={(v) => v.slice(0, 3)} />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
              contentStyle={{ backgroundColor: '#1a1a1a', color: 'salmon', border: 'none', borderRadius: 16 }} 
            />
            <defs>
              <linearGradient id="fillPedidos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="var(--accent)" stopOpacity={0.8} />
                <stop offset="85%" stopColor="var(--background)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area dataKey="Cantidad" type="natural" fill="url(#fillPedidos)" stroke="var(--ring)" stackId="a" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}