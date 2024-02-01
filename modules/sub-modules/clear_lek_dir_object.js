const fs = require('fs');
const path = require('path');

const filename = path.join(__dirname, 'user_modules.js');

const firts_string = 'const objectExports = {};\n//SUPER_START\n//SUPER_END\nmodule.exports = objectExports;'

const clear_lek_dir_object = () =>{
    fs.writeFile(filename, firts_string, (err) => {
        if (err) throw new Error(FS_ERR_MSG);
        else resolve(filename);
    });
};

clear_lek_dir_object();