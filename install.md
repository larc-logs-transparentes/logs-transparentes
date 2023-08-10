
## Setup
Instructions for installing and initializing the tool on Ubuntu linux distributions:

### Dependencies

- [NodeJS 18.x](https://nodejs.org/en/download/) 
- [MongoDB 6.x](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- [Git](https://git-scm.com/downloads)
  
### Download
```
git clone https://github.com/larc-tse/logs-transparentes.git
```

### Configuration and initialization
The system consists of 4 different parts that work together.

#### 1. Back-end

This module is responsible for receiving the BUs and storing them in the database and sending them to the TLManager module. It also provides a interface for the front-end to access the database and TLManager functions.

<b>Configuration</b>

In [config.json](./backend/src/config.json) file, it is possible to configure the address and port of MongoDB and TLManager,

<b>Initialization</b>

In a terminal, run:

```bash
cd backend/
npm install
npm start
```

If you want to execute the back-end with the database empty, run:

```bash
npm start reset
```

#### 2. TLManager

In short, this module is a API that handles with multiple Merkle-Trees. For more informations, see the [documentation](https://redocly.github.io/redoc/?url=https://guilherme-fumagali.github.io/tlmanager-documentation/openapi.json&nocors).

To init the module, follow the instruction in [README](./tlmanager/readme.md).

#### 4. Front-end

In terminal, run:

```bash
cd frontend/
npm install
npm start
```
### Populate tree and DB
The prototype supports real data from the Brazilian elections, for that, consult the [documentation for real data entry](./bu_utils/ReadMe.md).
