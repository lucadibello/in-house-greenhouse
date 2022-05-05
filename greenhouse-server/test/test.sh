# This script is used to execute a login test into the API server.

# Read the email and password from the user until are correct.
while true; do
    read -p "Email: " EMAIL
    read -s -p "Password: " PASSWORD
    echo 
    if [ -n "$EMAIL" ] && [ -n "$PASSWORD" ]; then
        break
    fi
    # If the user doesn't enter anything, exit the script.
    if [ -z "$EMAIL" ] && [ -z "$PASSWORD" ]; then
        echo "[!] Exiting..."
        exit
    fi
    # If the user doesn't enter an email, print an error message.
    if [ -z "$EMAIL" ]; then
        echo "[!] Please enter an email."
    fi
    # If the user doesn't enter a password, print an error message.
    if [ -z "$PASSWORD" ]; then
        echo "[!] Please enter a password."
    fi
done


# Print the email and password to the user.
echo "[+] Email: $EMAIL"
echo "[+] Password: $PASSWORD"

# Read settings from ../.env file containing the following keys:
# - DATABASE_URL
# - JWT_ACCESS_TOKEN_SECRET
# - JWT_REFRESH_TOKEN_SECRET
# - JWT_GREENHOUSE_TOKEN_SECRET
# - API_SERVER_PORT
# - API_SERVER_URL
set -a
. ../.env
set +a

# Notify the user that the script is trying to load the configuration
echo "Loading configuration..."

# Check if the environment variables was loaded successfully
if [ -z "$DATABASE_URL" ] || [ -z "$JWT_ACCESS_TOKEN_SECRET" ] || [ -z "$JWT_REFRESH_TOKEN_SECRET" ] || [ -z "$JWT_GREENHOUSE_TOKEN_SECRET" ] || [ -z "$API_SERVER_PORT" ] || [ -z "$API_SERVER_URL" ]; then
    echo "Error: One or more environment variables are missing."
    exit 1
fi

# Notify the user that the configuration was loaded successfully
echo "Configuration loaded successfully."

# print all the loaded information into a bullet list with some colors:
# The colors are:
# - green for the name of the setting
# - yellow for the value of the setting
echo -e "\n\n"
echo -e "  \033[1;32mDATABASE_URL\033[0m: \033[0;93m$DATABASE_URL\033[0m"
echo -e "  \033[1;32mJWT_ACCESS_TOKEN_SECRET\033[0m: \033[0;93m$JWT_ACCESS_TOKEN_SECRET\033[0m"
echo -e "  \033[1;32mJWT_REFRESH_TOKEN_SECRET\033[0m: \033[0;93m$JWT_REFRESH_TOKEN_SECRET\033[0m"
echo -e "  \033[1;32mJWT_GREENHOUSE_TOKEN_SECRET\033[0m: \033[0;93m$JWT_GREENHOUSE_TOKEN_SECRET\033[0m"
echo -e "  \033[1;32mAPI_SERVER_PORT\033[0m: \033[0;93m$API_SERVER_PORT\033[0m"
echo -e "  \033[1;32mAPI_SERVER_URL\033[0m: \033[0;93m$API_SERVER_URL\033[0m"
echo -e "\n\n"


# Check if the API server has been started
echo "Checking if the API server is running..."

# Create the API server URL using the port (API_SERVER_PORT) and the url (API_SERVER_URL) variables loaded from the .env file
HOST="http://$API_SERVER_URL:$API_SERVER_PORT"

# Try to connect to the API server and check if the connection was successful saving the http response code in a variable
RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HOST/.well-known/apollo/server-health")

# Print a spacer
echo -e "\n\n"

# Retry the connection if the connection was not successful
if [ "$RESPONSE_CODE" != "200" ]; then
    echo "The API server is not running. Trying to start it..."

    # Start the API server
    docker-compose up -d

    # Wait until the API server is running
    echo "Waiting until the API server is running..."
    while [ "$RESPONSE_CODE" != "200" ]; do
        RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$HOST")
        echo "ERROR: Response code: $RESPONSE_CODE"
        sleep 1
    done

    # Notify the user that the API server is running
    echo "The API server is running."
fi

# Print success message!
echo "The API server is running."

# Print a spacer
echo -e "\n"

# Try to login into the API server using these credentials:
# - email: info@lucadibello.ch
# - password: root
echo "Logging in..."

# Send a POST request to the API server with the following body:
# {
#   query: "query LoginUser($email: String!, $password: String!) {
#     loginUser(email: $email, password: $password) {
#       token
#       refreshToken
#       expire
#       issued
#       isError
#       errorCode
#       errorMessage
#     }
#   }",
#   variable
#   {
#     "email": "info@lucadibello.ch",
#     "password": "root"
#   }
# }
# And save the response in a variable

# Build response body inline
BODY="{\"query\":\"query LoginUser(\$email: String!, \$password: String!) { loginUser(email: \$email, password: \$password) { token refreshToken expire issued isError errorCode errorMessage }}\",\"variables\":{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}}"

# print body
echo "$BODY"

# Send request to the API server using the formatted body and save the response in a variable called LOGIN_RESPONSE
LOGIN_RESPONSE=$(curl -s -H "Content-Type: application/json" -X POST -d "$BODY" "$HOST/graphql")

# Print a spacer
echo -e "\n\n"

if [ $? -ne 0 ]; then
    echo "The login failed. Please try again later."
    exit 1
fi

echo "Response received successfully! Response code: $RESPONSE_CODE"

# Print a spacer
echo -e "\n\n"

# Print the response body
echo "Response body:"
cat /dev/stdin <<< $LOGIN_RESPONSE