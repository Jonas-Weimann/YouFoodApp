import sql from './db.js'

async function createTables() {
    try {
        const schema = await sql.file('./schema.sql')
    } catch (error) {
        console.error('Error al crear las tablas:', error)
    } finally {
        await sql.end()
    }
}

async function insertData(){
    try {
        const schema = await sql.file('./values.sql')
    } catch (error) {
        console.error('Error al insertar datos:', error)
    } finally {
        await sql.end()
    }
}

async function selectData(){
    try{
        const result = await sql`SELECT * FROM clientes`
        console.log('Datos seleccionados:', result)
    } catch (error) {
        console.error('Error al seleccionar datos:', error)
    } finally {
        await sql.end()
    }
}


createTables()
insertData()
selectData()
