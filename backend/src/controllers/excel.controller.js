import fs from 'fs';
import json2xls from 'json2xls';

export const exportToXls = async (req, res) => {
    try {
        // Obtener los datos de la solicitud
        const { data, fileName } = req.body; // data: Json, fileName: String

        // Obtener la fecha actual en un formato legible
        const currentDate = new Date().toISOString().replace(/:/g, '-');

        // Crear el nombre del archivo combinando el nombre proporcionado por el usuario y la fecha actual
        const fullFileName = `${fileName}_${currentDate}.xlsx`;

        // Convertir el objeto JSON a un archivo XLS
        const xls = json2xls(data);

        // Guardar el archivo XLS de manera asincrónica
        await fs.promises.writeFile(fullFileName, xls, 'binary');

        // Enviar el archivo XLS como respuesta
        res.download(fullFileName);
    } catch (error) {
        // En caso de un error, responder con un código de error 500 y un mensaje de error.
        res.status(500).json({
            errors: [error.message],
        });
    }
};
