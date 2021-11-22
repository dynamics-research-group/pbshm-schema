# PBSHM Schema
PBSHM Schema is a JSON Schema for the storage of Population-based Structure Health Monitoring Data. The PBSHM Schema is designed for validation of JSON documents as well as schema validation within a MongoDB database.

Each document represents knowledge on a single structure at a given point in time. As such, information within the document follows a hierarchical approach with [structure information](#structure) at the root of the document and additional [section information](#section) being represented through nested entities under a defined property.

## [Structure](#structure)
A structure object must contain the [properties](#structure-properties) required to identify which structure the data within the document belongs to; `name`, `population` and `timestamp`. The structure object may then have additional properties containing the nested [section information](#section) as defined.

### [Structure Properties](#structure-properties)
|Property|Description|Type|
|---|-----|---|
|`name`|Name of the structure, must be unique within the population (length greater than 1 character)|`string`|
|`population`|Name of the population that the structure is part of, must be unique within the PBSHM database (length between 1 and 64 characters)|`string`|
|`timestamp`|Timestamp of when the associated monitoring data was recorded, stored in UTC nanoseconds since UNIX epoch|`long`|

## [Section](#section)
Each section of information within the PBSHM Schema is separated out into both a dedicated property within the [structure object](#structure) and a separate schema file. Below is the list of currently supported sections and their associated properties and information.

|Property|Description|Type|Details|
|---|-----|---|---|
|`channels`|Raw sensor data information|`array`|[channel-data](channel-data.md)|
|`models`|Model data information|`object`|[model-data](model-data.md)|