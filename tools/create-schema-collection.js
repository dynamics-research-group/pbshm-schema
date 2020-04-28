//Dependencies
const fs = require("fs");
var cmc = require("./connect-mongodb-credentials.js");
var util = require("util");

//Connection
cmc.captureCredentialsAndConnect(function(db,result){
    //Read the Schema
    console.log("reading PBHSM schema");
    fs.readFile("./release/structure-data-compiled-mongodb.min.json", "utf8", (readErr, schema) => {
        //Handle Error
        if (readErr) {
            console.log("Error Reading Schema File:");
            console.log(readErr);
            return;
        }
        //Parse JSON & Create Collection
        var json = JSON.parse(schema);
        console.log("creating collection");
        db.db(result.database).createCollection(result.collection, { "validator": { "$jsonSchema": json } }, function (collectionErr, collection) {
            //Handle Error
            if (collectionErr) {
                console.log("Collection Error:");
                console.log(collectionErr);
                return;
            }
            //Log Creation and Close
            console.log(util.format("created '%s' collection in '%s' database", collection.s.namespace.db, collection.s.namespace.collection));
            db.close();
        });
    });
});