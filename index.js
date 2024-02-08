const Tree = require('./modules/Tree');
const writeJavascript = require('./modules/sub-modules/writeJavascript');

const lekDirObject = () => {

    const trees = [];

    const lookAndWrite = () => {

        const ready_trees = trees.filter(t => t.pathsAreReady);
        const ready_paths = ready_trees.map(t => t.paths).reduce((acc, arr) => [...acc, ...arr], []);
    
        writeJavascript(ready_paths).then(() => { ready_trees.forEach(tree => { tree.constructTree() }) });
    }

    const createTree = ({ route, root, spesificFiles = false, onCreate = () => {} }) => {
        const theTree = new Tree(route, root, spesificFiles, onCreate);
        trees.push(theTree);
        theTree.getPaths(lookAndWrite);
        return theTree.tree;
    };

    return createTree;
};

module.exports = lekDirObject;