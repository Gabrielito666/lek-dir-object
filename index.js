const path = require('path');
const getTree = require('./modules');


class LekDirObject{
    constructor(route, root){
        this.rootPath = root ? root : (module.parent.filename ? path.dirname(module.parent.filename) : '.')
        this.mode = 'default';
        this.collectItems;
        this.directory = path.isAbsolute( route ) ? route : path.resolve( this.rootPath, route );
    }
    async initialize(){ this.tree = await getTree(this) };

    setSpesificMode(collectItems){
        this.mode = 'specific';
        this.collectItems = collectItems.map(ci => `${ ci }.js`);
        return this;
    }
    setDefaultMode(){
        this.mode = 'default'
        return this
    }
};

module.exports = LekDirObject;