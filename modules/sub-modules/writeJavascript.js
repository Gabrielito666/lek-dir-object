const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, 'user_modules.js');
const FS_ERR_MSG = 'an error occurred when writing the modules in lek-dir-object. the error is related to the file system.'

const writeJavascript = async paths => {
    
    const promise = new Promise((resolve) => {

        const stringRequires = paths.map(({name, path}) => `const ${ name } = require("${ path }");\n`).join('');
        const stringExports = `module.exports = {\n\t${ paths.map(({name}) => name).join(',\n\t') }\n};`
    
        const content = [ stringRequires, stringExports ].join('\n');
    
        fs.writeFile(filename, content, (err) => {
            if (err) throw (new Error(FS_ERR_MSG))
            else resolve(filename);
        });
    });

    return await promise;
}
module.exports = writeJavascript;