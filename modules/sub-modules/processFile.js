const path = require('path');

const processFile = async (file, directory) => {
    const filePath = path.join(directory, file.name);
    const fileNameWithoutExtension = path.parse(file.name).name;
    return { [fileNameWithoutExtension]: require(filePath) };
}

module.exports = processFile;
