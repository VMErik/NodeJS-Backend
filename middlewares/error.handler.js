// Declaramos middlewaes que se utilizaran de forma global
function logErrors(err, req, res, next) {
    console.log('Log errors');
    console.log(err);
    next(err);
}

function errorHandler(err, req, res, next) {
    console.log('Error Handlers');

    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}


function boomErrorHandler(err, req, res, next) {
    console.log('Boom Error Handlers');
    // Si es un error de tipo boom
    if (err.isBoom) {
        const { output } = err;
        // Pasamos dentro de boom el status code y el payload para retornar el mensaje
        res.status(output.statusCode).json(output.payload);
    } else {
        // Si no es de tpo boom ejecutamos de forma normal
        next(err);
    }

}


module.exports = {
    logErrors,
    errorHandler,
    boomErrorHandler
}
