const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, 'user_modules.js');
const FS_ERR_MSG = 'An error occurred when writing the modules in lek-dir-object. The error is related to the file system.';

const writeJavascript = async paths => {
    const promise = new Promise((resolve) => {

        const requires = paths.map(({ name, path }) => `const ${name} = require("${path}");`).join('\n');
        const exports = `module.exports = {\n${paths.map(({name}) => `\t${name},\n`).join('')}};`;
        const newData = [ requires, '\n\n', exports ].join('');

        fs.writeFile(filename, newData, (err) => {
            if (err) throw new Error(FS_ERR_MSG);
            else resolve(filename);
        });

    });

    return await promise;
}

module.exports = writeJavascript;
