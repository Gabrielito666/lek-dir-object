# Lek-DirObject

`Lek-DirObject` is a Node.js module for creating a directory tree structure of JavaScript files. It supports two modes: default and specific.

Version 3.0.0 of lek-dir-object uses an improved system that allows webpack compatibility and the creation of multiple directory trees simultaneously.


## Installation

To install `Lek-DirObject`, use the following command:

```bash
npm install lek-dir-object
```

## Usage

Then you must import and instantiate the master instance of lek-dir-object. this instance must be instantiated only once.

then you can create trees from this instance with the getTree method.

```javascript
const lekDirObject = require('lek-dir-object');
const lek_dir_object_master = new lekDirObject();

const my_tree = lek_dir_object_master.createTree('./root/of/my/tree/folder', __dirname);

```
who knows the previous versions of lek-dir-object will find in this method the analogue to the old versions. the method receives a relative path and an absolute path to be created correctly. the second path is optional and if omitted it will take as root path the file from which the master instance is instantiated. i recommend to always put something __dirname as second parameter.

the Tree instance created with createTree has a .tree property. this property contains a promise that is resolved once the master instance is initialized. so when you have all your instances configured as you wish, use the initialize() method of the master instance and the tables will be resolved. ergo you will be able to access your tree from the tree with a simple await.

Your tree can be used in two different modes: default and specific.

### Default Mode

In default mode, your tree creates a tree structure that includes all JavaScript files in the specified directory and its subdirectories.

Example directory structure:

```directory
/rootPath/
    /things_1/
        /things_2/
            -file_1.js
            -file_2.js
            -file_3.js
        ...
        -file_4.js
        -file_5.js
    ...
    /file_3/
        -file_6.js
    ...
    file_7.js
...
```

```javascript

(async function(){
    const lekDirObject = require('lek-dir-object');
    const lek_dir_object_master = new lekDirObject();
    const my_tree = lek_dir_object_master.createTree('./root/of/my/tree/folder', __dirname);

    lek_dir_object_master.initialize();

    const theTree = await my_tree.tree;
    
    console.log(theTree);
})();


//the tree is an object like:
const tree = {
    things_1 : {
        things_2 : {
            file_1 : 'the_module_was_export_from_file_1',
            file_2 : 'the_module_was_export_from_file_2',
            file_3 : 'the_module_was_export_from_file_3'
        },
        file_4 : 'the_module_was_export_from_file_4',
        file_5 : 'the_module_was_export_from_file_5'
    },
    things_3 : {
        file_6 : 'the_module_was_export_from_file_6'
    }
    file_7 : 'the_module_was_export_from_file_7'
}

```
## Specific Mode
In specific mode, Lek-DirObject only includes files that match specified filenames in the tree structure.

Example directory structure:

```directory
/rootPath/
    /things_1/
        /things_2/
            elements.js
            options.js
            other_thing.js
        ...
        elements.js
        options.js
    ...
    /things_3/
        elements.js
    ...
    /things_4/
        other_thing.js
    ...
...
```

Example usage:

```javascript

(async function(){
    const lekDirObject = require('lek-dir-object');
    const lek_dir_object_master = new lekDirObject();
    const my_tree = lek_dir_object_master.createTree('./root/of/my/tree/folder', __dirname);
    
    my_tree.setSpesificMode(['elements', 'options'])

    lek_dir_object_master.initialize();

    const theTree = await my_tree.tree;
    
    console.log(theTree);
})();

//the tree is an object like:
const tree = {
    things_1 : {
        things_2 : {
            elements : 'the_module_was_export_from_elements',
            options : 'the_module_was_export_from_options'
        },
        elements : 'the_module_was_export_from_elements',
        options : 'the_module_was_export_from_options'  
    },
    things_3 : {
        elements : 'the_module_was_export_from_elements'
    }
}

```


### Spesifications

#### Exports
In the tree of nested folders you are going to create. be sure to export what you want to find in the resulting object and export it with module.exports since the package was conceived to receive commonJs.

#### Instance parameters

The constructor of the instantiation accepts two parameters... the first one you already know: the folder to analyze to construct the tree object. The second parameter is optional but can be useful. it represents the relative directory from which the first parameter will be read.

e.g:

if the first parameter is "./my_tree" and the second is "/home/my_username/my_project/"
then the application will resolve the path "/home/my_username/my_project/my_tree".

this second parameter by default uses the path of the file it is called from.

if you don't want to work with an absolute and a relative path, you can directly set an absolute path as first parameter

## License
Lek-DirObject is MIT licensed.