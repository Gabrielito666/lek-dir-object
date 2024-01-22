const { getDefaultTree, getSpecificTree } = require('./sub-getters');
const getTree = async context => {
    switch (context.mode) {
        case 'default': return getDefaultTree(context.directory);
        case 'specific': return getSpecificTree(context.directory, context.collectItems);
        default: return getDefaultTree(context.directory);
    }
};

module.exports = getTree;