# PBSHM Schema
PBSHM Schema is a JSON Schema for the storage of Population-based Structure Health Monitoring Data. The PBSHM Schema is designed for validation of JSON documents as well as schema validation within a MongoDB database.

Each document represents knowledge on a single structure at either a given point in time (see [time domain](#time-domain)) or a given state of the system (see [system domain](#system-domain)). As such, information within the document follows a hierarchical approach with [structure information](#structure) at the root of the document and additional [knowledge areas](#knowledge-areas) being represented through nested entities under defined properties within a domain.

## [Structure](#structure)
A structure object must contain the [properties](#structure-properties) required to identify which structure the data within the document belongs to; `name`, and `population`. The structure object may then have additional properties containing the nested [knowledge areas](#knowledge-areas) as defined.

### [Structure Properties](#structure-properties)
|Property|Description|Type|
|---|-----|---|
|`version`|Version of the PBSHM Schema that the document is compliant against. Accepted values: `1.0`, `1.0.1`, `1.1.0`, `1.1.1`, `1.2.1`, `1.3.0`|`string`|
|`name`|Name of the structure, must be unique within the population (length greater than 1 character)|`string`|
|`population`|Name of the population that the structure is part of, must be unique within the PBSHM database (length between 1 and 64 characters)|`string`|


## [Knowledge Areas](#knowledge-areas)
Each area of knowledge within the PBSHM Schema resides within a data domain. The data domain decides what properties are required to facilitate identification within the domain. Each knowledge area will further have its own dedicated property within the [structure object](#structure) and a separate schema file. Below is the list of currently supported data domains and their associated knowledge areas, properties, and information.

### [Time Domain](#time-domain)

|Property|Description|Type|Details|
|---|-----|---|---|
|`timestamp`|Timestamp of when the associated monitoring data was recorded, stored in UTC nanoseconds since UNIX epoch|`long`|-|
|`channels`|Raw sensor data information|`array`|[channel-data](channel-data.md)|
|`models`|Model data information|`object`|[model-data](model-data.md)|

### [System Domain](#system-domain)
|Property|Description|Type|Details|
|---|-----|---|---|
|`source`|Details on the sources used to generate the associated data|`object`|[`source`](#source)|
|`features`|Processed feature data information|`array`|[feature-data](feature-data.md)|

#### [Source](#source)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`timestamp`|Associated data timestamps|`object`|[`timestamp`](#timestamp)|yes|
|`selection`|Array of data selection objects|`array`|[`channelSelection`](#channel-selection), [`modelSelection`](#model-selection)|yes|
|`software`|List of the software used in descending order|`array`|[`software`](#software)|no|
|`environment`|Variables used to change the environment of the selected model|`object`|[`environment`](#environment)|yes|

##### [Timestamp](#timestamp)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`generated`|Timestamp of when the data was generated in the software|`long`|nanoseconds since epoch|no|
|`stored`|Timestamp of when the data was stored in the database|`long`|nanoseconds since epoch|yes|

##### [Channel Selection](#channel-selection)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`population`|Name of the population used|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`structures`|List of selected structures in the population|`array`|`string`|yes|
|`channels`|List of selected channels on the structures|`array`|`string`|yes|
|`timestamps`|List of the timestamp ranges|`array`|[`timestampRange`](#timestamp-range)|yes|

###### [Timestamp Range](#timestamp-range)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`start`|Start timestamp of the range|`long`|nanoseconds since epoch|yes|
|`end`|End timestamp of the range|`long`|nanoseconds since epoch|yes|
|`excluded`|List of excluded timestamps from the range|`array`|`long`|no|

##### [Model Selection](#model-selection)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the model used|`string`|Minimum Length: 1|yes|

##### [Software](#software)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the software used|`string`|Minimum Length: 1|yes|
|`version`|Version of the software used|`string`|Minimum Length: 1|yes|
|`source`|URL to access to source code of the software|`string`|Minimum Length: 1|no|
|`parameters`|Dictionary of software parameters used|`object`|[`softwareParemeters`](#software-parameters)|no|

###### [Software Parameters](#software-parameters)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`*`|Parameter for the software|`string`, `int`, `double`, `array` of `string`, `int`, `double`|any valid value|yes|

##### [Environment](#environment)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`*`|Variable used to modify the environment of the model|`object`|[`environmentParameters`](#environment-parameters)|yes|

###### [Environment Parameters](#environment-parameters)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`description`|Description of the variable|`string`|Minimum Length: 1|yes|
|`value`|Value of the variable|`string`, `int`, `double`|any valid value|yes|