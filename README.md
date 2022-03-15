# In-House Greenhouse - A new generation of smart greenhoses

<p align="center">
  <img style="text-align: center;" width="400" height="auto" src="https://user-images.githubusercontent.com/37295664/158469342-5d8f577f-08eb-4a44-8494-c7d23abfd0fc.svg">
</p>

## Introduction

**In-House Greenhouse** let you control your smart greenhouse via your smartphone wherever you are in the world.
This smart greenhouse allows you to fully manage up to 6 plants, providing water and collecting useful information such as soil moisture and air temperature.
The collected data is used to show statistics about the growth of your plants and to alert you in case of problems on one or more plants in your in-house greenhouse.

## System architecture

This is a small diagram showing all the components that make up the **In-House Greenhouse** system:

![System Architecture](/extra/schemas/system-architecture.png)

This is a small diagram showing all the components that make up the In-House Greenhouse system. The Greenhouse collects data about the state of the plants and the surrounding environment via sensors, and then sends this data to the server via HTTP calls to the API, which will save the data within the PostgreSQL database.

The phone application is strictly dependent on the API.  The data shown in the various interfaces, such as the list of added greenhouses, statistics of the various plants, etc. are read dynamically via HTTP requests sent to the API. The user through the phone application as well as view the data in the DB can also modify them: it is possible to change the information of any greenhouse and any plant owned by the user.

The core of the application, the APIs, are run inside a Docker container (also the database they are connected to). The use of a container offers several potentialities to the product such as great scalability, being able to dynamically increase the number of API containers if the main container is overloaded (via Load Balancer). Through Docker-Compose it is easy to start the entire application on any without any additional configuration.

## Tech stack

This chapter describes the technologies and languages used to program/set up every single component of the system (the icons refer to those in the *System architecture* chapter).

<table>
  <tr>
    <td><img src="/extra/schemas/system-icons/symbol-greenhouse.png" alt="Greenhouse icon" height="150" width="auto"></td>
    <td>
      <ul>
        <li>Raspberry Pi 3 Model B+</li>
        <li>Python - Sensors (moisture, temperature, ... )</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><img src="/extra/schemas/system-icons/symbol-app.png" alt="Greenhouse icon" height="200" width="auto"></td>
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
    <td><img src="/extra/schemas/system-icons/symbol-api.png" alt="Greenhouse icon" height="150" width="auto"></td>
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
    <td><img src="/extra/schemas/system-icons/symbol-db.png" alt="Greenhouse icon" height="150" width="auto"></td>
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
</table>