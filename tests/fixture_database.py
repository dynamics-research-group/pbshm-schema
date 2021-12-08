import pytest
import pymongo
from json import load
from random import randint
from datetime import datetime
from pytz import utc


def document_time():
    document_time.nanoseconds += 1
    return document_time.nanoseconds


document_time.delta = datetime.now().astimezone(utc) - datetime.fromtimestamp(0, utc)
document_time.nanoseconds = ((((document_time.delta.days * 24 * 60 * 60) + document_time.delta.seconds) * 1000000) + document_time.delta.microseconds) * 1000


@pytest.fixture(scope="session")
def schema():
    with open("./release/structure-data-compiled-mongodb.min.json", "r", encoding="utf-8") as file:
        schema = load(file)
    return schema


@pytest.fixture(scope="session")
def connection(schema):
    # Create Client
    client = pymongo.MongoClient("mongodb://{username}:{password}@{host}:{port}/{authdb}".format(
        username="",
        password="",
        host="",
        port="",
        authdb=""
    ))
    # Create Database with Schema
    collection_name = "test-valiation-{random_number}".format(
        random_number=randint(0, 99999999)
    )
    db = client["drg-pbshm"]
    db.create_collection(collection_name, validator={
        "$jsonSchema": schema
    })
    # Create Index
    db[collection_name].create_index([
        ("population", pymongo.ASCENDING),
        ("name", pymongo.ASCENDING),
        ("timestamp", pymongo.ASCENDING)
    ], unique=True)
    # Return Client
    return db[collection_name]


@pytest.fixture(scope="function")
def base_document():
    return {
        "version": "1.1.0",
        "name": "test-structure",
        "population": "test-population",
        "timestamp": document_time()
    }
