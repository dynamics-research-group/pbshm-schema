//Constants
const { execFile } = require("child_process");
const { UV_FS_O_FILEMAP, WSATYPE_NOT_FOUND, SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const fs = require("fs");
const { wrap } = require("module");
const { type } = require("os");
const { nextTick } = require("process");

//Mapping Settings
var processedMappings = [];
var replacements = {};
var mappings = [
    {//Rename Elements -> Coordinats to Coordinates -> Elements for Display Purposes
        source: [
            ["elements", "coordinates"]
        ],
        destination: {
            tree: ["coordinates", "element"]
        }
    },
    {//Rename Elements -> Contextual to Contextual -> Element for Display Purposes
        source: [
            ["elements", "contextual"]
        ],
        destination: {
            tree: ["contextual", "element"]
        }
    },
    {//Rename Elements -> Geometry to Geometry -> Elements for Display Purposes
        source: [
            ["elements", "geometry"]
        ],
        destination: {
            tree: ["geometry", "element"]
        }
    },
    {//Rename Elements -> Material to Material -> Elements for Display Purposes
        source: [
            ["elements", "material"]
        ],
        destination: {
            tree: ["material", "element"]
        }
    },
    {//Group Together Coordinates -> Element -> Global -> Translational to Shared, Coordinates -> Translational
        source: [
            ["coordinates", "element", "global", "translational"],
            ["coordinates", "relationship", "global", "translational"]
        ],
        destination: {
            container: "shared",
            tree: ["coordinates", "translational"]
        }
    },
    {//Group Together Coordinates -> Translational -> X, Y, Z to Value -> Linear
        // Translation -> Face -> X, Y to Value Axis
        source: [
            ["coordinates", "translational", "x"],
            ["coordinates", "translational", "y"],
            ["coordinates", "translational", "z"],
            ["translation", "face", "y"],
            ["translation", "face", "z"]
        ],
        destination: {
            container: "value",
            tree: ["value", "linear"]
        }
    },
    {//Rename Coordinates -> Element -> Global -> Rotational to Shared, Coordinates -> Rotational
        source: [
            ["coordinates", "element", "global", "rotational"]
        ],
        destination: {
            container: "shared",
            tree: ["coordinates", "rotational"]
        }
    },
    {//Group Coordinates -> Rotational -> Alpha, Beta, Gamma to Value -> Angular
        source: [
            ["coordinates", "rotational", "alpha"],
            ["coordinates", "rotational", "beta"],
            ["coordinates", "rotational", "gamma"]
        ],
        destination: {
            container: "value",
            tree: ["value", "angular"]
        }
    },
    {//Group Geometry -> Elements -> N -> Bounding to Shared, Cuboid -> Bounding
        source: [
            ["geometry", "element", "beam rectangular", "bounding"],
            ["geometry", "element", "beam circular", "bounding"],
            ["geometry", "element", "beam i-beam", "bounding"],
            ["geometry", "element", "beam other", "bounding"],
            ["geometry", "element", "plate rectangular", "bounding"],
            ["geometry", "element", "plate circular", "bounding"],
            ["geometry", "element", "plate other", "bounding"],
            ["geometry", "element", "solid translate cuboid", "bounding"],
            ["geometry", "element", "shell translate cuboid", "bounding"],
            ["geometry", "element", "solid translate sphere", "bounding"],
            ["geometry", "element", "shell translate sphere", "bounding"],
            ["geometry", "element", "solid translate cylinder", "bounding"],
            ["geometry", "element", "shell translate cylinder", "bounding"],
            ["geometry", "element", "solid translate other", "bounding"],
            ["geometry", "element", "shell translate other", "bounding"],
            ["geometry", "element", "solid translateAndScale cuboid", "bounding"],
            ["geometry", "element", "shell translateAndScale cuboid", "bounding"],
            ["geometry", "element", "solid translateAndScale cylinder", "bounding"],
            ["geometry", "element", "shell translateAndScale cylinder", "bounding"],
            ["geometry", "element", "solid translateAndScale other", "bounding"],
            ["geometry", "element", "shell translateAndScale other", "bounding"]
        ],
        destination: {
            container: "elementShared",
            tree: ["bounding", "cuboid"]
        }
    },
    {//Group Geometry -> Element -> N -> Translated and Scale -> M -> Face -> Translational
        source: [
            ["geometry", "element", "solid translateAndScale cuboid", "face", "translational"],
            ["geometry", "element", "shell translateAndScale cuboid", "face", "translational"],
            ["geometry", "element", "solid translateAndScale cylinder", "face", "translational"],
            ["geometry", "element", "shell translateAndScale cylinder", "face", "translational"],
            ["geometry", "element", "solid translateAndScale other", "face", "translational"],
            ["geometry", "element", "shell translateAndScale other", "face", "translational"]
        ],
        destination: {
            container: "elementShared",
            tree: ["translation", "face"]
        }
    },
    {//Group Cuboid -> Bounding -> Box -> Length, Width, Height to Linear Dimension
        // Geometry -> Elements -> N -> Dimensions -> M to Linear Dimension
        source: [
            ["bounding", "cuboid", "length"],//Bounding
            ["bounding", "cuboid", "width"],
            ["bounding", "cuboid", "height"],
            ["geometry", "element", "beam rectangular", "dimensions", "length"],//Geometry -> Beam -> Rectangular -> Dimensions
            ["geometry", "element", "beam rectangular", "dimensions", "width"],
            ["geometry", "element", "beam rectangular", "dimensions", "height"],
            ["geometry", "element", "beam circular", "dimensions", "length"],//Geometry -> Beam -> Circular -> Dimensions
            ["geometry", "element", "beam circular", "dimensions", "radius"],
            ["geometry", "element", "beam i-beam", "dimensions", "length"],//Geometry -> Beam -> I-Beam -> Dimensions
            ["geometry", "element", "beam i-beam", "dimensions", "d"],
            ["geometry", "element", "beam i-beam", "dimensions", "h"],
            ["geometry", "element", "beam i-beam", "dimensions", "s"],
            ["geometry", "element", "beam i-beam", "dimensions", "b"],
            ["geometry", "element", "beam i-beam", "dimensions", "t"],
            ["geometry", "element", "beam other", "dimensions", "length"],//Geometry -> Beam -> Other -> Dimensions
            ["geometry", "element", "plate rectangular", "dimensions", "thickness"],//Geometry -> Plate -> Rectangular -> Dimensions
            ["geometry", "element", "plate rectangular", "dimensions", "width"],
            ["geometry", "element", "plate rectangular", "dimensions", "length"],
            ["geometry", "element", "plate circular", "dimensions", "thickness"],//Geometry -> Plate -> Circular -> Dimensions
            ["geometry", "element", "plate circular", "dimensions", "radius"],
            ["geometry", "element", "plate other", "dimensions", "thickness"],//Geometry -> Plate -> Other -> Dimensions
            ["geometry", "element", "solid translate cuboid", "dimensions", "length"],//Geometry -> Solid -> Translate -> Cuboid -> Dimensions
            ["geometry", "element", "solid translate cuboid", "dimensions", "width"],
            ["geometry", "element", "solid translate cuboid", "dimensions", "height"],
            ["geometry", "element", "shell translate cuboid", "dimensions", "thickness"],//Geometry -> Shell -> Translate -> Cuboid -> Dimensions
            ["geometry", "element", "shell translate cuboid", "dimensions", "length"],
            ["geometry", "element", "shell translate cuboid", "dimensions", "width"],
            ["geometry", "element", "shell translate cuboid", "dimensions", "height"],
            ["geometry", "element", "solid translate sphere", "dimensions", "radius"],//Geometry -> Solid -> Translate -> Sphere -> Dimensions
            ["geometry", "element", "shell translate sphere", "dimensions", "thickness"],//Geometry -> Shell -> Translate -> Sphere -> Dimensions
            ["geometry", "element", "shell translate sphere", "dimensions", "radius"],
            ["geometry", "element", "solid translate cylinder", "dimensions", "radius"],//Geometry -> Solid -> Translate -> Cylinder -> Dimensions
            ["geometry", "element", "solid translate cylinder", "dimensions", "length"],
            ["geometry", "element", "shell translate cylinder", "dimensions", "thickness"],//Geometry -> Shell -> Translate -> Cylinder -> Dimensions
            ["geometry", "element", "shell translate cylinder", "dimensions", "radius"],
            ["geometry", "element", "shell translate cylinder", "dimensions", "length"],
            ["geometry", "element", "shell translate other", "dimensions", "thickness"],//Geometry -> Shell -> Translate -> Other -> Dimensions
            ["geometry", "element", "solid translateAndScale cuboid", "dimensions", "length"],//Geometry -> Solid -> Translate And Scale -> Cuboid -> Dimensions
            ["geometry", "element", "solid translateAndScale cuboid", "face", "dimensions", "width"],
            ["geometry", "element", "solid translateAndScale cuboid", "face", "dimensions", "height"],
            ["geometry", "element", "shell translateAndScale cuboid", "dimensions", "length"],//Geometry -> Shell -> Translate And Scale -> Cuboid -> Dimensions
            ["geometry", "element", "shell translateAndScale cuboid", "face", "dimensions", "thickness"],
            ["geometry", "element", "shell translateAndScale cuboid", "face", "dimensions", "width"],
            ["geometry", "element", "shell translateAndScale cuboid", "face", "dimensions", "height"],
            ["geometry", "element", "solid translateAndScale cylinder", "dimensions", "length"],//Geometry -> Solid -> Translate And Scale -> Cylinder -> Dimensions
            ["geometry", "element", "solid translateAndScale cylinder", "face", "dimensions", "radius"],
            ["geometry", "element", "shell translateAndScale cylinder", "dimensions", "length"],//Geometry -> Shell -> Translate And Scale -> Cylinder -> Dimensions
            ["geometry", "element", "shell translateAndScale cylinder", "face", "dimensions", "thickness"],
            ["geometry", "element", "shell translateAndScale cylinder", "face", "dimensions", "radius"],
            ["geometry", "element", "solid translateAndScale other", "dimensions", "length"],//Geometry -> Solid -> Translate And Scale -> Other -> Dimensions
            ["geometry", "element", "shell translateAndScale other", "dimensions", "length"],//Geometry -> Shell -> Translate And Scale -> Other -> Dimensions
            ["geometry", "element", "shell translateAndScale other", "face", "dimensions", "thickness"]
        ],
        destination: {
            container: "shared",
            tree: ["dimension", "linear"]
        }
    },
    {//Group Geometry -> Elements -> N -> Dimensions -> * to Angular Dimension
        source: [
            ["geometry", "element", "beam other", "dimensions", "*"],
            ["geometry", "element", "plate other", "dimensions", "*"],
            ["geometry", "element", "solid translate other", "dimensions", "*"],
            ["geometry", "element", "shell translate other", "dimensions", "*"]
        ],
        destination: {
            container: "shared",
            tree: ["dimension", "angular"]
        }
    },
    {//Group Geometry -> Elements -> N -> Dimensions -> _ to Wildcard Dimension
        source: [
            ["geometry", "element", "beam rectangular", "dimensions", "_"],
            ["geometry", "element", "beam circular", "dimensions", "_"],
            ["geometry", "element", "beam i-beam", "dimensions", "_"],
            ["geometry", "element", "beam other", "dimensions", "_"],
            ["geometry", "element", "plate rectangular", "dimensions", "_"],
            ["geometry", "element", "plate circular", "dimensions", "_"],
            ["geometry", "element", "plate other", "dimensions", "_"],
            ["geometry", "element", "solid translate cuboid", "dimensions", "_"],
            ["geometry", "element", "shell translate cuboid", "dimensions", "_"],
            ["geometry", "element", "solid translate sphere", "dimensions", "_"],
            ["geometry", "element", "shell translate sphere", "dimensions", "_"],
            ["geometry", "element", "solid translate cylinder", "dimensions", "_"],
            ["geometry", "element", "shell translate cylinder", "dimensions", "_"],
            ["geometry", "element", "solid translate other", "dimensions", "_"],
            ["geometry", "element", "shell translate other", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale cuboid", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale cuboid", "face", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale cuboid", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale cuboid", "face", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale cylinder", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale cylinder", "face", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale cylinder", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale cylinder", "face", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale other", "dimensions", "_"],
            ["geometry", "element", "solid translateAndScale other", "face", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale other", "dimensions", "_"],
            ["geometry", "element", "shell translateAndScale other", "face", "dimensions", "_"]
        ],
        destination: {
            container: "shared",
            tree: ["dimension", "wildcard"]
        }
    },
    {//Group Geometry -> Element -> Solid Translate And Scale Cuboid -> Faces -> Left, Right to Geometry -> Element -> Solid Translate And Scale Cuboid -> Faces -> Face
        source: [
            ["geometry", "element", "solid translateAndScale cuboid", "faces", "left"],
            ["geometry", "element", "solid translateAndScale cuboid", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "solid translateAndScale cuboid", "face"]
        }
    },
    {//Group Geometry -> Element -> Shell Translate And Scale Cuboid -> Faces -> Left, Right to Geometry -> Element -> Solid Translate And Scale Cuboid -> Faces -> Face
        source: [
            ["geometry", "element", "shell translateAndScale cuboid", "faces", "left"],
            ["geometry", "element", "shell translateAndScale cuboid", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "shell translateAndScale cuboid", "face"]
        }
    },
    {//Group Geometry -> Element -> Solid Translate And Scale Cylinder -> Faces -> Left, Right to Geometry -> Element -> Solid Translate And Scale Cuboid -> Faces -> Face
        source: [
            ["geometry", "element", "solid translateAndScale cylinder", "faces", "left"],
            ["geometry", "element", "solid translateAndScale cylinder", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "solid translateAndScale cylinder", "face"]
        }
    },
    {//Group Geometry -> Element -> Shell Translate And Scale Cylinder -> Faces -> Left, Right to Geometry -> Element -> Solid Translate And Scale Cuboid -> Faces -> Face
        source: [
            ["geometry", "element", "shell translateAndScale cylinder", "faces", "left"],
            ["geometry", "element", "shell translateAndScale cylinder", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "shell translateAndScale cylinder", "face"]
        }
    },
    {//Group Geometry -> Element -> Solid Translate And Scale Other -> Faces -> Left, Right to Geometry -> Element -> Solid Translate And Scale Other -> Faces -> Face
        source: [
            ["geometry", "element", "solid translateAndScale other", "faces", "left"],
            ["geometry", "element", "solid translateAndScale other", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "solid translateAndScale other", "face"]
        }
    },
    {//Group Geometry -> Element -> Shell Translate And Scale Other -> Faces -> Left, Right to Geometry -> Element -> Shell Translate And Scale Other -> Faces -> Face
        source: [
            ["geometry", "element", "shell translateAndScale other", "faces", "left"],
            ["geometry", "element", "shell translateAndScale other", "faces", "right"]
        ],
        destination: {
            tree: ["geometry", "element", "shell translateAndScale other", "face"]
        }
    },
    {//Rename Material -> Element -> Properties -> Density Numerical to Material -> Element -> Property -> Density Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "densityNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "densityNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Thermal Expansion Coefficient Numerical to Material -> Element -> Property -> Thermal Expansion Coefficient Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "thermalExpansionCoefficientNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "thermalExpansionCoefficientNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Pressure Numerical to Material -> Element -> Property -> Pressure Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "pressureNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "pressureNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Tensile Toughness Numerical to Material -> Element -> Property -> Tensile Toughness Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "tensileToughnessNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "tensileToughnessNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Fracture Toughness Numerical to Material -> Element -> Property -> Fracture Toughness Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "fractureToughnessNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "fractureToughnessNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Density Conditional to Material -> Element -> Property -> Density Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "densityConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "densityConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Thermal Expansion Coefficient Conditional to Material -> Element -> Property -> Thermal Expansion Coefficient Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "thermalExpansionCoefficientConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "thermalExpansionCoefficientConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Pressure Conditional to Material -> Element -> Property -> Pressure Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "pressureConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "pressureConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Tensile Toughness Conditional to Material -> Element -> Property -> Tensile Toughness Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "tensileToughnessConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "tensileToughnessConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Fracture Toughness Conditional to Material -> Element -> Property -> Fracture Toughness Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "fractureToughnessConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "fractureToughnessConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Unit Free Numerical to Material -> Element -> Property -> Unit Free Numerical for Display Purposes
        source: [
            ["material", "element", "properties", "unitFreeNumerical"]
        ],
        destination: {
            tree: ["material", "element", "property", "unitFreeNumerical"]
        }
    },
    {//Rename Material -> Element -> Properties -> Unit Free Conditional to Material -> Element -> Property -> Unit Free Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "unitFreeConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "unitFreeConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Vickers Hardness Conditional to Material -> Element -> Property -> Vickers Hardness Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "vickersHardnessConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "vickersHardnessConditional"]
        }
    },
    {//Rename Material -> Element -> Properties -> Brinell Hardness Conditional to Material -> Element -> Property -> Brinell Hardness Conditional for Display Purposes
        source: [
            ["material", "element", "properties", "brinellHardnessConditional"]
        ],
        destination: {
            tree: ["material", "element", "property", "brinellHardnessConditional"]
        }
    },
    {//Group Material -> Element -> Property -> Density Conditional -> Value to Property -> Material -> Conditional
        //Material -> Element -> Property -> Thermal Expansion Coefficient Conditional -> Value to Property -> Material -> Conditional
        //Material -> Element -> Property -> Pressure Conditional -> Value to Property -> Material -> Conditional
        //Material -> Element -> Property -> Tensile Toughness Conditional -> Value to Property -> Material -> Conditional
        //Material -> Element -> Property -> Fracture Toughness Conditional -> Value to Property -> Material -> Conditional
        //Material -> Element -> Property -> Unit Free Conditional -> Value to Property -> Material -> Conditional
        source: [
            ["material", "element", "property", "densityConditional", "value"],
            ["material", "element", "property", "thermalExpansionCoefficientConditional", "value"],
            ["material", "element", "property", "pressureConditional", "value"],
            ["material", "element", "property", "tensileToughnessConditional", "value"],
            ["material", "element", "property", "fractureToughnessConditional", "value"],
            ["material", "element", "property", "unitFreeConditional", "value"]
        ],
        destination: {
            container: "elementShared",
            tree: ["property", "material", "conditional"]
        }
    },
    {//Rename Material -> Element -> Property -> Vickers Hardness -> Value to Property -> Material -> Conditioanl -> Vickers Hardness
        source: [
            ["material", "element", "property", "vickersHardnessConditional", "value"]
        ],
        destination: {
            tree: ["property", "material", "conditional", "vickersHardness"]
        }
    },
    {//Rename Material -> Element -> Property -> Brinell Hardness -> Value to Property -> Material -> Conditioanl -> Vickers Hardness
        source: [
            ["material", "element", "property", "brinellHardnessConditional", "value"]
        ],
        destination: {
            tree: ["property", "material", "conditional", "brinellHardness"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Environmental as Property -> Material -> Conditional -> Environmental
        source: [
            ["property", "material", "conditional", "environmental"],
            ["property", "material", "conditional", "vickersHardness", "environmental"],
            ["property", "material", "conditional", "brinellHardness", "environmental"]
        ],
        destination: {
            container: "elementShared",
            tree: ["property", "material", "conditional", "environmental"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Environmental -> Temperature to Value -> Temperature
        source: [
            ["property", "material", "conditional", "environmental", "temperature"]
        ],
        destination: {
            container: "value",
            tree: ["value", "temperature"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Environmental -> Humidity to Value -> Percentage
        source: [
            ["property", "material", "conditional", "environmental", "humidity"]
        ],
        destination: {
            container: "value",
            tree: ["value", "percentage"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Vickers Hardness -> Paremeters -> Load to Value -> Force
        source: [
            ["property", "material", "conditional", "vickersHardness", "parameters", "load"],
            ["property", "material", "conditional", "brinellHardness", "parameters", "force"]
        ],
        destination: {
            container: "value",
            tree: ["value", "force"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Vickers Hardness -> Paremeters -> Duration to Value -> Duration 
        source: [
            ["property", "material", "conditional", "vickersHardness", "parameters", "duration"]
        ],
        destination: {
            container: "value",
            tree: ["value", "duration"]
        }
    },
    {//Group Together Property -> Material -> Conditional -> Environmental -> _ to Value -> Wildcard
        source: [
            ["property", "material", "conditional", "environmental", "_"],
            ["property", "material", "conditional", "parameters", "_"],
            ["property", "material", "conditional", "vickersHardness", "parameters", "_"],
            ["property", "material", "conditional", "brinellHardness", "parameters", "_"]
        ],
        destination: {
            container: "value",
            tree: ["value", "wildcard"]
        }
    },
    {//Rename Material -> Element -> Property -> Brinell Hardness -> Parameters -> Diameter to Value -> Diameter -> Parameter -> Brinell Hardness
        source: [
            ["property", "material", "conditional", "brinellHardness", "parameters", "diameter"]
        ],
        destination: {
            tree: ["value", "diameter", "parameter", "brinellHardness"]
        }
    },
    {//Rename Material -> Element -> Property -> Brinell Hardness -> Parameters -> Diameter to Value -> Diameter -> Parameter -> Brinell Hardness
        source: [
            ["property", "material", "conditional", "brinellHardness", "parameters", "ball"]
        ],
        destination: {
            tree: ["value", "ball", "parameter", "brinellHardness"]
        }
    },
    {//Group Together Relationships -> Perfect -> Elements to Elements -> Relationship -> Named for Display Purposes
        //Relationships -> Boundary -> Elements to Elements -> Relationship -> Named
        source: [
            ["relationships", "perfect", "elements"],
            ["relationships", "boundary", "elements"]
        ],
        destination: {
            container: "relationship",
            tree: ["element", "relationship", "named"]
        }
    },
    {//Group Together Relationships -> Joint -> Static -> Elements to Elements -> Relationship -> Positioned for Display Purposes
        //Relationships -> Joint -> Dynamic -> Elements to Elements -> Relationship -> Positioned
        source: [
            ["relationships", "joint", "static", "elements"],
            ["relationships", "joint", "dynamic", "elements"]
        ],
        destination: {
            container: "relationship",
            tree: ["element", "relationship", "positioned"]
        }
    },
    {//Rename Relationships -> Connection -> Elements to Elements -> Connection -> Perfect for Display Purposes
        source: [
            ["relationships", "connection", "elements"]
        ],
        destination: {
            tree: ["element", "relationship", "connection"]
        }
    },
    {//Rename Elements -> Relationship -> Connection -> Nature -> Nature to Elements -> Relationship -> Connection -> Nature -> Sub for Display Purposes
        source: [
            ["elements", "relationship", "connection", "nature", "nature"]
        ],
        destination: {
            tree: ["element", "relationship", "connection", "nature", "sub"]
        }
    },
    {//Group Together Relationship -> Perfect -> Coordinates to Coordinates -> Relationship
        // Elements -> Relationship -> Connection -> Coordinates
        source: [
            ["relationships", "perfect", "coordinates"],
            ["element", "relationship", "connection", "coordinates"],
            ["element", "relationship", "positioned", "coordinates"],
            ["relationships", "boundary", "coordinates"]
        ],
        destination: {
            container: "relationship",
            tree: ["coordinates", "relationship"]
        }
    },
    {//Group Together Elements -> Relationship -> Connection -> Nature to Nature -> Static
        //Relationships -> Joint -> Static -> Nature to Nature -> Static
        source: [
            ["element", "relationship", "connection", "nature"],
            ["relationships", "joint", "static", "nature"]
        ],
        destination: {
            container: "relationship",
            tree: ["nature", "static"]
        }
    },
    {//Group Together Elements -> Relationship -> Connection -> Nature to 
        source: [
            ["relationships", "joint", "dynamic", "nature"]
        ],
        destination: {
            container: "relationship",
            tree: ["nature", "dynamic"]
        }
    },
    {//Rename Relationships -> Joint -> Dynamic -> Degrees of Freedom to Degrees of Freedom -> Relationship -> Joint -> Dynamic for Display Purposes
        source: [
            ["relationships", "joint", "dynamic", "degreesOfFreedom"]
        ],
        destination: {
            tree: ["degreesOfFreedom", "relationship", "joint", "dynamic"]
        }
    },
    {//Group Together Degrees Of Freedom -> Relationship -> Joint -> Dynamic -> Global -> Translational to Coordinates -> Translational -> Bounded
        source: [
            ["degreesOfFreedom", "relationship", "joint", "dynamic", "global", "translational"]
        ],
        destination: {
            container: "shared",
            tree: ["coordinates", "translational", "bounded"]
        }
    },
    {//Group Together Coordinates -> Translational -> Bounded - X,Y,Z to Value -> Linear -> Bounded
        source: [
            ["coordinates", "translational", "bounded", "x"],
            ["coordinates", "translational", "bounded", "y"],
            ["coordinates", "translational", "bounded", "z"]
        ],
        destination: {
            container: "value",
            tree: ["value", "linear", "bounded"]
        }
    },
    {//Group Together Degrees Of Freedom -> Relationship -> Joint -> Dynamic -> Global -> Roational to Coordinates -> Rotational -> Bounded
        source: [
            ["degreesOfFreedom", "relationship", "joint", "dynamic", "global", "rotational"]
        ],
        destination: {
            container: "shared",
            tree: ["coordinates", "rotational", "bounded"]
        }
    },
    {//Group Together Coordinates -> Translational -> Bounded - X,Y,Z to Value -> Linear -> Bounded
        source: [
            ["coordinates", "rotational", "bounded", "alpha"],
            ["coordinates", "rotational", "bounded", "beta"],
            ["coordinates", "rotational", "bounded", "gamma"]
        ],
        destination: {
            container: "value",
            tree: ["value", "angular", "bounded"]
        }
    }
]

//Markdown Areas
var markdown = [];
var elementCommon = [];
var elementSharedCommon = [];
var relationshipCommon = [];
var sharedCommon = [];
var valueCommon = [];
//Read File
fs.readFile("./release/structure-data-compiled-mongodb.min.json", "utf8", (readErr, schema) => {
    //Handle Error
    if (readErr) {
        console.log("Error Reading Schema File:");
        console.log(readErr);
        return;
    }

    //Generate Irreducible Element Markdown
    markdown.push("# [Irreducible Element](#irreducible-element)");

    //Generate Models Markdown
    var groundModelIndex = -1;
    var json = JSON.parse(schema);
    markdown.push("# [Models](#models)");
    for (var modelIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"]) {
        var modelType = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"]["type"]["enum"][0];
        if (modelType === "grounded") groundModelIndex = modelIndex;
        markdown.push("\r\n## [" + modelType[0].toUpperCase() + modelType.substring(1) + " Model](#" + modelType + "-model)");
        markdown.push("|Property|Description|Type|Values|Required|");
        markdown.push("|---|-----|---|---|---|");
        for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"]) {
            //Calculate Available Types
            var types = [];
            if (property === "elements" || property === "relationships") {
                if (typeof (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"]) === typeof (undefined)) types.push(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["properties"]["type"]["enum"][0]);
                else {
                    for (var typeIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"]) {
                        if (typeof (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"][typeIndex]["oneOf"]) === typeof (undefined)) types.push(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"][typeIndex]["properties"]["type"]["enum"][0]);
                        else {
                            for (var typeSubIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"][typeIndex]["oneOf"]) {
                                if (types.indexOf(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"][typeIndex]["oneOf"][typeSubIndex]["properties"]["type"]["enum"][0]) > -1) continue;
                                types.push(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["items"]["oneOf"][typeIndex]["oneOf"][typeSubIndex]["properties"]["type"]["enum"][0]);
                            }
                        }
                    }
                }
            }
            //Calculate Accepted Values
            var acceptedValues = "";
            if (types.length == 0) acceptedValues = calculateAcceptedValues(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]);
            else {
                for (var typeIndex in types) {
                    acceptedValues += ((acceptedValues.length > 0) ? ", " : "") + "[`" + types[typeIndex] + "`](#" + types[typeIndex] + "-" + ((property === "elements") ? "element" : ((property === "relationships") ? "relationship" : "unkown")) + ")";
                }
            }
            //Calculate Required
            var required = "";
            if (typeof (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["required"]) !== typeof (undefined)) required = (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["required"].indexOf(property) > -1) ? "yes" : "no";
            else if (typeof (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["anyOf"]) === typeof (undefined)) required = "no";
            else {
                if (property == "type") required = "yes";
                else if (property == "elements") required = "yes, if no `relationships`";
                else if (property == "relationships") required = "yes, if no `elements`";
                else required = "no";
            }
            //Display Property Line
            markdown.push(
                "|`" + property + "`|"
                + json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["description"] + "|"
                + "`" + json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][modelIndex]["properties"][property]["bsonType"] + "`|"
                + acceptedValues + "|"
                + required + "|"
            );
        }
    }

    //Generate Element Markdown
    markdown.push("\r\n# [Elements](#elements)");
    for (var elementIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"]) {
        //Display Title
        var type = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"]["type"]["enum"][0];
        markdown.push("\r\n## [" + type[0].toUpperCase() + type.substring(1) + " Element](#" + type + "-element)");
        //Generate Element Properties Markdown
        markdown.push("|Property|Description|Type|Values|Required|");
        markdown.push("|---|-----|---|---|---|");
        for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"]) {
            var bsonType = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property]["bsonType"];
            markdown.push(
                "|`" + property + "`|"
                + json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property]["description"] + "|"
                + "`" + bsonType + "`|"
                + ((bsonType === "object" || bsonType === "array") ? calculateMappedLink(property, ["elements"]) : calculateAcceptedValues(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property])) + "|"
                + ((json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["required"].indexOf(property) > -1) ? "yes" : "no") + "|"
            );
        }
        //Generate Element Object Markdown
        for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"]) {
            if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property]["bsonType"] !== "object") continue;
            generateRecursiveObjectMarkdown("page", ["elements", property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property], markdownGenerationCallback);
        }
        //Generate Element Array Markdown
        for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"]) {
            if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property]["bsonType"] !== "array") continue;
            generateRecursiveArrayMarkdown("page", ["elements", property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["elements"]["items"]["oneOf"][elementIndex]["properties"][property], markdownGenerationCallback);
        }
    }

    //Add in Element Common Objects
    if (elementCommon.length > 0) {
        for (var lineIndex in elementCommon) {
            markdown.push(elementCommon[lineIndex]);
        }
    }

    //Add in Element Shared Common Objects
    if (elementSharedCommon.length > 0) {
        markdown.push("\r\n## [Element Shared Objects](#element-shared-objects)");
        for (var lineIndex in elementSharedCommon) {
            markdown.push(elementSharedCommon[lineIndex]);
        }
    }

    //Generate Relationship Markdown
    markdown.push("\r\n# [Relationships](#relationships)");
    for (var relationshipIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"]) {
        if (typeof (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"]) === typeof (undefined)) {
            //Display Title
            var type = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"]["type"]["enum"][0];
            markdown.push("\r\n## [" + type[0].toUpperCase() + type.substring(1) + " Relationship](#" + type + "-relationship)");
            //Generate Relationship Properties Markdown
            markdown.push("|Property|Description|Type|Values|Required|");
            markdown.push("|---|-----|---|---|---|");
            for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"]) {
                var bsonType = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property]["bsonType"];
                markdown.push(
                    "|`" + property + "`|"
                    + json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property]["description"] + "|"
                    + "`" + bsonType + "`|"
                    + ((bsonType === "object" || bsonType === "array") ? calculateMappedLink(property, ["relationships", type]) : calculateAcceptedValues(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property])) + "|"
                    + ((json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["required"].indexOf(property) > -1) ? "yes" : "no") + "|"
                );
            }
            //Generate Relationship Object Markdown
            for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"]) {
                if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property]["bsonType"] !== "object") continue;
                generateRecursiveObjectMarkdown("page", ["relationships", type, property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property], markdownGenerationCallback);
            }
            //Generate Relationship Array Markdown
            for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"]) {
                if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property]["bsonType"] !== "array") continue;
                generateRecursiveArrayMarkdown("page", ["relationships", type, property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["properties"][property], markdownGenerationCallback);
            }
        } else {
            //Generate Relationship Joint Markdown
            for (var jointIndex in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"]) {
                //Display Overall Title
                var type = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"]["type"]["enum"][0];
                if (jointIndex == 0) markdown.push("\r\n## [" + type[0].toUpperCase() + type.substring(1) + " Relationship](#" + type + "-relationship)");
                //Display Nature Title
                var nature = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"]["nature"]["properties"]["name"]["enum"][0];
                markdown.push("\r\n### [" + nature[0].toUpperCase() + nature.substring(1) + " " + type[0].toUpperCase() + type.substring(1) + "](#" + nature + "-" + type + ")");
                //Generate Relationship Nature Properties Markdown
                markdown.push("|Property|Description|Type|Values|Required|");
                markdown.push("|---|-----|---|---|---|");
                for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"]) {
                    var bsonType = json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property]["bsonType"];
                    markdown.push(
                        "|`" + property + "`|"
                        + json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property]["description"] + "|"
                        + "`" + bsonType + "`|"
                        + ((bsonType === "object" || bsonType === "array") ? calculateMappedLink(property, ["relationships", type, nature]) : calculateAcceptedValues(json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property])) + "|"
                        + ((json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["required"].indexOf(property) > -1) ? "yes" : "no") + "|"
                    );
                }
                //Generate Relationship Nature Object Markdown
                for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"]) {
                    if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property]["bsonType"] !== "object") continue;
                    generateRecursiveObjectMarkdown("page", ["relationships", type, nature, property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property], markdownGenerationCallback);
                }
                //Generate Relationship Nature Array Markdown
                for (var property in json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"]) {
                    if (json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property]["bsonType"] !== "array") continue;
                    generateRecursiveArrayMarkdown("page", ["relationships", type, nature, property], json["properties"]["models"]["properties"]["irreducibleElement"]["oneOf"][groundModelIndex]["properties"]["relationships"]["items"]["oneOf"][relationshipIndex]["oneOf"][jointIndex]["properties"][property], markdownGenerationCallback);
                }
            }
        }
    }

    //Add in Relationship Common Objects
    if (relationshipCommon.length > 0) {
        markdown.push("\r\n## [Relationship Shared Objects](#relationship-objects)");
        for (var lineIndex in relationshipCommon) {
            markdown.push(relationshipCommon[lineIndex]);
        }
    }

    //Add in Shared Common Objects
    if (sharedCommon.length > 0) {
        markdown.push("\r\n# [Global Common Objects](#shared-objects)");
        for (var lineIndex in sharedCommon) {
            markdown.push(popOneAnchorLevel(sharedCommon[lineIndex]));
        }
    }

    //Add in Value Common Objects
    if (valueCommon.length > 0) {
        markdown.push("\r\n# [Global Value Objects](#value-objects)");
        for (var lineIndex in valueCommon) {
            markdown.push(popOneAnchorLevel(valueCommon[lineIndex]));
        }
    }

    //Output Markdown File
    var markdownFile = fs.createWriteStream("./model-irreducible-element-data.md");
    markdownFile.on("error", (writeErr) => {
        console.log("Error Writing irreducible-element-data File:");
        console.log(writeErr);
        return;
    });
    markdown.forEach((item) => {
        markdownFile.write(item + "\r\n");
    });
    markdownFile.close();
});

/**
 * Markdown Switch
 * @param {string} container
 * @returns container to write markdown into
 */
function markdownSwitch(container) {
    return (
        (container === "page") ? markdown :
            ((container == "shared") ? sharedCommon :
                ((container === "value") ? valueCommon :
                    ((container === "element") ? elementCommon :
                        ((container === "elementShared") ? elementSharedCommon : relationshipCommon)
                    )
                )
            )
    )
}

/**
 * Pop One Anchor Level
 * @param {string} line Anchor Line
 * @returns Line with one Anchor Line Removed
 */
function popOneAnchorLevel(line) {
    //Detect Lines Begining with #
    if (line.length > 3 && line[0] == "\r" && line[1] == "\n" && line[2] == "#") {
        var replacementLine = "";
        var acceptReplacementLine = false;
        for (var charIndex in line) {
            if (charIndex == 2) continue;
            else if (charIndex >= 6 //Ensure '# [' Pattern
                && line[charIndex] == "["
                && line[charIndex - 1] == " "
                && line[charIndex - 2] == "#"
            ) acceptReplacementLine = true;
            replacementLine += line[charIndex];
        }
        //Push Replacement Line
        if (acceptReplacementLine) return replacementLine;
    }
    //Return Original Line
    return line;
}

/**
 * Recurside Build Type Stack
 * @param {object} typesNode Types node
 * @returns array of types
 */
function recursiveBuildTypeStack(typesNode) {
    //Ensure Properties -> Type -> Properties
    if (
        typeof (typesNode["properties"]) === typeof (undefined) ||
        typeof (typesNode["properties"]["type"]) === typeof (undefined) ||
        typeof (typesNode["properties"]["type"]["properties"]) === typeof (undefined)
    ) return;
    //Find Direct Properties
    var types = [];
    if (typeof (typesNode["properties"]["type"]["properties"]["name"]) !== typeof (undefined) && typeof (typesNode["properties"]["type"]["properties"]["name"]["enum"]) !== typeof (undefined)) {
        for (var enumIndex in typesNode["properties"]["type"]["properties"]["name"]["enum"]) {
            types.push(typesNode["properties"]["type"]["properties"]["name"]["enum"][enumIndex]);
        }
    }
    //Find Nested Properties
    var nested = recursiveBuildTypeStack(typesNode["properties"]["type"]);
    if (typeof (nested) !== typeof (undefined) && nested.length > 0) types.push(nested);
    //Return Types
    return types;
}

/**
 * Recurside Build Type Stack From Names
 * @param {object} typesNode Types node
 * @returns array of types
 */
function recursiveBuildTypeStackFromNames(typesNode) {
    //Find Direct Properties
    var types = [];
    if (typeof (typesNode["properties"]) !== typeof (undefined) && typeof (typesNode["properties"]["name"]) !== typeof (undefined)) {
        for (var enumIndex in typesNode["properties"]["name"]["enum"]) {
            types.push(typesNode["properties"]["name"]["enum"][enumIndex]);
        }
    }
    //Find any One OF
    if (typeof (typesNode["oneOf"]) !== typeof (undefined)) {
        var replacementStack = [];
        for (var oneOfIndex in typesNode["oneOf"]) {
            //Get Nested Types
            var nested = recursiveBuildTypeStackFromNames(typesNode["oneOf"][oneOfIndex]);
            if (typeof (nested) === typeof (undefined) || nested.length == 0) continue;
            //Enumerate through types
            if (types.length == 0) replacementStack.push(nested);
            else for (var typeIndex in types) replacementStack.push([types[typeIndex], nested]);
        }
        //Replace Stack
        if (replacementStack.length > 0) types = replacementStack;
    }
    //Find Nested Properties
    if (typeof (typesNode["properties"]) !== typeof (undefined) && typeof (typesNode["properties"]["type"]) !== typeof (undefined)) {
        var nested = recursiveBuildTypeStackFromNames(typesNode["properties"]["type"]);
        if (typeof (nested) !== typeof (undefined) && nested.length > 0) types.push(nested);
    }
    //Return Types
    return types;
}

/**
 * Merge Type Stack
 * @param {array} leftTypes Left Types Array
 * @param {array} rightTypes Right Types Array
 * @returns Merged Types Stack
 */
function mergeTypeStack(leftTypes, rightTypes) {
    //Ensure End Case
    if (leftTypes.length == 0 && rightTypes.length == 0) return [];
    //Find Current Left and Children
    var types = [];
    var leftChildTypes = [];
    for (var leftIndex in leftTypes) {
        if (typeof (leftTypes[leftIndex]) === "object") leftChildTypes.push(leftTypes[leftIndex][0]);
        else types.push(leftTypes[leftIndex]);
    }
    //Find Current Right and Children
    var rightChildTypes = [];
    for (var rightIndex in rightTypes) {
        if (typeof (rightTypes[rightIndex]) === "object") rightChildTypes.push(rightTypes[rightIndex][0]);
        else types.push(rightTypes[rightIndex]);
    }
    //Process Left and Right Children
    var childTypes = mergeTypeStack(leftChildTypes, rightChildTypes);
    for (var childIndex in childTypes) {
        types.push([childTypes[childIndex]]);
    }
    //Return Types Stack
    return types;
}

/**
 * Flattern Type Array to String
 * @param {array} types Array of Types
 * @param {string} wrapper Type Wrapper
 * @param {string} siblingSeparator Sibling Separator
 * @param {string} decendentSeparator Decendent Separator
 * @returns Type String
 */
function flatternTypeStack(types, wrapper = "`", siblingSeparator = ", ", decendentSeparator = " -> ") {
    //Calculate Current Level Type
    var type = "";
    for (var index in types) {
        if (Array.isArray(types[index])) continue;
        type += ((type.length > 0) ? siblingSeparator : "") + wrapper + types[index] + wrapper;
    }
    //Calculate Recursive
    var childType = "";
    for (var index in types) {
        if (!Array.isArray(types[index])) continue;
        childType += flatternTypeStack(types[index], wrapper = wrapper, siblingSeparator = siblingSeparator, decendentSeparator = decendentSeparator);
    }
    //Return Concat
    return (childType.length > 0) ? type + decendentSeparator + childType : type;
}

/**
 * Flatter Type Array to Array of Strings
 * @param {array} types Array of Types
 * @param {string} wrapper Type Wrapper
 * @param {string} siblingSeparator Sibling Separator
 * @param {string} decendentSeparator Decendent Separator
 * @returns Type String Array
 */
function flatternTypeStackArray(types, wrapper = "`", siblingSeparator = ", ", decendentSeparator = " -> ") {
    //Calculate Current Level Type
    var type = "";
    for (var index in types) {
        if (Array.isArray(types[index])) continue;
        type += ((type.length > 0) ? siblingSeparator : "") + wrapper + types[index] + wrapper;
    }
    //Calculate Recursive
    var results = [];
    for (var index in types) {
        if (!Array.isArray(types[index])) continue;
        var childFlattern = flatternTypeStackArray(types[index], wrapper = wrapper, siblingSeparator = siblingSeparator, decendentSeparator = decendentSeparator);
        for (var childIndex in childFlattern) {
            results.push((type.length > 0) ? type + decendentSeparator + childFlattern[childIndex] : childFlattern[childIndex]);
        }
    }
    //Return Results
    return (results.length > 0) ? results : [type];
}

/**
 * Merge Properties
 * @param {object} leftProperty Left Properties Object
 * @param {object} rightProperty Right Properties Object
 * @returns merged properties object
 */
function mergeProperties(leftProperty, rightProperty) {
    var properties = {};
    var objects = [leftProperty, rightProperty];
    for (var index in objects) {
        for (var property in objects[index]) {
            if (!properties.hasOwnProperty(property)) properties[property] = objects[index][property];
            else if (Array.isArray(objects[index][property])) {
                for (var i in objects[index][property]) {
                    properties[property].push(objects[index][property][i])
                }
            } else if (typeof (objects[index][property]) === "object") properties[property] = mergeProperties(properties[property], objects[index][property]);
            else if (typeof (objects[index][property]) === "string" && (objects[index][property] === "yes" || properties[property] == "Unknown" || properties[property] == "*" || properties[property] == "")) properties[property] = objects[index][property];
        }
    }
    return properties;
}

/**
 * Acquire Base Properties
 * @param {object} json JSON Object
 * @returns Properties Object
 */
function acquireBaseProperties(json) {
    //Enumerate through Properties
    var properties = {};
    for (var property in json["properties"]) {
        //Determine Type
        var bsonType = json["properties"][property]["bsonType"];
        if (typeof (bsonType) === typeof (undefined)) {
            bsonType = "";
            for (var index in json["properties"][property]["oneOf"]) {
                bsonType += ((index > 0) ? "`, `" : "") + json["properties"][property]["oneOf"][index]["bsonType"];
            }
        }
        //Ignore Empty BSON Types
        var description = json["properties"][property]["description"];
        if (bsonType == "" && typeof (description) === typeof (undefined)) continue;
        //Append Property
        properties[property] = {
            description: (typeof (description) !== typeof (undefined)) ? description : "",
            type: (bsonType == "") ? "*" : "`" + bsonType + "`",
            values: (bsonType === "object") ? bsonType : calculateAcceptedValues(json["properties"][property]),
            required: (typeof (json["required"]) !== typeof (undefined) && json["required"].indexOf(property) > -1) ? "yes" : "no",
            object: (bsonType === "object") ? acquireBaseProperties(json["properties"][property]) : {}
        };

    }
    //Add in Additional Property Objects
    if (typeof (json["additionalProperties"]) !== typeof (undefined) && typeof (json["additionalProperties"]) !== "boolean") {
        //Determine Type
        var bsonType = json["additionalProperties"]["bsonType"];
        if (typeof (bsonType) === typeof (undefined)) {
            bsonType = "";
            for (var index in json["additionalProperties"]["oneOf"]) {
                bsonType += ((index > 0) ? "`, `" : "") + json["additionalProperties"]["oneOf"][index]["bsonType"];
            }
        }
        //Append Property
        properties["_"] = {
            description: (typeof (json["additionalProperties"]["description"]) !== typeof (undefined)) ? json["additionalProperties"]["description"] : "",
            type: (bsonType == "") ? "*" : "`" + bsonType + "`",
            values: (bsonType === "object") ? bsonType : calculateAcceptedValues(json["additionalProperties"]),
            required: "no",
            object: (bsonType === "object") ? acquireBaseProperties(json["additionalProperties"]) : {}
        };
    }
    //Add any Required Only properties
    if (typeof (json["required"]) !== typeof (undefined)) {
        for (var index in json["required"]) {
            if (properties.hasOwnProperty(json["required"][index])) continue;
            properties[json["required"][index]] = {
                required: "yes"
            }
        }
    }
    //Return Properties
    return properties;
}

/**
 * Merge Geometry Objects
 * @param {object} leftObject Left Object to Merge with Right Object
 * @param {object} rightObject Right Object to Merge with Left Object
 * @returns Merged Object
 */
function mergeGeometryObjects(leftObject, rightObject) {
    //Create new Merged Object with Required Properties
    var mergedObject = {
        types: mergeTypeStack(leftObject["types"], rightObject["types"]),
        dimensions: leftObject.dimensions.concat(rightObject.dimensions),
        properties: mergeProperties(leftObject.properties, rightObject.properties)
    }
    //Merge Optional Properties
    if (typeof (leftObject.leftFaceDimensions) !== typeof (undefined)) mergedObject.leftFaceDimensions = (typeof (rightObject.leftFaceDimensions) !== typeof (undefined)) ? leftObject.leftFaceDimensions.concat(rightObject.leftFaceDimensions) : leftObject.leftFaceDimensions;
    else if (typeof (rightObject.leftFaceDimensions) !== typeof (undefined)) mergedObject.leftFaceDimensions = rightObject.leftFaceDimensions;
    if (typeof (leftObject.rightFaceDimensions) !== typeof (undefined)) mergedObject.rightFaceDimensions = (typeof (rightObject.rightFaceDimensions) !== typeof (undefined)) ? leftObject.rightFaceDimensions.concat(rightObject.rightFaceDimensions) : leftObject.rightFaceDimensions;
    else if (typeof (rightObject.rightFaceDimensions) !== typeof (undefined)) mergedObject.rightFaceDimensions = rightObject.rightFaceDimensions;
    //Return Merged Object
    return mergedObject;
}

/**
 * Merge Geometry Attributes into Property
 * @param {object} geometryObject Geometry Object
 */
function mergeGeometryAttributesIntoProperties(geometryObject) {
    //Clone Existing: Need to clone this otherwise you get ghost properties from previous itterations
    var clonedObject = JSON.parse(JSON.stringify(geometryObject["properties"]));
    //Merge in Types
    if (geometryObject["types"].length > 0 && typeof (geometryObject["properties"]["type"]) === typeof (undefined)) console.log("Error:Geometry Object has types but no type to merge");
    else if (typeof (geometryObject["properties"]["type"]["object"]) === typeof (undefined) || typeof (geometryObject["properties"]["type"]["object"]["name"]) === typeof (undefined)) console.log("Error: Missing type property declaration");
    else clonedObject["type"]["object"]["name"]["values"] = flatternTypeStack(geometryObject["types"]);
    //Merge in Dimensions
    if (geometryObject["dimensions"].length > 0 && typeof (geometryObject["properties"]["dimensions"]) === typeof (undefined)) console.log("Error:Geometry Object has dimensions but no additional property to merge");
    else if (typeof (geometryObject["properties"]["dimensions"]["object"]) === typeof (undefined) || typeof (geometryObject["properties"]["dimensions"]["object"]["_"]) === typeof (undefined)) console.log("Error: Missing additional property declaration");
    else {
        for (var sourceIndex in geometryObject["dimensions"]) {
            if (geometryObject["dimensions"][sourceIndex].length != 3) continue;
            //Create Updated Dimension Property
            var dimensionProperty = JSON.parse(JSON.stringify(geometryObject["properties"]["dimensions"]["object"]["_"]));
            if (dimensionProperty["object"]["unit"]["type"] === "*" && geometryObject["dimensions"][sourceIndex][1].length > 2 && geometryObject["dimensions"][sourceIndex][1][0] == "`") dimensionProperty["object"]["unit"]["type"] = "`string`";
            dimensionProperty["object"]["unit"]["values"] = geometryObject["dimensions"][sourceIndex][1];
            dimensionProperty["required"] = geometryObject["dimensions"][sourceIndex][2];
            //Add Property into Properties Object
            clonedObject["dimensions"]["object"][geometryObject["dimensions"][sourceIndex][0]] = dimensionProperty;
        }
    }
    //Merge in Left Face Dimensions
    if (typeof (geometryObject["leftFaceDimensions"]) !== typeof (undefined)) {
        if (geometryObject["leftFaceDimensions"].length > 0 && typeof (geometryObject["properties"]["faces"]) === typeof (undefined)) console.log("Error:Geometry Object has left face dimensions but no additional property to merge");
        else if (
            typeof (geometryObject["properties"]["faces"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["left"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["left"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["left"]["object"]["dimensions"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["left"]["object"]["dimensions"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["left"]["object"]["dimensions"]["object"]["_"]) === typeof (undefined)
        ) console.log("Error: Missing additional property declaration");
        else {
            for (var sourceIndex in geometryObject["leftFaceDimensions"]) {
                if (geometryObject["leftFaceDimensions"][sourceIndex].length != 3) continue;
                //Create Updated Dimensions Property
                var dimensionProperty = JSON.parse(JSON.stringify(geometryObject["properties"]["faces"]["object"]["left"]["object"]["dimensions"]["object"]["_"]));
                if (dimensionProperty["object"]["unit"]["type"] === "*" && geometryObject["leftFaceDimensions"][sourceIndex][1].length > 2 && geometryObject["leftFaceDimensions"][sourceIndex][1][0] == "`") dimensionProperty["object"]["unit"]["type"] = "`string`";
                dimensionProperty["object"]["unit"]["values"] = geometryObject["leftFaceDimensions"][sourceIndex][1];
                dimensionProperty["required"] = geometryObject["leftFaceDimensions"][sourceIndex][2];
                //Add Property into Properties Object
                clonedObject["faces"]["object"]["left"]["object"]["dimensions"]["object"][geometryObject["leftFaceDimensions"][sourceIndex][0]] = dimensionProperty;
            }
        }
    }
    //Merge in Right Dimensions
    if (typeof (geometryObject["rightFaceDimensions"]) !== typeof (undefined)) {
        if (geometryObject["rightFaceDimensions"].length > 0 && typeof (geometryObject["properties"]["faces"]) === typeof (undefined)) console.log("Error:Geometry Object has right face dimensions but no additional property to merge");
        else if (
            typeof (geometryObject["properties"]["faces"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["right"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["right"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["right"]["object"]["dimensions"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["right"]["object"]["dimensions"]["object"]) === typeof (undefined)
            || typeof (geometryObject["properties"]["faces"]["object"]["right"]["object"]["dimensions"]["object"]["_"]) === typeof (undefined)
        ) console.log("Error: Missing additional property declaration");
        else {
            for (var sourceIndex in geometryObject["rightFaceDimensions"]) {
                if (geometryObject["rightFaceDimensions"][sourceIndex].length != 3) continue;
                //Create Updated Dimensions Property
                var dimensionProperty = JSON.parse(JSON.stringify(geometryObject["properties"]["faces"]["object"]["right"]["object"]["dimensions"]["object"]["_"]));
                if (dimensionProperty["object"]["unit"]["type"] === "*" && geometryObject["rightFaceDimensions"][sourceIndex][1].length > 2 && geometryObject["rightFaceDimensions"][sourceIndex][1][0] == "`") dimensionProperty["object"]["unit"]["type"] = "`string`";
                dimensionProperty["object"]["unit"]["values"] = geometryObject["rightFaceDimensions"][sourceIndex][1];
                dimensionProperty["required"] = geometryObject["rightFaceDimensions"][sourceIndex][2];
                //Add Property into Properties Object
                clonedObject["faces"]["object"]["right"]["object"]["dimensions"]["object"][geometryObject["rightFaceDimensions"][sourceIndex][0]] = dimensionProperty;
            }
        }
    }
    //Update Properties
    geometryObject["properties"] = clonedObject;
}

/**
 * Recurisve Parse Geometry Object
 * @param {object} json JSON Object
 * @returns Object containing, types, dimensions, children and left and right face dimensions
 */
function recuriseParseGeometryObject(json) {
    //Create Variables
    var types = [];
    var dimensions = [];
    var children = [];
    var leftFaceDimensions = [];
    var rightFaceDimensions = [];
    var properties = [];
    //Process Direct Property Values
    if (typeof (json["properties"]) !== typeof (undefined)) {
        //Find The Stack of Types
        types = recursiveBuildTypeStack(json);
        properties = acquireBaseProperties(json);
        //Find Current Dimensions
        if (typeof (json["properties"]["dimensions"]) !== typeof (undefined)) {
            if (typeof (json["properties"]["dimensions"]["properties"]) !== typeof (undefined)) {
                for (var dimension in json["properties"]["dimensions"]["properties"]) {
                    //Calculate Units
                    var units = "";
                    for (var enumIndex in json["properties"]["dimensions"]["properties"][dimension]["properties"]["unit"]["enum"]) {
                        units += ((units.length > 0) ? ", " : "") + "`" + json["properties"]["dimensions"]["properties"][dimension]["properties"]["unit"]["enum"][enumIndex] + "`";
                    }
                    //Add Dimension
                    dimensions.push([
                        dimension,
                        units,
                        ((typeof (json["properties"]["dimensions"]["required"]) !== typeof (undefined) && json["properties"]["dimensions"]["required"].indexOf(dimension) > -1) ? "yes" : "no")
                    ]);
                }
            } else if (typeof (json["properties"]["dimensions"]["additionalProperties"]) !== typeof (undefined)) {
                if (typeof (json["properties"]["dimensions"]["additionalProperties"]["oneOf"]) !== typeof (undefined)) {
                    for (var additionalPropertyIndex in json["properties"]["dimensions"]["additionalProperties"]["oneOf"]) {
                        //Calculate Units
                        var units = "";
                        for (var enumIndex in json["properties"]["dimensions"]["additionalProperties"]["oneOf"][additionalPropertyIndex]["properties"]["unit"]["enum"]) {
                            units += ((units.length > 0) ? ", " : "") + "`" + json["properties"]["dimensions"]["additionalProperties"]["oneOf"][additionalPropertyIndex]["properties"]["unit"]["enum"][enumIndex] + "`";
                        }
                        //Add Dimension
                        dimensions.push(["*", units, "-"]);
                    }
                } else if (typeof (json["properties"]["dimensions"]["additionalProperties"]["properties"]) !== typeof (undefined)) {
                    //Calculate Units
                    var units = "";
                    for (var enumIndex in json["properties"]["dimensions"]["additionalProperties"]["properties"]["unit"]["enum"]) {
                        units += ((units.length > 0) ? ", " : "") + "`" + json["properties"]["dimensions"]["additionalProperties"]["properties"]["unit"]["enum"][enumIndex] + "`";
                    }
                    //Add Dimension
                    dimensions.push(["*", units, "-"]);
                }
            }
        }
        //Find Current Face Dimensions
        if (typeof (json["properties"]["faces"]) !== typeof (undefined) && typeof (json["properties"]["faces"]["properties"]) !== typeof (undefined)) {
            //Left Face
            if (typeof (json["properties"]["faces"]["properties"]["left"]) !== typeof (undefined) && typeof (json["properties"]["faces"]["properties"]["left"]["properties"]) !== typeof (undefined)) {
                for (var leftDimension in json["properties"]["faces"]["properties"]["left"]["properties"]["dimensions"]["properties"]) {
                    //Calculate Units
                    var units = "";
                    for (var enumIndex in json["properties"]["faces"]["properties"]["left"]["properties"]["dimensions"]["properties"][leftDimension]["properties"]["unit"]["enum"]) {
                        units += ((units.length > 0) ? ", " : "") + "`" + json["properties"]["faces"]["properties"]["left"]["properties"]["dimensions"]["properties"][leftDimension]["properties"]["unit"]["enum"][enumIndex] + "`";
                    }
                    //Add Dimension
                    leftFaceDimensions.push([
                        leftDimension,
                        units,
                        ((typeof (json["properties"]["faces"]["properties"]["left"]["properties"]["dimensions"]["required"]) !== typeof (undefined) && json["properties"]["faces"]["properties"]["left"]["properties"]["dimensions"]["required"].indexOf(leftDimension) > -1) ? "yes" : "no")
                    ]);
                }
            }
            //Right Face
            if (typeof (json["properties"]["faces"]["properties"]["right"]) !== typeof (undefined) && typeof (json["properties"]["faces"]["properties"]["right"]["properties"]) !== typeof (undefined)) {
                for (var rightDimension in json["properties"]["faces"]["properties"]["right"]["properties"]["dimensions"]["properties"]) {
                    //Calculate Units
                    var units = "";
                    for (var enumIndex in json["properties"]["faces"]["properties"]["right"]["properties"]["dimensions"]["properties"][rightDimension]["properties"]["unit"]["enum"]) {
                        units += ((units.length > 0) ? ", " : "") + "`" + json["properties"]["faces"]["properties"]["right"]["properties"]["dimensions"]["properties"][rightDimension]["properties"]["unit"]["enum"][enumIndex] + "`";
                    }
                    //Add Dimension
                    rightFaceDimensions.push([
                        rightDimension,
                        units,
                        ((typeof (json["properties"]["faces"]["properties"]["right"]["properties"]["dimensions"]["required"]) !== typeof (undefined) && json["properties"]["faces"]["properties"]["right"]["properties"]["dimensions"]["required"].indexOf(rightDimension) > -1) ? "yes" : "no")
                    ]);
                }
            }
        }
    } else if (typeof (json["allOf"]) !== typeof (undefined)) {
        //Find All of the Children
        var allOfChildren = [];
        for (var allOfIndex in json["allOf"]) {
            var child = recuriseParseGeometryObject(json["allOf"][allOfIndex]);
            if (typeof (child.length) === typeof (undefined)) allOfChildren.push(child);
            else {
                //Merge Current Stack Objects with New Stack Objects
                var emptyStack = (allOfChildren.length == 0) ? true : false;
                var replacementStack = []
                for (var childIndex in child) {
                    if (emptyStack) replacementStack.push(child[childIndex]);
                    else for (var allOfChildIndex in allOfChildren) {
                        replacementStack.push(mergeGeometryObjects(allOfChildren[allOfChildIndex], child[childIndex]));
                    }
                }
                //Replace current stack with the replacement stack
                allOfChildren = replacementStack;
            }
        }
        //Process All Of Children
        for (var childIndex in allOfChildren) {
            children.push(allOfChildren[childIndex]);
        }
    }
    //Process Any One Of Children
    if (typeof (json["oneOf"]) !== typeof (undefined)) {
        for (var oneOfIndex in json["oneOf"]) {
            var child = recuriseParseGeometryObject(json["oneOf"][oneOfIndex]);
            if (typeof (child.length) === typeof (undefined)) children.push(child);
            else for (var childIndex in child) children.push(child[childIndex]);
        }
    }
    //Return Results Object
    if (types.length == 0 && dimensions.length == 0 && leftFaceDimensions.length == 0 && rightFaceDimensions.length == 0) return children;
    else {
        //Create Current Object
        var result = { types: types, properties: properties, dimensions: dimensions };
        if (leftFaceDimensions.length > 0) result.leftFaceDimensions = leftFaceDimensions;
        if (rightFaceDimensions.length > 0) result.rightFaceDimensions = rightFaceDimensions;
        //Merge Child object with Parent
        if (children.length == 0) return result;
        else {
            var replacementStack = [];
            for (var childIndex in children) {
                replacementStack.push(mergeGeometryObjects(result, children[childIndex]));
            }
            return replacementStack;
        }
    }
}

/**
 * Markdown Generation Callback
 * @param {string} stage the stage at which the callback is getting called
 * @param {string} container container to write the markdown to
 * @param {array} tree the current path within the json
 * @param {object} json the json
 * @param {object} overrides property values to override
 * @returns boolean of if to continue that stage or not
 */
function markdownGenerationCallback(stage, container, tree, json, overrides) {
    if (stage == "property") {
        if (tree.length == 3 && tree[0] == "dimension" && tree[1] == "wildcard" && tree[2] == "unit") {
            overrides.type = "any supported type";
            overrides.values = "any value";
            return false;
        }
        else if (tree.length == 4 && (
            (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale cuboid" && tree[3] == "bounding")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale cuboid" && tree[3] == "bounding")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale cylinder" && tree[3] == "bounding")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale cylinder" && tree[3] == "bounding")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale other" && tree[3] == "bounding")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale other" && tree[3] == "bounding")
        )) {
            overrides.required = "yes, if `faces` or `dimensions` provided";
            return false;
        }
        else if (tree.length == 4 && (
            (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale cuboid" && tree[3] == "faces")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale cuboid" && tree[3] == "faces")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale cylinder" && tree[3] == "faces")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale cylinder" && tree[3] == "faces")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "solid translateAndScale other" && tree[3] == "faces")
            || (tree[0] == "geometry" && tree[1] == "element" && tree[2] == "shell translateAndScale other" && tree[3] == "faces")
        )) {
            overrides.required = "yes, if `bounding` or `dimensions` provided";
            return false;
        }
        else if (tree.length == 3 && tree[0] == "material" && tree[1] == "element" && tree[2] == "properties") {
            overrides.values = calculateMappedLink("properties", [tree[0], tree[1]]);
            return false;
        }
        else if (tree.length == 3 && tree[0] == "material" && tree[1] == "element" && tree[2] == "symmetry") {
            overrides.required = "yes, if `properties` provided";
            return false;
        }
        else if (
            (tree.length == 4 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "value") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "vickersHardness" && tree[4] == "value") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "brinellHardness" && tree[4] == "value")
        ) {
            overrides.required = "yes";
            return false;
        }
        else if (
            (tree.length == 4 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "environmental") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "vickersHardness" && tree[4] == "environmental") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "brinellHardness" && tree[4] == "environmental")
        ) {
            overrides.required = "yes, if no `parameters`";
            return false;
        }
        else if (
            (tree.length == 4 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "parameters") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "vickersHardness" && tree[4] == "parameters") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "brinellHardness" && tree[4] == "parameters")
        ) {
            overrides.required = "yes, if no `environmental`";
            return false;
        }
    } else if (stage == "recursion") {
        if (
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "vickersHardness" && tree[4] == "parameters") ||
            (tree.length == 5 && tree[0] == "property" && tree[1] == "material" && tree[2] == "conditional" && tree[3] == "brinellHardness" && tree[4] == "parameters")
        ) {
            //If Default Object
            if (json.hasOwnProperty("_")) {
                for (var parameter in json) {
                    if (parameter == "_") continue;
                    //Base Properties
                    if (json[parameter]["description"] == "" && typeof (json["_"]["description"]) !== typeof (undefined) && json["_"]["description"] != "") json[parameter]["description"] = json["_"]["description"];
                    if (json[parameter]["type"] == "*" && json["_"]["type"] != "*") json[parameter]["type"] = json["_"]["type"];
                    if (json[parameter]["values"] == "Unknown" && json["values"] != "Unknown") json[parameter]["values"] = json["_"]["values"];
                    //Sub Objects
                    for (var objectParameter in json["_"]["object"]) {
                        if (!json[parameter]["object"].hasOwnProperty(objectParameter)) json[parameter]["object"][objectParameter] = json["_"]["object"][objectParameter];
                        else {
                            for (var childObjectParamter in json["_"]["object"][objectParameter]) {
                                if (!json[parameter]["object"][objectParameter].hasOwnProperty(childObjectParamter)) json[parameter]["object"][objectParameter][childObjectParamter] = json["_"]["object"][objectParameter][childObjectParamter];
                                else if (
                                    json[parameter]["object"][objectParameter][childObjectParamter] == "no" ||
                                    json[parameter]["object"][objectParameter][childObjectParamter] == "Unknown" ||
                                    json[parameter]["object"][objectParameter][childObjectParamter] == "*" ||
                                    json[parameter]["object"][objectParameter][childObjectParamter] == ""
                                ) json[parameter]["object"][objectParameter][childObjectParamter] = json["_"]["object"][objectParameter][childObjectParamter];
                            }
                        }
                    }
                }
                //Recursive Markdown
                generateRecursiveObjectMarkdownFromProperties(container, tree, json, markdownGenerationCallback);
                return true;
            }
        }
    }
    return false;
}

/**
 * Merge Properties Stack
 * @param {array} stack The Stack Array
 * @param {array} items The items to merge with the current stack items
 * @returns Merged Stack
 */
function mergePropertiesStacks(stack, items) {
    //Create New Stack
    var replacementStack = [];
    //Append Items To Stack
    if (stack.length == 0) {
        if (!Array.isArray(items)) replacementStack.push(items);
        else {
            for (var itemIndex in items) {
                replacementStack.push(items[itemIndex]);
            }
        }
    }
    for (var stackIndex in stack) {
        if (!Array.isArray(items)) replacementStack.push(mergeProperties(stack[stackIndex], items));
        else {
            for (var itemIndex in items) {
                replacementStack.push(mergeProperties(stack[stackIndex], items[itemIndex]));
            }
        }
    }
    //Return Replacements
    return replacementStack;
}

/**
 * Generate Recurise Object Properties
 * @param {object} json JSON Object
 * @returns Properties Array
 */
function generateRecursieObjectProperties(json) {
    //Enumerate through Properties
    var baseProperties = {};
    for (var property in json["properties"]) {
        //Determine Type
        var bsonType = json["properties"][property]["bsonType"];
        if (typeof (bsonType) === typeof (undefined)) {
            bsonType = "";
            for (var index in json["properties"][property]["oneOf"]) {
                bsonType += ((index > 0) ? "`, `" : "") + json["properties"][property]["oneOf"][index]["bsonType"];
            }
        }
        //Calculate Description and Accepted Values
        var description = json["properties"][property]["description"];
        var acceptedValues = (bsonType === "object") ? bsonType : calculateAcceptedValues(json["properties"][property]);
        //Objects
        var object = {}
        if ((bsonType == "array" || bsonType == "") && typeof (json["properties"][property]["items"]) != typeof (undefined)) object = generateRecursieObjectProperties(json["properties"][property]["items"]);
        else if (bsonType === "object" || bsonType == "") object = generateRecursieObjectProperties(json["properties"][property]);
        //Ignore Empty Rows
        if (bsonType == "" && typeof (description) === typeof (undefined) && acceptedValues == "Unknown" && object == {}) continue;
        //Append Property
        baseProperties[property] = {
            description: (typeof (description) !== typeof (undefined)) ? description : "",
            type: (bsonType == "") ? "*" : "`" + bsonType + "`",
            values: acceptedValues,
            required: (typeof (json["required"]) !== typeof (undefined) && json["required"].indexOf(property) > -1) ? "yes" : "no",
            object: object
        };
    }
    //Add in Additional Property Objects
    if (typeof (json["additionalProperties"]) !== typeof (undefined) && typeof (json["additionalProperties"]) !== "boolean") {
        //Determine Type
        var bsonType = json["additionalProperties"]["bsonType"];
        if (typeof (bsonType) === typeof (undefined)) {
            bsonType = "";
            for (var index in json["additionalProperties"]["oneOf"]) {
                bsonType += ((index > 0) ? "`, `" : "") + json["additionalProperties"]["oneOf"][index]["bsonType"];
            }
        }
        //Objects
        var object = {}
        if (bsonType === "object") object = generateRecursieObjectProperties(json["additionalProperties"]);
        else if (bsonType == "array" && typeof (json["additionalProperties"]["items"]) != typeof (undefined)) object = generateRecursieObjectProperties(json["additionalProperties"]["items"]);
        //Append Property
        baseProperties["_"] = {
            description: (typeof (json["additionalProperties"]["description"]) !== typeof (undefined)) ? json["additionalProperties"]["description"] : "",
            type: (bsonType == "") ? "*" : "`" + bsonType + "`",
            values: (bsonType === "object") ? bsonType : calculateAcceptedValues(json["additionalProperties"]),
            required: "no",
            object: (bsonType === "object") ? acquireBaseProperties(json["additionalProperties"]) : {}
        };
    }
    //Add any Required Only properties
    if (typeof (json["required"]) !== typeof (undefined)) {
        for (var index in json["required"]) {
            if (baseProperties.hasOwnProperty(json["required"][index])) continue;
            baseProperties[json["required"][index]] = {
                required: "yes"
            }
        }
    }
    //One Of
    var stack = [];
    if (typeof (json["oneOf"]) !== typeof (undefined)) {
        //Enumerate through One Of's
        for (var index in json["oneOf"]) {
            //Get Properties & Merge with Base Properties
            var merged = mergePropertiesStacks([baseProperties], generateRecursieObjectProperties(json["oneOf"][index]));
            for (var mergeIndex in merged) {
                stack.push(merged[mergeIndex]);
            }
        }
    }
    //All Of
    if (typeof (json["allOf"]) !== typeof (undefined)) {
        //Enumerate through All Of's
        var allStack = [];
        for (var index in json["allOf"]) {
            //Get Properties & Merge with Current All Stack
            allStack = mergePropertiesStacks(allStack, generateRecursieObjectProperties(json["allOf"][index]));
        }
        //Replace Stack
        stack = (stack.length > 0) ? mergePropertiesStacks(stack, allStack) : mergePropertiesStacks([baseProperties], allStack);
    }
    //Return
    return (stack.length > 0) ? stack : baseProperties;
}

/**
 * Generate One Of Object Markdown
 * @param {string} container
 * @param {array} tree the current path within the json
 * @param {object} json the json
 * @param {*} callback
 * @returns
 */
function generateOneOfObjectMarkdown(container, tree, json, callback) {
    //Ensure One Of
    if (typeof (json["oneOf"]) === typeof (undefined)) return;
    //Handle Different Variations
    if (tree.length == 2 && tree[0] == "geometry" && tree[1] == "element") {
        //Generate Anchor
        var anchor = generateAnchorFromTree(tree, replacement = replacements);
        var anchorLevel = "#";
        for (var i = 0; i < tree.length; i++) {
            anchorLevel += "#";
        }
        //Generate Object Headers
        var markdownContainer = markdownSwitch(container);
        markdownContainer.push("\r\n" + anchorLevel + " [" + anchor[1][0].toUpperCase() + anchor[1].substring(1) + "](#" + anchor[0] + ")");
        //Enumerate through One Of's
        var propertiesObject = { types: [], dimensions: [], properties: acquireBaseProperties(json) };
        for (var index in json["oneOf"]) {
            //Get Stack and Enforce Array
            var stack = recuriseParseGeometryObject(json["oneOf"][index]);
            if (typeof (stack.length) === typeof (undefined)) stack = [stack];
            //Merge in Properties & Display
            for (var stackIndex in stack) {
                //Merge in Properties & Dimensions
                var combinedObject = mergeGeometryObjects(propertiesObject, stack[stackIndex]);
                mergeGeometryAttributesIntoProperties(combinedObject);
                //Recursive Write Objects/Properties
                generateRecursiveObjectMarkdownFromProperties(container, appendBranchToTree(flatternTypeStack(combinedObject["types"], wrapper = "", siblingSeparator = ",", decendentSeparator = " "), tree), combinedObject["properties"], callback);
            }
        }
        return true;
    } else if (tree.length == 3 && tree[0] == "material" && tree[1] == "element" && tree[2] == "type") {
        //Generate Anchor
        var anchor = generateAnchorFromTree(tree, replacement = replacements);
        var anchorLevel = "#";
        for (var i = 0; i < tree.length; i++) {
            anchorLevel += "#";
        }
        //Generate Object Headers
        var markdownContainer = markdownSwitch(container);
        markdownContainer.push("\r\n" + anchorLevel + " [" + anchor[1][0].toUpperCase() + anchor[1].substring(1) + "](#" + anchor[0] + ")");
        //Get Base Properties
        var propertiesObject = acquireBaseProperties(json);
        //Enumerate through One Of's
        for (var index in json["oneOf"]) {
            //Acquire Stack Type
            var types = recursiveBuildTypeStackFromNames(json["oneOf"][index]);
            var flatternedTypes = flatternTypeStackArray(types, wrapper = "`", siblingSeparator = ", ", decendentSeparator = " -> ");
            //Enumerate through Types
            for (var typeIndex in flatternedTypes) {
                //Create Clone and Merge in Types
                var cloneProperties = JSON.parse(JSON.stringify(propertiesObject));
                cloneProperties["name"]["values"] = flatternedTypes[typeIndex];
                //Calculate Branch Name
                var branchName = flatternedTypes[typeIndex];
                if (flatternedTypes[typeIndex].lastIndexOf("->") > -1) {
                    branchName = flatternedTypes[typeIndex].substring(0, flatternedTypes[typeIndex].lastIndexOf("->") - 1);
                    if (branchName.lastIndexOf("->") > -1) branchName = branchName.substring(branchName.lastIndexOf("->") + 2);
                    if (branchName.indexOf("`") >= 0 && branchName.lastIndexOf("`") < branchName.length) branchName = branchName.substring(branchName.indexOf("`") + 1, branchName.lastIndexOf("`"));
                }
                //Recursive Write Objects/Properties
                generateRecursiveObjectMarkdownFromProperties(container, appendBranchToTree(branchName, tree), cloneProperties, callback);
            }
        }
        return true;
    } else if (tree.length == 3 && tree[0] == "material" && tree[1] == "element" && tree[2] == "properties") {
        //Generate Anchor
        var anchor = generateAnchorFromTree(tree, replacement = replacements);
        var anchorLevel = "#";
        for (var i = 0; i < tree.length; i++) {
            anchorLevel += "#";
        }
        //Generate Object Headers
        var markdownContainer = markdownSwitch(container);
        markdownContainer.push("\r\n" + anchorLevel + " [" + anchor[1][0].toUpperCase() + anchor[1].substring(1) + "](#" + anchor[0] + ")");
        //Generate Properties Stack
        var stack = generateRecursieObjectProperties(json);
        //Enumerate through the Stack
        if (!Array.isArray(stack)) generateRecursiveObjectMarkdownFromProperties(container, tree, stack, callback);
        else {
            for (var index in stack) {
                //Generate Branch Name
                var branchBase = "";
                if (stack[index]["type"]["values"].indexOf(",") < 0
                    && stack[index]["type"]["values"].indexOf("`") >= 0
                    && stack[index]["type"]["values"].lastIndexOf("`") < stack[index]["type"]["values"].length
                ) branchBase = stack[index]["type"]["values"].substring(stack[index]["type"]["values"].indexOf("`") + 1, stack[index]["type"]["values"].lastIndexOf("`"));
                else if (typeof (stack[index]["unit"]) !== typeof (undefined) && stack[index]["unit"]["values"] == "`K^-1`, `C^-1`, `F^-1`, `other`") branchBase = "thermalExpansionCoefficient";
                else if (typeof (stack[index]["unit"]) !== typeof (undefined) && stack[index]["unit"]["values"] == "`GPa`, `MPa`, `kPa`, `Pa`, `Mpsi`, `ksi`, `psi`, `other`") branchBase = "pressure";
                else if (typeof (stack[index]["unit"]) === typeof (undefined)) branchBase = "unitFree";
                else branchBase = index;
                var branchSuffix = Object.keys(stack[index]["value"]["object"]).length == 0 ? "Numerical" : "Conditional";
                //Generate Markdown
                generateRecursiveObjectMarkdownFromProperties(container, appendBranchToTree(branchBase + branchSuffix, tree), stack[index], callback);
            }
        }
        return true;
    }
    console.log("Unknown OneOf not dealt with:" + tree);
    console.log(JSON.stringify(json, null, 4));
    return false;
}

/**
 * Generate Anchor from Tree
 * @param {array} tree Array of Tree path
 * @param {dictionary} replacement Replacement Dictionary
 * @param {integer} prune Index of Tree to prune
 * @returns Array with two items: 0: Anchor, 1: Name
 */
function generateAnchorFromTree(tree, replacement = {}, prune = 0,) {
    //Create Variables
    var anchor = "";
    var name = "";
    //Enumerate through Tree
    for (var index = ((prune >= 0) ? tree.length - 1 : tree.length - 1 + prune); index >= ((prune >= 0) ? prune : 0); index--) {
        //Append Join Character
        if (anchor.length > 0) {
            anchor += "-";
            name += " ";
        }
        //Process Characters in Branch
        var branch = ((index in replacement) ? replacement[index] : tree[index]);
        for (var char in branch) {
            var charCode = branch.charCodeAt(char);
            if (char > 0 && ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) && branch[char] === branch[char].toUpperCase()) {
                anchor += "-";
                name += " ";
            }
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) anchor += branch[char].toLowerCase();
            else if (char > 0 && branch[char] == " ") anchor += "-";
            name += ((char == 0 || (name.length > 0 && name[name.length - 1] === " ")) ? branch[char].toUpperCase() : branch[char]);
        }
    }
    //Return Anchor & Name
    return [anchor, name];
}

/**
 * Calculate Tree Mappings
 * @param {array} tree Tree path array
 * @param {boolean} appendToProcessed Append the Mapped Tree to Processed
 * @returns Array 0:Exists, 1:Processed, 2: Container, 3: Tree
 */
function calculateTreeMappins(tree, appendToProcessed = false) {
    //Create Variables
    var processed = false;
    var container = "";
    var mappedTree = [];
    //Enumerate Through Mappings
    for (var mappingIndex in mappings) {
        for (var sourceIndex in mappings[mappingIndex].source) {
            //Check Trees Match
            if (mappings[mappingIndex].source[sourceIndex].length != tree.length) continue;
            var found = true;
            for (var branchIndex in tree) {
                if (tree[branchIndex] === mappings[mappingIndex].source[sourceIndex][branchIndex]) continue;
                found = false;
                break;
            }
            if (!found) continue;
            //Check if new Tree already processed
            for (var processedIndex in processedMappings) {
                if (processedMappings[processedIndex].length !== mappings[mappingIndex].destination.tree.length) continue;
                var match = true;
                for (var branchIndex in processedMappings[processedIndex]) {
                    if (processedMappings[processedIndex][branchIndex] === mappings[mappingIndex].destination.tree[branchIndex]) continue;
                    match = false;
                    break;
                }
                if (!match) continue;
                processed = true;
                break;
            }
            //Copy Over Mapping Values
            if (appendToProcessed) processedMappings.push(mappings[mappingIndex].destination.tree);
            container = (typeof (mappings[mappingIndex].destination.container) !== typeof (undefined)) ? mappings[mappingIndex].destination.container : "";
            mappedTree = mappings[mappingIndex].destination.tree;
            break;
        }
        if (mappedTree.length > 0) break;
    }
    //Return Array
    return [(mappedTree.length > 0) ? true : false, processed, container, mappedTree];
}

/**
 * Append Branch to new Tree
 * @param {string} branch Branch to add to the Tree
 * @param {array} tree Tree for the Branch to be added to
 * @returns New Tree that incorporated Branch
 */
function appendBranchToTree(branch, tree) {
    var sapling = [];
    for (var index in tree) {
        sapling.push(tree[index]);
    }
    sapling.push(branch);
    return sapling;
}

/**
 * Calculate Mapped Link
 * @param {string} branch Branch of the Tree
 * @param {array} tree Tree for the Branch to be added to
 * @returns Anchor Markup
 */
function calculateMappedLink(branch, tree) {
    var sapling = appendBranchToTree(branch, tree);
    var mapped = calculateTreeMappins(sapling);
    var mappedTree = (mapped[0] == true) ? mapped[3] : sapling;
    var suffix = generateAnchorFromTree(mappedTree, replacement = replacements);
    var link = "";
    var charCaseFlip = false;
    for (var index = mappedTree.length - 1; index >= 0; index--) {
        for (var char in mappedTree[index]) {
            if (mappedTree[index][char] == " ") {
                charCaseFlip = true;
                continue;
            }
            link += (link.length > 0 && (char == 0 || charCaseFlip == true)) ? mappedTree[index][char].toUpperCase() : mappedTree[index][char];
            charCaseFlip = false;
        }
    }
    return "[`" + link + "`](#" + suffix[0] + ")";
}

/**
 * Calculate Accepted Values
 * @param {object} json json document
 * @returns
 */
function calculateAcceptedValues(json) {
    //Catch String first
    if (json["bsonType"] === "string" || (typeof (json["bsonType"]) === typeof (undefined) && typeof (json["enum"]) !== typeof (undefined))) {
        if (typeof (json["enum"]) !== typeof (undefined)) {
            var values = "";
            for (var index in json["enum"]) {
                values += ((values.length > 0) ? ", " : "") + "`" + json["enum"][index] + "`";
            }
            return values;
        } else {
            var parameters = "";
            if (typeof (json["minLength"]) !== typeof (undefined)) parameters += (parameters.length > 0 ? ", " : "") + "Minimum Length: " + json["minLength"];
            if (typeof (json["maxLength"]) !== typeof (undefined)) parameters += (parameters.length > 0 ? ", " : "") + "Maximum Length: " + json["maxLength"];
            return parameters.length > 0 ? parameters : "*";
        }
    } else if (typeof (json["bsonType"]) === typeof (undefined)) {
        if (typeof (json["oneOf"]) === typeof (undefined)) return "Unknown";
        else {
            var value = "";
            for (var index in json["oneOf"]) {
                if (json["oneOf"][index]["bsonType"] === "int" && index == 0 && json["oneOf"].length == 2 && json["oneOf"][1]["bsonType"] === "double") {
                    value += ((value.length > 0) ? " or " : "") + "any numerical value";
                    break;
                }
                else if (json["oneOf"][index]["bsonType"] === "int") value += ((value.length > 0) ? " or " : "") + "any integer value";
                else if (json["oneOf"][index]["bsonType"] === "double") value += ((value.length > 0) ? " or " : "") + "any double value";
            }
            return ((value.length > 0) ? value : "!!!ERROR: unable to acquire values from array");
        }
    } else if (json["bsonType"] === "int") return "any integer value";
    else if (json["bsonType"] === "double") return "any double value";
    else if (json["bsonType"] === "array") return "array of items...";
    else return "Unknown";
}

/**
 *
 * @param {string} container container to write the markdown to
 * @param {array} tree the current path within the json
 * @param {*} json the json
 * @param {*} callback markdown generation callback
 */
function generateRecursiveArrayMarkdown(container, tree, json, callback) {
    //Ensure Items
    if (typeof (json["items"]) === typeof (undefined)) return;
    //Determine if Single Item
    if (typeof (json["items"]["oneOf"]) === typeof (undefined)) generateRecursiveObjectMarkdown(container, tree, json["items"], callback);
    else generateOneOfObjectMarkdown(container, tree, json["items"], callback);
}

/**
 * Generate Recursie Object Markdown from Properties
 * @param {string} container container to write the markdown to
 * @param {array} tree the current path within the json
 * @param {*} properties generated properties object
 * @param {*} callback markdown generation callback
 */
function generateRecursiveObjectMarkdownFromProperties(container, tree, properties, callback) {
    //Find Mapping and Proceed if not Processed already
    var mapping = calculateTreeMappins(tree, appendToProcessed = true);
    if (mapping[0] == true && mapping[1] == true) return;
    else if (mapping[2].length > 0) container = mapping[2];
    //Generate Anchor
    var anchor = generateAnchorFromTree((mapping[0] == true) ? mapping[3] : tree, replacement = replacements);
    var anchorLevel = "#";
    for (var i = 0; i < ((mapping[0] == true) ? mapping[3] : tree).length; i++) {
        anchorLevel += "#"
    }
    //Generate Object Headers
    var markdownContainer = markdownSwitch(container);
    markdownContainer.push("\r\n" + anchorLevel + " [" + anchor[1][0].toUpperCase() + anchor[1].substring(1) + "](#" + anchor[0] + ")");
    markdownContainer.push("|Property|Description|Type|Values|Required|");
    markdownContainer.push("|---|-----|---|---|---|");
    //Enumerate through Properties
    for (var property in properties) {
        //Generate Overrides
        var overrides = {};
        if (typeof (callback) !== typeof (undefined) && callback("property", container, appendBranchToTree(property, (mapping[0] == true) ? mapping[3] : tree), properties, overrides)) continue;
        //Generate Property Line
        markdownContainer.push(
            "|`" + property + "`|"
            + properties[property]["description"] + "|"
            + ((typeof (overrides.type) !== typeof (undefined)) ? overrides.type : properties[property]["type"]) + "|"
            + ((typeof (overrides.values) !== typeof (undefined)) ? overrides.values : ((properties[property]["values"] === "object" || Object.keys(properties[property]["object"]).length > 0) ? calculateMappedLink(property, (mapping[0] == true) ? mapping[3] : tree) : properties[property]["values"])) + "|"
            + ((typeof (overrides.required) !== typeof (undefined)) ? overrides.required : properties[property]["required"]) + "|"
        );
    }
    //Enumerate through Objects
    for (var property in properties) {
        if (typeof (properties[property]["object"]) === typeof (undefined) || JSON.stringify(properties[property]["object"]) === JSON.stringify({})) continue;
        var sapling = appendBranchToTree(property, (mapping[0] == true) ? mapping[3] : tree);
        if (typeof (callback) !== typeof (undefined) && callback("recursion", container, sapling, properties[property]["object"])) continue;
        generateRecursiveObjectMarkdownFromProperties(container, sapling, properties[property]["object"], callback);
    }
}

/**
 * Generate Recurise Object Markdown
 * @param {string} container container to write the markdown to
 * @param {array} tree the current path within the json
 * @param {*} json the json
 * @param {*} callback markdown generation callback
 */
function generateRecursiveObjectMarkdown(container, tree, json, callback) {
    //Find Mapping and Proceed if not Processed already
    var mapping = calculateTreeMappins(tree, appendToProcessed = true);
    if (mapping[0] == true && mapping[1] == true) return;
    else if (mapping[2].length > 0) container = mapping[2];
    //Determine if Object contains OneOf
    if (typeof (json["oneOf"]) !== typeof (undefined) && generateOneOfObjectMarkdown(container, (mapping[0] == true) ? mapping[3] : tree, json, callback)) return;
    //Generate Anchor
    var anchor = generateAnchorFromTree((mapping[0] == true) ? mapping[3] : tree, replacement = replacements);
    var anchorLevel = "#";
    for (var i = 0; i < ((mapping[0] == true) ? mapping[3] : tree).length; i++) {
        anchorLevel += "#"
    }
    //Generate Object Headers
    var markdownContainer = markdownSwitch(container);
    markdownContainer.push("\r\n" + anchorLevel + " [" + anchor[1][0].toUpperCase() + anchor[1].substring(1) + "](#" + anchor[0] + ")");
    markdownContainer.push("|Property|Description|Type|Values|Required|");
    markdownContainer.push("|---|-----|---|---|---|");
    //Enumerate through Properties
    for (var property in json["properties"]) {
        //Generate Overrides
        var overrides = {};
        if (typeof (callback) !== typeof (undefined) && callback("property", container, appendBranchToTree(property, (mapping[0] == true) ? mapping[3] : tree), json, overrides)) continue;
        //Determine Type
        var bsonType = json["properties"][property]["bsonType"];
        if (typeof (bsonType) === typeof (undefined)) {
            bsonType = "";
            for (var index in json["properties"][property]["oneOf"]) {
                bsonType += ((index > 0) ? "`, `" : "") + json["properties"][property]["oneOf"][index]["bsonType"];
            }
        }
        //Generate Property Line
        markdownContainer.push(
            "|`" + property + "`|"
            + json["properties"][property]["description"] + "|"
            + ((typeof (overrides.type) !== typeof (undefined)) ? overrides.type : "`" + bsonType + "`") + "|"
            + ((typeof (overrides.values) !== typeof (undefined)) ? overrides.values : ((bsonType === "object" || bsonType === "array") ? calculateMappedLink(property, (mapping[0] == true) ? mapping[3] : tree) : calculateAcceptedValues(json["properties"][property]))) + "|"
            + ((typeof (overrides.required) !== typeof (undefined)) ? overrides.required : ((typeof (json["required"]) !== typeof (undefined) && json["required"].indexOf(property) > -1) ? "yes" : "no")) + "|"
        );
    }
    //Enumerate through 'object' Properties
    for (var property in json["properties"]) {
        if (json["properties"][property]["bsonType"] !== "object") continue;
        //Recursive Call Object Property Markdown
        var sapling = appendBranchToTree(property, (mapping[0] == true) ? mapping[3] : tree);
        if (typeof (callback) !== typeof (undefined) && callback("recursion", container, sapling, json)) continue;
        generateRecursiveObjectMarkdown(container, sapling, json["properties"][property], callback);
    }
    //Enumber through 'array' Properties
    for (var property in json["properties"]) {
        if (json["properties"][property]["bsonType"] !== "array") continue;
        //Recursive Call Array Property Markdown
        var sapling = appendBranchToTree(property, (mapping[0] == true) ? mapping[3] : tree);
        if (typeof (callback) !== typeof (undefined) && callback("recursion", container, sapling, json)) continue;
        generateRecursiveArrayMarkdown(container, sapling, json["properties"][property], callback);
    }
}