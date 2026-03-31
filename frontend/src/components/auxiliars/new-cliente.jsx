import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CirclePlus, Loader2 } from "lucide-react"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useClienteForm } from "@/hooks/use-cliente-form"

export const NewCliente = ({onClienteCreado}) => {
    const [open, setOpen] = useState(false);
    const { handleSubmit, isLoading } = useClienteForm(() => {setOpen(false); onClienteCreado()})

    const getFormData = () => {
        const form = document.getElementById("new-cliente-form")
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        data.particular = form.querySelector("#particular").checked
        return data
    }

    const onFormSubmit = (e) => {
        e.preventDefault(); // Detiene el envío si el 'required' no se cumple
        const data = getFormData();
        handleSubmit(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-dashed border-(--accent) text-(--accent) hover:bg-(--background-dimmed) transition-colors cursor-pointer">
                    <CirclePlus className="mr-2 size-4" /> Crear Cliente
                </Button>
            </DialogTrigger>
            
            <DialogContent className="bg-(--background) border-(--accent) text-(--text) w-lg animate-(--animation-fade-in)">
                <DialogHeader>
                    <DialogTitle>Crear Cliente</DialogTitle>
                    <DialogDescription>Completa los datos del nuevo cliente.</DialogDescription>
                </DialogHeader>
                <form id="new-cliente-form" onSubmit={onFormSubmit}>

                <FieldGroup>

                    <Field>
                        <FieldLabel htmlFor="nombre" required>Nombre:</FieldLabel>
                        <Input placeholder="Nombre del cliente" id="nombre" name="nombre" required={true}/>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="direccion">Dirección:</FieldLabel>
                        <Input placeholder="Dirección del cliente" id="direccion" name="direccion" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="localidad">Localidad:</FieldLabel>
                        <Input placeholder="Localidad del cliente" id="localidad" name="localidad" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="horarios">Horarios:</FieldLabel>
                        <Input placeholder="Horarios de entrega" id="horarios" name="horarios" />
                    </Field>
                    <Field orientation="horizontal">
                        <Label htmlFor="particular">¿Particular?</Label>
                        <Input type="checkbox" id="particular" name="particular" className="h-4 w-4"/>
                    </Field>
                    
                </FieldGroup>
                </form>
                <DialogFooter>
                    <div className="flex gap-2">
                    <Button form="new-cliente-form" type="submit" disabled={isLoading} className="bg-(--accent) cursor-pointer py-4 text-(--background)">
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Crear Cliente"}
                    </Button>
                    <Button variant="ghost" onClick={() => setOpen(false)} disabled={isLoading} className="cursor-pointer py-4 border border-(--accent)">Cancelar</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}