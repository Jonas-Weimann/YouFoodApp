import { rrhhDao } from "../daos/rrhh.dao.js";

class RrhhService {
    constructor(dao){
        this.dao = dao
    }
    getAllEmpleados = async () => {
        try{
            const empleados = await this.dao.getAllEmpleados();
            return empleados;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getEmpleadoById = async (id) => {
        try {
            const empleado = await this.dao.getEmpleadoById(id);
            return empleado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getEmpleadoBySector = async (sector) => {
        try {
            const empleados = await this.dao.getEmpleadoBySector(sector);
            return empleados;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    createEmpleado = async (empleadoData) => {
        try {
            const newEmpleado = await this.dao.createEmpleado(empleadoData);
            return newEmpleado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    updateEmpleado = async (id, empleadoData) => {
        try {
            const updatedEmpleado = await this.dao.updateEmpleado(id, empleadoData);
            return updatedEmpleado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    deleteEmpleado = async (id) => {
        try {
            const deleted = await this.dao.deleteEmpleado(id);
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const rrhhService = new RrhhService(rrhhDao)