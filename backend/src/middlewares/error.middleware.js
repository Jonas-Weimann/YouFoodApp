export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";
    console.log(message)
    res.status(status).json({
        status: "error",
        message: message 
    });
}
