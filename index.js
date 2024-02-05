const Tree = require('./modules/Tree');
const getTrees = require('./modules/getTrees');

class LekDirObject{
    constructor(){
        this.trees = [];
    }
    createTree(route, root){
        const theTree = new Tree(route, root);
        this.trees.push(theTree);
        return theTree;
    };
    async initialize(){ await getTrees(this.trees) };
};

module.exports = LekDirObject;