# [Source](#source)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`timestamp`|Associated data timestamps|`object`|[`timestamp`](#timestamp)|yes|
|`selection`|Array of data selection objects|`array`|[`channelSelection`](#channel-selection), [`modelSelection`](#model-selection)|yes|
|`software`|List of the software used in descending order|`array`|[`software`](#software)|no|
|`environment`|Variables used to change the environment of the selected model|`object`|[`environment`](#environment)|yes|

## [Timestamp](#timestamp)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`generated`|Timestamp of when the data was generated in the software|`long`|nanoseconds since epoch|no|
|`stored`|Timestamp of when the data was stored in the database|`long`|nanoseconds since epoch|yes|

## [Channel Selection](#channel-selection)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`population`|Name of the population used|`string`|Minimum Length: 8, Maximum Length: 64|yes|
|`structures`|List of selected structures in the population|`array`|`string`|yes|
|`channels`|List of selected channels on the structures|`array`|`string`|yes|
|`timestamps`|List of the timestamp ranges|`array`|[`timestampRange`](#timestamp-range)|yes|

### [Timestamp Range](#timestamp-range)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`start`|Start timestamp of the range|`long`|nanoseconds since epoch|yes|
|`end`|End timestamp of the range|`long`|nanoseconds since epoch|yes|
|`excluded`|List of excluded timestamps from the range|`array`|`long`|no|

## [Model Selection](#model-selection)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the model used|`string`|Minimum Length: 1|yes|

## [Software](#software)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the software used|`string`|Minimum Length: 1|yes|
|`version`|Version of the software used|`string`|Minimum Length: 1|yes|
|`source`|URL to access to source code of the software|`string`|Minimum Length: 1|no|
|`parameters`|Dictionary of software parameters used|`object`|[`softwareParameters`](#software-parameters)|no|

### [Software Parameters](#software-parameters)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`*`|Parameter for the software|`string`, `int`, `double`, `array` of `string`, `int`, `double`|any valid value|yes|

## [Environment](#environment)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`*`|Variable used to modify the environment of the model|`object`|[`environmentParameters`](#environment-parameters)|yes|

### [Environment Parameters](#environment-parameters)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`description`|Description of the variable|`string`|Minimum Length: 1|yes|
|`value`|Value of the variable|`string`, `int`, `double`|any valid value|yes|