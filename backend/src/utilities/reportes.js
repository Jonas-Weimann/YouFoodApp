import { jsPDF } from "jspdf"
import { autoTable } from "jspdf-autotable"
import crypto from "crypto"
import { subirASupabase } from "../../database/supabaseClient.js"
import axios from "axios"

const logoUrl = "https://drive.usercontent.google.com/download?id=18Y24AWVXdYGnmYu52N11Alu0dzGmnTsB&authuser=0"


const getImageBase64 = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, 'binary')
        return `data:image/png;base64,${buffer.toString('base64')}`
    } catch (error) {
        console.error("Error descargando el logo:", error.message)
        return null
    }
}

export const crearArchivoReporte = async (tipo, data, inicio, fin) => {
    const doc = new jsPDF({orientation: 'p', unit: 'mm', format:'a4'})
    const pageWidth = doc.internal.pageSize.getWidth()

    const titulo = `Reporte de ${tipo}`
    const fecha = new Date().toLocaleDateString('es-AR')

    const imgData = await getImageBase64(logoUrl)
    if (imgData) {
        doc.addImage(imgData, 'PNG', 10, 10, 25, 25)
    }

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    const textWidth = doc.getTextWidth(titulo)
    const textX = (pageWidth / 2) - (textWidth / 2)
    doc.text(titulo, textX, 25)
    
    doc.setFontSize(12)
    const fechaInicio = new Date(inicio).toLocaleDateString("es-AR")
    const fechaFin = new Date(fin).toLocaleDateString("es-AR")
    const periodo = `Desde el ${fechaInicio} hasta el ${fechaFin}`
    const periodoWidth = doc.getTextWidth(periodo)
    const periodoTextX = (pageWidth / 2) - (periodoWidth / 2)
    doc.text(periodo, periodoTextX, 33)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Fecha: ${fecha}`, pageWidth - 10, 20, { align: 'right' })

    doc.setLineWidth(0.5)
    doc.line(10, 42, pageWidth - 10, 42)

    let currentY = 50
    
    const msg = "No hay datos para el rango seleccionado."
    const msgWidth = doc.getTextWidth(msg)
    const msgX = (pageWidth/2) - (msgWidth/2)

    switch (tipo) {
        case 'Saldo semanal' :
        case 'Saldo mensual' :
            if (!data || data.length === 0) {
                doc.text(msg, msgX, currentY)
                break
            }
            const mapearFilas = (lista) => lista.map(item => [
                item.id,
                new Date(item.fecha).toLocaleDateString('es-AR'),
                item.descripcion,
                `$${Number(item.monto).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
            ]);

            const { ventas, gastos, compras } = data;

            const totalVentas = ventas.reduce((acc, curr) => acc + Number(curr.monto), 0)
            const totalGastos = gastos.reduce((acc, curr) => acc + Number(curr.monto), 0)
            const totalCompras = compras.reduce((acc, curr) => acc + Number(curr.monto), 0)
            doc.setFontSize(12).setFont('helvetica', 'bold').text("DETALLE DE VENTAS", 10, currentY);
            autoTable(doc, {
                startY: currentY + 5,
                head: [['ID', 'Fecha', 'Descripción', 'Monto']],
                body: [...mapearFilas(ventas), [{ content: 'SUBTOTAL VENTAS', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } }, `$${totalVentas.toLocaleString('es-AR')}`]],
                headStyles: { fillColor: [46, 139, 87] },
            });

            currentY = doc.lastAutoTable.finalY + 15;
            doc.text("DETALLE DE GASTOS", 10, currentY);
            autoTable(doc, {
                startY: currentY + 5,
                head: [['ID', 'Fecha', 'Descripción', 'Monto']],
                body: [...mapearFilas(gastos), [{ content: 'SUBTOTAL GASTOS', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } }, `$${totalGastos.toLocaleString('es-AR')}`]],
                headStyles: { fillColor: [133, 24, 24] },
            });

            currentY = doc.lastAutoTable.finalY + 15;
            doc.text("DETALLE DE COMPRAS", 10, currentY);
            autoTable(doc, {
                startY: currentY + 5,
                head: [['ID', 'Fecha', 'Descripción', 'Monto']],
                body: [...mapearFilas(compras), [{ content: 'SUBTOTAL COMPRAS', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } }, `$${totalCompras.toLocaleString('es-AR')}`]],
                headStyles: { fillColor: [133, 24, 24] },
            });

            const saldoNeto = totalVentas - (totalGastos + totalCompras);
            currentY = doc.lastAutoTable.finalY + 20;

            doc.setFontSize(14)
            const finalTitle = "RESUMEN DE SALDO NETO"
            const finalTitleWidth = doc.getTextWidth(finalTitle)
            const finalTitleX = (pageWidth / 2 ) - (finalTitleWidth / 2)
            doc.text(finalTitle, finalTitleX, currentY)

            autoTable(doc, {
                startY: currentY + 5,
                head: [['Concepto', 'Monto']],
                body: [
                    ['(+) Total Ventas', `$${totalVentas.toLocaleString('es-AR')}`],
                    ['(-) Total Gastos', `$${totalGastos.toLocaleString('es-AR')}`],
                    ['(-) Total Compras', `$${totalCompras.toLocaleString('es-AR')}`],
                    [{ content: 'SALDO FINAL', styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }, 
                    { content: `$${saldoNeto.toLocaleString('es-AR')}`, styles: { fontStyle: 'bold', textColor: saldoNeto >= 0 ? [0, 100, 0] : [150, 0, 0] } }]
                ],
                theme: 'grid',
                styles: { fontSize: 11 },
                margin: { left: 60, right: 60 }
            });

            break
        case 'Stock' :
            if (!data || data.length === 0) {
                doc.text(msg, msgX, currentY)
                break
            }

            const stockColumn = ["ID", "Fecha", "Descripción", "Medio de Pago", "Monto"];
            const stockRows = data.map(compra => [
                compra.id_compra,
                new Date(compra.fecha_compra).toLocaleDateString('es-AR'),
                compra.descripcion,
                compra.medio_pago,
                `$${(compra.monto*1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
            ]);

            autoTable(doc, {
                startY: currentY,
                head: [stockColumn],
                body: stockRows,
                theme: 'striped',
                headStyles: { fillColor: [133, 24, 24] },
                styles: { fontSize: 9, halign: 'center' },
                columnStyles: {
                    4: { halign: 'right' },
                },
                margin: { left: 10, right: 10 },
            });
            break
        case 'Pedidos' :
            if (!data || data.length === 0) {
                doc.text(msg, msgX, currentY)
                break
            }

            const tableColumn = ["ID", "Cliente", "Localidad", "Estado", "Fecha de Entrega", "Monto"];
            
            const tableRows = data.map(pedido => [
                pedido.id_pedido,
                pedido.cliente_nombre,
                pedido.cliente_localidad,
                pedido.estado,
                (new Date(pedido.fecha_entrega)).toLocaleDateString('es-AR'),
                `$${pedido.monto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
            ]);

            autoTable(doc, {
                startY: currentY,
                head: [tableColumn],
                body: tableRows,
                theme: 'striped',
                headStyles: { fillColor: [133, 24, 24] },
                styles: { fontSize: 9, halign: 'center' },
                columnStyles: {
                    5: { halign: 'right' },
                },
                margin: { left: 10, right: 10 },
            });
            break
        case 'Comisiones' :
            if (!data || data.length === 0) {
                doc.text(msg, msgX, currentY)
                break
            }
            const empleadoVentas = data.pop()

            const comisionesColumns = ["ID", "Cliente", "Localidad", "Estado", "Monto", "Fecha de Entrega", "Comisión"];
            const factorComision = 0.04
            let totalComisiones = 0
            const comisionesRows = data.map(pedido => {
                const comision = pedido.estado === "Cancelado" ? 0 : (pedido.monto * factorComision)
                totalComisiones += comision
                return [
                    pedido.id_pedido,
                    pedido.cliente_nombre,
                    pedido.cliente_localidad,
                    pedido.estado,
                    new Date(pedido.fecha_entrega).toLocaleDateString('es-AR'),
                    `$${(pedido.monto * 1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
                    `$${(comision).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                ];
            })

            autoTable(doc, {
                startY: currentY,
                head: [comisionesColumns],
                body: comisionesRows,
                theme: 'striped',
                headStyles: { fillColor: [133, 24, 24] },
                styles: { fontSize: 9, halign: 'center' },
                columnStyles: {
                    4: { halign: 'right' },
                },
                margin: { left: 10, right: 10 },
            });

            autoTable(doc, {
                startY: doc.lastAutoTable.finalY + 8,
                head: [['Sueldo Base', 'Comisiones', 'Total']],
                body: [[
                    `$${(empleadoVentas[0].sueldo * 1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
                    `$${(totalComisiones * 1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`,
                    `$${(empleadoVentas[0].sueldo * 1 + totalComisiones * 1).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                ]],
                theme: 'striped',
                headStyles: { fillColor: [133, 24, 24] },
                styles: { fontSize: 10, halign: 'center' },
                columnStyles: {
                    2: { halign: 'right', fontStyle: 'bold' },
                },
                margin: { left: 40, right: 40 },
            })
            break
    }

    const uid = crypto.randomUUID().split('-')[0];
    const filename = `reporte_${tipo.toLowerCase()}_${uid}.pdf`
    const pathLocal = `./temp/${filename}`
    doc.save(pathLocal)
    const urlReporte = await subirASupabase(pathLocal, filename)

    return urlReporte
}