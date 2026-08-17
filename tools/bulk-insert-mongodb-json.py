import json
import pathlib
import urllib.parse

import click
import pymongo


@click.command()
@click.option("--host", prompt="MongoDB Hostname", default="localhost")
@click.option("--port", prompt="MongoDB Port", default="27017")
@click.option("--username", prompt="Username")
@click.option("--password", prompt="Password", hide_input=True)
@click.option("--authdb", prompt="Auth Database", default="admin")
@click.option("--database", prompt="Database")
@click.option("--collection", prompt="Collection")
@click.option("--directory", prompt="JSON File Directory")
def main(
    host: str,
    port: str,
    username: str,
    password: str,
    authdb: str,
    database: str,
    collection: str,
    directory: str,
):

    # connect to server
    client = pymongo.MongoClient(
        "mongodb://{username}:{password}@{host}:{port}/{authdb}".format(
            username=urllib.parse.quote_plus(username),
            password=urllib.parse.quote_plus(password),
            host=host,
            port=port,
            authdb=authdb,
        )
    )

    # ensure directory
    json_dir = pathlib.Path(directory)
    if not json_dir.exists():
        print("Directory not found")
        return

    # create error directory
    error_dir = json_dir / "errors"
    error_dir.mkdir(exist_ok=True)

    # itterate through files
    for f in sorted(json_dir.iterdir()):
        if f.is_file() and str(f)[-5:] == ".json":

            # acquire JSON payload
            with open(f, "r") as fp:
                payload = json.load(fp)

                # insert payload
                try:
                    print(f"\033[0m Inserting {f.name}... ", end="")
                    client[database][collection].insert_one(payload)
                    print(f"\033[0;32m OK")
                except pymongo.errors.WriteError as e:
                    with open(error_dir / f"{f.name}-error.json", "w") as error_file:
                        error_file.write(str(e.details).replace("'", '"'))
                    print(f"\033[0;31m FAILED")
    print(f"\033[0m Finished")


if __name__ == "__main__":
    main()
