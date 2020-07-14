//Constants
const fs = require("fs");

//Read File
fs.readFile("./release/structure-data-compiled-mongodb.min.json", "utf8", (readErr, schema) => {

    //Handle Error
    if (readErr) {
        console.log("Error Reading Schema File:");
        console.log(readErr);
        return;
    }

    //Generate Channel Markdown
    var markdown = [];
    markdown.push("# [Channel](#channel)");
    markdown.push("A channel object contains the [properties](#channel-properties) required to represent sensor information within the associated [structure](/README.md#structure); `name`, `type`, `unit` and `value`. A [channel object](#channel) should exist within the [structure object](/README.md#structure) for each channel that was present and providing data on the associated [structure](/README.md#structure) at the given timestamp. If a channel did not provide data at the given timestamp, it should not exist within this [structure object](/README.md#structure). If the `unit` property is `n/a` in the [channel type](#channel-types) table, then that property it to be omitted for that [channel type](#channel-types).");
    
    //Generate Channel Properties Markdown
    markdown.push("\r\n## [Channel Properties](#channel-properties)");
    markdown.push("|Property|Description|Type|");
    markdown.push("|---|-----|---|");
    markdown.push("|`name`|Name of the channel, must be unique within the structure|`string`|");
    markdown.push("|`type`|The selected `type` value for this channel, see [channel types](#channel-types) for a list of available options|`string`|");
    markdown.push("|`unit`|The selected `unit` value of this channel which the `value` is based upon, see [channel types](#channel-types) for a list of available options for the selected `type`|`string`|");
    markdown.push("|`value`|Value of the channel, stored in the selected `unit`|See [channel types](#channel-types) for a list of available options for the selected `type`|");

    //Generate Channel Type Markdown
    markdown.push("\r\n## [Channel Types](#channel-types)");
    markdown.push("|Type|Units|Values|");
    markdown.push("|---|-----|---|");
    var json = JSON.parse(schema);
    for (var channelIndex in json["properties"]["channels"]["items"]["oneOf"]) {
        //Calculate Type CSV
        var typeCSV = "";
        for (var typeIndex in json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["type"]["enum"]) {
            typeCSV += ((typeCSV.length > 0) ? ", `" : "`") + json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["type"]["enum"][typeIndex] + "`";
        }
        //Calculate Unit CSV
        var unitCSV = "";
        if (!json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"].hasOwnProperty("unit")) unitCSV = "n/a";
        else {
            for (var unitIndex in json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["unit"]["enum"]) {
                unitCSV += ((unitCSV.length > 0) ? ", `" : "`") + json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["unit"]["enum"][unitIndex] + "`";
            }
        }
        //Calculate Values CSV
        var valueCSV = "";
        if (!json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["value"].hasOwnProperty("oneOf")) valueCSV = "`" + json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["value"]["bsonType"] + "`";
        else {
            for (var valueIndex in json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["value"]["oneOf"]) {
                valueCSV += ((valueCSV.length > 0) ? ", `" : "`") + json["properties"]["channels"]["items"]["oneOf"][channelIndex]["properties"]["value"]["oneOf"][valueIndex]["bsonType"] + "`";
            }
        }
        //Output Line
        markdown.push(`|${typeCSV}|${unitCSV}|${valueCSV}|`);
    }

    //Generate Value Markdown
    markdown.push("## [Value](#value)");
    markdown.push("A value object contains the [properties](#value-properties) required to represent `value` data within a [channel object](#channel) which is not singular; `min`, `max`, `mean`, `std`. The [value object](#value) must have at least two properties set on the object, otherwise a singular `value` value should be used instead.");
    
    //Generate Value Properties Markdown
    markdown.push("\r\n### [Value Properties](#value-properties)");
    markdown.push("|Property|Description|Type|");
    markdown.push("|---|-----|---|");
    markdown.push("|`min`|Minimum [channel](#channel) value over the observed time period|`int`, `double`|");
    markdown.push("|`max`|Maximum [channel](#channel) value over the observed time period|`int`, `double`|");
    markdown.push("|`mean`|Mean [channel](#channel) value over the observed time period|`int`, `double`|");
    markdown.push("|`std`|Standard deviation [channel](#channel) value over the observed time period|`int`, `double`|");

    //Output Markdown File
    var markdownFile = fs.createWriteStream("./channel-data.md");
    markdownFile.on("error", (writeErr) => {
        console.log("Error Writing channel-data File:");
        console.log(writeErr);
        return;
    });
    markdown.forEach((item) => {
        markdownFile.write(item + "\r\n");
    });
    markdownFile.close();
});