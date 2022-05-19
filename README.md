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

## **4 Infrastructure**

This chapter describes each component present in the system, delving into the technologies and languages used for their development.

### **4.1 Tech Stack**

<table>
  <tr>
    <td>
      <p align="center">
        In-House Greenhouse IoT
      </p>
    </td>
    <td>
      <ul>
        <li>Raspberry Pi 3 Model B+</li>
        <li>Java + Pi4J</li>
        <li>Sensors (soil moisture, temperature, humidity and water level sensor)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p align="center">
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
        In-House Greenhouse Server
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
        In-House Greenhouse Database
      </p>
    </td>
    <td>
      <ul>
        <li>PostgreSQL DataBase</li>
        <li>Docker container</li>
      </ul>
    </td>
  </tr>
</table>

### **4.2 In-House Greenhouse App**

The application is developed with React Native and Expo using TypeScript. To simplify the development of the application views, the app uses *Ui Kitten* as UI framework.

### **4.3 In-House Greenhouse IoT**

The physical greenhouse is able to manage itself autonomously.

The software behind the physical IoT greenhouse allows it to be managed autonomously. Its software, which has been called "GreenCore", allows the greenhouse to manage autonomously both the configuration part (at the first power on a greenhouse must be registered within the system via API). It has been implemented entirely in Java using also some parallel programming techniques to optimize some sensor reading processes. Moreover, the Pi4J library (version 1.4, <https://pi4j.com/1.4>) is used to allow the control of the GPIO pins of the Raspberry Pi 3 Model B+.

The greenhouse features the following sensors:

- 6 soil moisture sensors to collect soil data from plants
- 1 water level sensor that monitors the level of the water tank
- 1 air temperature sensor
- 1 air humidity sensor

The data generated by the sensors are made available by the smartphone application, through special APIs that take care of saving the data within the database.

### **4.4 In-House Greenhouse Server**

The API server is managed using the *GraphQL* query language. The use of this particular query language allows the developer to request only the necessary data from the API, thus avoiding unnecessary traffic and unnecessarily expensive queries.
The API manages every single aspect of the system, in fact it is only through the API that it is possible to read and write data into the database. The API server is the only component of the system that can connect directly to the database and query it.

For API communication, it is mandatory to use HTTP POST requests, with the GraphQL query contained in the request body. For more information on the creation of these queries, you can consult the official guide: <https://graphql.org/learn/queries/>.

The whole thing was developed through Apollo Server (<https://www.apollographql.com>), a suite that combines the famous back-end framework ExpressJS with the fantastic query language GraphQL. To further facilitate the development of the database Prisma ORM (<https://www.prisma.io>) is used, a framework which allow to describe the DB structure in textual form (so-called "schema") and, through an operation called "migration", transform it into SQL commands that are executed automatically inside the PostgreSQL server, applying schema changes automatically in the various tables.

### **4.5 In-House Greenhouse Database**

The database is a simple PostgreSQL server and is managed autonomously through a Docker container (managed with docker-compose, <https://docs.docker.com/compose/reference>) using the following image: *postgres:11.10*.
Through the config file related to docker-compose (*docker-compose.yml*) you can change several essential parameters, such as the username and password, or the name of the database created by default at startup.

## **5 Circuit Diagram**

This is the circuit diagram of the physical system. It shows how the various components are connected together.

![Circuit Diagram](/extra/schematics/Schematic_InHouseGreenhouse_Zoomed.png)

Click [here](/extra/schematics/Schematic_InHouseGreenhouse.pdf) for the full-size version of the circuit diagram.

## **6 Development**

### **6.1 Database**

The database is implemented using PostgreSQL and is hosted on a Docker container. It is connected to the API using the Prisma ORM. This the database ER diagram:

![**Database schema**](./greenhouse-server/extra/db/ERD.svg)

Every table in the database is defined in the Prisma schema. The schema is defined in this [file](./greenhouse-server/prisma/schema.prisma).

A special feature of this database is that the plant data is never completely deleted, but is only hidden by setting the *isDeleted* flag to "true".

### **6.2 API Server**

The API server is the core of In-House Greenhouse. The server, as mentioned earlier, was developed through the use of Apollo Server (webserver) with GraphQL (API query language) and Nexus GraphQL (schema generator). The API server uses the Prisma ORM database to handle queries and changes to the database.

APIs are divided into two major groups:

1. **Queries**: here reside the APIs that do not go to modify data within the database
2. **Mutation**: here, instead, are the APIs that modify data (delete, modify and write).

Here is a diagram showing the structure of the GraphQL API:

![**API schema**](./greenhouse-server/extra/graphql/graph.png)

#### **6.2.1 Building queries**

For the development of the various queries, the server presents a Sandbox for testing, accessible via the loopback address: [http://localhost:4000](http://localhost:4000).

#### **6.2.2 Config file**

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

#### **6.2.3 Authentication**

The API server uses 3 types of tokens for authentication:

1. Access token: allows access to the API, **validity of 30 minutes**. This token allows access to all APIs.
2. Refresh token: allows to renew the access token, it has a **validity of 7 days**. This token has no other purpose of operation, in fact you can't use it to access APIs.
3. Greenhouse token: access token used by the IoT greenhouse to record read data, **validity of 1 minute**. This token can only be used in the API related to the IoT greenhouse: the one to record data in the system (Mutation:recordData) and the one to read the recorded sensors (Query:getSensors).

This is a small example diagram showing the authentication process between the API server and the IoT greenhouse/SmartPhone application:

1. Application requests to the API server
![App-Server authentication](https://user-images.githubusercontent.com/37295664/167380175-8cb5c70b-be73-43f3-98f3-f2453a585869.png)

2. Greenhouse IoT device requests to the API server
![Greenhouse IoT-Server authentication](https://user-images.githubusercontent.com/37295664/167380293-02ce7bc0-b8f1-4d37-b090-9391e2c5377a.png)

### **6.3 App**

The application initially presents a login/registration screen, which allows you to access the system. This authentication process is strictly necessary since the user needs the access and refresh tokens to make calls to the API (see chapter **6.2.3 Authentication**).

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

### **6.4 GreenProxy**

GreenProxy is an application written in Go (https://go.dev), which allows to manage the communication between Greenhouse IoT and API server. The greenhouse in fact, when it has to perform a request to the API, sends it to GreenProxy which manages the authentication (request of the greenhouse token) and the communication with the API server (sends the GraphQL query to the API server, and returns the response to the sender).

This is an example of GreenProxy's output, where it shows the startup process (where the config file is loaded) and the request forwarding process (with its authentication):
![GreenProxy example](https://user-images.githubusercontent.com/37295664/167389661-40362c1d-7e7c-455a-bf65-ffc6c05f8cd3.png)

GreenProxy is used within a Docker container in order to run the application in isolation from the rest of the application. You can activate the proxy via the command `docker-compose up`.

### **6.5 GreenCore**

GreenCore is the software that manages the IoT greenhouse. The system has been programmed as a state machine, where in order to proceed to the next state, the current state must be successfully terminated.
Each state is called a "Sequence", and is defined by a class that extends the *ISequence* interface. The system uses 3 states:

1. **SplashScreen sequence**

In this sequence, a splashscreen is printed on the terminal only, showing the title of the application (GreenCore) and its authors..

<img width="862" alt="green-core-splashscreen" src="https://user-images.githubusercontent.com/37295664/167556681-231e9333-6cb6-4029-aaa4-c4842a2ff95d.png">

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

<img width="423" alt="greencore-startup" src="https://user-images.githubusercontent.com/37295664/167563315-c258c912-fccb-4905-b216-8562ca857edd.png">

The monitoring settings are defined by a **MonitoringConfig** object, which provides the following fields:

| Name | Usage |
| -----| ------|
| `greenhouse` | Greenhouse object that represents the current greenhouse |
| `timeBetweenChecks` | Amount of milliseconds between sensor readings |

## **7 Design**

The following render images show the design of the In-House Greenhouse:

- Isometric View

  ![In-House Greenhouse Isometric View](./extra/design/DesignIsometric.jpg)

- Side View

  ![In-House Greenhouse Side View](./extra/design/DesignSide.jpg)

- Top View

  ![In-House Greenhouse Top View](./extra/design/DesignTop.jpg)

## **8 Prototype**

## **9 Directory structures**

### **9.1 Project file structure**

```text
.
└── in-house-greenhouse/
    ├── greenhouse-app    # Greenhouse App
    ├── greenhouse-server # Greenhouse API server
    └── greenhouse-iot/   # Greenhouse IoT files
        ├── GreenCore     # GreenCore
        ├── GreenProxy    # GreenProxy
        └── UPnP          # UPnP discovery (UNUSED)
```

### **9.2 Greenhouse app file structure**

```text
greenhouse-app/
├── app/
│   ├── assets/      # App assets
│   ├── components/  # React native components
│   ├── config/      # Config file loader (DO NOT TOUCH!)
│   ├── i18n/        # Multi-Language 
│   ├── models/      # MobX State Tree data models
│   ├── navigators/  # App navigators (Stack, Drawer, Bottom Tab)
│   ├── screens/     # App screens
│   ├── services/
│   │   ├── api/
│   │   │   ├── core/            # API library core 
│   │   │   ├── authentication/  # Authentication API service
│   │   │   ├── data/            # Data API service
│   │   │   ├── greenhouse/      # Greenhouse API service
│   │   │   ├── plant/           # Plant API service
│   │   │   └── position/        # Position API service
│   │   ├── keychain/            # KeyChain credentails service
│   │   └── reactotron/          # Reactotron service (DO NOT TOUCH!)
│   ├── theme/
│   ├── utils/
│   └── app.tsx
├── e2e/             # Detox End-To-End Testing
└── test/            # Boilerplate default tests
```

### **9.3 Greenhouse API server file structure**

```text
greenhouse-server/
├── extra/
│   ├── db/              # Database ER diagram
│   └── graphql/         # GraphQL API diagram
├── prisma/
│   ├── ...
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Prisma database seeder
└── src/
    ├── api/             # GraphQL APIs
    ├── utils/
    │   ├── env/
    │   │   └── env.ts             # Environment loader utility class
    │   ├── jwt/
    │   │   └── jwt.ts             # JWT token utility class
    │   └── request/
    │       └── authentication.ts  # Requests utility class
    └── server.ts         # !API server entry point!
```

### **9.4 Greenhouse IoT file structure**

> The file structure for the Greenhouse IoT files is too big to be described here. You can find it in the repository by clicking [here](./greenhouse-iot).
In addition, here you can find the GreenCore [JavaDoc](https://lucadibello.github.io/in-house-greenhouse/).

## 10 Project links

Links to each of the following project resources:

- [GreenCore]( ./greenhouse-iot/GreenCore/)
  - [GreenCore Docs](https://lucadibello.github.io/in-house-greenhouse/)
- [GreenProxy](./greenhouse-iot/GreenProxy/)
- [UPnP](./greenhouse-iot/UPnP/)
- [Greenhouse App](./greenhouse-app/)
- [Greenhouse API Server](./greenhouse-server/)
