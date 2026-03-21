import { rrhhService } from "../services/rrhh.service.js";

class RrhhController {
    constructor(service){
        this.service = service
    }
    getAllEmpleados = async (req, res) => {
        try {
            const empleados = await this.service.getAllEmpleados();
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getEmpleadoById = async (req, res) => {
        try {
            const { id } = req.params;
            const empleado = await this.service.getEmpleadoById(id);
            if (empleado) {
                res.status(200).json(empleado);
            } else {
                res.status(404).json({ error: "Empleado no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    getEmpleadoBySector = async (req, res) => {
        try {
            const { sector } = req.params;
            const empleados = await this.service.getEmpleadoBySector(sector);
            res.status(200).json(empleados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    createEmpleado = async (req, res) => {
        try {
            const empleadoData = req.body;
            const newEmpleado = await this.service.createEmpleado(empleadoData);
            res.status(201).json(newEmpleado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    updateEmpleado = async (req, res) => {
        try {
            const { id } = req.params;
            const empleadoData = req.body;
            const updatedEmpleado = await this.service.updateEmpleado(id, empleadoData);
            res.status(200).json(updatedEmpleado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    deleteEmpleado = async (req, res) => {
        try {
            const { id } = req.params;
            await this.service.deleteEmpleado(id);
            res.status(200).json({ message: "Empleado eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

export const rrhhController = new RrhhController(rrhhService)