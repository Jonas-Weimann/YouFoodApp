import db from '../../database/db.js'
class PedidosDao {
    constructor(database){
        this.db = database
    }
    create = async (pedidoData) => {
        try {
            const {id_cliente, fecha_entrega, items } = pedidoData
            return await this.db.begin(async (db) =>{
                const [cliente] = await this.db`SELECT particular FROM clientes WHERE id_cliente = ${id_cliente}`
                const factorRecargo = cliente.particular ? 1.05 : 1.0 
                let montoTotal = 0
                const itemsProcesados = []

                for (const item of items) {
                const [prod] = await this.db`SELECT precio FROM productos WHERE id_producto = ${item.id_producto}`;
                const precioConRecargo = prod.precio * factorRecargo;
                const subtotal = item.cantidad * precioConRecargo;
                
                montoTotal += subtotal;
                itemsProcesados.push({
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: precioConRecargo
                });
            }

            const [pedido] = await this.db`
                INSERT INTO pedidos (id_cliente, fecha_entrega, monto, estado)
                VALUES (${id_cliente}, ${fecha_entrega}, ${montoTotal}, 'Pendiente')
                RETURNING id_pedido
            `;
            const lineasDetalle = itemsProcesados.map(item => ({
                id_pedido: pedido.id_pedido,
                ...item
            }));

            await this.db`INSERT INTO detalle ${this.db(lineasDetalle, 'id_pedido', 'id_producto', 'cantidad', 'precio_unitario')}`;

            return { id_pedido: pedido.id_pedido, monto: montoTotal }
            })
        } catch (error) {
            console.error("Error en PedidosDao.create:", error.message)
            throw error
        }
    }
    getAll = async () => {
        try {
            const pedidos = await this.db`
                SELECT 
                    p.*, 
                    -- Creamos el objeto cliente para que el front no se rompa
                    json_build_object(
                        'nombre', c.nombre
                    ) AS cliente
                FROM pedidos p
                JOIN clientes c ON p.id_cliente = c.id_cliente
                ORDER BY p.fecha_entrega DESC 
                LIMIT 50
            `
            return pedidos
        } catch (error) {
            console.error("Error en PedidosDao.getAll:", error.message)
            throw error
        }
    }
    getById = async (id) => {
        try {
            const [pedido] = await this.db`
                SELECT 
                    p.*, 
                    c.nombre AS cliente_nombre,
                    c.direccion AS cliente_direccion,
                    (
                        SELECT json_agg(det)
                        FROM (
                            SELECT 
                                d.cantidad, 
                                d.precio_unitario, 
                                d.subtotal,
                                pr.nombre AS producto_nombre,
                                pr.alias_facturacion
                            FROM detalle d
                            JOIN productos pr ON d.id_producto = pr.id_producto
                            WHERE d.id_pedido = p.id_pedido
                        ) det
                    ) AS detalles
                FROM pedidos p
                JOIN clientes c ON p.id_cliente = c.id_cliente
                WHERE p.id_pedido = ${id}
            `;

            return pedido || null;
        } catch (error) {
            console.error("Error en PedidosDao.getById:", error.message);
            throw error;
        }
    }
    getByDate = async (date) => {
        try {
            const pedidos = await this.db`
                SELECT 
                    p.id_pedido, 
                    p.fecha_entrega, 
                    p.monto, 
                    p.estado,
                    c.nombre AS cliente_nombre,
                    c.localidad AS cliente_localidad,
                    (
                        SELECT json_agg(d_json)
                        FROM (
                            SELECT 
                                det.cantidad, 
                                det.precio_unitario, 
                                prod.nombre AS producto_nombre
                            FROM detalle det
                            JOIN productos prod ON det.id_producto = prod.id_producto
                            WHERE det.id_pedido = p.id_pedido
                        ) d_json
                    ) AS detalles
                FROM pedidos p
                JOIN clientes c ON p.id_cliente = c.id_cliente
                WHERE DATE(p.fecha_entrega) = ${date}
                ORDER BY p.id_pedido DESC
            `;
            return pedidos;
        } catch (error) {
            console.error("Error en PedidosDao.getByDate:", error.message);
            throw error;
        }
    }
    getByRange = async (inicio, fin) => {
        try {

            const pedidos = this.db`
                SELECT 
                    p.id_pedido, 
                    p.fecha_entrega, 
                    p.monto, 
                    p.estado,
                    c.nombre AS cliente_nombre,
                    c.localidad AS cliente_localidad,
                    (
                        SELECT json_agg(d_json)
                        FROM (
                            SELECT 
                                det.cantidad, 
                                det.precio_unitario, 
                                prod.nombre AS producto_nombre
                            FROM detalle det
                            JOIN productos prod ON det.id_producto = prod.id_producto
                            WHERE det.id_pedido = p.id_pedido
                        ) d_json
                    ) AS detalles
                FROM pedidos p
                JOIN clientes c ON p.id_cliente = c.id_cliente
                WHERE DATE(p.fecha_entrega) BETWEEN ${inicio} AND ${fin}
                ORDER BY p.id_pedido DESC
            `
            return pedidos

        } catch (error) {
            console.error("Error en PedidosDao.getByRange:", error.message)
            throw error
        }
    }
    update = async (id, pedidoData) => {
        try {
            const updatedPedido = await this.db`UPDATE pedidos SET id_cliente = ${pedidoData.id_cliente}, fecha_entrega = ${pedidoData.fecha_entrega}, monto = ${pedidoData.monto} WHERE id_pedido = ${id} RETURNING *`
            return updatedPedido[0]
        } catch (error) {
            console.error("Error en PedidosDao.update:", error.message)
            throw error
        }
    }
    delete = async (id) => {
        try {
            await this.db`DELETE FROM pedidos WHERE id_pedido = ${id}`
            return true
        } catch (error) {
            console.error("Error en PedidosDao.delete:", error.message)
            throw error
        }
    }
    updateEstado = async (id, estado) => {
        try {
            const [updatedPedido] = await this.db`UPDATE pedidos SET estado = ${estado} WHERE id_pedido = ${id} RETURNING *`
            return updatedPedido || null
        } catch (error) {
            console.error("Error en PedidosDao.updateEstado:", error.message)
            throw error
        }
    }
}

export const pedidosDao = new PedidosDao(db)