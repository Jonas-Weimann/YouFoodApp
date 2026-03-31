import { useState, useEffect } from "react"
import { clientesService } from "@/services/clientes.service"

export const useClientes = () => {
  const [clientes, setClientes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return { clientes, isLoading, error, refetch: fetchClientes }
}