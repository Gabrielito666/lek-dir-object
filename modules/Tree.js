const path = require('path');
const { constructTree, readDirectories } = require('./sub-modules');

class Tree{
    constructor(route, root){

        this.rootPath = root ? root : (module.parent.filename ? path.dirname(module.parent.filename) : '.');
        this.mode = 'default';
        this.collectItems = false;
        this.directory = path.isAbsolute( route ) ? route : path.resolve( this.rootPath, route );
        this.tree = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
    setSpesificMode(collectItems){
        this.mode = 'specific';
        this.collectItems = collectItems.map(ci => `${ ci }.js`);
        return this;
    }
    setDefaultMode(){
        this.mode = 'default';
        this.collectItems = false;
        return this;
    }
    async getPaths(){
        this.paths = await readDirectories(this.directory, this.collectItems);
        return this.paths;
    };
    constructTree(){ this.resolve(constructTree(this.paths, this.directory)) };
}
module.exports = Tree;