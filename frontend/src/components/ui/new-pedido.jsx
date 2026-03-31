import { usePedidoForm } from "@/hooks/use-pedido-form"
import { PedidoItemsTable } from "@/components/auxiliars/new-pedido-table"
import { PedidoProductSelector } from "@/components/auxiliars/new-pedido-product-selector"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { DatePicker } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"
import { Loader2, CirclePlus } from "lucide-react"
import { useState } from "react"
import { NewCliente } from "@/components/auxiliars/new-cliente"

export const NewPedido = ({ clientes, onPedidoCreado, onClienteCreado, isLoadingClientes, setBusquedaCliente }) => {
    const [open, setOpen] = useState(false)
    const {
        formData, setFormData, items, productosFiltrados,
        setBusqueda, isLoading, totalPedido,
        agregarProducto, actualizarCantidad, actualizarPrecio, quitarProducto, handleSubmit
    } = usePedidoForm(() => {setOpen(false); onPedidoCreado()})

    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-dashed cursor-pointer bg-(--background) hover:bg-(--background-dimmed) border-(--accent) text-(--accent)">
                    <CirclePlus className="mr-2" /> Nuevo Pedido
                </Button>
            </DialogTrigger>
            
            <DialogContent className="w-2.5xl bg-(--background) text-(--text) animate-(--animation-fade-in)">
                <DialogHeader className="text-lg font-semibold text-center">Nuevo Pedido</DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    <Field className="flex-row items-center gap-2">
                        <FieldLabel>Cliente:</FieldLabel>
                        <NewCliente onClienteCreado={onClienteCreado} isLoading={isLoadingClientes}/>
                        <Combobox onValueChange={(v) => setFormData(p => ({...p, idCliente: clientes.find(c => c.nombre === v)?.id_cliente}))}>
                            <ComboboxInput placeholder="Buscar cliente..." onValueChange={setBusquedaCliente} className="text-(--accent)"/>
                            <ComboboxContent>
                                <ComboboxList className="max-h-60 overflow-y-auto scrollbar-style border border-(--accent) rounded-xl text-(--text) bg-(--background-trans)">
                                    {clientes?.map(c => <ComboboxItem key={c.id_cliente} value={c.nombre} className="aria-selected:text-(--accent)" >{c.nombre}</ComboboxItem>)}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </Field>
                    
                    <Field className="flex-row items-center gap-2">
                        <FieldLabel>Fecha:</FieldLabel>
                        <DatePicker selected={formData.fechaEntrega} onSelect={(d) => setFormData(p => ({...p, fechaEntrega: d}))} />
                    </Field>
                </div>

                <PedidoItemsTable 
                    items={items} 
                    onUpdateQty={actualizarCantidad} 
                    onRemove={quitarProducto} 
                    onUpdatePrice={actualizarPrecio}
                />

                <PedidoProductSelector 
                    productos={productosFiltrados} 
                    onSelect={agregarProducto} 
                    onSearch={setBusqueda} 
                />

                <DialogFooter className="flex flex-col items-center border-t gap-15 pt-4">
                    <div className="text-center mb-4">
                        <p className="text-sm opacity-50 uppercase font-bold">Total</p>
                        <p className="text-3xl font-bold text-(--accent)">$ {totalPedido.toLocaleString('es-AR')}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setOpen(false)} disabled={isLoading} className="cursor-pointer py-4 border border-(--accent)">Cancelar</Button>
                        <Button onClick={handleSubmit} disabled={isLoading} className="bg-(--accent) cursor-pointer py-4 text-(--background)">
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Confirmar Pedido"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}