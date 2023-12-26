# GIS based Farm planner

## Proof of Concept

Created a POC in Google Maps that represents potential farming sites based on different factors related to climate change, soil type, terrain, depth of soil, elevation, pH level, etc. It has a similar interface to the one proposed by us initially.

<iframe src="https://www.google.com/maps/d/u/0/embed?mid=15l156HFL8j_sNKg50w9Ndq9V23mUAXk&ehbc=2E312F" width="640" height="480"></iframe>

## Introduction

This is a GIS based farm planner application that allows users to create a farm plan by drawing polygons on a map. It helps the farmer predict the soil quality, irrigation requirements and crop yield for the farm. The application is built using React, Redux, Mapbox, Turf.js, Material UI and React Leaflet.
## Installation

### Requirements

Node version 20.4.0

### Setup

Clone the repository

```
git clone https://github.com/smitjiwani/GIS-farm-planner.git
```

#### Frontend

```
npm install
npm run dev
```

you will be able to see the frontend at `http://localhost:5173/`

#### Backend

```
docker-compose up -d --build
docker-compose exec server npm run migrate
docker-compose exec server npm run seed
```

you will be able to see the backend at `http://localhost:5000/`

`http://localhost:5000/farms` will show a sample farms entries


use the following command to create a migrate file

```
knex migrate:make <table_name> --migrations-directory db/migration
```

use the following command to create a seed file(improvement needed here)

```
cd .\server\db\seeds\
knex seed:make <add_example>
```


## Features

- Create a farm plan by drawing polygons on a map
- Add different types of crops to the different areas of the farm
- Add different types of irrigation systems to the different areas of the farm
- Add different types of soil types to the different areas of the farm

## Technologies

- React
- Redux
- Mapbox
- Turf.js
- Material UI
- React Leaflet

## Screenshots

![Screenshot 2023-12-17 014322](https://github.com/smitjiwani/GIS-farm-planner/assets/78549024/6093d03d-e9eb-4586-847a-f9bcdb838e7c)

## Resources

- the database is sourced from Github (https://github.com/jinshijian/SoilHealthDB); a published article: Stewart, Ryan D., et al. The database compiled data from a set of soil health measurements collected across 41 countries worldwide, including 5,241 data entries from 281 published studies. It includes several soil health indicators and background indicators that describe factors such as climate, elevation, and soil type. Our goal in using this database is to perform comprehensive analyses of soil health changes related to cropland conservation management. Further, we use it for planning and assessing farms based on several factors like climate change, soil type, terrain, depth of soil, elevation, etc.

