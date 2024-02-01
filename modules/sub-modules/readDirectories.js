const crypto = require('crypto');
const path = require('path');
const readDirectory = require('./readDirectory');

const getUniqueKey = () => 'n' + crypto.randomBytes(64).toString('hex');

const readDirectories = async (principalDir, collectItems) => {

    let pathsResolve;
    let pathsReject;

    const paths = new Promise((resolve, reject) => {
        pathsResolve = resolve;
        pathsReject = reject;
    });

    const directoriesToRead = [ principalDir ];
    const pathsList = [];

    const analyze = async () =>{
        try
        {
            if(directoriesToRead.length > 0)
            {
                const thisDir = directoriesToRead.shift();
                const files = await readDirectory(thisDir);
    
                files.forEach(file => {
                    let pushInList = false;
                    const fileDir = path.join(thisDir, file.name);
                    if(file.isDirectory())
                    {
                        directoriesToRead.push(fileDir);
                    }else
                    {
                        if(collectItems){
                            if(collectItems.includes(file.name))
                            {
                                pushInList = true
                            }
                        }else
                        {
                            pushInList = true
                        }
                        if(pushInList)
                        {
                            pathsList.push({ path : fileDir, name : getUniqueKey() });
                        }
                    }
                });
                analyze();
            }else
            {
                pathsResolve(pathsList);
            }
        }
        catch(err)
        {
            pathsReject(err)
        }
    }
    analyze();

    return paths;
};
module.exports = readDirectories;