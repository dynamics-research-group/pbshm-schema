# PBSHM Schema
PBSHM Schema is a JSON Schema for the storage of Population-based Structure Health Monitoring Data. The PBSHM Schema is designed for validation of JSON documents as well as schema validation within a MongoDB database.

Each document represents knowledge on a single structure at either a given point in time (see [time domain](#time-domain)) or a given state of the system (see [system domain](#system-domain)). As such, information within the document follows a hierarchical approach with [structure information](#structure) at the root of the document and additional [knowledge areas](#knowledge-areas) being represented through nested entities under defined properties within a domain.

## [Structure](#structure)
A structure object must contain the [properties](#structure-properties) required to identify which structure the data within the document belongs to and the version and health state it was recorded against; `version`, `name`, `population`, and `health`. The structure object must then have additional properties containing the nested [knowledge areas](#knowledge-areas) for either the [time domain](#time-domain) or the [system domain](#system-domain), as defined below.

### [Structure Properties](#structure-properties)
|Property|Description|Type|
|---|-----|---|
|`version`|Version of the PBSHM Schema that the document is compliant against. Accepted values: `1.0`, `1.0.1`, `1.1.0`, `1.1.1`, `1.2.1`, `1.3.0`, `1.3.1`, `1.4.0`, `1.4.1`|`string`|
|`name`|Name of the structure, must be unique within the population (length of at least 1 character)|`string`|
|`population`|Name of the population that the structure is part of, must be unique within the PBSHM database (length between 8 and 64 characters)|`string`|
|`health`|Health state information that the data within the document belongs to|[`health`](#health)|

#### [Health](#health)
|Property|Description|Type|
|---|-----|---|
|`state`|Numerical health state, accepted values -1 to 99: -1 is `unknown`, 0 is `healthy`, 1-99 is `damaged`|`int`|
|`description`|Description of the damage state; required when `state` is 1-99 and not permitted otherwise|`string`|


## [Knowledge Areas](#knowledge-areas)
Each area of knowledge within the PBSHM Schema resides within a data domain. The data domain decides what properties are required to facilitate identification within the domain. Each knowledge area will further have its own dedicated property within the [structure object](#structure) and a separate schema file. Below is the list of currently supported data domains and their associated knowledge areas, properties, and information.

### [Time Domain](#time-domain)
A document within the time domain must contain `timestamp` alongside exactly one of `channels` or `models`; the two knowledge areas cannot be recorded together within the same document.

|Property|Description|Type|Details|
|---|-----|---|---|
|`timestamp`|Timestamp of when the associated monitoring data was recorded, stored in UTC nanoseconds since UNIX epoch|`long`|-|
|`channels`|Raw sensor data information|`array`|[channels](docs/channel-data.md#channel)|
|`models`|Model data information|`object`|[`model`](docs/model-data.md#model)|

### [System Domain](#system-domain)
A document within the system domain must contain both `source` and `features` together.

|Property|Description|Type|Details|
|---|-----|---|---|
|`source`|Details on the sources used to generate the associated data|`object`|[`source`](docs/source-data.md#source)|
|`features`|Processed feature data information|`array`|[features](docs/feature-data.md#feature)|