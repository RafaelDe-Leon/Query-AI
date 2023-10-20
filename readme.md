You can find the live site here: [https://rafaelde-leon.github.io/SplSearch/](https://spl-search.vercel.app/)https://spl-search.vercel.app/

Below is a concise tutorial in Markdown format to guide users on how to build the Docker Mongo image, run queries, and delete the container:

---

## MongoDB Docker Tutorial

### 1. Building the Docker Image

Navigate to the directory containing the Dockerfile and run:

```bash
docker build -t custom-mongo .
```

This will create a Docker image named `custom-mongo`.

### 2. Running MongoDB in Docker

To run the MongoDB instance with port 27017 exposed:

```bash
docker run -d -p 27017:27017 custom-mongo
```

This command will start the MongoDB container with port 27017 on your host machine mapped to port 27017 on the container.

### 3. Running a Query

If you want to run a MongoDB shell to execute a query on the running MongoDB instance:

```bash
docker exec -it $(docker ps -q --filter ancestor=custom-mongo) mongosh --eval "db['splunk.queries'].find().limit(5).pretty();"
```

This will display the first 5 entries from the `splunk.queries` collection.

### 4. Deleting the Docker Container

To stop and remove the MongoDB container:

1. Identify the container ID:

    ```bash
    docker ps
    ```

   Look for the container with the image `custom-mongo` and note its container ID.

2. Stop the container:

    ```bash
    docker stop <CONTAINER_ID>
    ```

3. Remove the container:

    ```bash
    docker rm <CONTAINER_ID>
    ```

Replace `<CONTAINER_ID>` with the actual ID you noted in the first step.

---

With these steps, you can build the MongoDB Docker image, run the database with port 27017 open, run queries, and then delete the container when you're done.