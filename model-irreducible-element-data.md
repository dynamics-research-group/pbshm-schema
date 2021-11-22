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

#### [Beam Rectangular Element Geometry](#beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeBeamRectangularElementGeometry`](#type-beam-rectangular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsBeamRectangularElementGeometry`](#dimensions-beam-rectangular-element-geometry)|no|

##### [Type Beam Rectangular Element Geometry](#type-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`beam` -> `rectangular`|yes|

##### [Dimensions Beam Rectangular Element Geometry](#dimensions-beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Beam Circular Element Geometry](#beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeBeamCircularElementGeometry`](#type-beam-circular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsBeamCircularElementGeometry`](#dimensions-beam-circular-element-geometry)|no|

##### [Type Beam Circular Element Geometry](#type-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`beam` -> `circular`|yes|

##### [Dimensions Beam Circular Element Geometry](#dimensions-beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Beam I-beam Element Geometry](#beam-ibeam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeBeamI-beamElementGeometry`](#type-beam-ibeam-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsBeamI-beamElementGeometry`](#dimensions-beam-ibeam-element-geometry)|no|

##### [Type Beam I-beam Element Geometry](#type-beam-ibeam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`beam` -> `i-beam`|yes|

##### [Dimensions Beam I-beam Element Geometry](#dimensions-beam-ibeam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`d`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`h`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`s`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`b`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`t`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Beam Other Element Geometry](#beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typeBeamOtherElementGeometry`](#type-beam-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsBeamOtherElementGeometry`](#dimensions-beam-other-element-geometry)|no|

##### [Type Beam Other Element Geometry](#type-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`beam` -> `other`|yes|

##### [Dimensions Beam Other Element Geometry](#dimensions-beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`*`|the axis, source, unit and value of the measurement|`object`|[`angularDimension`](#angular-dimension)|-|

#### [Plate Rectangular Element Geometry](#plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typePlateRectangularElementGeometry`](#type-plate-rectangular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsPlateRectangularElementGeometry`](#dimensions-plate-rectangular-element-geometry)|no|

##### [Type Plate Rectangular Element Geometry](#type-plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`plate` -> `rectangular`|yes|

##### [Dimensions Plate Rectangular Element Geometry](#dimensions-plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Plate Circular Element Geometry](#plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typePlateCircularElementGeometry`](#type-plate-circular-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsPlateCircularElementGeometry`](#dimensions-plate-circular-element-geometry)|no|

##### [Type Plate Circular Element Geometry](#type-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`plate` -> `circular`|yes|

##### [Dimensions Plate Circular Element Geometry](#dimensions-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`_`|the axis, source, unit and value of the measurement|`object`|[`wildcardDimension`](#wildcard-dimension)|no|
|`thickness`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`radius`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

#### [Plate Other Element Geometry](#plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`typePlateOtherElementGeometry`](#type-plate-other-element-geometry)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|[`dimensionsPlateOtherElementGeometry`](#dimensions-plate-other-element-geometry)|no|

##### [Type Plate Other Element Geometry](#type-plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the geometrical type|`string`|`plate` -> `other`|yes|

##### [Dimensions Plate Other Element Geometry](#dimensions-plate-other-element-geometry)
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
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|material type of element|`object`|[`typeElementMaterial`](#type-element-material)|yes|
|`symmetry`|symmetry of the material|`string`|`isotropic`|yes, if `properties` provided|
|`properties`|array of material properties|`array`|[`propertiesElementMaterial`](#properties-element-material)|no|

#### [Type Element Material](#type-element-material)

##### [Ferrous Alloy Type Element Material](#ferrous-alloy-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`metal` -> `ferrousAlloy` -> `steel`, `iron`|yes|

##### [Metal Type Element Material](#metal-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`metal` -> `aluminiumAlloy`, `nickelAlloy`, `copperAlloy`, `titaniumAlloy`|yes|

##### [Ceramic Type Element Material](#ceramic-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`ceramic` -> `glass`, `clayProduct`, `refractory`, `abrasive`, `cement`, `advancedCeramic`|yes|

##### [Polymer Type Element Material](#polymer-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`polymer` -> `thermoplastic`, `thermoset`, `elastomer`|yes|

##### [Composite Type Element Material](#composite-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`composite` -> `particle-reinforced`, `fibre-reinforced`, `structural`|yes|

##### [`other` Type Element Material](#other-type-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|name of the material type|`string`|`other`|yes|

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

## [Relationship Shared Objects](#relationship-objects)

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

# [Global Common Objects](#shared-objects)

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
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`x`|the x translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|
|`y`|the y translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|
|`z`|the z translation value within the coordinate space|`object`|[`boundedLinearValue`](#bounded-linear-value)|no|

### [Bounded Rotational Coordinates](#bounded-rotational-coordinates)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`alpha`|the alpha rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|
|`beta`|the beta rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|
|`gamma`|the gamma rotation value within the coordinate space|`object`|[`boundedAngularValue`](#bounded-angular-value)|no|

# [Global Value Objects](#value-objects)

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
