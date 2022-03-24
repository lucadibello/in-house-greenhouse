 # <center> <h1> **In-House Greenhouse - A new generation of smart greenhouses** </h1> <center>

<br>
<br>
<br>
<br>
<br>

# <center><h2> **Report** </h2><center>
<br>
<br>
<br>
<br>

# <center><h6> Ibrahim Daniel, Di Bello Luca, Danny Nguyen, Kramer Alec James, Biscanti Jr. John Gerard </h6><center>
<br>
<br>

# <center> <h6> _SUPSI DTI - Cross-cultural collaboration project_ </h6> <center>

# <center> <h6> _2021/22 - Spring semester_ </h6> <center>
<br>
<br>
<br>

# <center> <h6> _February 2022_ </h6> <center>

# **1** **Description of the problem**
<br>
The use of agricultural fields is fundamental for the production of primary goods necessary for human beings, but this involves numerous quantities of carbon used in the transport of the goods themselves in department stores or shops. These quantities of carbon are then released into the air in the form of greenhouse gases by means of transport and these actions, like other human actions, contribute to global warming.
<br>
<br>

# **2** **Introduction**
<br>
In-House Greenhouse allows you to manage your "small" greenhouse wherever you are, at work, at the doctor, to find relatives in another country.. It works through an app which manages 6 plants through the collection information, such as: temperature of the surrounding area, soil moisture. Thanks to the collection of information, the application is able to show statistics on plants and if it deems it necessary it warns of a possible problem that a plant encounters.
<br><br>
Then the In-House Greenhouse also allows you to have the statistics of your friends' "small greenhouses", and therefore to make real comparisons as farmers would do with their land trying to exchange opinions.
<br>
<br>

# **3** **System architectures**
<br>
The In-House Greenhouse system works mainly in 4 components: the physical greenhouse, the API, the server, the application.
<br><br>
The physical greenhouse has sensors that allow you to monitor the plants (temperature, humidity) with your needs, while the APIs allow you to manage plant data within a database.
<br><br>
As for the application, on the other hand, it has interfaces through which the user can receive information (e.g. statistics on plants, statistics of friends' greenhouses) and make changes (remove or add a plant), clearly to specify that the API also take over the app to view the "greenhouse" data.
<br><br>
Finally, as regards the server, he is the one who acts as an intermediary between the database and the other components (to whom he supplies the necessary data), in fact he takes care of writing the data on the database and also of reading them.
<br>
<br>
The tools that guarantee the functioning of the whole system with explanation:
<br><br>

### **3.1** **Docker**
<br>
A tool that allows the creation of operations in containers (set of data contained in a file), where in the case of the In-House Greenhouse we have 2 containers: the server and the database.
<br>
<br>

### **3.2** **In-House Greenhouse App**
<br>
The application is developed with React Native and Expo, framework (a platform) that allows to develop applications, on which the Typescript language is used, which works with a similar JavaScript model. In addition, React Native uses UI Kitten which includes a set of useful components for the application (e.g. lists, buttons, layouts, etc.).
<br>
<br>

### **3.3** **In-House Greenhouse**
<br>
The physical greenhouse is managed by sensors and a raspberry pi, which take care of taking information about the plants, such as temperature and water. This information then allows you to manage each individual plant according to its needs. The language used to enable functionality is Python.
<br>
<br>

### **3.4** **API**
<br>
The APIs are implemented using the Typescript language with the help of GraphQL, a language that allows you to work on existing data through queries. Furthermore, the APIs allow to manage the data between the server, the greenhouse and the application, more precisely for what concerns the greenhouse and the application, the communication takes place through HTTP requests (technique used to transmit data with the API). As for the server, on the other hand, the APIs provide information (data) and request other information so that the whole mechanism works.
<br>
<br>







