//Constants
const fs = require("fs");

//Process base schema
var processedFiles = [];
processFile("structure-data.json");

//Process File
function processFile(fileName) {
    //Process File if required
    var newFileName = fileName.substring(0, fileName.indexOf(".")) + "-compiled.min.json";
    if (!processedFiles.includes(fileName)) {
        processedFiles.push(fileName);
        //Read File
        fs.readFile("./" + fileName, "utf8", (readErr, schema) => {
            //Handle Error
            if (readErr) {
                console.log("Error Reading Schema File:");
                console.log(readErr);
                return;
            }
            //Ensure Release Folder
            if(!fs.existsSync("./release")){
                fs.mkdirSync("./release");
            }
            //Output Minified JSON
            fs.writeFile("./release/" + newFileName, JSON.stringify(removeUnsupportedTypes(processTree(JSON.parse(schema)))), (writeErr, writeFile) => {
                //Handle Error
                if (writeErr) {
                    console.log("Error Writing Minified Schema File:");
                    console.log(writeErr);
                    return;
                }
            });
        });
    }
    return newFileName;
}

//Process Tree
function processTree(parent) {
    //Enumerate through keys
    for (var key in parent) {
        //Ensure property existing in parent
        if (!parent.hasOwnProperty(key)) continue;
        //Recursive call child objects
        if (typeof (parent[key]) === "object") {
            parent[key] = processTree(parent[key]);
        }
        //Find external "$ref" properties
        if (typeof (parent[key]) === "string" && key === "$ref" && parent[key].length > 0 && parent[key][0] !== "#") {
            var newFileName = processFile(((parent[key].indexOf('#') >= 0) ? parent[key].substring(0, parent[key].indexOf('#')) : parent[key]));
            parent[key] = ((parent[key].indexOf('#') >= 0) ? newFileName + parent[key].substring(parent[key].indexOf('#')) : newFileName);
        }
    }
    return parent;
}

//Remove Unsupported Types
function removeUnsupportedTypes(parent) {
    //Enumerate through keys
    for (var key in parent) {
        //Ensure property existing in parent
        if (!parent.hasOwnProperty(key)) continue;
        //Recursive call child objects
        if (typeof (parent[key]) === "object") {
            parent[key] = removeUnsupportedTypes(parent[key]);
        }
        //Find "bsonType" properties
        if (typeof (parent[key]) === "string" && key === "bsonType" && parent[key].length > 0) {
            if (parent[key] === "int") parent[key] = "integer";//Integer
            else if (parent[key] === "double") parent[key] = "number";//Double
            else if (parent[key] === "long") {//Long
                parent["minimum"] = 9223372036854775808;
                parent["maximum"] = 9223372036854775807;
                parent["multipleOf"] = 1;
                parent[key] = "number";
            }
            //Move over "bsonType" to "type" and delete "bsonType"
            parent["type"] = parent[key];
            delete parent[key];
        }
    }
    return parent;
}