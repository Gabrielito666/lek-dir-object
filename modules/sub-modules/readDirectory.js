const fs = require('fs').promises;

const readDirectory = async directory => {
    try {
        return await fs.readdir(directory, { withFileTypes: true });
    } catch (error) {
        console.error("Error al leer el directorio:", error);
        return [];
    }
}

module.exports = readDirectory;