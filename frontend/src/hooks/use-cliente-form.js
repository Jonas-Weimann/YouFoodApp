import { useState } from "react"
import { clientesService } from "@/services/clientes.service"
import { toast } from "sonner"

export const useClienteForm = (onSuccess) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData) => {
        setIsLoading(true)
        try {
            await clientesService.create(formData)
            toast.success("Cliente creado")
            if (onSuccess) onSuccess()
        } catch (err) {
    console.log(formData)
            console.error("Error al crear cliente", err)
            toast.error("Error al crear cliente")
        } finally {
            setIsLoading(false)
        }
    }
    return { handleSubmit, isLoading }
}