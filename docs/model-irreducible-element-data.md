# [Irreducible Element](#irreducible-element)
# [Models](#models)

## [Free Model](#free-model)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the model|`string`|`free`|yes|
|`elements`|this is the array of elements within the irreducible element model|`array`|[`regular`](#regular-element)|yes, if no `relationships`|
|`relationships`|this is the array of relationships within the irreducible element model|`array`|[`perfect`](#perfect-relationship), [`connection`](#connection-relationship), [`joint`](#joint-relationship)|yes, if no `elements`|

## [Grounded Model](#grounded-model)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the model|`string`|`grounded`|yes|
|`elements`|this is the array of elements within the irreducible element model|`array`|[`regular`](#regular-element), [`ground`](#ground-element)|yes, if no `relationships`|
|`relationships`|this is the array of relationships within the irreducible element model|`array`|[`perfect`](#perfect-relationship), [`connection`](#connection-relationship), [`joint`](#joint-relationship), [`boundary`](#boundary-relationship)|yes, if no `elements`|

# [Elements](#elements)

## [Regular Element](#regular-element)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique element name within the model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information about the element|`string`|*|no|
|`type`|the element type (see URL)|`string`|`regular`|yes|
|`coordinates`|the coordinates of the element|`object`|[`elementCoordinates`](#element-coordinates)|no|
|`contextual`|additional contextual information on the element|`object`|[`elementContextual`](#element-contextual)|yes|
|`geometry`|geometrical description of the element|`object`|[`elementGeometry`](#element-geometry)|yes|
|`material`|material properties of the element|`object`|[`elementMaterial`](#element-material)|yes|

### [Element Coordinates](#element-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`global`|translational and rotational movements within the coordinate space|`object`|[`globalElementCoordinates`](#global-element-coordinates)|yes|

#### [Global Element Coordinates](#global-element-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`translational`|values for the x, y and z translations within the coordinate space|`object`|[`translationalCoordinates`](#translational-coordinates)|yes|
|`rotational`|values for the alpha, beta and gamma rotations within the coordinate space|`object`|[`rotationalCoordinates`](#rotational-coordinates)|no|

### [Element Contextual](#element-contextual)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the element|`string`|`wall`, `slab`, `beam`, `cable`, `block`, `plate`, `column`, `deck`, `aerofoil`, `wing`, `fuselage`, `tower`, `wheel`, `other`|yes|

### [Element Geometry](#element-geometry)

#### [Solid Beam Rectangular Element Geometry](#solid-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamRectangularElementGeometry`](#type-solid-beam-rectangular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamRectangularElementGeometry`](#dimensions-solid-beam-rectangular-element-geometry)|no|

##### [Type Solid Beam Rectangular Element Geometry](#type-solid-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `rectangular`|yes|

##### [Dimensions Solid Beam Rectangular Element Geometry](#dimensions-solid-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Beam Rectangular Element Geometry](#shell-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellBeamRectangularElementGeometry`](#type-shell-beam-rectangular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellBeamRectangularElementGeometry`](#dimensions-shell-beam-rectangular-element-geometry)|no|

##### [Type Shell Beam Rectangular Element Geometry](#type-shell-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `beam` -> `rectangular`|yes|

##### [Dimensions Shell Beam Rectangular Element Geometry](#dimensions-shell-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Beam Circular Element Geometry](#solid-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamCircularElementGeometry`](#type-solid-beam-circular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamCircularElementGeometry`](#dimensions-solid-beam-circular-element-geometry)|no|

##### [Type Solid Beam Circular Element Geometry](#type-solid-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `circular`|yes|

##### [Dimensions Solid Beam Circular Element Geometry](#dimensions-solid-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Beam Circular Element Geometry](#shell-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellBeamCircularElementGeometry`](#type-shell-beam-circular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellBeamCircularElementGeometry`](#dimensions-shell-beam-circular-element-geometry)|no|

##### [Type Shell Beam Circular Element Geometry](#type-shell-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `beam` -> `circular`|yes|

##### [Dimensions Shell Beam Circular Element Geometry](#dimensions-shell-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Beam I-beam Element Geometry](#solid-beam-i-beam-element-geometry)
This section also covers the `t-beam` and `c-beam` profiles, which share the same dimensions.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamIBeamElementGeometry`](#type-solid-beam-i-beam-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamIBeamElementGeometry`](#dimensions-solid-beam-i-beam-element-geometry)|no|

##### [Type Solid Beam I-beam Element Geometry](#type-solid-beam-i-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `i-beam`, `t-beam`, `c-beam`|yes|

##### [Dimensions Solid Beam I-beam Element Geometry](#dimensions-solid-beam-i-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`webThickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`flangeThickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Beam L-beam Element Geometry](#solid-beam-l-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamLBeamElementGeometry`](#type-solid-beam-l-beam-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamLBeamElementGeometry`](#dimensions-solid-beam-l-beam-element-geometry)|no|

##### [Type Solid Beam L-beam Element Geometry](#type-solid-beam-l-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `l-beam`|yes|

##### [Dimensions Solid Beam L-beam Element Geometry](#dimensions-solid-beam-l-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`angle`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|yes|

#### [Solid Beam Y-beam Element Geometry](#solid-beam-y-beam-element-geometry)
This section also covers the `ye-beam` and `m-beam` profiles, which share the same dimensions.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamYBeamElementGeometry`](#type-solid-beam-y-beam-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamYBeamElementGeometry`](#dimensions-solid-beam-y-beam-element-geometry)|no|

##### [Type Solid Beam Y-beam Element Geometry](#type-solid-beam-y-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `y-beam`, `ye-beam`, `m-beam`|yes|

##### [Dimensions Solid Beam Y-beam Element Geometry](#dimensions-solid-beam-y-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`baseWidth`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`topWidth`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Beam U-beam Element Geometry](#solid-beam-u-beam-element-geometry)
This section also covers the `um-beam` profile, which shares the same dimensions.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamUBeamElementGeometry`](#type-solid-beam-u-beam-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamUBeamElementGeometry`](#dimensions-solid-beam-u-beam-element-geometry)|no|

##### [Type Solid Beam U-beam Element Geometry](#type-solid-beam-u-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `u-beam`, `um-beam`|yes|

##### [Dimensions Solid Beam U-beam Element Geometry](#dimensions-solid-beam-u-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`baseWidth`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`topWidth`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`openingWidth`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Beam Other Element Geometry](#solid-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidBeamOtherElementGeometry`](#type-solid-beam-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidBeamOtherElementGeometry`](#dimensions-solid-beam-other-element-geometry)|no|

##### [Type Solid Beam Other Element Geometry](#type-solid-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `beam` -> `other`|yes|

##### [Dimensions Solid Beam Other Element Geometry](#dimensions-solid-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Shell Beam Other Element Geometry](#shell-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellBeamOtherElementGeometry`](#type-shell-beam-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellBeamOtherElementGeometry`](#dimensions-shell-beam-other-element-geometry)|no|

##### [Type Shell Beam Other Element Geometry](#type-shell-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `beam` -> `other`|yes|

##### [Dimensions Shell Beam Other Element Geometry](#dimensions-shell-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Solid Plate Rectangular Element Geometry](#solid-plate-rectangular-element-geometry)
Plates only support the `solid` material mode; there is no `shell` plate geometry.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidPlateRectangularElementGeometry`](#type-solid-plate-rectangular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidPlateRectangularElementGeometry`](#dimensions-solid-plate-rectangular-element-geometry)|no|

##### [Type Solid Plate Rectangular Element Geometry](#type-solid-plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `plate` -> `rectangular`|yes|

##### [Dimensions Solid Plate Rectangular Element Geometry](#dimensions-solid-plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Plate Circular Element Geometry](#solid-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidPlateCircularElementGeometry`](#type-solid-plate-circular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidPlateCircularElementGeometry`](#dimensions-solid-plate-circular-element-geometry)|no|

##### [Type Solid Plate Circular Element Geometry](#type-solid-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `plate` -> `circular`|yes|

##### [Dimensions Solid Plate Circular Element Geometry](#dimensions-solid-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Plate Other Element Geometry](#solid-plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidPlateOtherElementGeometry`](#type-solid-plate-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidPlateOtherElementGeometry`](#dimensions-solid-plate-other-element-geometry)|no|

##### [Type Solid Plate Other Element Geometry](#type-solid-plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `plate` -> `other`|yes|

##### [Dimensions Solid Plate Other Element Geometry](#dimensions-solid-plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Solid Translate Cuboid Element Geometry](#solid-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateCuboidElementGeometry`](#type-solid-translate-cuboid-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateCuboidElementGeometry`](#dimensions-solid-translate-cuboid-element-geometry)|no|

##### [Type Solid Translate Cuboid Element Geometry](#type-solid-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translate` -> `cuboid`|yes|

##### [Dimensions Solid Translate Cuboid Element Geometry](#dimensions-solid-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate Cuboid Element Geometry](#shell-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateCuboidElementGeometry`](#type-shell-translate-cuboid-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateCuboidElementGeometry`](#dimensions-shell-translate-cuboid-element-geometry)|no|

##### [Type Shell Translate Cuboid Element Geometry](#type-shell-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translate` -> `cuboid`|yes|

##### [Dimensions Shell Translate Cuboid Element Geometry](#dimensions-shell-translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate Sphere Element Geometry](#solid-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateSphereElementGeometry`](#type-solid-translate-sphere-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateSphereElementGeometry`](#dimensions-solid-translate-sphere-element-geometry)|no|

##### [Type Solid Translate Sphere Element Geometry](#type-solid-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translate` -> `sphere`|yes|

##### [Dimensions Solid Translate Sphere Element Geometry](#dimensions-solid-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate Sphere Element Geometry](#shell-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateSphereElementGeometry`](#type-shell-translate-sphere-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateSphereElementGeometry`](#dimensions-shell-translate-sphere-element-geometry)|no|

##### [Type Shell Translate Sphere Element Geometry](#type-shell-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translate` -> `sphere`|yes|

##### [Dimensions Shell Translate Sphere Element Geometry](#dimensions-shell-translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate Cylinder Element Geometry](#solid-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateCylinderElementGeometry`](#type-solid-translate-cylinder-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateCylinderElementGeometry`](#dimensions-solid-translate-cylinder-element-geometry)|no|

##### [Type Solid Translate Cylinder Element Geometry](#type-solid-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translate` -> `cylinder`|yes|

##### [Dimensions Solid Translate Cylinder Element Geometry](#dimensions-solid-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate Cylinder Element Geometry](#shell-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateCylinderElementGeometry`](#type-shell-translate-cylinder-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateCylinderElementGeometry`](#dimensions-shell-translate-cylinder-element-geometry)|no|

##### [Type Shell Translate Cylinder Element Geometry](#type-shell-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translate` -> `cylinder`|yes|

##### [Dimensions Shell Translate Cylinder Element Geometry](#dimensions-shell-translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate Aerofoil Element Geometry](#solid-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAerofoilElementGeometry`](#type-solid-translate-aerofoil-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAerofoilElementGeometry`](#dimensions-solid-translate-aerofoil-element-geometry)|no|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|

##### [Type Solid Translate Aerofoil Element Geometry](#type-solid-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translate` -> `aerofoil`|yes|

##### [Dimensions Solid Translate Aerofoil Element Geometry](#dimensions-solid-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate Aerofoil Element Geometry](#shell-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAerofoilElementGeometry`](#type-shell-translate-aerofoil-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAerofoilElementGeometry`](#dimensions-shell-translate-aerofoil-element-geometry)|no|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|

##### [Type Shell Translate Aerofoil Element Geometry](#type-shell-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translate` -> `aerofoil`|yes|

##### [Dimensions Shell Translate Aerofoil Element Geometry](#dimensions-shell-translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate Other Element Geometry](#solid-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateOtherElementGeometry`](#type-solid-translate-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateOtherElementGeometry`](#dimensions-solid-translate-other-element-geometry)|no|

##### [Type Solid Translate Other Element Geometry](#type-solid-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translate` -> `other`|yes|

##### [Dimensions Solid Translate Other Element Geometry](#dimensions-solid-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Shell Translate Other Element Geometry](#shell-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateOtherElementGeometry`](#type-shell-translate-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateOtherElementGeometry`](#dimensions-shell-translate-other-element-geometry)|no|

##### [Type Shell Translate Other Element Geometry](#type-shell-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translate` -> `other`|yes|

##### [Dimensions Shell Translate Other Element Geometry](#dimensions-shell-translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Solid Translate And Scale Cuboid Element Geometry](#solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAndScaleCuboidElementGeometry`](#type-solid-translate-and-scale-cuboid-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAndScaleCuboidElementGeometry`](#dimensions-solid-translate-and-scale-cuboid-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesSolidTranslateAndScaleCuboidElementGeometry`](#faces-solid-translate-and-scale-cuboid-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Solid Translate And Scale Cuboid Element Geometry](#type-solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translateAndScale` -> `cuboid`|yes|

##### [Dimensions Solid Translate And Scale Cuboid Element Geometry](#dimensions-solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Solid Translate And Scale Cuboid Element Geometry](#faces-solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCuboidElementGeometry`](#face-solid-translate-and-scale-cuboid-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCuboidElementGeometry`](#face-solid-translate-and-scale-cuboid-element-geometry)|yes|

##### [Face Solid Translate And Scale Cuboid Element Geometry](#face-solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceSolidTranslateAndScaleCuboidElementGeometry`](#dimensions-face-solid-translate-and-scale-cuboid-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Solid Translate And Scale Cuboid Element Geometry](#dimensions-face-solid-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate And Scale Cuboid Element Geometry](#shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAndScaleCuboidElementGeometry`](#type-shell-translate-and-scale-cuboid-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAndScaleCuboidElementGeometry`](#dimensions-shell-translate-and-scale-cuboid-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesShellTranslateAndScaleCuboidElementGeometry`](#faces-shell-translate-and-scale-cuboid-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Shell Translate And Scale Cuboid Element Geometry](#type-shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translateAndScale` -> `cuboid`|yes|

##### [Dimensions Shell Translate And Scale Cuboid Element Geometry](#dimensions-shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Shell Translate And Scale Cuboid Element Geometry](#faces-shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCuboidElementGeometry`](#face-shell-translate-and-scale-cuboid-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCuboidElementGeometry`](#face-shell-translate-and-scale-cuboid-element-geometry)|yes|

##### [Face Shell Translate And Scale Cuboid Element Geometry](#face-shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceShellTranslateAndScaleCuboidElementGeometry`](#dimensions-face-shell-translate-and-scale-cuboid-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Shell Translate And Scale Cuboid Element Geometry](#dimensions-face-shell-translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate And Scale Cylinder Element Geometry](#solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAndScaleCylinderElementGeometry`](#type-solid-translate-and-scale-cylinder-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAndScaleCylinderElementGeometry`](#dimensions-solid-translate-and-scale-cylinder-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesSolidTranslateAndScaleCylinderElementGeometry`](#faces-solid-translate-and-scale-cylinder-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Solid Translate And Scale Cylinder Element Geometry](#type-solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translateAndScale` -> `cylinder`|yes|

##### [Dimensions Solid Translate And Scale Cylinder Element Geometry](#dimensions-solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Solid Translate And Scale Cylinder Element Geometry](#faces-solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCylinderElementGeometry`](#face-solid-translate-and-scale-cylinder-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCylinderElementGeometry`](#face-solid-translate-and-scale-cylinder-element-geometry)|yes|

##### [Face Solid Translate And Scale Cylinder Element Geometry](#face-solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceSolidTranslateAndScaleCylinderElementGeometry`](#dimensions-face-solid-translate-and-scale-cylinder-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Solid Translate And Scale Cylinder Element Geometry](#dimensions-face-solid-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Shell Translate And Scale Cylinder Element Geometry](#shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAndScaleCylinderElementGeometry`](#type-shell-translate-and-scale-cylinder-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAndScaleCylinderElementGeometry`](#dimensions-shell-translate-and-scale-cylinder-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesShellTranslateAndScaleCylinderElementGeometry`](#faces-shell-translate-and-scale-cylinder-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Shell Translate And Scale Cylinder Element Geometry](#type-shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translateAndScale` -> `cylinder`|yes|

##### [Dimensions Shell Translate And Scale Cylinder Element Geometry](#dimensions-shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Shell Translate And Scale Cylinder Element Geometry](#faces-shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCylinderElementGeometry`](#face-shell-translate-and-scale-cylinder-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCylinderElementGeometry`](#face-shell-translate-and-scale-cylinder-element-geometry)|yes|

##### [Face Shell Translate And Scale Cylinder Element Geometry](#face-shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceShellTranslateAndScaleCylinderElementGeometry`](#dimensions-face-shell-translate-and-scale-cylinder-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Shell Translate And Scale Cylinder Element Geometry](#dimensions-face-shell-translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate And Scale Aerofoil Element Geometry](#solid-translate-and-scale-aerofoil-element-geometry)
Unlike the other translate and scale profiles, each face carries its own aerofoil `profile` rather than a `dimensions` object; `dimensions` is still required on the face but carries no fields of its own for this profile.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAndScaleAerofoilElementGeometry`](#type-solid-translate-and-scale-aerofoil-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAndScaleAerofoilElementGeometry`](#dimensions-solid-translate-and-scale-aerofoil-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesSolidTranslateAndScaleAerofoilElementGeometry`](#faces-solid-translate-and-scale-aerofoil-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Solid Translate And Scale Aerofoil Element Geometry](#type-solid-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translateAndScale` -> `aerofoil`|yes|

##### [Dimensions Solid Translate And Scale Aerofoil Element Geometry](#dimensions-solid-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Solid Translate And Scale Aerofoil Element Geometry](#faces-solid-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleAerofoilElementGeometry`](#face-solid-translate-and-scale-aerofoil-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleAerofoilElementGeometry`](#face-solid-translate-and-scale-aerofoil-element-geometry)|yes|

##### [Face Solid Translate And Scale Aerofoil Element Geometry](#face-solid-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceSolidTranslateAndScaleAerofoilElementGeometry`](#dimensions-face-solid-translate-and-scale-aerofoil-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|

###### [Dimensions Face Solid Translate And Scale Aerofoil Element Geometry](#dimensions-face-solid-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|

#### [Shell Translate And Scale Aerofoil Element Geometry](#shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAndScaleAerofoilElementGeometry`](#type-shell-translate-and-scale-aerofoil-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAndScaleAerofoilElementGeometry`](#dimensions-shell-translate-and-scale-aerofoil-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesShellTranslateAndScaleAerofoilElementGeometry`](#faces-shell-translate-and-scale-aerofoil-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Shell Translate And Scale Aerofoil Element Geometry](#type-shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translateAndScale` -> `aerofoil`|yes|

##### [Dimensions Shell Translate And Scale Aerofoil Element Geometry](#dimensions-shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Shell Translate And Scale Aerofoil Element Geometry](#faces-shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleAerofoilElementGeometry`](#face-shell-translate-and-scale-aerofoil-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleAerofoilElementGeometry`](#face-shell-translate-and-scale-aerofoil-element-geometry)|yes|

##### [Face Shell Translate And Scale Aerofoil Element Geometry](#face-shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceShellTranslateAndScaleAerofoilElementGeometry`](#dimensions-face-shell-translate-and-scale-aerofoil-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|

###### [Dimensions Face Shell Translate And Scale Aerofoil Element Geometry](#dimensions-face-shell-translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Solid Translate And Scale Compound Element Geometry](#solid-translate-and-scale-compound-element-geometry)
The compound profile builds a shape out of two dissimilar faces. Each face declares its own `type` (independent of the element's own type tree) and provides the fields that go with it; exactly one of `left` or `right` must be `aerofoil`, and the other must not be.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAndScaleCompoundElementGeometry`](#type-solid-translate-and-scale-compound-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAndScaleCompoundElementGeometry`](#dimensions-solid-translate-and-scale-compound-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesSolidTranslateAndScaleCompoundElementGeometry`](#faces-solid-translate-and-scale-compound-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Solid Translate And Scale Compound Element Geometry](#type-solid-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translateAndScale` -> `compound`|yes|

##### [Dimensions Solid Translate And Scale Compound Element Geometry](#dimensions-solid-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Solid Translate And Scale Compound Element Geometry](#faces-solid-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCompoundElementGeometry`](#face-solid-translate-and-scale-compound-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleCompoundElementGeometry`](#face-solid-translate-and-scale-compound-element-geometry)|yes|

##### [Face Solid Translate And Scale Compound Element Geometry](#face-solid-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of shape represented within the face of the compound shape|`string`|`aerofoil`, `cuboid`, `cylinder`, `other`|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|
|`profile`|values to represent the profile of the named aerofoil, matching the [Dimensions Face Solid Translate And Scale Aerofoil Element Geometry](#dimensions-face-solid-translate-and-scale-aerofoil-element-geometry) shape|`object`|[`aerofoilProfile`](#aerofoil-profile)|only if `type` is `aerofoil`|
|`dimensions`|dimension values to represent the shape of the face, matching the equivalent standalone profile's face dimensions ([cuboid](#dimensions-face-solid-translate-and-scale-cuboid-element-geometry), [cylinder](#dimensions-face-solid-translate-and-scale-cylinder-element-geometry), or a wildcard for `other`)|`object`|see `type`|only if `type` is `cuboid`, `cylinder`, or `other`|

#### [Shell Translate And Scale Compound Element Geometry](#shell-translate-and-scale-compound-element-geometry)
As with the other shell translate and scale profiles, each face's `dimensions` must also include `thickness` alongside whatever fields its `type` requires.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAndScaleCompoundElementGeometry`](#type-shell-translate-and-scale-compound-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAndScaleCompoundElementGeometry`](#dimensions-shell-translate-and-scale-compound-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesShellTranslateAndScaleCompoundElementGeometry`](#faces-shell-translate-and-scale-compound-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Shell Translate And Scale Compound Element Geometry](#type-shell-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translateAndScale` -> `compound`|yes|

##### [Dimensions Shell Translate And Scale Compound Element Geometry](#dimensions-shell-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Shell Translate And Scale Compound Element Geometry](#faces-shell-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCompoundElementGeometry`](#face-shell-translate-and-scale-compound-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleCompoundElementGeometry`](#face-shell-translate-and-scale-compound-element-geometry)|yes|

##### [Face Shell Translate And Scale Compound Element Geometry](#face-shell-translate-and-scale-compound-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of shape represented within the face of the compound shape|`string`|`aerofoil`, `cuboid`, `cylinder`, `other`|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|only if `type` is `aerofoil`|
|`dimensions`|dimension values to represent the shape of the face, requiring `thickness` plus whatever fields its `type` requires (matching the equivalent standalone shell profile's face dimensions)|`object`|see `type`|yes|

#### [Solid Translate And Scale Other Element Geometry](#solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeSolidTranslateAndScaleOtherElementGeometry`](#type-solid-translate-and-scale-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsSolidTranslateAndScaleOtherElementGeometry`](#dimensions-solid-translate-and-scale-other-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesSolidTranslateAndScaleOtherElementGeometry`](#faces-solid-translate-and-scale-other-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Solid Translate And Scale Other Element Geometry](#type-solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`solid` -> `translateAndScale` -> `other`|yes|

##### [Dimensions Solid Translate And Scale Other Element Geometry](#dimensions-solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Solid Translate And Scale Other Element Geometry](#faces-solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleOtherElementGeometry`](#face-solid-translate-and-scale-other-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceSolidTranslateAndScaleOtherElementGeometry`](#face-solid-translate-and-scale-other-element-geometry)|yes|

##### [Face Solid Translate And Scale Other Element Geometry](#face-solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceSolidTranslateAndScaleOtherElementGeometry`](#dimensions-face-solid-translate-and-scale-other-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Solid Translate And Scale Other Element Geometry](#dimensions-face-solid-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|

#### [Shell Translate And Scale Other Element Geometry](#shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeShellTranslateAndScaleOtherElementGeometry`](#type-shell-translate-and-scale-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsShellTranslateAndScaleOtherElementGeometry`](#dimensions-shell-translate-and-scale-other-element-geometry)|no|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|[`facesShellTranslateAndScaleOtherElementGeometry`](#faces-shell-translate-and-scale-other-element-geometry)|yes, if `bounding` or `dimensions` provided|

##### [Type Shell Translate And Scale Other Element Geometry](#type-shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`shell` -> `translateAndScale` -> `other`|yes|

##### [Dimensions Shell Translate And Scale Other Element Geometry](#dimensions-shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

##### [Faces Shell Translate And Scale Other Element Geometry](#faces-shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`left`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleOtherElementGeometry`](#face-shell-translate-and-scale-other-element-geometry)|yes|
|`right`|the face of an element within the bounding|`object`|[`faceShellTranslateAndScaleOtherElementGeometry`](#face-shell-translate-and-scale-other-element-geometry)|yes|

##### [Face Shell Translate And Scale Other Element Geometry](#face-shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsFaceShellTranslateAndScaleOtherElementGeometry`](#dimensions-face-shell-translate-and-scale-other-element-geometry)|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

###### [Dimensions Face Shell Translate And Scale Other Element Geometry](#dimensions-face-shell-translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

### [Element Material](#element-material)
An element's material is either a single [reference material](#reference-material) or a [composite material](#composite-material) built out of a matrix of reference materials.

#### [Reference Material](#reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|material type of element|`object`|[`typeReferenceMaterial`](#type-reference-material)|yes|
|`symmetry`|symmetry of the material|`string`|`isotropic`|yes, if `properties` provided|
|`properties`|array of material properties|`array`|[`propertiesElementMaterial`](#properties-element-material)|no|

##### [Type Reference Material](#type-reference-material)

###### [Ferrous Alloy Type Reference Material](#ferrous-alloy-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`metal` -> `ferrousAlloy` -> `steel`, `iron`|yes|

###### [Metal Type Reference Material](#metal-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`metal` -> `aluminiumAlloy`, `nickelAlloy`, `copperAlloy`, `titaniumAlloy`|yes|

###### [Ceramic Type Reference Material](#ceramic-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`ceramic` -> `glass`, `clayProduct`, `refractory`, `abrasive`, `cement`, `advancedCeramic`|yes|

###### [Polymer Type Reference Material](#polymer-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`polymer` -> `thermoplastic`, `thermoset`, `elastomer`, `resin`, `carbon`|yes|

###### [Wood Type Reference Material](#wood-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`wood` -> `ash`, `oak`, `maple`, `birch`, `pine`|yes|

###### [Rock Type Reference Material](#rock-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`rock` -> `basalt`, `marble`, `granite`|yes|

###### [Concrete Type Reference Material](#concrete-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`concrete`|yes|

###### [`other` Type Reference Material](#other-type-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`other`|yes|

#### [Composite Material](#composite-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|material type of element|`object`|[`typeCompositeMaterial`](#type-composite-material)|yes|
|`matrix`|matrix of reference materials that form the composite material|`object`|[`compositeMaterialMatrix`](#composite-material-matrix)|yes|
|`properties`|array of material properties for the composite material as a whole|`array`|[`propertiesElementMaterial`](#properties-element-material)|no|

##### [Type Composite Material](#type-composite-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`composite`|yes|

##### [Composite Material Matrix](#composite-material-matrix)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`base`|the base reference material of the composite|`object`|[`referenceMaterial`](#reference-material)|yes|
|`embedded`|the reference materials embedded within the base material, minimum 1 item|`array`|[`embeddedReferenceMaterial`](#embedded-reference-material)|yes|

###### [Embedded Reference Material](#embedded-reference-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|material type of element|`object`|[`typeReferenceMaterial`](#type-reference-material)|yes|
|`symmetry`|symmetry of the material|`string`|`isotropic`|yes, if `properties` provided|
|`properties`|array of material properties|`array`|[`propertiesElementMaterial`](#properties-element-material)|no|
|`method`|method for embedding the reference material within the base material|`string`|`fibre`, `particle`, `woven`, `bar`|yes|

#### [Properties Element Material](#properties-element-material)

##### [Density Numerical Property Element Material](#density-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`density`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|
|`unit`|unit that the value of the material property is based in|`string`|`kg/m^3`, `g/cm^3`, `kg/L`, `g/mL`, `t/m^3`, `kg/dm^3`, `oz/cu in`, `other`|yes|

##### [Thermal Expansion Coefficient Numerical Property Element Material](#thermal-expansion-coefficient-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`linearThermalExpansionCoefficient`, `volumetricThermalExpansionCoefficient`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|
|`unit`|unit that the value of the material property is based in|`string`|`K^-1`, `C^-1`, `F^-1`, `other`|yes|

##### [Pressure Numerical Property Element Material](#pressure-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`youngsModulus`, `shearModulus`, `compressiveStrength`, `shearStrength`, `ultimateTensileStrength`, `yieldStrength`, `0.1%ProofStress`, `fatigueStrengthCoefficient`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GPa`, `MPa`, `kPa`, `Pa`, `Mpsi`, `ksi`, `psi`, `other`|yes|

##### [Tensile Toughness Numerical Property Element Material](#tensile-toughness-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`tensileToughness`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GJ/m^3`, `MJ/m^3`, `kJ/m^3`, `J/m^3`, `ibf/in^3`, `other`|yes|

##### [Fracture Toughness Numerical Property Element Material](#fracture-toughness-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`fractureToughness`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|
|`unit`|unit that the value of the material property is based in|`string`|`TPa/m^(1/2)`, `GPa/m^(1/2)`, `MPa/m^(1/2)`, `kPa/m^(1/2)`, `Pa/m^(1/2)`, `psi/in^(1/2)`, `other`|yes|

##### [Density Conditional Property Element Material](#density-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`density`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|
|`unit`|unit that the value of the material property is based in|`string`|`kg/m^3`, `g/cm^3`, `kg/L`, `g/mL`, `t/m^3`, `kg/dm^3`, `oz/cu in`, `other`|yes|

##### [Thermal Expansion Coefficient Conditional Property Element Material](#thermal-expansion-coefficient-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`linearThermalExpansionCoefficient`, `volumetricThermalExpansionCoefficient`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|
|`unit`|unit that the value of the material property is based in|`string`|`K^-1`, `C^-1`, `F^-1`, `other`|yes|

##### [Pressure Conditional Property Element Material](#pressure-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`youngsModulus`, `shearModulus`, `compressiveStrength`, `shearStrength`, `ultimateTensileStrength`, `yieldStrength`, `0.1%ProofStress`, `fatigueStrengthCoefficient`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GPa`, `MPa`, `kPa`, `Pa`, `Mpsi`, `ksi`, `psi`, `other`|yes|

##### [Tensile Toughness Conditional Property Element Material](#tensile-toughness-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`tensileToughness`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GJ/m^3`, `MJ/m^3`, `kJ/m^3`, `J/m^3`, `ibf/in^3`, `other`|yes|

##### [Fracture Toughness Conditional Property Element Material](#fracture-toughness-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`fractureToughness`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|
|`unit`|unit that the value of the material property is based in|`string`|`TPa/m^(1/2)`, `GPa/m^(1/2)`, `MPa/m^(1/2)`, `kPa/m^(1/2)`, `Pa/m^(1/2)`, `psi/in^(1/2)`, `other`|yes|

##### [Unit Free Numerical Property Element Material](#unit-free-numerical-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`poissonsRatio`, `elongation`, `reductionInArea`, `fatigueStrengthExponent`, `fatigueDuctilityCoefficient`, `fatigueDuctilityExponent`|yes|
|`value`|value of the material property|`int`, `double`|any numerical value|yes|

##### [Unit Free Conditional Property Element Material](#unit-free-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`poissonsRatio`, `elongation`, `reductionInArea`, `fatigueStrengthExponent`, `fatigueDuctilityCoefficient`, `fatigueDuctilityExponent`|yes|
|`value`|value of the material property|`array`|[`conditionalMaterialProperty`](#conditional-material-property)|yes|

##### [Vickers Hardness Conditional Property Element Material](#vickers-hardness-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`vickersHardness`|yes|
|`value`|value of the material property|`array`|[`vickersHardnessConditionalMaterialProperty`](#vickers-hardness-conditional-material-property)|yes|

##### [Vickers Hardness Conditional Material Property](#vickers-hardness-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`environmental`|environmental conditions for the given material property value|`object`|[`environmentalConditionalMaterialProperty`](#environmental-conditional-material-property)|yes, if no `parameters`|
|`parameters`|parameters conditions for the given material property value|`object`|[`parametersVickersHardnessConditionalMaterialProperty`](#parameters-vickers-hardness-conditional-material-property)|yes, if no `environmental`|
|`value`|value of the material property with the given conditions|`int`, `double`|any numerical value|yes|

###### [Parameters Vickers Hardness Conditional Material Property](#parameters-vickers-hardness-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`||`object`|[`wildcardValue`](#wildcard-value)|no|
|`load`||`object`|[`forceValue`](#force-value)|yes|
|`duration`||`object`|[`durationValue`](#duration-value)|yes|

##### [Brinell Hardness Conditional Property Element Material](#brinell-hardness-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`brinellHardness`|yes|
|`value`|value of the material property|`array`|[`brinellHardnessConditionalMaterialProperty`](#brinell-hardness-conditional-material-property)|yes|

##### [Brinell Hardness Conditional Material Property](#brinell-hardness-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`environmental`|environmental conditions for the given material property value|`object`|[`environmentalConditionalMaterialProperty`](#environmental-conditional-material-property)|yes, if no `parameters`|
|`parameters`|parameters conditions for the given material property value|`object`|[`parametersBrinellHardnessConditionalMaterialProperty`](#parameters-brinell-hardness-conditional-material-property)|yes, if no `environmental`|
|`value`|value of the material property with the given conditions|`int`, `double`|any numerical value|yes|

###### [Parameters Brinell Hardness Conditional Material Property](#parameters-brinell-hardness-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`||`object`|[`wildcardValue`](#wildcard-value)|no|
|`diameter`||`object`|[`brinellHardnessParameterDiameterValue`](#brinell-hardness-parameter-diameter-value)|yes|
|`ball`||`object`|[`brinellHardnessParameterBallValue`](#brinell-hardness-parameter-ball-value)|yes|
|`force`||`object`|[`forceValue`](#force-value)|yes|

##### [Brinell Hardness Parameter Diameter Value](#brinell-hardness-parameter-diameter-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`mm`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

##### [Brinell Hardness Parameter Ball Value](#brinell-hardness-parameter-ball-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`W`, `S`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

## [Ground Element](#ground-element)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique element name within the model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information about the element|`string`|*|no|
|`type`|the element type (see URL)|`string`|`ground`|yes|

## [Element Shared Objects](#element-shared-objects)

### [Cuboid Bounding](#cuboid-bounding)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the bounding|`string`|`cuboid`|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

### [Face Translation](#face-translation)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`y`|the y translation value within the coordinate space|`object`|[`linearValue`](#linear-value)|yes|
|`z`|the z translation value within the coordinate space|`object`|[`linearValue`](#linear-value)|yes|

### [Aerofoil Profile](#aerofoil-profile)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the aerofoil profile represented|`string`|`naca-four-digit-series`, `naca-five-digit-series`|yes|
|`value`|the value of the aerofoil profile|`string`|4 characters for `naca-four-digit-series`, 5 characters for `naca-five-digit-series`|yes|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsAerofoilProfile`](#dimensions-aerofoil-profile)|yes|

#### [Dimensions Aerofoil Profile](#dimensions-aerofoil-profile)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`chordLength`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`twistAngle`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|no|

#### [Conditional Material Property](#conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`environmental`|environmental conditions for the given material property value|`object`|[`environmentalConditionalMaterialProperty`](#environmental-conditional-material-property)|yes, if no `parameters`|
|`parameters`|parameters conditions for the given material property value|`object`|[`parametersConditionalMaterialProperty`](#parameters-conditional-material-property)|yes, if no `environmental`|
|`value`|value of the material property with the given conditions|`int`, `double`|any numerical value|yes|

##### [Environmental Conditional Material Property](#environmental-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`temperature`|temperature that the test was conducted at|`object`|[`temperatureValue`](#temperature-value)|no|
|`humidity`|humidity that the test was conducted at|`object`|[`percentageValue`](#percentage-value)|no|
|`_`||`object`|[`wildcardValue`](#wildcard-value)|no|

##### [Parameters Conditional Material Property](#parameters-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`||`object`|[`wildcardValue`](#wildcard-value)|no|

# [Relationships](#relationships)

## [Perfect Relationship](#perfect-relationship)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`perfect`|yes|
|`elements`|the elements involved in the relationship|`array`|[`namedRelationshipElement`](#named-relationship-element)|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|

## [Connection Relationship](#connection-relationship)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`connection`|yes|
|`elements`|the elements involved in the relationship|`array`|[`connectionRelationshipElement`](#connection-relationship-element)|yes|

#### [Connection Relationship Element](#connection-relationship-element)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the element within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`nature`|the nature of the relationship to the element|`object`|[`staticNature`](#static-nature)|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|

## [Joint Relationship](#joint-relationship)

### [Static Joint](#static-joint)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`joint`|yes|
|`elements`|the elements involved in the relationship|`array`|[`positionedRelationshipElement`](#positioned-relationship-element)|yes|
|`nature`|the nature of the relationship to the element|`object`|[`staticNature`](#static-nature)|yes|

### [Dynamic Joint](#dynamic-joint)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`joint`|yes|
|`elements`|the elements involved in the relationship|`array`|[`positionedRelationshipElement`](#positioned-relationship-element)|yes|
|`nature`|the nature of the relationship to the element|`object`|[`dynamicNature`](#dynamic-nature)|yes|
|`degreesOfFreedom`|the degrees of freedom within the relationship|`object`|[`dynamicJointRelationshipDegreesOfFreedom`](#dynamic-joint-relationship-degrees-of-freedom)|no|

##### [Dynamic Joint Relationship Degrees Of Freedom](#dynamic-joint-relationship-degrees-of-freedom)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`global`|the degrees of freedom in the global coordinate space|`object`|[`globalDynamicJointRelationshipDegreesOfFreedom`](#global-dynamic-joint-relationship-degrees-of-freedom)|yes|

###### [Global Dynamic Joint Relationship Degrees Of Freedom](#global-dynamic-joint-relationship-degrees-of-freedom)
At least one of `translational` or `rotational` must be provided.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`translational`|the x, y and z values for translational degrees of freedom|`object`|[`boundedTranslationalCoordinates`](#bounded-translational-coordinates)|no|
|`rotational`|the alpha, beta and gamma values for the rotational degrees of freedom|`object`|[`boundedRotationalCoordinates`](#bounded-rotational-coordinates)|no|

## [Boundary Relationship](#boundary-relationship)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`boundary`|yes|
|`elements`|the elements involved in the relationship|`array`|[`namedRelationshipElement`](#named-relationship-element)|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|

## [Relationship Shared Objects](#relationship-shared-objects)

### [Relationship Coordinates](#relationship-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`global`|translational movements within the coordinate space|`object`|[`globalRelationshipCoordinates`](#global-relationship-coordinates)|yes|

#### [Global Relationship Coordinates](#global-relationship-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`translational`|values for the x, y and z translations within the coordinate space|`object`|[`translationalCoordinates`](#translational-coordinates)|yes|

#### [Named Relationship Element](#named-relationship-element)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the element within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|

### [Static Nature](#static-nature)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the nature|`string`|`static`|yes|
|`nature`|the nature of the relationship to the element|`object`|[`natureStaticNature`](#nature-static-nature)|yes|

#### [Nature Static Nature](#nature-static-nature)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the nature|`string`|`bolted`, `welded`, `adhesive`, `other`|yes|

#### [Positioned Relationship Element](#positioned-relationship-element)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the element within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|

### [Dynamic Nature](#dynamic-nature)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the nature|`string`|`dynamic`|yes|
|`nature`|the nature of the relationship to the element|`object`|[`natureDynamicNature`](#nature-dynamic-nature)|yes|

#### [Nature Dynamic Nature](#nature-dynamic-nature)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the nature|`string`|`hinge`, `ballAndSocket`, `pinned`, `expansion`, `ballBearing`, `other`|yes|

# [Global Common Objects](#global-common-objects)

## [Translational Coordinates](#translational-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`x`|the x translation value within the coordinate space|`object`|[`linearValue`](#linear-value)|yes|
|`y`|the y translation value within the coordinate space|`object`|[`linearValue`](#linear-value)|yes|
|`z`|the z translation value within the coordinate space|`object`|[`linearValue`](#linear-value)|yes|

## [Rotational Coordinates](#rotational-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`alpha`|the alpha rotation value within the coordinate space|`object`|[`angularValue`](#angular-value)|yes|
|`beta`|the beta rotation value within the coordinate space|`object`|[`angularValue`](#angular-value)|yes|
|`gamma`|the gamma rotation value within the coordinate space|`object`|[`angularValue`](#angular-value)|yes|

## [Linear Dimension](#linear-dimension)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`axis`|the axis that the measurement corresponds to|`string`|`x`, `y`, `z`, `xy`, `xz`, `yz`|yes|
|`source`|the source of where the measured value came from|`string`|`measured`, `nominal`|yes|
|`unit`|the unit that the value is based in|`string`|`mm`, `cm`, `m`, `km`, `other`|yes|
|`value`|the value for the measurement|`int`, `double`|any numerical value|yes|

## [Wildcard Dimension](#wildcard-dimension)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`axis`|the axis that the measurement corresponds to|`string`|`x`, `y`, `z`, `xy`, `xz`, `yz`|yes|
|`source`|the source of where the measured value came from|`string`|`measured`, `nominal`|yes|
|`unit`|the unit that the value is based in|any supported type|any value|yes|
|`value`|the value for the measurement|`int`, `double`|any numerical value|yes|

## [Angular Dimension](#angular-dimension)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`axis`|the axis that the measurement corresponds to|`string`|`x`, `y`, `z`, `xy`, `xz`, `yz`|yes|
|`source`|the source of where the measured value came from|`string`|`measured`, `nominal`|yes|
|`unit`|the unit that the value is based in|`string`|`degrees`, `radians`, `other`|yes|
|`value`|the value for the measurement|`int`, `double`|any numerical value|yes|

### [Bounded Translational Coordinates](#bounded-translational-coordinates)
At least one of `x`, `y` or `z` must be provided.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`x`|the x translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|
|`y`|the y translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|
|`z`|the z translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|

### [Bounded Rotational Coordinates](#bounded-rotational-coordinates)
At least one of `alpha`, `beta` or `gamma` must be provided.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`alpha`|the alpha rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|
|`beta`|the beta rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|
|`gamma`|the gamma rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|

# [Global Value Objects](#global-value-objects)

## [Linear Value](#linear-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|the unit that the value is based in|`string`|`mm`, `cm`, `m`, `km`, `other`|yes|
|`value`|the value for the axis|`int`, `double`|any numerical value|yes|

## [Angular Value](#angular-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|the unit that the value is based in|`string`|`degrees`, `radians`, `other`|yes|
|`value`|the value for the axis|`int`, `double`|any numerical value|yes|

## [Temperature Value](#temperature-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`C`, `F`, `K`, `other`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

## [Percentage Value](#percentage-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`%`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

## [Wildcard Value](#wildcard-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|*|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

## [Force Value](#force-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`kgf`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

## [Duration Value](#duration-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`unit`|unit that the value of the material property is based in|`string`|`s`|yes|
|`value`|value of the material property based in the selected unit|`int`, `double`|any numerical value|yes|

### [Bounded Linear Value](#bounded-linear-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`minimum`|the minimum value for the degree of freedom|`int`, `double`|any numerical value|yes|
|`maximum`|the maximum value for the degree of freedom|`int`, `double`|any numerical value|yes|
|`unit`|the unit that the minimum and maximum are based in|`string`|`mm`, `cm`, `m`, `km`, `other`|yes|

### [Bounded Angular Value](#bounded-angular-value)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`minimum`|the minimum value for the degree of freedom|`int`, `double`|any numerical value|yes|
|`maximum`|the maximum value for the degree of freedom|`int`, `double`|any numerical value|yes|
|`unit`|the unit that the minimum and maximum are based in|`string`|`degrees`, `radians`, `other`|yes|
