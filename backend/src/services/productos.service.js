import { productosDao } from "../daos/productos.dao.js";
class ProductosService {
    constructor(dao){
        this.dao = dao
    }
    getAllProductos = async () => {
        try {
            const productos = await this.dao.getAllProductos();
            return productos;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getProductoById = async (id) => {
        try {
            const producto = await this.dao.getProductoById(id);
            return producto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getProductosByCategoria = async (categoria) => {
        try {
            const productos = await this.dao.getProductosByCategoria(categoria);
            return productos;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    createProducto = async (productoData) => {
        try {
            const newProducto = await this.dao.createProducto(productoData);
            return newProducto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    updateProducto = async (id, productoData) => {
        try {
            const updatedProducto = await this.dao.updateProducto(id, productoData);
            return updatedProducto;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    deleteProducto = async (id) => {
        try {
            const deleted = await this.dao.deleteProducto(id);
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const productosService = new ProductosService(productosDao)