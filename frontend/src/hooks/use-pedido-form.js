import { useState, useEffect } from "react"
import { addDays, format } from "date-fns"
import { toast } from "sonner"
import { productosService } from "@/services/productos.service"
import { pedidosService } from "@/services/pedidos.service"

export const usePedidoForm = (onSuccess) => {
    const [items, setItems] = useState([])
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        idCliente: null,
        fechaEntrega: addDays(new Date(), 1),
    })

    useEffect(() => {
        productosService.getAll().then(setProductos)
    }, [])

    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )

    const agregarProducto = (producto) => {
        const existeIndex = items.findIndex(i => i.id_producto === producto.id_producto)
        if (existeIndex !== -1) {
            actualizarCantidad(existeIndex, items[existeIndex].cantidad + 1)
        } else {
            setItems([...items, { ...producto, cantidad: 1, subtotal: producto.precio }])
        }
        setBusqueda("")
    }

    const actualizarCantidad = (index, nuevaCantidad) => {
        setItems(prev => prev.map((item, i) => 
            i === index ? { ...item, cantidad: nuevaCantidad, subtotal: nuevaCantidad * item.precio } : item
        ))
    }

    const quitarProducto = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    const totalPedido = items.reduce((acc, item) => acc + Number(item.subtotal), 0)

    const handleSubmit = async () => {
        if (!formData.idCliente) return toast.error("Selecciona un cliente")
        if (items.length === 0) return toast.error("Añade al menos un producto")

        setIsLoading(true)
        try {
            await pedidosService.create({
                id_cliente: formData.idCliente,
                fecha_entrega: format(formData.fechaEntrega, "yyyy-MM-dd"),
                items: items.map(i => ({ id_producto: i.id_producto, precio_unitario: i.precio, cantidad: i.cantidad }))
            })
            toast.success("Pedido creado")
            setItems([])
            if (onSuccess) onSuccess()
        } catch (err) {
            console.error("Error al crear pedido", err)
            toast.error("Error al crear pedido")
        } finally {
            setIsLoading(false)
        }
    }

    const actualizarPrecio = (index, nuevoPrecio) => {
    const nuevosItems = [...items];
    const item = nuevosItems[index];

    const precioNumerico = Number(nuevoPrecio) || 0;

    nuevosItems[index] = {
        ...item,
        precio: precioNumerico,
        subtotal: precioNumerico * item.cantidad
    };

    setItems(nuevosItems);
};

    return {
        formData, setFormData,
        items, productosFiltrados,
        busqueda, setBusqueda,
        isLoading, totalPedido,
        agregarProducto, actualizarCantidad, quitarProducto, handleSubmit, actualizarPrecio
    }
}