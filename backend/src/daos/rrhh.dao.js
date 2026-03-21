import db from '../../database/db.js'
class RrhhDao {
    constructor(database){
        this.db = database
    }
    getAllEmpleados = async () => {
        try {
            const empleados = await this.db`SELECT * FROM empleados`;
            return empleados;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getEmpleadoById = async (id) => {
        try {
            const empleado = await this.db`SELECT * FROM empleados WHERE id_empleado = ${id}`;
            return empleado[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
    getEmpleadoBySector = async (sector) => {
        try {
            const empleados = await this.db`SELECT * FROM empleados WHERE sector = ${sector}`;
            return empleados;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    createEmpleado = async (empleadoData) => {
        try {
            const newEmpleado = await this.db`INSERT INTO empleados(nombre, sector, sueldo) VALUES (${empleadoData.nombre}, ${empleadoData.sector}, ${empleadoData.sueldo}) RETURNING *`;
            return newEmpleado;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    updateEmpleado = async (id, empleadoData) => {
        try {
            const updatedEmpleado = await this.db`UPDATE empleados SET nombre = ${empleadoData.nombre}, sector = ${empleadoData.sector}, sueldo = ${empleadoData.sueldo} WHERE id_empleado = ${id} RETURNING *`;
            return updatedEmpleado[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }
    deleteEmpleado = async (id) => {
        try {
            await this.db`DELETE FROM empleados WHERE id_empleado = ${id}`;
            return true;
        } catch (error) {            
            throw new Error(error.message);
        }
    }
}

export const rrhhDao = new RrhhDao(db)