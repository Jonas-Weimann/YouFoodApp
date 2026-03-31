import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { QuantityStepper } from "@/components/ui/stepper"

export const PedidoItemsTable = ({ items, onUpdateQty, onRemove }) => (
    <div className="max-h-[40vh] overflow-y-auto border rounded-lg border-(--accent-trans)">
        <Table>
            <TableHeader>
                <TableRow className="bg-(--background-dimmed)">
                    <TableHead>Producto</TableHead>
                    <TableHead className="w-24 text-center">Precio</TableHead>
                    <TableHead className="w-32 text-center">Cantidad</TableHead>
                    <TableHead className="w-32 text-right">Subtotal</TableHead>
                    <TableHead className="w-10"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 opacity-50 italic">No hay productos</TableCell></TableRow>
                ) : (
                    items.map((item, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-medium">{item.nombre}</TableCell>
                            <TableCell className="text-center">${item.precio}</TableCell>
                            <TableCell className="flex justify-center py-2">
                                <QuantityStepper value={item.cantidad} onChange={(val) => onUpdateQty(idx, val)} />
                            </TableCell>
                            <TableCell className="text-right font-bold text-(--accent)">
                                ${Number(item.subtotal).toLocaleString('es-AR')}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => onRemove(idx)} className="text-destructive hover:bg-destructive/10">
                                    <Trash2 size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </div>
)