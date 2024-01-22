const { readDirectory, processDirectory, processFile } = require('../sub-modules');
const getDefaultTree = async directory => {
    const tree = {};
    const files = await readDirectory(directory);

    await Promise.all(files.map(async file => {
        if (file.isDirectory()) {
            const result = await processDirectory(file, directory, getDefaultTree);
            if (result) {
                Object.assign(tree, result);
            }
        } else {
            Object.assign(tree, await processFile(file, directory));
        }
    }));

    return tree;
};
module.exports = getDefaultTree;