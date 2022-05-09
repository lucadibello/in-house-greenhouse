# In-House Greenhouse - A new generation of smart greenhouses

<p align="center">
  <img style="text-align: center;" width="400" height="auto" src="https://user-images.githubusercontent.com/37295664/158469342-5d8f577f-08eb-4a44-8494-c7d23abfd0fc.svg">
</p>

## **1 Problem description**

The use of agricultural fields is fundamental for the production of primary goods necessary for human beings, but this involves numerous quantities of carbon used in the transport of the goods themselves in department stores or shops. These quantities of carbon are then released into the air in the form of greenhouse gases by means of transport and these actions, like other human actions, contribute to global warming.

## **2 Our solution**

**In-House Greenhouse** let you control your smart greenhouse via your smartphone wherever you are in the world. Never ask a friend to water your plant again!

This smart greenhouse allows you to fully manage up to 6 plants, providing water and collecting useful information such as soil moisture and air temperature.

The collected data is used to show statistics about the growth of your plants and to alert you in case of problems on one or more plants in your in-house greenhouse. These data can be shared between friends, so that you can compare your statistics with them.

## **3 System architecture**

This is a small diagram showing all the components that make up the **In-House Greenhouse** system:

![System Architecture](/extra/schemas/system-architecture/system-architecture.png)

This is a small diagram showing all the components that make up the In-House Greenhouse system. The Greenhouse collects data about the state of the plants and the surrounding environment via sensors, and then sends this data to the server via HTTP calls to the API, which will save the data within the PostgreSQL database.

The phone application is strictly dependent on the API.  The data shown in the various interfaces, such as the list of added greenhouses, statistics of the various plants, etc. are read dynamically via HTTP requests sent to the API. The user through the phone application as well as view the data in the DB can also modify them: it is possible to change the information of any greenhouse and any plant owned by the user.

The core of the application, the APIs, are runnning inside a Docker container (also the database they are connected to). The use of a container offers several potentialities to the product such as great scalability (being able to dynamically increase the number of API containers if the main container is overloaded). Through Docker-Compose it is easy to start the entire application on any platform without any additional configuration.

## **4 Tech stack**

This chapter describes the technologies and languages used to program/set up every single component of the system (the icons refer to those in the *System architecture* chapter).

### **4.1 Tech List**

<table>
  <tr>
    <td>
      <p align="center">
        <img src="/extra/schemas/system-icons/symbol-greenhouse.png" alt="Greenhouse icon" height="150" width="auto">
        <br>
        In-House Greenhouse
      </p>
    </td>
    <td>
      <ul>
        <li>Raspberry Pi 4</li>
        <li>Python</li>
        <li>Sensors (soil moisture, temperature, humidity and water level)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p align="center">
        <img src="/extra/schemas/system-icons/symbol-app.png" alt="Greenhouse icon" height="200" width="auto">
        <br>
        In-House Greenhouse App
      </p>
    </td>
    <td>
      <ul>
        <li>React Native + Expo</li>
        <li>UI Kitten</li>
        <li>MobX-State-Tree</li>
        <li>TypeScript</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p align="center">
        <img src="/extra/schemas/system-icons/symbol-api.png" alt="Greenhouse icon" height="150" width="auto">
        <br>
        In-House Greenhouse APIs
      </p>
    </td>
    <td>
      <ul>
        <li>Apollo Server</li>
        <li>GraphQL + GraphQL Nexus</li>
        <li>Prisma ORM</li>
        <li>TypeScript</li>
        <li>Docker container</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p align="center">
        <img src="/extra/schemas/system-icons/symbol-db.png" alt="Greenhouse icon" height="150" width="auto">
        <br>
        In-House Greenhouse Database
      </p>
    </td>
    <td>
      <ul>
        <li>PostgreSQL Databse</li>
        <li>Docker container</li>
      </ul>
    </td>
  </tr>
</table>

### **4.2 In-House Greenhouse App**

The application is developed with React Native and Expo using the TypeScript language. The application also uses *Ui Kitten* as a UI framework.

### **4.3 In-House Greenhouse**

The physical greenhouse offers a variety of sensors, which are used by a Raspberry Pi to collect useful data about the plants and the environment, for example, humidity level, air temperature, and soil moisture.

The data collected allows the greenhouse to take care of each individual plant according to its needs.  

The system for collecting and managing sensor data is written in Python.

### **4.4 API and database with Docker**

The API is implemented using GraphQL with the TypeScript language. GraphQL is an API query language that allows the developer to request exactly the data needed.

In addition, the API takes care of data management and communication between Greenhouse and the SmartPhone application. The communication is done via HTTP requests (custom created for each operation) sent server. Check out the API documentation for more detailed information.

## **5 Development**

### **5.1 Database**

The database is implemented using PostgreSQL and is hosted on a Docker container. It is connected to the API using the Prisma ORM. This the database ER diagram:

![**Database schema**](./greenhouse-server/extra/db/ERD.svg)

Every table in the database is defined in the Prisma schema. The schema is defined in this [file](./greenhouse-server/prisma/schema.prisma).

A special feature of this database is that the plant data is never completely deleted, but is only hidden by setting the *isDeleted* flag to "true".

### **5.2 API Server**

The API server is the core of In-House Greenhouse. The server, as mentioned earlier, was developed through the use of Apollo Server (webserver) with GraphQL (API query language) and Nexus GraphQL (schema generator). The API server uses the Prisma ORM database to handle queries and changes to the database.

APIs are divided into two major groups:

1. **Queries**: here reside the APIs that do not go to modify data within the database
2. **Mutation**: here, instead, are the APIs that modify data (delete, modify and write).

Here is a diagram showing the structure of the GraphQL API:

![**API schema**](./greenhouse-server/extra/graphql/graph.png)

#### **5.2.1 Building queries**

For the development of the various queries, the server presents a Sandbox for testing, accessible via the loopback address: [http://localhost:4000](http://localhost:4000).

#### **5.2.2 Config file**

You can change server settings via the `.env` configuration file.

This is a list of all available settings:

| Name | Description |
| --- | --- |
| DATABASE_URL | URL needed for the database connection. |
| JWT_ACCESS_TOKEN_SECRET | Secret key needed for the JWT access token encryption (30 minutes validity)|
| JWT_REFRESH_TOKEN_SECRET | Secret key needed for the JWT refresh token encryption (7 days validity)|
| JWT_GREENHOUSE_TOKEN_SECRET | Secret key needed for the JWT greenhouse token encryption (1 minute validity) |
| API_SERVER_PORT | Port where the APIs are accessible |
| API_SERVER_URL | Host where the APIs are accessible |

#### **5.2.3 Authentication**

The API server uses 3 types of tokens for authentication:

1. Access token: allows access to the API, **validity of 30 minutes**. This token allows access to all APIs.
2. Refresh token: allows to renew the access token, it has a **validity of 7 days**. This token has no other purpose of operation, in fact you can't use it to access APIs.
3. Greenhouse token: access token used by the IoT greenhouse to record read data, **validity of 1 minute**. This token can only be used in the API related to the IoT greenhouse: the one to record data in the system (Mutation:recordData) and the one to read the recorded sensors (Query:getSensors).

This is a small example diagram showing the authentication process between the API server and the IoT greenhouse/SmartPhone application:

1. Application requests to the API server
![App-Server authentication](https://user-images.githubusercontent.com/37295664/167380175-8cb5c70b-be73-43f3-98f3-f2453a585869.png)

2. Greenhouse IoT device requests to the API server
![Greenhouse IoT-Server authentication](https://user-images.githubusercontent.com/37295664/167380293-02ce7bc0-b8f1-4d37-b090-9391e2c5377a.png)

### **5.3 App**

The application initially presents a login/registration screen, which allows you to access the system. This authentication process is strictly necessary since the user needs the access and refresh tokens to make calls to the API (see chapter **5.2.3 Authentication**).

![Login/Register page](https://user-images.githubusercontent.com/37295664/167385944-80b4e9cc-fc18-4e8a-8b9b-138006ed4e52.png)

Once logged in, the application shows the homepage, where you can view all the greenhouses managed by the user.When you select a greenhouse, the application shows a summary screen showing all the plants in that greenhouse. This is a screenshot:

![Greenhouse information](https://user-images.githubusercontent.com/37295664/167384975-369b3eef-233f-45a9-a5e9-e49de852c46a.png)

Plants can be added using the appropriate button at the top right (symbol "+") or modified by tapping on the "Edit plant" button inside the plant card.

![Add/Edit plants](https://user-images.githubusercontent.com/37295664/167385598-62a5066b-5105-447d-a3dc-0642774d4571.png)

You can view the statistics of a specific plant by tapping on the "Health status" button inside the plant card. If the plant has not yet received any data, the system will show a warning message, otherwise it will show a summary of the statistics.

![Plant health status](https://user-images.githubusercontent.com/37295664/167386994-9d32158c-b4a0-45aa-824d-cd27117bfde8.png)

You can navigate the app via a drawer on the left, which can be opened either by swiping to the right or by clicking the hamburger icon on the homepage.

![Drawer menu](https://user-images.githubusercontent.com/37295664/167386241-02f13b2e-347e-4868-b68b-d21405e15f57.png)

Note: In this chapter I have shown only the most important screens, so there are no screenshots of every interface present.

### **5.4 GreenProxy**

GreenProxy is an application written in Go (https://go.dev), which allows to manage the communication between Greenhouse IoT and API server. The greenhouse in fact, when it has to perform a request to the API, sends it to GreenProxy which manages the authentication (request of the greenhouse token) and the communication with the API server (sends the GraphQL query to the API server, and returns the response to the sender).

This is an example of GreenProxy's output, where it shows the startup process (where the config file is loaded) and the request forwarding process (with its authentication):
![GreenProxy example](https://user-images.githubusercontent.com/37295664/167389661-40362c1d-7e7c-455a-bf65-ffc6c05f8cd3.png)

GreenProxy is used within a Docker container in order to run the application in isolation from the rest of the application. You can activate the proxy via the command `docker-compose up`.

### **5.5 GreenCore**

GreenCore is the software that manages the IoT greenhouse. The system has been programmed as a state machine, where in order to proceed to the next state, the current state must be successfully terminated.
Each state is called a "Sequence", and is defined by a class that extends the *ISequence* interface. The system uses 3 states:

1. **SplashScreen sequence**

In this sequence, a splashscreen is printed on the terminal only, showing the title of the application (GreenCore) and its authors..

2. **Setup sequence**

During the setup sequence the greenhouse tries to detect if it has already been configured (if it has been configured, there is a configuration file that keeps the UUID of the device, the name and its description if present). If it has already been configured, it proceeds to the next state (*startup sequence*). Otherwise, a web socket is opened which allows the greenhouse to receive its configuration from the user. The configuration is sent in JSON format and must have this format:

```JSON
{
  "token": "<USER ACCESS TOKEN>",
  "name": "<GREENHOUSE NAME>",
  "description": "[OPTIONAL DESCRIPTION]",
}
```

Note: For security reasons, it is necessary to send an access token (the same one the user uses to make requests to the API from the app) in order to access the greenhouse creation api (Mutation:addGreenhouse)

If the data submitted by the user is valid, the greenhouse announces itself to the API server, sending its name and description. The API (if the creation is successful) will send the greenhouse its UUID, which will be used to request the *greenhouse token* (see chapter *5.2.3 Authentication*). If on the other hand, the configuration provided is invalid, the greenhouse will send the user an error message notifying him of the problem.

3. **Startup sequence**

The startup sequence is the operational state of the greenhouse. During this sequence, the greenhouse dynamically loads sensors and their identifying names directly from the API (Query::getSensors). Next, it assigns each sensor to a separate Thread, managed by the **MonitoringOrchestrator** class. This orchestrator does nothing but manage the pool of threads, handling their startup and possible problems generated. If a thread breaks, the orchestrator will try to restart it automatically to avoid unwanted problems.

The monitoring settings are defined by a **MonitoringConfig** object, which provides the following fields:

| Name | Usage |
| -----| ------|
| `greenhouse` | Greenhouse object that represents the current greenhouse |
| `timeBetweenChecks` | Amount of milliseconds between sensor readings |

