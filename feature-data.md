# [Feature](#feature)

## [Features](#features)
There are currently five supported feature types: eigen mode, statistical, spectra, spatial, and abstract. Each type has it's own set of requirements for properties to ensure correct encapsulation of the associated feature data.

### [Eigen Mode](#feature-eigen-mode)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the feature, must be unique within the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`type`|Root `type` of this feature.<br>Type Tree: `eigenMode` |`object`|[`rootTypes`](#root-types)|yes|
|`variant`|Variant of eigen mode|`string`|`acceleration`, `velocity`, `displacement`, `strain`, `rotation`|yes|
|`naturalFrequency`|Natural frequency of the eigen mode<br>Accepted units: `fHz`, `pHz`, `nHz`, `µHz`, `mHz`, `cHz`, `dHz`, `Hz`, `daHz`, `hHz`, `kHz`, `MHz`, `GHz`, `THz`, `PHz`, `other`|`object`|[`unitValue`](#unit-value) with scalar of `int`, `long`, `double` values|yes|
|`modeShape`|Mode shape of the eigen mode<br>Accepted units: `mm`, `cm`, `m`, `km`, `other`|`object`|[`unitValue`](#unit-value) with [`vector`](#vector) of [`complexNumber`](#complex-number) values|yes|
|`dampingRatio`|Damping ratio of the eigen mode|`int`, `long`, `double`|any real value between -1 and 1|yes|


### [Statistical](#feature-statistical)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the feature, must be unique within the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`type`|Root `type` of this feature.<br>Type Tree: `statistical` -> `mean`, `variance`, `skewness`, `kurtosis`, `other` |`object`|[`rootTypes`](#root-types)|yes|
|`unit`|Unit the value is based within|`string`|any accepted [channelType](#channel-data.md#channel-types) unit|yes|
|`value`|Value of the statistical feature|`int`, `long`, `double`, `object`|any scalar, [`vector`](#vector), or [`matrix`](#matrix) of numerical values (`int`, `long`, `double` or [`complexNumber`](#complex-number))|yes|

### [Spectra](#feature-spectra)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the feature, must be unique within the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`type`|Root `type` of this feature.<br>Type Tree: `spectra` -> `transmissibility`, `frequencyResponseFunction`, `coherence`|`object`|[`rootTypes`](#root-types)|yes|
|`sensor`|Details of the sensor used|`object`|[`sensor`](#sensor)|yes|
|`frequency`|Details of the associated frequencies<br>Accepted units: `fHz`, `pHz`, `nHz`, `µHz`, `mHz`, `cHz`, `dHz`, `Hz`, `daHz`, `hHz`, `kHz`, `MHz`, `GHz`, `THz`, `PHz`, `other`|`object`|[`unitValue`](#unit-value) with [`vector`](#vector) of `int`, `long`, `double` values|yes|
|`value`|Value of the spectra feature<br>Accepted units: any accepted [channelType](#channel-data.md#channel-types) unit|`object`|[`unitValue`](#unit-value) with [`vector`](#vector) of `int`, `long`, `double` or [`complexNumber`](#complex-number) values|yes|

#### [Sensor](#sensor)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the sensor, must reference a sensor used on the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`coordinates`|Coordinates of the sensor within the structure|`object`|[`coordinates`](#coordinates) with `int`, `long`, `double` values|yes|

### [Spatial](#feature-spatial)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the feature, must be unique within the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`type`|Root `type` of this feature.<br>Type Tree: `spatial` -> `displacement`, `strain`, `influenceLine`|`object`|[`rootTypes`](#root-types)|yes|
|`variant`|Variant of the spatial feature|`string`|`static`, `dynamic`|yes|
|`timestamp`|Timestamp of dynamic spatial feature|`long`|nanoseconds since epoch| only if `variant` set to dynamic|
|`coordinates`|Coordinates of the spatial feature|`object`|[`coordinates`](#coordinates) with [`vector`](#vector) of `int`, `long`, `double` values|yes|
|`values`|Values associated with the coordinates<br>Accepted units: any accepted [channelType](#channel-data.md#channel-types) unit|`object`|[`spatial`](#spatial) with [`vector`](#vector) of `int`, `long`, `double` or [`complexNumber`](#complex-number) values|yes|

### [Abstract](#feature-abstract)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the feature, must be unique within the structure|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`type`|Root `type` of this feature.<br>Type Tree: `abstract` |`object`|[`rootTypes`](#root-types)|yes|
|`*`|Any named property|`object`|[`unitValue`](#unit-value) with scalar, [`vector`](#vector), or [`matrix`](#matrix) numerical values (`int`, `long`, `double` or [`complexNumber`](#complex-number))|yes|

## [Shared Objects](#shared-objects)

### [Root Types](#root-types)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the root type|`string`|see calling object|yes|
|`type`|The branches of the `type` tree|[branchTypes](#branch-types)|yes|

#### [Branch Types](#branch-types)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|Name of the root type|`string`|see calling object|yes|

### [Coordinates](#coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`coordinates`|Coordinates of the object|`object`|[`globalCoordinateSpace`](#global-coordinate-space)|yes|

#### [Global Coordinate Space](#global-coordinate-space)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`coordinates`|Coordinates within the global coordinate space|`object`|[`translationalCoordinateSpace`](#translational-coordinate-space)|yes|

##### [Translational Coordinate Space](#translational-coordinate-space)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`coordinates`|`X`, `Y`, `Z` values within the coordinate space<br>Accepted units: `mm`, `cm`, `m`, `km`, `other`|`object`|[`spatial`](#spatial)|yes|

### [Spatial](#spatial)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|Unit that the spatial values are based within|`string`|see calling object|yes|
|`x`|Value of the spatial object in the A dimension|see calling object|see calling object|yes|
|`y`|Value of the spatial object in the A dimension|see calling object|see calling object|yes|
|`z`|Value of the spatial object in the A dimension|see calling object|see calling object|yes|

### [Vector](#vector)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`indices`|The indices of the included vector|`object`|[`vectorIndices`](#vector-indices)|yes|
|`vector`|The vector of numbers|`array`|see calling object|yes|

### [Matrix](#matrix)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`indices`|The indices of the included matrix|`object`|[`vectorIndices`](#vector-indices)|yes|
|`columns`|The number of columns within the matrix|`int`|any positive integer value|yes|
|`vector`|The vector of numbers included within the matrix|`array`|see calling object|yes|

### [Vector Indices](#vector-indices)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`start`|The index of the first item within the vector|`int`|any positive integer value|yes|
|`end`|The index of the last item within the vector|`int`|any positive integer value|yes|

### [Complex Number](#complex-number)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`real`|The portion of a complex number. Note: the accepted value must match for both portions of the complex number|`int`,`long`,`double`|any numerical value|yes|
|`imaginary`|The portion of a complex number. Note: the accepted value must match for both portions of the complex number|`int`,`long`,`double`|any numerical value|yes|

### [Unit Value](#unit-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|Unit the value is based within|`string`|see calling object|yes|
|`value`|Value of the feature|see calling object|see calling object|yes|
