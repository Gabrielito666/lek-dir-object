const { readDirectories, writeJavascript, constructTree } = require('../sub-modules');


const getSpesificTree = async (directory, collectItems, instance_id) => {

    const paths = await readDirectories(directory, collectItems);
    return await writeJavascript(paths, instance_id).then(() => constructTree(paths, directory));

};
module.exports = getSpesificTree;