# In-House Greenhouse - A new generation of smart greenhoses

<p align="center">
  <img style="text-align: center;" width="400" height="auto" src="https://user-images.githubusercontent.com/37295664/158469342-5d8f577f-08eb-4a44-8494-c7d23abfd0fc.svg">
</p>

## Introduction

**In-House Greenhouse** let you control your smart greenhouse via your smartphone wherever you are in the world.
This smart greenhouse allows you to fully manage up to 6 plants, providing water and collecting useful information such as soil moisture and air temperature.
The collected data is used to show statistics about the growth of your plants and to alert you in case of problems on one or more plants in your in-house greenhouse.

## System architecture

![System Architecture](/extra/schemas/system-architecture.png)

## Tech stack

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