import { clienteService } from "../services/clientes.service.js";

class ClientesController {
    constructor(service) {
        this.service = service;
    }

    getAllClientes = async (req, res) => {
        try {
            const clientes = await this.service.getAllClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    getClienteById = async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await this.service.getClienteById(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    createCliente = async (req, res) => {
        try {
            const cliente = await this.service.createCliente(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    updateCliente = async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await this.service.updateCliente(id, req.body);
            res.json(cliente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    deleteCliente = async (req, res) => {
        try {
            const { id } = req.params;
            await this.service.deleteCliente(id);
            res.json({ mensaje: 'Cliente eliminado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const clientesController = new ClientesController(clienteService);