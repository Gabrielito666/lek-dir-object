const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, 'user_modules.js');
const FS_ERR_MSG = 'An error occurred when writing the modules in lek-dir-object. The error is related to the file system.';

const writeJavascript = async (paths, instance_id) => {
    const promise = new Promise((resolve) => {
        const stringInstanceId = `//${instance_id}`;
        const stringEnd = '//end';
        const stringRequires = paths.map(({name, path}) => `objectExports.${name} = require("${path}");\n`).join('');

        const content = `${stringInstanceId}\n${stringRequires}${stringEnd}`;

        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) throw new Error(FS_ERR_MSG);

            const superRegex = /\/\/SUPER_START[\s\S]*?\/\/SUPER_END/;
            let superContent = data.match(superRegex)[0];

            const regex = new RegExp(`\/\/${instance_id}[\\s\\S]*?\/\/end`, 'g');

            if (superContent.match(regex)) {
                superContent = superContent.replace(regex, content);
            } else {
                superContent = superContent.replace('//SUPER_END', `\n${content}\n\n//SUPER_END`);
            }

            newData = data.replace(superRegex, superContent);

            fs.writeFile(filename, newData, (err) => {
                if (err) throw new Error(FS_ERR_MSG);
                else resolve(filename);
            });
        });
    });

    return await promise;
}

module.exports = writeJavascript;
