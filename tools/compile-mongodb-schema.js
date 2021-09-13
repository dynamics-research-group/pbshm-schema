//Constants
const fs = require("fs");

//Read File
fs.readFile("./structure-data.json", "utf8", (readErr, schema) => {
    //Handle Error
    if (readErr) {
        console.log("Error Reading Schema File:");
        console.log(readErr);
        return;
    }
    //Parse JSON, Dereference and Remove Unsupported Keys
    var json = JSON.parse(schema);
    json = mergeAllOfElements(removeUnsupportedKeys(dereferenceTree(json, json)));
    //Ensure Release Folder
    if (!fs.existsSync("./release")) {
        fs.mkdirSync("./release");
    }
    //Output Minified JSON
    fs.writeFile("./release/structure-data-compiled-mongodb.min.json", JSON.stringify(json), (writeErr, writeFile) => {
        //Handle Error
        if (writeErr) {
            console.log("Error Writing Minified Schema File:");
            console.log(writeErr);
            return;
        }
    });
    //Output Pretty JSON
    fs.writeFile("./release/structure-data-compiled-mongodb.json", JSON.stringify(json, null, 4), (writeErr, writeFile) => {
        //Handle Error
        if (writeErr) {
            console.log("Error Writing Pretty Schema File:");
            console.log(writeErr);
            return;
        }
    });
});

//Dereference Tree
function dereferenceTree(root, parent) {
    //Enumerate through keys
    for (var key in parent) {
        //Ensure property existing in parent
        if (!parent.hasOwnProperty(key)) continue;
        //Recursive call child objects
        if (typeof (parent[key]) === "object") {
            parent[key] = dereferenceTree(root, parent[key]);
        }
        //Find "$ref" properties
        if (typeof (parent[key]) === "string" && key === "$ref" && parent[key].length > 0) {
            //Find Reference Node and Dereference
            var referenceNode;
            if (parent[key][0] === "#") referenceNode = dereferenceTree(root, findPathInTree(root, parent[key].substring(1)));
            else {
                try {
                    var remoteJson = JSON.parse(fs.readFileSync(((parent[key].indexOf('#') >= 0) ? parent[key].substring(0, parent[key].indexOf('#')) : parent[key]), "utf8"));
                    referenceNode = dereferenceTree(remoteJson, ((parent[key].indexOf('#') >= 0) ? findPathInTree(remoteJson, parent[key].substring(parent[key].indexOf('#') + 1)) : remoteJson));
                }
                catch (err) {
                    //Handle Error
                    console.log("Error Processing Remote Schema File");
                    console.log(err);
                    return;
                }
            }
            //Clone nodes into parent
            for (var referenceKey in referenceNode) {
                if (!referenceNode.hasOwnProperty(referenceKey)) continue;
                parent[referenceKey] = referenceNode[referenceKey];
            }
            //Delete reference node
            delete parent[key];
        }
    }
    return parent;
}

//Find Path in Tree
function findPathInTree(json, path) {
    //Ensure Valid Call and Calculate Indexes
    if (path.length == 0 || typeof (json) === typeof undefined) return;
    var firstComponentStartIndex = ((path[0] === "/") ? 1 : 0);
    var firstComponentEndIndex = path.indexOf("/", firstComponentStartIndex);
    //Calculate First Component and Continue Path
    var firstComponent;
    var continuePath;
    if (firstComponentEndIndex < 0) firstComponent = path.substring(firstComponentStartIndex);
    else {
        firstComponent = path.substring(firstComponentStartIndex, firstComponentEndIndex);
        continuePath = path.substring(firstComponentEndIndex);
    }
    //Return Recursive Call from Find Path in Tree or node
    var node = ((json.hasOwnProperty(firstComponent)) ? json[firstComponent] : undefined);
    return ((typeof (continuePath) !== typeof undefined && continuePath.length > 0) ? findPathInTree(node, continuePath) : node);
}

//Remove Unsupported Keys
function removeUnsupportedKeys(parent) {
    var unsupportedKeys = ["$schema", "id", "$ref", "definitions"];
    for (var key in parent) {
        //Remove Current Level
        for (var unsupported in unsupportedKeys) {
            if (key !== unsupportedKeys[unsupported]) continue;
            delete parent[key];
        }
        //Process Children
        if (typeof (parent[key]) === "object") {
            parent[key] = removeUnsupportedKeys(parent[key]);
        }
    }
    return parent;
}

//Merge All Of Elements
function mergeAllOfElements(parent) {
    //Enumerate through keys
    for (var key in parent) {
        //Ensure valid key
        if (!parent.hasOwnProperty(key)) continue;
        //Recursive call to all children
        if (typeof (parent[key]) === "object") {
            parent[key] = mergeAllOfElements(parent[key]);
        }
        //Find "allOf" properties
        if (key === "allOf" && typeof (parent[key]) === "object") {
            //Determine if merge is possible
            var oneOfCount = 0;
            for (var i in parent[key]) {
                for (var childKey in parent[key][i]) {
                    if (childKey === "oneOf" && typeof (parent[key][i][childKey]) === "object") {
                        oneOfCount++;
                        break;
                    }
                }
            }
            if (oneOfCount > 1) continue;
            //Merge objects and clone properties into parent
            var mergedObject = mergeObjects(parent[key]);
            for (var mergedNodeKey in mergedObject) {
                if (!mergedObject.hasOwnProperty(mergedNodeKey)) continue;
                parent[mergedNodeKey] = mergedObject[mergedNodeKey];
            }
            //Remove original property
            delete parent[key];
        }
    }
    return parent;
}

//Merge Objects
function mergeObjects(objects) {
    //Enumerate through object
    var mergedObject = null;
    for (var i in objects) {
        if (Array.isArray(objects[i])) {//Array
            //Instantiate/Ensure correct object type
            if (mergedObject == null) mergedObject = [];
            else if (!Array.isArray(mergedObject)) throw "cant merge an object and an array together";
            //Enumerate through indexes in object and add in missing elements
            for (var index in objects[i]) {
                if (mergedObject.includes(objects[i][index])) continue;
                mergedObject.push(objects[i][index]);
            }
        } else {//Object
            //Instantiate/Ensure correct object type
            if (mergedObject == null) mergedObject = {};
            else if (Array.isArray(mergedObject)) throw "cant merge an object and an array together";
            //Enumerate through keys and either set as object value, or recursivly call merge
            for (key in objects[i]) {
                if (!objects[i].hasOwnProperty(key)) continue;
                else if (!mergedObject.hasOwnProperty(key)) mergedObject[key] = objects[i][key];
                else mergedObject[key] = mergeObjects([mergedObject[key], objects[i][key]]);
            }
        }
    }
    return mergedObject;
}