import pytest
import pymongo
from fixture_database import schema, connection, base_document

standard_values = [
    (9, True),  # Int
    (9.99, True),  # Double
    ({"min": 0, "max": 1, "mean": 2, "std": 3}, True),  # Int Object
    ({"min": 0.1, "max": 0.2, "mean": 0.15, "std": 0.1}, True),  # Double Object
    ({"min": 0, "max": 0.2, "mean": 0.15, "std": 0.1}, True),  # One Attribute Int
    ({"min": 0.1, "max": 0, "mean": 0.15, "std": 0.1}, True),
    ({"min": 0.1, "max": 0.2, "mean": 0, "std": 0.1}, True),
    ({"min": 0.1, "max": 0.2, "mean": 0.15, "std": 0}, True),
    ({"min": 0.1, "max": 0.2}, True),  # Minimum 2 Attributes
    ({"min": 0.1, "mean": 0.2}, True),
    ({"min": 0.1, "std": 0.2}, True),
    ({"max": 0.1, "mean": 0.2}, True),
    ({"max": 0.1, "std": 0.2}, True),
    ({"mean": 0.1, "std": 0.2}, True),
    ({"min": 0.1, "max": 0.2, "mean": 0.15, "std": 0, "unknown": 0}, False),  # Additional Attribute
    ({}, False),  # Emtpy Object
    ("string", False)  # String Value
]
unit_properties_to_remove = [
    ([], True),
    (["name"], False),
    (["type"], False),
    (["unit"], False),
    (["value"], False)
]
unitless_properties_to_remove = [
    ([], True),
    (["name"], False),
    (["type"], False),
    (["value"], False)
]
unit_angular = [
    ("degrees", True),
    ("radians", True),
    ("other", True),
    ("unknown", False)
]
unit_angular_rate = [
    ("degrees/s", True),
    ("radians/s", True),
    ("other", True),
    ("unknown", False)
]
unit_newtons = [
    ("fN", True),
    ("pN", True),
    ("nN", True),
    ("μN", True),
    ("mN", True),
    ("cN", True),
    ("dN", True),
    ("N", True),
    ("daN", True),
    ("hN", True),
    ("kN", True),
    ("MN", True),
    ("GN", True),
    ("TN", True),
    ("PN", True),
    ("other", True),
    ("unknown", False)
]


def perform_channel_unit_test(connection, base_document, channel, unit, value, removals):
    # Ensure Lengths
    if(len(unit) != 2 or len(value) != 2 or len(removals) != 2):
        raise ValueError("Unit, Value and Removals must have a length of 2")
    # Create Channel Document
    channel = {
        "name": "test-channel",
        "type": channel,
        "unit": unit[0],
        "value": value[0]
    }
    [channel.pop(property) for property in removals[0]]
    base_document["channels"] = [channel]
    # Perform Test
    if(unit[1] == True and value[1] == True and removals[1] == True):
        response = connection.insert_one(base_document)
        assert response.inserted_id != None
    else:
        with pytest.raises(pymongo.errors.WriteError):
            connection.insert_one(base_document)


def perform_channel_unitless_test(connection, base_document, channel, value, removals):
    # Ensure Lengths
    if(len(value) != 2 or len(removals) != 2):
        raise ValueError("Unit, Value and Removals must have a length of 2")
    # Create Channel Document
    channel = {
        "name": "test-channel",
        "type": channel,
        "value": value[0]
    }
    [channel.pop(property) for property in removals[0]]
    base_document["channels"] = [channel]
    # Perform Test
    if(value[1] == True and removals[1] == True):
        response = connection.insert_one(base_document)
        assert response.inserted_id != None
    else:
        with pytest.raises(pymongo.errors.WriteError):
            connection.insert_one(base_document)


def test_blank_section(schema, connection, base_document):
    base_document["channels"] = []
    response = connection.insert_one(base_document)
    assert response.inserted_id != None


def test_incorrect_channel(schema, connection, base_document):
    perform_channel_unitless_test(
        connection, base_document, "incorrect", ("value", False), ([], True))


@pytest.mark.parametrize("unit", [("m/s^2", True), ("g", True), ("v", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_acceleration(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "acceleration", unit, value, remove)


@pytest.mark.parametrize("unit", [("m/s", True), ("v", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_velocity(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "velocity", unit, value, remove)


@pytest.mark.parametrize("unit", [("mm", True), ("cm", True), ("m", True), ("km", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_displacement(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "displacement", unit, value, remove)


@pytest.mark.parametrize("unit", [("degrees/s^2", True), ("radians/s^2", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_angular_acceleration(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "angularAcceleration", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular_rate)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_angular_velocity(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "angularVelocity", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_angular_displacement(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "angularDisplacement", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_tilt(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "tilt", unit, value, remove)


@pytest.mark.parametrize("unit", [("nd", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_strain(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "strain", unit, value, remove)


@pytest.mark.parametrize("unit", unit_newtons)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_tension(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "tension", unit, value, remove)


@pytest.mark.parametrize("unit", unit_newtons)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_load(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "load", unit, value, remove)


@pytest.mark.parametrize("unit", [("pH", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_structural_potential_hydrogen(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "structuralPotentialHydrogen", unit, value, remove)


@pytest.mark.parametrize("unit", [("C", True), ("F", True), ("K", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_temperature(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "temperature", unit, value, remove)


@pytest.mark.parametrize("unit", [("%", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_humidity(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "humidity", unit, value, remove)


@pytest.mark.parametrize("unit", [("mph", True), ("ft/s", True), ("km/h", True), ("m/s", True), ("kn", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_speed(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "speed", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_direction(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "direction", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fPa", True), ("pPa", True), ("nPa", True), ("µPa", True), ("mPa", True),
    ("cPa", True), ("dPa", True), ("Pa", True), ("daPa", True), ("hPa", True),
    ("kPa", True), ("MPa", True), ("GPa", True), ("TPa", True), ("PPa", True),
    ("at", True), ("atm", True), ("bar", True), ("psi", True), ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_pressure(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "pressure", unit, value, remove)


@pytest.mark.parametrize("unit", [("mm", True), ("cm", True), ("m", True), ("km", True), ("feet", True), ("other", True), ("unknown", False)])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_altitude(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "altitude", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_pitch(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "pitch", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_yaw(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "yaw", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_roll(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "roll", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular_rate)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_pitch_rate(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "pitchRate", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular_rate)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_yaw_rate(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "yawRate", unit, value, remove)


@pytest.mark.parametrize("unit", unit_angular_rate)
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_roll_rate(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "rollRate", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fA", True), ("pA", True), ("nA", True), ("µA", True), ("mA", True),
    ("cA", True), ("dA", True), ("A", True), ("daA", True), ("hA", True),
    ("kA", True), ("MA", True), ("GA", True), ("TA", True), ("PA", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_current(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "current", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fC", True), ("pC", True), ("nC", True), ("µC", True), ("mC", True),
    ("cC", True), ("dC", True), ("C", True), ("daC", True), ("hC", True),
    ("kC", True), ("MC", True), ("GC", True), ("TC", True), ("PC", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_charge(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "charge", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fW", True), ("pW", True), ("nW", True), ("µW", True), ("mW", True),
    ("cW", True), ("dW", True), ("W", True), ("daW", True), ("hW", True),
    ("kW", True), ("MW", True), ("GW", True), ("TW", True), ("PW", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_power(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "power", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fV", True), ("pV", True), ("nV", True), ("µV", True), ("mV", True),
    ("cV", True), ("dV", True), ("V", True), ("daV", True), ("hV", True),
    ("kV", True), ("MV", True), ("GV", True), ("TV", True), ("PV", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_voltage(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "voltage", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fΩ", True), ("pΩ", True), ("nΩ", True), ("µΩ", True), ("mΩ", True),
    ("cΩ", True), ("dΩ", True), ("Ω", True), ("daΩ", True), ("hΩ", True),
    ("kΩ", True), ("MΩ", True), ("GΩ", True), ("TΩ", True), ("PΩ", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_resistance(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "resistance", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fF", True), ("pF", True), ("nF", True), ("µF", True), ("mF", True),
    ("cF", True), ("dF", True), ("F", True), ("daF", True), ("hF", True),
    ("kF", True), ("MF", True), ("GF", True), ("TF", True), ("PF", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_capacitance(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "capacitance", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fH", True), ("pH", True), ("nH", True), ("µH", True), ("mH", True),
    ("cH", True), ("dH", True), ("H", True), ("daH", True), ("hH", True),
    ("kH", True), ("MH", True), ("GH", True), ("TH", True), ("PH", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_inductance(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "inductance", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fHz", True), ("pHz", True), ("nHz", True), ("µHz", True), ("mHz", True),
    ("cHz", True), ("dHz", True), ("Hz", True), ("daHz", True), ("hHz", True),
    ("kHz", True), ("MHz", True), ("GHz", True), ("THz", True), ("PHz", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_frequency(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "frequency", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fS", True), ("pS", True), ("nS", True), ("µS", True), ("mS", True),
    ("cS", True), ("dS", True), ("S", True), ("daS", True), ("hS", True),
    ("kS", True), ("MS", True), ("GS", True), ("TS", True), ("PS", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_conductance(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "conductance", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fWb", True), ("pWb", True), ("nWb", True), ("µWb", True), ("mWb", True),
    ("cWb", True), ("dWb", True), ("Wb", True), ("daWb", True), ("hWb", True),
    ("kWb", True), ("MWb", True), ("GWb", True), ("TWb", True), ("PWb", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_magnetic_flux(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "magneticFlux", unit, value, remove)


@pytest.mark.parametrize("unit", [
    ("fT", True), ("pT", True), ("nT", True), ("µT", True), ("mT", True),
    ("cT", True), ("dT", True), ("T", True), ("daT", True), ("hT", True),
    ("kT", True), ("MT", True), ("GT", True), ("TT", True), ("PT", True),
    ("other", True),
    ("unknown", False)
])
@pytest.mark.parametrize("value", standard_values)
@pytest.mark.parametrize("remove", unit_properties_to_remove)
def test_magnetic_field_strength(schema, connection, base_document, unit, value, remove):
    perform_channel_unit_test(
        connection, base_document, "magneticFieldStrength", unit, value, remove)


@pytest.mark.parametrize("value", [(1, True), (1.1, False), ("textvalue", False), (1588007836000000000, False), ({}, False)])
@pytest.mark.parametrize("remove", unitless_properties_to_remove)
def test_integer(schema, connection, base_document, value, remove):
    perform_channel_unitless_test(
        connection, base_document, "integer", value, remove)


@pytest.mark.parametrize("value", [(1, False), (1.1, True), ("textvalue", False), (1588007836000000000, False), ({}, False)])
@pytest.mark.parametrize("remove", unitless_properties_to_remove)
def test_double(schema, connection, base_document, value, remove):
    perform_channel_unitless_test(
        connection, base_document, "double", value, remove)


@pytest.mark.parametrize("value", [(1, False), (1.1, False), ("textvalue", True), (1588007836000000000, False), ({}, False)])
@pytest.mark.parametrize("remove", unitless_properties_to_remove)
def test_text(schema, connection, base_document, value, remove):
    perform_channel_unitless_test(
        connection, base_document, "text", value, remove)


@pytest.mark.parametrize("value", [(1, False), (1.1, False), ("textvalue", False), (1588007836000000000, True), ({}, False)])
@pytest.mark.parametrize("remove", unitless_properties_to_remove)
def test_date(schema, connection, base_document, value, remove):
    perform_channel_unitless_test(
        connection, base_document, "date", value, remove)
