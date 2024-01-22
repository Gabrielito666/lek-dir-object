const { readDirectory, processDirectory, processFile } = require('../sub-modules');
const getSpecificTree = async (directory, collectItems) => {
    const tree = {};
    const files = await readDirectory(directory);

    await Promise.all(files.map(async file => {
        if (file.isDirectory()) {
            const result = await processDirectory(file, directory, getSpecificTree, collectItems);
            if (result) {
                Object.assign(tree, result);
            }
        } else {
            if (collectItems.includes(file.name)) {
                Object.assign(tree, await processFile(file, directory));
            }
        }
    }));

    return tree;
};

module.exports = getSpecificTree;