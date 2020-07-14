# [Channel](#channel)
A channel object contains the [properties](#channel-properties) required to represent sensor information within the associated [structure](/README.md#structure); `name`, `type`, `unit` and `value`. A [channel object](#channel) should exist within the [structure object](/README.md#structure) for each channel that was present and providing data on the associated [structure](/README.md#structure) at the given timestamp. If a channel did not provide data at the given timestamp, it should not exist within this [structure object](/README.md#structure). If the `unit` property is `n/a` in the [channel type](#channel-types) table, then that property it to be omitted for that [channel type](#channel-types).

## [Channel Properties](#channel-properties)
|Property|Description|Type|
|---|-----|---|
|`name`|Name of the channel, must be unique within the structure|`string`|
|`type`|The selected `type` value for this channel, see [channel types](#channel-types) for a list of available options|`string`|
|`unit`|The selected `unit` value of this channel which the `value` is based upon, see [channel types](#channel-types) for a list of available options for the selected `type`|`string`|
|`value`|Value of the channel, stored in the selected `unit`|See [channel types](#channel-types) for a list of available options for the selected `type`|

## [Channel Types](#channel-types)
|Type|Units|Values|
|---|-----|---|
|`acceleration`|`(m/s)^2`, `g`, `v`, `other`|`int`, `double`, `object`|
|`velocity`|`m/s`, `v`, `other`|`int`, `double`, `object`|
|`displacement`|`mm`, `cm`, `m`, `km`, `other`|`int`, `double`, `object`|
|`angularAcceleration`|`(degrees/s)^2`, `(radians/s)^2`, `other`|`int`, `double`, `object`|
|`angularVelocity`|`degrees/s`, `radians/s`, `other`|`int`, `double`, `object`|
|`angularDisplacement`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`tilt`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`strain`|`nd`, `other`|`int`, `double`, `object`|
|`tension`|`fN`, `pN`, `nN`, `μN`, `mN`, `cN`, `dN`, `N`, `daN`, `hN`, `kN`, `MN`, `GN`, `TN`, `PN`, `other`|`int`, `double`, `object`|
|`structuralPotentialHydrogen`|`pH`, `other`|`int`, `double`, `object`|
|`temperature`|`C`, `F`, `K`, `other`|`int`, `double`, `object`|
|`humidity`|`%`, `other`|`int`, `double`, `object`|
|`speed`|`mph`, `ft/s`, `km/h`, `m/s`, `kn`, `other`|`int`, `double`, `object`|
|`direction`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`pressure`|`fPa`, `pPa`, `nPa`, `µPa`, `mPa`, `cPa`, `dPa`, `Pa`, `daPa`, `hPa`, `kPa`, `MPa`, `GPa`, `TPa`, `PPa`, `at`, `atm`, `bar`, `psi`, `other`|`int`, `double`, `object`|
|`altitude`|`mm`, `cm`, `m`, `km`, `feet`, `other`|`int`, `double`, `object`|
|`pitch`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`yaw`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`roll`|`degrees`, `radians`, `other`|`int`, `double`, `object`|
|`pitchRate`|`degrees/s`, `radians/s`, `other`|`int`, `double`, `object`|
|`yawRate`|`degrees/s`, `radians/s`, `other`|`int`, `double`, `object`|
|`rollRate`|`degrees/s`, `radians/s`, `other`|`int`, `double`, `object`|
|`load`|`fg`, `pg`, `ng`, `µg`, `mg`, `cg`, `dg`, `g`, `dag`, `hg`, `kg`, `Mg`, `Gg`, `Tg`, `Pg`, `other`|`int`, `double`, `object`|
|`current`|`fA`, `pA`, `nA`, `µA`, `mA`, `cA`, `dA`, `A`, `daA`, `hA`, `kA`, `MA`, `GA`, `TA`, `PA`, `other`|`int`, `double`, `object`|
|`charge`|`fC`, `pC`, `nC`, `µC`, `mC`, `cC`, `dC`, `C`, `daC`, `hC`, `kC`, `MC`, `GC`, `TC`, `PC`, `other`|`int`, `double`, `object`|
|`power`|`fW`, `pW`, `nW`, `µW`, `mW`, `cW`, `dW`, `W`, `daW`, `hW`, `kW`, `MW`, `GW`, `TW`, `PW`, `other`|`int`, `double`, `object`|
|`voltage`|`fV`, `pV`, `nV`, `µV`, `mV`, `cV`, `dV`, `V`, `daV`, `hV`, `kV`, `MV`, `GV`, `TV`, `PV`, `other`|`int`, `double`, `object`|
|`resistance`|`fΩ`, `pΩ`, `nΩ`, `µΩ`, `mΩ`, `cΩ`, `dΩ`, `Ω`, `daΩ`, `hΩ`, `kΩ`, `MΩ`, `GΩ`, `TΩ`, `PΩ`, `other`|`int`, `double`, `object`|
|`capacitance`|`fF`, `pF`, `nF`, `µF`, `mF`, `cF`, `dF`, `F`, `daF`, `hF`, `kF`, `MF`, `GF`, `TF`, `PF`, `other`|`int`, `double`, `object`|
|`inductance`|`fH`, `pH`, `nH`, `µH`, `mH`, `cH`, `dH`, `H`, `daH`, `hH`, `kH`, `MH`, `GH`, `TH`, `PH`, `other`|`int`, `double`, `object`|
|`frequency`|`fHz`, `pHz`, `nHz`, `µHz`, `mHz`, `cHz`, `dHz`, `Hz`, `daHz`, `hHz`, `kHz`, `MHz`, `GHz`, `THz`, `PHz`, `other`|`int`, `double`, `object`|
|`conductance`|`fS`, `pS`, `nS`, `µS`, `mS`, `cS`, `dS`, `S`, `daS`, `hS`, `kS`, `MS`, `GS`, `TS`, `PS`, `other`|`int`, `double`, `object`|
|`magneticFlux`|`fWb`, `pWb`, `nWb`, `µWb`, `mWb`, `cWb`, `dWb`, `Wb`, `daWb`, `hWb`, `kWb`, `MWb`, `GWb`, `TWb`, `PWb`, `other`|`int`, `double`, `object`|
|`magneticFieldStrength`|`fT`, `pT`, `nT`, `µT`, `mT`, `cT`, `dT`, `T`, `daT`, `hT`, `kT`, `MT`, `GT`, `TT`, `PT`, `other`|`int`, `double`, `object`|
|`integer`|n/a|`int`|
|`double`|n/a|`double`|
|`text`|n/a|`string`|
|`date`|n/a|`long`|
## [Value](#value)
A value object contains the [properties](#value-properties) required to represent `value` data within a [channel object](#channel) which is not singular; `min`, `max`, `mean`, `std`. The [value object](#value) must have at least two properties set on the object, otherwise a singular `value` value should be used instead.

### [Value Properties](#value-properties)
|Property|Description|Type|
|---|-----|---|
|`min`|Minimum [channel](#channel) value over the observed time period|`int`, `double`|
|`max`|Maximum [channel](#channel) value over the observed time period|`int`, `double`|
|`mean`|Mean [channel](#channel) value over the observed time period|`int`, `double`|
|`std`|Standard deviation [channel](#channel) value over the observed time period|`int`, `double`|
