const { getDefaultTree, getSpecificTree } = require('./sub-getters');
const getTree = async context => {
    switch (context.mode) {
        case 'default': return getDefaultTree(context.directory, context.id);
        case 'specific': return getSpecificTree(context.directory, context.collectItems, context.id);
        default: return getDefaultTree(context.directory, context.id);
    }
};

module.exports = getTree;