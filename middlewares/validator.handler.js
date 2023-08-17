const boom = require('@hapi/boom');

// No tienen el error pues son normales
function validatorHandler(schema, property) {
    // Retornamos un middleware dinamico
    return (req, res, next) => {
        // Obtenemos la informacion
        const data = req[property];
        // Validamos nuestra data contra el esquema, y va a buuscar todos los errores para mandarlos
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            // Generamos nuestro error de tipo boom y lo mandamos a los middlewaes de error
            next(boom.badRequest(error));
        } else {
            // Si no, solo que continue
            next();
        }
    };
}
// Exportamos nuestra funcion
module.exports = validatorHandler;
