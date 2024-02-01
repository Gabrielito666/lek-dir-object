const { readDirectories, writeJavascript, constructTree } = require('../sub-modules');


const getSpesificTree = async (directory, collectItems) => {

    const paths = await readDirectories(directory, collectItems);
    return await writeJavascript(paths).then(() => constructTree(paths, directory));

};
module.exports = getSpesificTree;