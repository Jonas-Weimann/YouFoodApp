import { useState, useEffect } from "react"
import { clientesService } from "@/services/clientes.service"

export const useClientes = () => {
  const [clientes, setClientes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [busquedaCliente, setBusquedaCliente] = useState("")

  const fetchClientes = async () => {
    setIsLoading(true)
    try {
      const data = await clientesService.getAll()
      setClientes(data)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  const clientesFiltrados = clientes.filter(c => c.nombre.toLowerCase().includes(busquedaCliente.toLowerCase()))

  return { clientes, isLoadingClientes: isLoading, error, setBusquedaCliente, refetchClientes: fetchClientes, clientesFiltrados }}