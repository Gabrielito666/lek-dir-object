const path = require('path');
const processDirectory = async (file, directory, treeFunction, collectItems) => {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
        const subtree = await treeFunction(filePath, collectItems);
        if (Object.keys(subtree).length > 0) {
            return { [file.name]: subtree };
        }
    }
    return null;
}
module.exports = processDirectory;