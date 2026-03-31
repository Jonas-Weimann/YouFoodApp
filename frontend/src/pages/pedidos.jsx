import { usePedidosLogic } from "@/hooks/use-pedidos-page"
import { PedidosChart } from "@/components/auxiliars/pedidos-chart"
import { PedidosTable } from "@/components/auxiliars/pedidos-table"
import { Kpi } from "@/components/ui/kpi"
import { DatePickerWithRange } from "@/components/ui/date-picker-range"
import { NewPedido } from "@/components/ui/new-pedido"
import { Loader2, AlertCircle } from "lucide-react"
import { useAuthStore } from "@/hooks/use-auth"
import { useClientes } from "@/hooks/use-clientes"

export const PedidosPage = () => {
  const { user } = useAuthStore()
  const { 
    data, isLoading, isError, error, refetch, 
    pedidosMostrar, date, setDate, fetchPedidosRange, actualizarFecha 
  } = usePedidosLogic()
  const { isLoadingClientes, clientesFiltrados, setBusquedaCliente, refetchClientes } = useClientes()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState error={error} refetch={refetch} />

  return (
    <div className="space-y-6 animate-(--animation-fade-in)">
      <header>
        <h1 className="text-3xl font-bold text-(--text)">¡Hola, {user?.nombre?.split(' ')[0]}!</h1>
      </header>

      <Kpi title="Pedidos a entregar Hoy" color="text-green-500">{data.pedidosHoy}</Kpi>

      <PedidosChart data={data} pedidosHoy={data.pedidosHoy} />

      <div className="flex flex-row gap-5 w-full justify-between items-center">
        <DatePickerWithRange date={date} setDate={setDate} onSelect={fetchPedidosRange} />
        <NewPedido onPedidoCreado={refetch} clientes={clientesFiltrados} isLoadingClientes={isLoadingClientes} onClienteCreado={refetchClientes} setBusquedaCliente={setBusquedaCliente} />
      </div>

      <PedidosTable 
        pedidos={pedidosMostrar} 
        onUpdateFecha={actualizarFecha} 
        onUpdateStatus={refetch} 
      />
    </div>
  )
}

const LoadingState = () => (
  <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
    <Loader2 className="animate-spin text-(--accent) w-12 h-12" />
    <p className="opacity-50 animate-pulse">Cargando pedidos...</p>
  </div>
)

const ErrorState = ({ error, refetch }) => (
  <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <AlertCircle className="text-red-500 w-16 h-16" />
    <h2 className="text-xl font-bold">Ha ocurrido un error.</h2>
    <p className="text-muted-foreground">{error?.message || "Error de conexión"}</p>
    <button onClick={refetch} className="px-4 py-2 bg-(--accent) text-white rounded-lg">Reintentar</button>
  </div>
)