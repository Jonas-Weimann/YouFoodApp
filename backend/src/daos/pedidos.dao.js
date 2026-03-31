import db from '../../database/db.js'
class PedidosDao {
    constructor(database){
        this.db = database
    }
    baseQuery() {
        return this.db`
            SELECT 
                p.id_pedido, 
                p.id_cliente, 
                p.fecha_entrega, 
                p.monto, 
                p.estado,
                json_build_object(
                    'nombre', c.nombre,
                    'localidad', c.localidad,
                    'direccion', c.direccion
                ) AS cliente
            FROM pedidos p
            JOIN clientes c ON p.id_cliente = c.id_cliente
        `;
    }

    create = async (pedidoData) => {
        try {
            const {id_cliente, fecha_entrega, items } = pedidoData
            return await this.db.begin(async (db) =>{
                const [cliente] = await db`SELECT particular FROM clientes WHERE id_cliente = ${id_cliente}`
                const factorRecargo = cliente.particular ? 1.05 : 1.0 
                let montoTotal = 0
                const itemsProcesados = []

                for (const item of items) {
                    let precioFinal;
                    if (item.precio_unitario) {
                        precioFinal = Number(item.precio_unitario)
                    } else {
                        const [prod] = await db`SELECT precio FROM productos WHERE id_producto = ${item.id_producto}`;
                        precioFinal = prod.precio * factorRecargo;
                    }
                const subtotal = item.cantidad * precioFinal;
                
                montoTotal += subtotal;
                itemsProcesados.push({
                    id_pedido: null,
                    id_producto: item.id_producto,
                    cantidad: item.cantidad,
                    precio_unitario: precioFinal
                });
                }

                const [pedido] = await this.db`
                    INSERT INTO pedidos (id_cliente, fecha_entrega, monto, estado)
                    VALUES (${id_cliente}, ${fecha_entrega}, ${montoTotal}, 'Pendiente')
                    RETURNING id_pedido
                `;
                const lineasDetalle = itemsProcesados.map(item => ({
                    ...item,
                    id_pedido: pedido.id_pedido
                }));

                await db`INSERT INTO detalle ${db(lineasDetalle, 'id_pedido', 'id_producto', 'cantidad', 'precio_unitario')}`;

                return await this.getById(pedido.id_pedido)
            })
        } catch (error) {
            console.error("Error en PedidosDao.create:", error.message)
            throw error
        }
    }
    getAll = async () => {
        try {
            return await this.db`
                ${this.baseQuery()}
                ORDER BY p.fecha_entrega DESC 
                LIMIT 50
            `;
        } catch (error) {
            console.error("Error en PedidosDao.getAll:", error.message)
            throw error
        }
    }
    getById = async (id) => {
        try {
            const [pedido] = await this.db`
                ${this.baseQuery()}
                WHERE p.id_pedido = ${id}
            `;

            if (!pedido) return null;

            // Agregamos los detalles solo en el GetById
            const detalles = await this.db`
                SELECT 
                    d.cantidad, 
                    d.precio_unitario, 
                    pr.nombre AS producto_nombre,
                    pr.alias_facturacion
                FROM detalle d
                JOIN productos pr ON d.id_producto = pr.id_producto
                WHERE d.id_pedido = ${id}
            `;
            
            return { ...pedido, detalles };
        } catch (error) {
            console.error("Error en PedidosDao.getById:", error.message);
            throw error;
        }
    }
    getByDate = async (date) => {
        try {
            return await this.db`
                ${this.baseQuery()} 
                WHERE DATE(p.fecha_entrega) = ${date}
                ORDER BY p.id_pedido DESC
            `;
        } catch (error) {
            console.error("Error en PedidosDao.getByDate:", error.message);
            throw error;
        }
    }

    getByRange = async (inicio, fin) => {
        try {
            return await this.db`
                ${this.baseQuery()}
                WHERE DATE(p.fecha_entrega) BETWEEN ${inicio} AND ${fin}
                ORDER BY p.id_pedido DESC
            `;
        } catch (error) {
            console.error("Error en PedidosDao.getByRange:", error.message)
            throw error
        }
    }

    update = async (id, pedidoData) => {
        try {
            await this.db`
                UPDATE pedidos 
                SET id_cliente = ${pedidoData.id_cliente}, 
                    fecha_entrega = ${pedidoData.fecha_entrega}, 
                    monto = ${pedidoData.monto} 
                WHERE id_pedido = ${id}
            `;
            return await this.getById(id);
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
            await this.db`UPDATE pedidos SET estado = ${estado} WHERE id_pedido = ${id}`
            return await this.getById(id);
        } catch (error) {
            console.error("Error en PedidosDao.updateEstado:", error.message)
            throw error
        }
    }
}

export const pedidosDao = new PedidosDao(db)