import db from "../../database/db.js"

class ProductosDao {
    constructor(db){
        this.db = db
    }
    getAllProductos = async () => {
        try {
            const productos = await this.db`SELECT * FROM productos ORDER BY id_producto`;
            return productos;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getProductoById = async (id) => {
        try {
            const producto = await this.db`SELECT * FROM productos WHERE id_producto = ${id}`;
            return producto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getProductosByCategoria = async (categoria) => {
        try {
            const productos = await this.db`SELECT * FROM productos WHERE categoria = ${categoria} ORDER BY id_producto`;
            return productos;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    createProducto = async (productoData) => {
        try {
            const newProducto = await this.db`INSERT INTO productos (nombre, categoria, alias_facturacion, precio) VALUES (${productoData.nombre}, ${productoData.categoria}, ${productoData.alias_facturacion}, ${productoData.precio}) RETURNING *`;
            return newProducto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    updateProducto = async (id, productoData) => {
        try {
            const updatedProducto = await this.db`UPDATE productos SET nombre = ${productoData.nombre}, categoria = ${productoData.categoria}, alias_facturacion = ${productoData.alias_facturacion}, precio = ${productoData.precio} WHERE id_producto = ${id} RETURNING *`;
            return updatedProducto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    deleteProducto = async (id) => {
        try {
            const deleted = await this.db`DELETE FROM productos WHERE id_producto = ${id} RETURNING *`;
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const productosDao = new ProductosDao(db)