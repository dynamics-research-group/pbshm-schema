# PBSHM Data Schema: Structure Data
A JSON Schema for Population-based Structural Health Monitoring Data
## [Schema Properties](#schema-properties)
|Name|Description|Type|Validation|
|---|---|---|---|
|`name`|Structure Name|`string`|Min Length: 1|
|`population`|Population Name|`string`|Min Length: 8, Max Length: 64|
|`timestamp`|Data Timestamp|`date`|Format: ISO 8601|
|`channels`|Data Channel Array|`array`|Array of [Channel Objects](#channel-objects)|
## [Channel Objects](#channel-objects)
A timepoint can have mutliple types of channel objects stored within it. Below is a list of the currently supported channel types.
### [Channel Types](#channel-types)
|Name|Accepted Type Property|Accepted Unit Property|Accepted Value Property|Required Properties|
|---|---|---|---|---|
|Acceleration Channel|`acceleration`|`(m/s)^2`, `g`, `v`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Velocity Channel|`velocity`|`m/s`, `v`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Displacement Channel|`displacement`|`mm`, `cm`, `m`, `km`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Angular Acceleration Channel|`angularAcceleration`|`(degrees/s)^2`, `(radians/s)^2`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Angular Velocity Channel|`angularVelocity`|`degrees/s`, `radians/s`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Angular Displacement Channel|`angularDisplacement`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Tilt Channel|`tilt`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Strain Channel|`strain`|`nd`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Tension Channel|`tension`|`fN`, `pN`, `nN`, `μN`, `mN`, `cN`, `dN`, `N`, `daN`, `hN`, `kN`, `MN`, `GN`, `TN`, `PN`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Structural Potential Hydrogen Channel|`structuralPotentialHydrogen`|`pH`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Temperature Channel|`temperature`|`C`, `F`, `K`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Humidity Channel|`humidity`|`%`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Speed Channel|`speed`|`mph`, `ft/s`, `km/h`, `m/s`, `kn`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Direction Channel|`direction`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Pressure Channel|`pressure`|`fPa`, `pPa`, `nPa`, `µPa`, `mPa`, `cPa`, `dPa`, `Pa`, `daPa`, `hPa`, `kPa`, `MPa`, `GPa`, `TPa`, `PPa`, `at`, `atm`, `bar`, `psi`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Altitude Channel|`altitude`|`mm`, `cm`, `m`, `km`, `feet`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Pitch Channel|`pitch`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Yaw Channel|`yaw`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Roll Channel|`roll`|`degrees`, `radians`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Pitch Rate Channel|`pitchRate`|`degrees/s`, `radians/s`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Yaw Rate Channel|`yawRate`|`degrees/s`, `radians/s`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Roll Rate Channel|`rollRate`|`degrees/s`, `radians/s`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Load Channel|`load`|`fg`, `pg`, `ng`, `µg`, `mg`, `cg`, `dg`, `g`, `dag`, `hg`, `kg`, `Mg`, `Gg`, `Tg`, `Pg`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Current Channel|`current`|`fA`, `pA`, `nA`, `µA`, `mA`, `cA`, `dA`, `A`, `daA`, `hA`, `kA`, `MA`, `GA`, `TA`, `PA`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Charge Channel|`charge`|`fC`, `pC`, `nC`, `µC`, `mC`, `cC`, `dC`, `C`, `daC`, `hC`, `kC`, `MC`, `GC`, `TC`, `PC`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Power Channel|`power`|`fW`, `pW`, `nW`, `µW`, `mW`, `cW`, `dW`, `W`, `daW`, `hW`, `kW`, `MW`, `GW`, `TW`, `PW`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Voltage Channel|`voltage`|`fV`, `pV`, `nV`, `µV`, `mV`, `cV`, `dV`, `V`, `daV`, `hV`, `kV`, `MV`, `GV`, `TV`, `PV`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Resistance Channel|`resistance`|`fΩ`, `pΩ`, `nΩ`, `µΩ`, `mΩ`, `cΩ`, `dΩ`, `Ω`, `daΩ`, `hΩ`, `kΩ`, `MΩ`, `GΩ`, `TΩ`, `PΩ`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Capacitance Channel|`capacitance`|`fF`, `pF`, `nF`, `µF`, `mF`, `cF`, `dF`, `F`, `daF`, `hF`, `kF`, `MF`, `GF`, `TF`, `PF`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Inductance Channel|`inductance`|`fH`, `pH`, `nH`, `µH`, `mH`, `cH`, `dH`, `H`, `daH`, `hH`, `kH`, `MH`, `GH`, `TH`, `PH`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Frequency Channel|`frequency`|`fHz`, `pHz`, `nHz`, `µHz`, `mHz`, `cHz`, `dHz`, `Hz`, `daHz`, `hHz`, `kHz`, `MHz`, `GHz`, `THz`, `PHz`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Conductance Channel|`conductance`|`fS`, `pS`, `nS`, `µS`, `mS`, `cS`, `dS`, `S`, `daS`, `hS`, `kS`, `MS`, `GS`, `TS`, `PS`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Magnetic Flux Channel|`magneticFlux`|`fWb`, `pWb`, `nWb`, `µWb`, `mWb`, `cWb`, `dWb`, `Wb`, `daWb`, `hWb`, `kWb`, `MWb`, `GWb`, `TWb`, `PWb`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Magnetic Field Strength Channel|`magneticFieldStrength`|`fT`, `pT`, `nT`, `µT`, `mT`, `cT`, `dT`, `T`, `daT`, `hT`, `kT`, `MT`, `GT`, `TT`, `PT`, `other`|`double`, `object`|`name`, `type`, `unit`, `value`|
|Date Channel|`date`||`date`|`name`, `type`, `value`|
|Text Channel|`text`||`string`|`name`, `type`, `value`|
### [Channel Properties](#channel-properties)
|Name|Description|Type|Validation|
|---|---|---|---|
|`name`|Channel Name|`string`|Min Length: 1|
|`type`|Channel Type|`string`|Available Type|
|`unit`|Channel Unit|`string`|Available Unit|
|`value`|Channel Value|`double`, `object`, `date`, `string`||
### [Value Types](#value-types)
|Type|Description|
|---|---|
|`double`|This is the single value for your channel|
|`object`|This is the minimum, maximum, mean and standard deviation value for your channel over the observed period|
|`date`|This is the single value for your channel|
|`string`|This is the single value for your channel|
#### [Value Properties](#value-properties)
|Name|Description|Type|
|---|---|---|
|`min`|Minimum Channel Value|double|
|`max`|Maximum Channel Value|double|
|`mean`|Mean Channel Value|double|
|`std`|Standard Deviation Channel Value|double|
