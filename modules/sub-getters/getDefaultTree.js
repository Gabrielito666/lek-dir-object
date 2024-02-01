const { readDirectories, writeJavascript, constructTree } = require('../sub-modules');


const getDefaultTree = async directory => {

    const paths = await readDirectories(directory, false);
    return await writeJavascript(paths).then(() => constructTree(paths, directory));

};
module.exports = getDefaultTree;