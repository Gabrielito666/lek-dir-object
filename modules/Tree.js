const path = require('path');
const { constructTree, readDirectories } = require('./sub-modules');

const verifiqueJS = item => item.endsWith(".js") ? item : (item + '.js')

class Tree{
    constructor(route, root, spesificItems = false, onCreate){

        this.pathsAreReady = false;
        this.rootPath = root ? root : (module.parent.filename ? path.dirname(module.parent.filename) : '.');

        if(spesificItems)
        {
            if(Array.isArray) this.collectItems = spesificItems.map(verifiqueJS);
            else this.collectItems = verifiqueJS(spesificItems);
        }else
        {
            this.collectItems = false
        }
        
        this.directory = path.isAbsolute( route ) ? route : path.resolve(this.rootPath, route);
        this.tree = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });

        this.tree.then(tree => { onCreate(tree) });
    };

    async getPaths(event){ 
        this.paths = await readDirectories(this.directory, this.collectItems);
        this.pathsAreReady = true;
        event();
    };
    constructTree(){
        this.resolve(constructTree(this.paths, this.directory));
    };
}
module.exports = Tree;