# This script configures the API server for the first run.
# It creates the database, the tables and the initial data.

# Execute prisma deploy
npx prisma db push

# Check if the database was created successfully
if [ $? -ne 0 ]; then
    echo "Error: The database could not be created."
    exit 1
fi

# Execute prisma seed
npx prisma db seed

# Check if the database was seeded successfully
if [ $? -ne 0 ]; then
    echo "Error: The database could not be seeded."
    exit 1
fi

# Start the database server using docker-compose
docker-compose up -d