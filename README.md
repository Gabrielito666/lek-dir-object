# Lek-DirObject

`Lek-DirObject` is a Node.js module for creating a directory tree structure of JavaScript files. It supports two modes: default and specific.

Version 4.0.0 of lek-dir-object uses an improved system that allows webpack compatibility and the creation of multiple directory trees simultaneously.


## Installation

To install `Lek-DirObject`, use the following command:

```bash
npm install lek-dir-object
```

## Usage

import the main function with require and then run it to get the createTree function. then with this function you can create trees quite freely.

to the createTree function you pass an object

route, root, onCreate, spesificItems

route is a relative path, and root is an absolute path... i recommend passing __dirname to root and passing the address of the folder you want to scan from the current directory to route. to spesificOptions you can pass an array with the name of the .js files you want to scan. if you don't pass anything, the default mode that scans all .js files will be used.

onCreate is optional, it supports a function that will be executed once the tree has been created.

```javascript
const lekDirObject = require('lek-dir-object');
const createTree = lekDirObject();

createTree({
    route : './root/of/my/tree/folder',
    root : __dirname,
    spesificItems : [ 'nameFile.js' ]
    onCreate : tree => { console.log(tree) }
});

```

createTree returns the promise of the tree so you can access the tree through onCreate or using a simple await

```javascript
const lekDirObject = require('lek-dir-object');
const createTree = lekDirObject();

const my_tree = await createTree({
    route : './root/of/my/tree/folder',
    root : __dirname,
    spesificItems : [ 'nameFile.js' ]
});

console.log(my_tree);

```

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
    const createTree = lekDirObject();
    const my_tree = await createTree({ route : './root/of/my/tree/folder', root : __dirname });
    
    console.log(my_tree);
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
    const createTree = lekDirObject();
    const my_tree = await createTree({
        route : './root/of/my/tree/folder',
        root : __dirname,
        spesificItems : ['elements', 'options'] //can end with .js or not
    });
    
    console.log(my_tree);
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

## License
Lek-DirObject is MIT licensed.