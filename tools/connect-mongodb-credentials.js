//Dependencies
const fs = require("fs");
var mongodb = require("mongodb");
var util = require("util");

//Capture Credentials and Connect
exports.captureCredentialsAndConnect = function (databaseConnectionCallback) {
    //Read Credentials File
    fs.readFile("./tools/connect-mongodb-credentials.json", "utf8", (readErr, credentials) => {
        //Handle Error
        if (readErr) {
            console.log("Error Reading Credentials File:");
            console.log(readErr);
            return;
        }
        //Parse JSON & Ensure Valid
        var valueErr = [];
        var json = JSON.parse(credentials);
        if (!json.hasOwnProperty("host") || json.host.length == 0) valueErr.push("no host found");
        if (!json.hasOwnProperty("port") || json.port.length == 0) valueErr.push("no port found");
        if (!json.hasOwnProperty("authenticationUsername") || json.authenticationUsername.length == 0) valueErr.push("no authentication username");
        if (!json.hasOwnProperty("authenticationPassword") || json.authenticationPassword.length == 0) valueErr.push("no authentication password");
        if (!json.hasOwnProperty("authenticationDatabase") || json.authenticationDatabase.length == 0) valueErr.push("no authentication database");
        if (!json.hasOwnProperty("database") || json.database.length == 0) valueErr.push("no database found");
        if (!json.hasOwnProperty("collection") || json.collection.length == 0) valueErr.push("no collection found");
        //Handle Value Error
        if (valueErr.length > 0) {
            console.log("Error With Credentials File:");
            for (var index in valueErr) {
                console.log("\t" + valueErr[index]);
            }
            return;
        }
        //Create MongoDB Client
        var mongoClient = mongodb.MongoClient;
        mongoClient.connect(util.format("mongodb://%s:%s@%s:%s/%s", encodeURIComponent(json.authenticationUsername), encodeURIComponent(json.authenticationPassword), json.host, json.port, json.authenticationDatabase), { useUnifiedTopology: true }, function (connectionErr, db) {
            //Handle Error
            if (connectionErr) {
                console.log("Connection Error:");
                console.log(connectionErr);
                return;
            }
            //Call Callback
            databaseConnectionCallback(db, { database: json.database, collection: json.collection });
        });
    });
}