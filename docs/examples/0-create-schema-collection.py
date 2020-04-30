import json
import pymongo
import urllib.parse

#Saved Credentials
credentials = {}

def defaultInput(prompt, default):
    # Console input with default value
    value = input(prompt)
    return value if len(value) > 0 else default

def ensureInput(prompt):
    # Console input with ensuring a value
    value = input(prompt)
    return value if len(value) > 0 else ensureInput(prompt)

# Acquire Credentials
host = credentials["host"] if "host" in credentials else defaultInput("server host name/ip address (localhost):", "localhost")
port = credentials["port"] if "port" in credentials else defaultInput("server port (27017):", "27017")
username = credentials["username"] if "username" in credentials else ensureInput("credentials - username:")
password = credentials["password"] if "password" in credentials else ensureInput("credentials - password:")
authdb = credentials["authdb"] if "authdb" in credentials else defaultInput("authenitcation database (admin):", "admin")

# Connect to Server
client = pymongo.MongoClient("mongodb://{username}:{password}@{host}:{port}/{authdb}".format(
    username=urllib.parse.quote_plus(username), password=urllib.parse.quote_plus(password),
    host=host, port=port, authdb=authdb
))

# Acquire Database and Collection
database = ensureInput("database to create collection in:")
collection = ensureInput("collection to attach PBSHM schema to:")

# Load Schema
with open("./release/structure-data-compiled-mongodb.min.json") as file:
    schema = json.load(file)

# Create Collection
db = client[database]
db.create_collection(collection, validator={
    "$jsonSchema": schema
})

# Create Unique Index
db[collection].create_index([
    ("population", pymongo.ASCENDING),
    ("name", pymongo.ASCENDING),
    ("timestamp", pymongo.ASCENDING),
    ("channels.name", pymongo.ASCENDING)
], unique=True)
