const path_node_module =  require('path');
const constructTree = (paths, principalDir) => {

  const moduloPath = path_node_module.resolve(__dirname, './user_modules.js');

  if(require.cache[moduloPath]) { delete require.cache[moduloPath] };

  const user_modules = require('./user_modules');
  const tree = {};

  paths.forEach(({ name, path }) => {

    const namePath = path.substring(principalDir.length);

    const splitedPath = namePath.split('/');
    if(splitedPath[0] === '') splitedPath.shift();
    let currentLevel = tree;

    splitedPath.slice(0, -1).forEach(part => {
      if (!currentLevel[part])
      {
        currentLevel[part] = {};
      }
      currentLevel = currentLevel[part];
    });

    const lastPart = path_node_module.basename(splitedPath[splitedPath.length - 1], '.js');
    currentLevel[lastPart] = user_modules[name];
  });

  return tree;
};

module.exports = constructTree;
  