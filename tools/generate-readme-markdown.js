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

    //Generate Structure Properties Markdown
    var json = JSON.parse(schema);
    var markdown = [];
    markdown.push("# " + json["title"]);
    markdown.push(json["description"]);
    markdown.push("## [Schema Properties](#schema-properties)");
    markdown.push("|Name|Description|Type|Validation|");
    markdown.push("|---|---|---|---|");
    for (var propertyItem in json["properties"]) {
        //Calculate Validation
        var validationCSV = "";
        if (json["properties"][propertyItem]["bsonType"] == "string") {
            if (typeof json["properties"][propertyItem]["minLength"] !== typeof undefined) validationCSV += ((validationCSV.length > 0) ? ", " : "") + "Min Length: " + json["properties"][propertyItem]["minLength"];
            if (typeof json["properties"][propertyItem]["maxLength"] !== typeof undefined) validationCSV += ((validationCSV.length > 0) ? ", " : "") + "Max Length: " + json["properties"][propertyItem]["maxLength"];
        }
        else if (json["properties"][propertyItem]["bsonType"] == "date") validationCSV += ((validationCSV.length > 0) ? ", " : "") + "Format: ISO 8601";
        else if (json["properties"][propertyItem]["bsonType"] == "array") validationCSV += ((validationCSV.length > 0) ? ", " : "") + "Array of [Channel Objects](#channel-objects)";
        //Add Markdown
        markdown.push("|`" + propertyItem + "`|" + json["properties"][propertyItem]["title"] + "|`" + json["properties"][propertyItem]["bsonType"] + "`|" + validationCSV + "|");
    }

    //Generate Channel Object Markdown
    markdown.push("## [Channel Objects](#channel-objects)");
    markdown.push("A timepoint can have mutliple types of channel objects stored within it. Below is a list of the currently supported channel types.");

    //Generate Channel Types Markdown
    markdown.push("### [Channel Types](#channel-types)");
    markdown.push("|Name|Accepted Type Property|Accepted Unit Property|Accepted Value Property|Required Properties|");
    markdown.push("|---|---|---|---|---|");
    //Enumerate through Channel Objects
    for (var propertyIndex in json["properties"]["channels"]["items"]["oneOf"]) {
        //Type
        var typeCSV = "";
        for (var type in json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["type"]["enum"]) {
            typeCSV += ((typeCSV.length > 0) ? ", `" : "`") + json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["type"]["enum"][type] + "`";
        }
        //Units
        var unitCSV = "";
        if (typeof json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["unit"] !== typeof undefined) {
            for (var unit in json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["unit"]["enum"]) {
                unitCSV += ((unitCSV.length > 0) ? ", `" : "`") + json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["unit"]["enum"][unit] + "`";
            }
        }
        //Find any Linked Definition
        var propertyDefinition = null;
        var propertyDefinitionReference = json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["$ref"].split('/');
        for (var parts in propertyDefinitionReference) {
            if (propertyDefinitionReference[parts] == "#") propertyDefinition = json;
            else propertyDefinition = propertyDefinition[propertyDefinitionReference[parts]];
        }
        //Required Properties
        var requiredPropertiesCSV = "";
        if (propertyDefinition != null && typeof propertyDefinition["required"] !== typeof undefined) {
            for (var requiredIndex in propertyDefinition["required"]) {
                requiredPropertiesCSV += ((requiredPropertiesCSV.length > 0) ? ", `" : "`") + propertyDefinition["required"][requiredIndex] + "`";
            }
        }
        //Find Value Definintion
        var valueDefinition = null;
        var valueDefinitionReference = json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["properties"]["value"]["$ref"].split('/');
        for (var parts in valueDefinitionReference) {
            if (valueDefinitionReference[parts] == "#") valueDefinition = json;
            else valueDefinition = valueDefinition[valueDefinitionReference[parts]];
        }
        //Accepted Values
        var valueCSV = "";
        if (valueDefinition != null) {
            if (typeof valueDefinition["bsonType"] !== typeof undefined) valueCSV += "`" + valueDefinition["bsonType"] + "`";
            else {
                for (var childDefinition in valueDefinition["oneOf"]) {
                    //Find Child Definition
                    var valueChildDefinition = null;
                    var valueChildDefinitionReference = valueDefinition["oneOf"][childDefinition]["$ref"].split('/');
                    for (var childParts in valueChildDefinitionReference) {
                        if (valueChildDefinitionReference[childParts] == "#") valueChildDefinition = json;
                        else valueChildDefinition = valueChildDefinition[valueChildDefinitionReference[childParts]];
                    }
                    //Append Child Definition Type
                    if (valueChildDefinition != null && typeof valueChildDefinition["bsonType"] !== typeof undefined) valueCSV += ((valueCSV.length > 0) ? ", `" : "`") + valueChildDefinition["bsonType"] + "`";
                }
            }
        }
        //Generate Markdown Line
        markdown.push(
            "|" + json["properties"]["channels"]["items"]["oneOf"][propertyIndex]["title"]
            + "|" + typeCSV
            + "|" + unitCSV
            + "|" + valueCSV
            + "|" + requiredPropertiesCSV + "|"
        );
    }

    //Generate Channel Properties Markdown
    markdown.push("### [Channel Properties](#channel-properties)");
    markdown.push("|Name|Description|Type|Validation|");
    markdown.push("|---|---|---|---|");
    markdown.push("|`name`|" + json["definitions"]["channelPropertyName"]["title"] + "|`" + json["definitions"]["channelPropertyName"]["bsonType"] + "`|Min Length: " + json["definitions"]["channelPropertyName"]["minLength"] + "|");
    markdown.push("|`type`|" + json["definitions"]["channelPropertyType"]["title"] + "|`" + json["definitions"]["channelPropertyType"]["bsonType"] + "`|Available Type|");
    markdown.push("|`unit`|" + json["definitions"]["channelPropertyUnit"]["title"] + "|`" + json["definitions"]["channelPropertyUnit"]["bsonType"] + "`|Available Unit|");
    var valueTypesCSV = '';
    for (var valueDefinitionItem in json["definitions"]) {
        if (valueDefinitionItem.indexOf("channelPropertyValue") != 0) continue;
        else if (typeof json["definitions"][valueDefinitionItem]["bsonType"] === typeof undefined) continue;
        valueTypesCSV += ((valueTypesCSV.length > 0) ? ", `" : "`") + json["definitions"][valueDefinitionItem]["bsonType"] + "`";
    }
    markdown.push("|`value`|" + json["definitions"]["channelPropertyValueString"]["title"] + "|" + valueTypesCSV + "||");

    //Generate Value Types Markdown
    markdown.push("### [Value Types](#value-types)");
    markdown.push("|Type|Description|");
    markdown.push("|---|---|");
    for (var valueDefinitionItem in json["definitions"]) {
        if (valueDefinitionItem.indexOf("channelPropertyValue") != 0) continue;
        else if (typeof json["definitions"][valueDefinitionItem]["bsonType"] === typeof undefined) continue;
        markdown.push("|`" + json["definitions"][valueDefinitionItem]["bsonType"] + "`|" + json["definitions"][valueDefinitionItem]["description"] + "|");
    }

    //Generate Value Properties Markdown
    markdown.push("#### [Value Properties](#value-properties)");
    markdown.push("|Name|Description|Type|");
    markdown.push("|---|---|---|");
    for (var valueDefinitionItem in json["definitions"]["channelPropertyValueDoubleMinMaxMeanSTD"]["properties"]) {
        markdown.push("|`" + valueDefinitionItem + "`|" + json["definitions"]["channelPropertyValueDoubleMinMaxMeanSTD"]["properties"][valueDefinitionItem]["title"] + "|" + json["definitions"]["channelPropertyValueDoubleMinMaxMeanSTD"]["properties"][valueDefinitionItem]["bsonType"] + "|");
    }

    //Output Markdown File
    var markdownFile = fs.createWriteStream("./README.md");
    markdownFile.on("error", (writeErr) => {
        console.log("Error Writing README File:");
        console.log(writeErr);
        return;
    });
    markdown.forEach((item) => {
        markdownFile.write(item + "\r\n");
    });
    markdownFile.close();
});