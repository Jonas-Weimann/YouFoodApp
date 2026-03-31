import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { CirclePlus } from "lucide-react"

export const PedidoProductSelector = ({ productos, onSelect, onSearch, busqueda }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (val) => {
        const prod = productos.find(p => p.nombre === val);
        if (prod) {
            onSelect(prod);
            setOpen(false); 
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-dashed border-(--accent) text-(--accent) hover:bg-(--background-dimmed) transition-colors cursor-pointer">
                    <CirclePlus className="mr-2 size-4" /> Añadir Producto
                </Button>
            </DialogTrigger>
            
            <DialogContent className="bg-(--background) border-(--accent) text-(--text) w-lg">
                <DialogHeader>
                    <DialogTitle>Seleccionar Producto</DialogTitle>
                    <DialogDescription>Busca y selecciona un producto para añadir al pedido.</DialogDescription>
                </DialogHeader>

                <Combobox 
                    onValueChange={handleSelect} 
                    onInputValueChange={onSearch}
                >
                    <ComboboxInput placeholder="Escribe el nombre del producto..." />
                    <ComboboxContent>
                        <ComboboxList className="bg-(--background) border-(--accent) text-(--text) max-h-60 overflow-y-auto scrollbar-style">
                            {productos.length > 0 ? (
                                productos.map(p => (
                                    <ComboboxItem 
                                        key={p.id_producto} 
                                        value={p.nombre}
                                        className="aria-selected:bg-(--accent-trans) flex justify-between p-3 cursor-pointer"
                                    >
                                        <span>{p.nombre}</span>
                                        <span className="text-(--accent) font-mono text-xs">${p.precio}</span>
                                    </ComboboxItem>
                                ))
                            ) : (
                                <div className="p-4 text-center opacity-50 text-sm">
                                    No se encontraron productos con "{busqueda}"
                                </div>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}