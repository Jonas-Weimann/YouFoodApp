import { productosService } from "../services/productos.service.js";

class ProductosController {
    constructor(service){
        this.service = service
    }
    getAllProductos = async (req, res) => {
        try {
            const productos = await this.service.getAllProductos();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getProductoById = async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await this.service.getProductoById(id);
            if (producto) {
                res.status(200).json(producto);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getProductosByCategoria = async (req, res) => {
        try {
            const { categoria } = req.params;
            const productos = await this.service.getProductosByCategoria(categoria);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    createProducto = async (req, res) => {
        try {
            const productoData = req.body;
            const newProducto = await this.service.createProducto(productoData);
            res.status(201).json(newProducto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    updateProducto = async (req, res) => {
        try {
            const { id } = req.params;
            const productoData = req.body;
            const updatedProducto = await this.service.updateProducto(id, productoData);
            if (updatedProducto) {
                res.status(200).json(updatedProducto);
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    deleteProducto = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.service.deleteProducto(id);
            if (deleted) {
                res.status(200).json({ message: "Producto eliminado correctamente" });
            } else {
                res.status(404).json({ error: "Producto no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const productosController = new ProductosController(productosService)