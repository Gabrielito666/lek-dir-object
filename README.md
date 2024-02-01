# Lek-DirObject

`Lek-DirObject` is a Node.js module for creating a directory tree structure of JavaScript files. It supports two modes: default and specific.

## Installation

To install `Lek-DirObject`, use the following command:

```bash
npm install lek-dir-object
```

## Usage

`Lek-DirObject` can be used in two different modes: default and specific.

### Default Mode

In default mode, `Lek-DirObject` creates a tree structure that includes all JavaScript files in the specified directory and its subdirectories.

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
    const LekDirObject = require('lek-dir-object');
    const lekDir = new LekDirObject('/rootPath');

    await lekDir.initialize()

    const myTree = lekDir.tree;
    
    console.log(myTree);
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
    const LekDirObject = require('lek-dir-object');
    const lekDir = new LekDirObject('/rootPath');

    lekDir.setSpesificMode(['elements', 'options'])
    await lekDir.initialize();

    const myTree = lekDir.tree;

    console.log(myTree)
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

## 2.0.0

version 2.0.0 works exactly the same for the user, but instead of importing the files dynamically, it creates a .js file for the implantations in the package itself. this is a bit slower, but it saves errors in applications that use webpack like the ones created with next.js. if this is not your case, you should use version 1.0.0.

## License
Lek-DirObject is MIT licensed.