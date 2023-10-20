#!/bin/bash
set -e

# Create the "SPLSEARCH" database using mongosh
echo 'use SPLSEARCH;' | mongosh

# Import data into the "SPLSEARCH" database in the "splunk.queries" collection
# Transforming the provided format to the expected row-based format
mongosh SPLSEARCH --quiet --eval "
let rawData = $(cat /docker-entrypoint-initdb.d/data.json);
let transformedData = [];

for (let index in rawData.name) {
    transformedData.push({
        name: rawData.name[index],
        description: rawData.description[index],
        search: rawData.search[index],
        author: rawData.author[index]
    });
}

db['splunk.queries'].insertMany(transformedData);
"