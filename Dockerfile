# Use the official MongoDB Docker image
FROM mongo:7.0.2

# Add initialization script and data file
ADD init-db.sh /docker-entrypoint-initdb.d/
ADD ./data/data.json /docker-entrypoint-initdb.d/

# Make sure the script has execute permissions
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
