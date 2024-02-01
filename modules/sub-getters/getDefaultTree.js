const { readDirectories, writeJavascript, constructTree } = require('../sub-modules');


const getDefaultTree = async (directory, instance_id) => {

    const paths = await readDirectories(directory, false);
    return await writeJavascript(paths, instance_id).then(() => constructTree(paths, directory));

};
module.exports = getDefaultTree;