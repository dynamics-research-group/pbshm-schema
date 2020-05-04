import sys
import json
import pymongo
import urllib.parse

# Saved Credentials
credentials = {
    "host": "localhost",
    "port": "27017",
    "username": "",
    "password": "",
    "authdb": "admin",
    "database": "",
    "collection": ""
}

# Ensure valid credentials
for key in credentials:
    if(len(credentials[key]) > 0):
        continue
    print("missing key value: {key}".format(key=key))
    sys.exit(1)

# Acquire JSON Payload
payload = ""
for line in sys.stdin:
    payload += line

json = json.loads(payload)

# Connect to Server
client = pymongo.MongoClient("mongodb://{username}:{password}@{host}:{port}/{authdb}".format(
    username=urllib.parse.quote_plus(credentials["username"]), password=urllib.parse.quote_plus(credentials["password"]),
    host=credentials["host"], port=credentials["port"], authdb=credentials["authdb"]
))

# Insert JSON
client[credentials["database"]][credentials["collection"]].insert_one(json)