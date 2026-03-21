export const hoy = () => {
    const fecha = new Date()
    const dia = fecha.getDate()
    const mes = fecha.getMonth() + 1
    const año = fecha.getFullYear()
    const hoy = `${dia}-${mes}-${año}`
    return hoy
}