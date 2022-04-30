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

### **5.1 Server**

The server is based on 6 principals models: user, greenhouse, plant, sensor, data, position.

The models save some informations for the app, of which few of them are the same for 3 models: greenhouse, plant, user. These informations are 3: id, date's creation, date's updating. In the case of the id, it is incremented at each new user that we register, while in the case of date, it is managed by a function that it gives the date in that instant of the creation or updating.

In the user's model we save others 4 informations: email, name, surname, password. While the greenhouse's model is structured with 4 informations: name, description, plants, isOkay. The isOkay's component is a boolean's type, that is used as a "flag", that tell to the user, that the Greenhouse needs attention. While the description's component is a part that the user can use to give some informations about his Greenhouse. Instead the plant component represents the set of plants that the "greenhouse" has inside.

In the case plant's model there are others 6 informations: name, description, greenhouse, greenhouseId, isDeleted, position. The greenhouse's component is used to hold the reference of the greenhouse, in which the plant is planted. While the isDeleted's component is a "flag" that says if the plant is deleted or not.

Then, as regards the sensor, we save 3 informations: the name, the value, the type of sensor and the position. The saved name is unique, so it means that it can be used as an identifier to distinguish the various sensors, while the value indicates the temperature or humidity of a particular sensor. As regards the position and the type of sensor, enumeratives are used:

- enum for position which may indicate: top left, top right, middle left, middle right, bottom left, bottom right, general.
- enum for the type of sensor which may indicate: humidity, temperature, soil moisture.

### **5.1.1 Server's API**

The 6 models are managed by Query via API, where they allow the creation and the possibility of having a list of users, or greenhouses, plants, sensors, data. In each of the 6 models we have user authentication using a token, and it is verified every time the individual wants to apply changes from the application. If the authentication is correct then it is checked whether the action the user wants to take is feasible or not, and the result is notified (greenhouse-server\src\api\graphql). Authentication is handled in the file Auth.ts. As far as the positions are concerned, it is also possible to have a list of all known positions of plants and sensors. While, for plants, it is also possible: to insert a plant in the greenhouse, to make an update, to remove. clearly all these functions are allowed with the help of GraphQL.

### **5.2 App**

The application starts with a login procedure where the user must enter a password containing: at least 8 characters, at least one upper case, at least one digit, at least one lower case, at least one special character, less than 16 characters¨. If the password does not meet all the criteria, it is marked with a red "x" which criteria are not met, and vice versa with a double view of the criteria met, and if all are fine, access is granted (greenhouse-app\app\components\password-validation\password-validation.tsx). 

![](/extra/schemas/app-images/screen_User's_registration.jpg)

In addition, in the app you can see information about the user and in addition there is the possibility of logout.

Then, it shows information about the greenhouse and plants (greenhouse-app\app\components). The part relating to the greenhouse reports the number of plants planted and the state itself, so if it needs control (red color) or if everything is ok (green color) (greenhouse-app\app\components\greenhouse-card.tsx), in addition you can see the list of greenhouses (greenhouse-app\app\components\greenhouse-list.tsx). As far as the navigation “behind the scenes” is concerned, it is managed in the navigation-utilities file (greenhouse-app\app\navigators).

While for what concerns the plant it is shown: the life time (calculated), the date on which the plant was planted, the percentage of soil moisture (greenhouse-app\app\components\plant-card.tsx), trend of the plant with a graph (greenhouse-app\app\components\area-chart.tsx), the position. In addition, there are buttons that allow the following functions related to the plant: adding, modifying and deleting. Furthermore, for the position to be assigned to a plant, the available positions that have not yet been chosen for any plant are made visible when you want to insert a new one(greenhouse-app\app\components\position-select-input).

The navigation within the app is combined within the navigator (greenhouse-app\app\navigators), where there are the switch tabs, which are used for the homepage to the other pages, such as for example to that of the settings. Furthermore, inside there is also the stack, where all the screens are inserted, such as: the greenhouse, the add plant, the plant modification.

The plant screen takes care of loading the greenhouse to which you want to add the plant and showing its information, after which it asks for the name of the plant and a description. Finally, after the data collection, it checks them and if they go well they are saved through an API. Furthermore, the screen offers the possibility to modify the plant, where it also takes care of reloading the greenhouse and showing its information, and as regards the plant to be modified, some information is shown: name of the plant, description of the plant, date of creation of the plant, date of the last modification (greenhouse-app\app\screens). The screen of the greenhouse takes care of showing the information and giving the possibility, by means of a button, to remove the plant and to save the changes applied to the greenhouse itself. Finally the homepage screen takes care of reloading all registered greenhouses.

**//need to write the part of screen's setting//**

### **5.2.1 App's API**

As for APIs within the application, we find: the authentication API, the core API, the data API, the greenhouse API, the plant API, the position API.

The authentication API (greenhouse-app\app\services\api\authentication) deals with managing the user, where we have: login, registration, token update.
When logging in, it checks whether the email and password entered are correct or not, so when the user tries to access part of the request to the server to know if the user exists and if everything is fine then the application is loaded with the data retrieval, while in case of denied access, the user is notified. Instead, as far as registration is concerned, we manage: first name, last name, email and password. More precisely for the password you go to check if the required criteria are actually met, that is.: at least 8 characters, at least one upper case, at least one digit, at least one lower case, at least one special character, less than 16 characters¨. If the criteria are met, the user is created. Finally we have the token management, where each authentication is updated.

As regards the core API (greenhouse-app\app\services\api\core), there is the management of the error in the case of the response from the server, more precisely the part dedicated to authentication. Furthermore we have the part inherent to the configuration and the part of the printouts for the errors that can be generated inside, such as: connection error, client error, network error, elimination error .. In addition, there is the management of the data type and response management to data, more precisely: greenhouse API data, plant API data, location API data.

Then data API (greenhouse-app\app\services\api\data) takes care of retrieving the data by checking the data with GraphQL and the same thing happens with the greenhouse API (greenhouse-app\app\services\api\greenhouse), but with the data of all the greenhouses, therefore a set of data that make up each of them. While for the API of the plant (greenhouse-app\app\services\api\plant) you manage: the addition, the removal and the modification. In all 3 cases, the authentication is always carried out and then the action chosen is secondary. As far as the position API (greenhouse-app\app\services\api\position) is concerned, it takes care of restoring the position of a sensor or of a plant, passing name and type as parameters.

In addition to the API how services there are also available: the keychain and the reactotron.

The keychain takes care of: saving the user's credentials and loading the credentials. These two processes allow you to manage the data relating to registration and login by the user. Finally, there is the reactotron that allows you to manage the application configuration (setup and the general archive) and the states of the actions that take place "behind the scenes of the application".

### **5.3 Internet of Things (IoT)**

In the greehouse-iot part, the loading part of the greenhouse is managed, where the user sends a token (that is to say that the user authenticates), with which it is possible to verify by means of an HTTP request in the database if actually c 'is the greenhouse associated with that user (user) and if there is, it makes the setup of the greenhouse take place using the socket help (greenhouse-iot\GreenCore\backend\src\main\java\backend\helper). 
Authentication is handled with the help of a proxy server.

### **5.3.1 IoT's API**

In loading there are 2 scenarios: the first checks if the greenhouse is already set and in that case sets the greenhouse starting a socket, the second case the greenhouse is not present and therefore it is registered in the database. 
To manage the necessary information and actions, we have APIs available: for authentication, for the request headers, for the request itself, for the response to the request, for the greenhouse and finally for the sensors (greenhouse-iot\GreenCore\backend\src\main\java\backend\model\api).

Finally, for the sensors we have classes (greenhouse-iot\GreenCore\backend\src\main\java\backend\model\sensor) that are used to work with the database to find the inherent data of a given greenhouse, so we have: the possible positions (Position.java), the types of sensors with their fields and the list of sensors (SensorList.java).
