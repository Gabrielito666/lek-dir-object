const { writeJavascript } = require("./sub-modules");

const getTrees = async trees => {
    const resolveDirectories = await Promise.all(trees.map(async tree => await tree.getPaths()))
    const paths = resolveDirectories.reduce((acc, arr) => [ ...acc, ...arr ], []);
    writeJavascript(paths).then(() => { trees.forEach(tree => { tree.constructTree() }) });
};

module.exports = getTrees;