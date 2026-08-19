# [Irreducible Element](#irreducible-element)
The original version (v1.1.0) of the specification and descriptors of each object in an Irreducible Element (IE) model were part of the paper by Brennan *et al.* 2025 ["Foundations of population-based SHM, Part V: Network, framework and database"](https://doi.org/10.1016/j.ymssp.2024.111602) (10.1016/j.ymssp.2024.111602). A short summary is provided below for key objects; however, the reader is encouraged to read the full specification in Section 4 of the paper.

The documentation below is for the latest version of the schema (v1.4.1) so will differ slightly from the specification included in the paper outlined above; however, the general principles stay the same.

# [Models](#models)

## [Free Model](#free-model)
A `free` model describes a structure that is free from any external influences. It can only contain [`regular`](#regular-element) elements and [`perfect`](#perfect-relationship), [`connection`](#connection-relationship), and [`joint`](#joint-relationship) relationships.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the model|`string`|`free`|yes|
|`elements`|this is the array of elements within the irreducible element model|`array`|[`regular`](#regular-element)|yes, if no `relationships`|
|`relationships`|this is the array of relationships within the irreducible element model|`array`|[`perfect`](#perfect-relationship), [`connection`](#connection-relationship), [`joint`](#joint-relationship)|yes, if no `elements`|

## [Grounded Model](#grounded-model)
A `grounded` model describes a structure that includes external influences as references in the model. It can contain the same elements ([`regular`](#regular-element)) and relationships ([`perfect`](#perfect-relationship), [`connection`](#connection-relationship), and [`joint`](#joint-relationship)) as a `free` model, but must also include at least one [`ground`](#ground-element) element and one [`boundary`](#boundary-relationship) relationship to be considered valid.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of the model|`string`|`grounded`|yes|
|`elements`|this is the array of elements within the irreducible element model|`array`|[`regular`](#regular-element), [`ground`](#ground-element)|yes, if no `relationships`|
|`relationships`|this is the array of relationships within the irreducible element model|`array`|[`perfect`](#perfect-relationship), [`connection`](#connection-relationship), [`joint`](#joint-relationship), [`boundary`](#boundary-relationship)|yes, if no `elements`|

# [Elements](#elements)

## [Regular Element](#regular-element)
A `regular` element represents a structurally-significant component in the modelled structure, regardless of scale.

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
Every element geometry object is built from the same three properties; the specific `type` tree and the `dimensions` fields it supports vary by the geometry type selected below.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type), see the specific geometry type below for the supported type tree|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|see the specific geometry type below for the supported dimensions|no|

#### [Beam Rectangular Element Geometry](#beam-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `beam` -> `rectangular` or<br>`shell` -> `beam` -> `rectangular`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width` and `height` are required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Beam Circular Element Geometry](#beam-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `beam` -> `circular` or<br>`shell` -> `beam` -> `circular`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length` and `radius` are required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam I-beam Element Geometry](#solid-beam-i-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `i-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width`, `height`, `webThickness` and `flangeThickness` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam T-beam Element Geometry](#solid-beam-t-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `t-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width`, `height`, `webThickness` and `flangeThickness` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam C-beam Element Geometry](#solid-beam-c-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `c-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width`, `height`, `webThickness` and `flangeThickness` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam L-beam Element Geometry](#solid-beam-l-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `l-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width`, `height` and `thickness` are required and must be of type [`linearDimension`](#linear-dimension). Property `angle` is required and must be of type [`angularDimension`](#angular-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam Y-beam Element Geometry](#solid-beam-y-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `y-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `height`, `baseWidth` and `topWidth` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam YE-beam Element Geometry](#solid-beam-ye-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `ye-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `height`, `baseWidth` and `topWidth` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam M-beam Element Geometry](#solid-beam-m-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `m-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `height`, `baseWidth` and `topWidth` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam U-beam Element Geometry](#solid-beam-u-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `u-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `height`, `baseWidth`, `topWidth` and `openingWidth` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Beam UM-beam Element Geometry](#solid-beam-um-beam-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `beam` -> `um-beam`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `height`, `baseWidth`, `topWidth` and `openingWidth` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Beam Other Element Geometry](#beam-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `beam` -> `other` or<br>`shell` -> `beam` -> `other`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension) or [`angularDimension`](#angular-dimension). In total, the `dimensions` object must declare at least 2 properties.|no|

#### [Solid Plate Rectangular Element Geometry](#solid-plate-rectangular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `plate` -> `rectangular`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `thickness`, `width` and `length` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Plate Circular Element Geometry](#solid-plate-circular-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `plate` -> `circular`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `thickness` and `radius` are required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Solid Plate Other Element Geometry](#solid-plate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of `solid` -> `plate` -> `other`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `thickness` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension) or [`angularDimension`](#angular-dimension). In total, the `dimensions` object must declare at least 2 properties.|no|

#### [Translate Cuboid Element Geometry](#translate-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translate` -> `cuboid` or<br>`shell` -> `translate` -> `cuboid`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `length`, `width` and `height` are required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate Sphere Element Geometry](#translate-sphere-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translate` -> `sphere` or<br>`shell` -> `translate` -> `sphere`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `radius` is required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate Cylinder Element Geometry](#translate-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translate` -> `cylinder` or<br>`shell` -> `translate` -> `cylinder`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|properties `radius` and `length` are required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate Aerofoil Element Geometry](#translate-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translate` -> `aerofoil` or<br>`shell` -> `translate` -> `aerofoil`|yes|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate Other Element Geometry](#translate-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translate` -> `other` or<br>`shell` -> `translate` -> `other`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|no|
|`dimensions`|dimension values to represent the shape of the element|`object`|If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension) or [`angularDimension`](#angular-dimension). In total, the `dimensions` object must declare at least 2 properties.|no|

#### [Translate And Scale Cuboid Element Geometry](#translate-and-scale-cuboid-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translateAndScale` -> `cuboid` or<br>`shell` -> `translateAndScale` -> `cuboid`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|`left` and `right`, both of type [`faceTranslateAndScaleElementGeometry`](#face-translate-and-scale-element-geometry), where `dimensions` properties `width` and `height` are required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, `dimensions` property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension).|yes, if `bounding` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate And Scale Cylinder Element Geometry](#translate-and-scale-cylinder-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translateAndScale` -> `cylinder` or<br>`shell` -> `translateAndScale` -> `cylinder`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|`left` and `right`, both of type [`faceTranslateAndScaleElementGeometry`](#face-translate-and-scale-element-geometry), where `dimensions` property `radius` is required and must be of type [`linearDimension`](#linear-dimension). If the root of the type tree is `shell`, `dimensions` property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension).|yes, if `bounding` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate And Scale Aerofoil Element Geometry](#translate-and-scale-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translateAndScale` -> `aerofoil` or<br>`shell` -> `translateAndScale` -> `aerofoil`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|`left` and `right`, both of type [`faceTranslateAndScaleElementGeometry`](#face-translate-and-scale-element-geometry), plus a required `profile` property of type [`aerofoilProfile`](#aerofoil-profile). If the root of the type tree is `shell`, `dimensions` property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension).|yes, if `bounding` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

#### [Translate And Scale Compound Element Geometry](#translate-and-scale-compound-element-geometry)
The compound profile builds a shape out of two dissimilar faces: one aerofoil-shaped face and one basic-shaped face. Each declares its own `type` (independent of the element's own type tree); exactly one of `left` or `right` must be the aerofoil face, and the other must be the basic-shaped face. If the root of the type tree is `shell`, each face's `dimensions` must also include `thickness` alongside whatever fields its `type` requires.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translateAndScale` -> `compound` or<br>`shell` -> `translateAndScale` -> `compound`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|`left` and `right`; exactly one must be of type [`faceTranslateAndScaleCompoundAerofoilElementGeometry`](#face-translate-and-scale-compound-aerofoil-element-geometry) and the other must be of type [`faceTranslateAndScaleCompoundPrimitiveElementGeometry`](#face-translate-and-scale-compound-primitive-element-geometry)|yes, if `bounding` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

##### [Face Translate And Scale Compound Aerofoil Element Geometry](#face-translate-and-scale-compound-aerofoil-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of shape represented within the face of the compound shape|`string`|`aerofoil`|yes|
|`profile`|values to represent the profile of the named aerofoil|`object`|[`aerofoilProfile`](#aerofoil-profile)|yes|
|`dimensions`|dimension values to represent the shape of the face|`object`|If the root of the type tree is `shell`, property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

##### [Face Translate And Scale Compound Primitive Element Geometry](#face-translate-and-scale-compound-primitive-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|the type of shape represented within the face of the compound shape|`string`|`cuboid`, `cylinder`, `other`|yes|
|`dimensions`|dimension values to represent the shape of the face|`object`|if `type` is `cuboid`, properties `width` and `height` are required; if `type` is `cylinder`, property `radius` is required; if `type` is `other`, no further properties are required. If the root of the type tree is `shell`, property `thickness` is also required, regardless of `type`. All required properties must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

#### [Translate And Scale Other Element Geometry](#translate-and-scale-other-element-geometry)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of geometrical element|`object`|[`type`](#type) with value of:<br>`solid` -> `translateAndScale` -> `other` or<br>`shell` -> `translateAndScale` -> `other`|yes|
|`bounding`|measurement value to represent the bounding the element resides within|`object`|[`cuboidBounding`](#cuboid-bounding)|yes, if `faces` or `dimensions` provided|
|`faces`|the faces that describe the translate and scale operations within the bounding|`object`|`left` and `right`, both of type [`faceTranslateAndScaleElementGeometry`](#face-translate-and-scale-element-geometry). If the root of the type tree is `shell`, `dimensions` property `thickness` is also required and must be of type [`linearDimension`](#linear-dimension). In total, each face's `dimensions` object must declare at least 2 properties.|yes, if `bounding` or `dimensions` provided|
|`dimensions`|dimension values to represent the shape of the element|`object`|property `length` is required and must be of type [`linearDimension`](#linear-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|no|

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
|`method`|method for embedding the reference material within the base material|`string`|`fibre`, `particle`, `woven`, `bar`|yes|
|`type`|material type of element|`object`|[`typeReferenceMaterial`](#type-reference-material)|yes|
|`symmetry`|symmetry of the material|`string`|`isotropic`|yes, if `properties` provided|
|`properties`|array of material properties|`array`|[`propertiesElementMaterial`](#properties-element-material)|no|

#### [Properties Element Material](#properties-element-material)

##### [Density Property Element Material](#density-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`density`|yes|
|`unit`|unit that the value of the material property is based in|`string`|`kg/m^3`, `g/cm^3`, `kg/L`, `g/mL`, `t/m^3`, `kg/dm^3`, `oz/cu in`, `other`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Thermal Expansion Coefficient Property Element Material](#thermal-expansion-coefficient-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`linearThermalExpansionCoefficient`, `volumetricThermalExpansionCoefficient`|yes|
|`unit`|unit that the value of the material property is based in|`string`|`K^-1`, `C^-1`, `F^-1`, `other`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Pressure Property Element Material](#pressure-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`youngsModulus`, `shearModulus`, `compressiveStrength`, `shearStrength`, `ultimateTensileStrength`, `yieldStrength`, `0.1%ProofStress`, `fatigueStrengthCoefficient`|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GPa`, `MPa`, `kPa`, `Pa`, `Mpsi`, `ksi`, `psi`, `other`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Tensile Toughness Property Element Material](#tensile-toughness-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`tensileToughness`|yes|
|`unit`|unit that the value of the material property is based in|`string`|`GJ/m^3`, `MJ/m^3`, `kJ/m^3`, `J/m^3`, `ibf/in^3`, `other`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Fracture Toughness Property Element Material](#fracture-toughness-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`fractureToughness`|yes|
|`unit`|unit that the value of the material property is based in|`string`|`TPa/m^(1/2)`, `GPa/m^(1/2)`, `MPa/m^(1/2)`, `kPa/m^(1/2)`, `Pa/m^(1/2)`, `psi/in^(1/2)`, `other`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Unit Free Property Element Material](#unit-free-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`poissonsRatio`, `elongation`, `reductionInArea`, `fatigueStrengthExponent`, `fatigueDuctilityCoefficient`, `fatigueDuctilityExponent`|yes|
|`value`|value of the material property|`int`, `double`, `array`|a single numerical value, or an array of [`conditionalMaterialProperty`](#conditional-material-property) for values recorded under different conditions|yes|

##### [Hardness Conditional Property Element Material](#hardness-conditional-property-element-material)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the material property|`string`|`vickersHardness`, `brinellHardness`|yes|
|`value`|value of the material property|`array`|an array of [`hardnessConditionalMaterialProperty`](#hardness-conditional-material-property)|yes|

##### [Hardness Conditional Material Property](#hardness-conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`environmental`|environmental conditions for the given material property value|`object`|[`environmentalConditionalMaterialProperty`](#environmental-conditional-material-property)|yes, if no `parameters`|
|`parameters`|parameters conditions for the given material property value|`object`|if the calling object's `type` is `vickersHardness`, [`parametersVickersHardnessConditionalMaterialProperty`](#parameters-vickers-hardness-conditional-material-property); if `brinellHardness`, [`parametersBrinellHardnessConditionalMaterialProperty`](#parameters-brinell-hardness-conditional-material-property)|yes, if no `environmental`|
|`value`|value of the material property with the given conditions|`int`, `double`|any numerical value|yes|

###### [Parameters Vickers Hardness Conditional Material Property](#parameters-vickers-hardness-conditional-material-property)
Additional properties can be declared of type [`wildcardValue`](#wildcard-value).

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`load`||`object`|[`forceValue`](#force-value)|yes|
|`duration`||`object`|[`durationValue`](#duration-value)|yes|

###### [Parameters Brinell Hardness Conditional Material Property](#parameters-brinell-hardness-conditional-material-property)
Additional properties can be declared of type [`wildcardValue`](#wildcard-value).

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
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
A `ground` element represents an external system to the structure being modelled. This could reference the physical ground, or it could be another structure that interacts with the modelled structure.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique element name within the model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information about the element|`string`|*|no|
|`type`|the element type (see URL)|`string`|`ground`|yes|

## [Element Shared Objects](#element-shared-objects)

### [Type](#type)
The `type` property describes a node within the geometrical type tree; a node has a `name` and may nest a further `type` node beneath it to describe an increasingly specific branch. The full path for a given geometry is shown as its type tree value in the table above.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the name of the selected node in the type tree|`string`|see calling object|yes|
|`type`|the next, more specific node in the type tree|`object`|[`type`](#type)|no|

### [Cuboid Bounding](#cuboid-bounding)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`type`|type of the bounding|`string`|`cuboid`|yes|
|`length`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`width`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|
|`height`|the axis, source, unit and value of the measurement|`object`|[`linearDimension`](#linear-dimension)|yes|

### [Face Translate And Scale Element Geometry](#face-translate-and-scale-element-geometry)
This is the shared shape of a `translateAndScale` face, used for the `cuboid`, `cylinder`, `aerofoil` and `other` profiles; the calling geometry's `faces` row states which `dimensions` properties it specifically requires.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`dimensions`|dimension values to represent the shape of the element|`object`|see the calling object for the required properties. Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|yes|
|`translational`|values for the y and z translations within the coordinate space|`object`|[`faceTranslation`](#face-translation)|yes|

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
|`dimensions`|dimension values to represent the shape of the element|`object`|property `chordLength` is required and must be of type [`linearDimension`](#linear-dimension). Property `twistAngle` is optional and, if provided, must be of type [`angularDimension`](#angular-dimension). Additional properties can be declared of type [`wildcardDimension`](#wildcard-dimension).|yes|

#### [Conditional Material Property](#conditional-material-property)
|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`environmental`|environmental conditions for the given material property value|`object`|[`environmentalConditionalMaterialProperty`](#environmental-conditional-material-property)|yes, if no `parameters`|
|`parameters`|parameters conditions for the given material property value|`object`|Additional properties can be declared of type [`wildcardValue`](#wildcard-value).|yes, if no `environmental`|
|`value`|value of the material property with the given conditions|`int`, `double`|any numerical value|yes|

##### [Environmental Conditional Material Property](#environmental-conditional-material-property)
Additional properties can be declared of type [`wildcardValue`](#wildcard-value).

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`temperature`|temperature that the test was conducted at|`object`|[`temperatureValue`](#temperature-value)|no|
|`humidity`|humidity that the test was conducted at|`object`|[`percentageValue`](#percentage-value)|no|

# [Relationships](#relationships)

## [Perfect Relationship](#perfect-relationship)
A `perfect` relationship models the interaction between two [`regular`](#regular-element) elements where they should be considered as the same component but have been divided to capture additional knowledge.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`perfect`|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|
|`elements`|the elements involved in the relationship|`array`|[`namedRelationshipElement`](#named-relationship-element)|yes|

## [Connection Relationship](#connection-relationship)
A `connection` relationship models the interaction between two or more [`regular`](#regular-element) elements which are held together by a non-structurally-significant component, which has therefore been omitted from the model.

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
A `joint` relationship models the interaction between two [`regular`](#regular-element) elements where the physics of the interaction are captured.

### [Static Joint](#static-joint)
A `static` joint dictates that there is no movement between the two [`regular`](#regular-element) elements in the `joint` relationship.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`joint`|yes|
|`nature`|the nature of the relationship to the element|`object`|[`staticNature`](#static-nature)|yes|
|`elements`|the elements involved in the relationship|`array`|[`positionedRelationshipElement`](#positioned-relationship-element)|yes|

### [Dynamic Joint](#dynamic-joint)
A `dynamic` joint dictates that there is movement between the two [`regular`](#regular-element) elements in the `joint` relationship.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`joint`|yes|
|`nature`|the nature of the relationship to the element|`object`|[`dynamicNature`](#dynamic-nature)|yes|
|`degreesOfFreedom`|the degrees of freedom within the relationship|`object`|[`dynamicJointRelationshipDegreesOfFreedom`](#dynamic-joint-relationship-degrees-of-freedom)|no|
|`elements`|the elements involved in the relationship|`array`|[`positionedRelationshipElement`](#positioned-relationship-element)|yes|

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
A `boundary` relationship models the interaction between one [`regular`](#regular-element) element and one [`ground`](#ground-element) element to mark the boundary between the modelled structure and an external system.

|Property|Description|Type|Values|Required|
|---|-----|---|---|---|
|`name`|the unique name of the relationship within the irreducible element model|`string`|Minimum Length: 1, Maximum Length: 64|yes|
|`description`|additional information on the relationship|`string`|*|no|
|`type`|the type of relationship|`string`|`boundary`|yes|
|`coordinates`|the coordinates of the relationship|`object`|[`relationshipCoordinates`](#relationship-coordinates)|no|
|`elements`|the elements involved in the relationship|`array`|[`namedRelationshipElement`](#named-relationship-element)|yes|

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
