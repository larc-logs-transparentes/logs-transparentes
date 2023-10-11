
## Setup
Instructions to install and start TL-Election in Linux:

### Dependencies

- [NodeJS 18.x](https://nodejs.org/en/download/) 
- [MongoDB 6.x](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- [Git](https://git-scm.com/downloads)
  
### Download
```
git clone https://github.com/larc-tse/logs-transparentes.git
```

### Configuration and initialization
The system consists of 3 different modules.

#### 1. Back-end

This module is responsible for receiving the BUs, storing them in a database, and sending them to the TLmanager. It also provides an API for the frontend to access the database and TLManager functions.

<b>Configuration</b>

In [config.json](backend/public/src/config.json) file, it is possible to configure the address and port of MongoDB and TLManager,

<b>Initialization</b>

In a terminal, run:

```bash
cd backend/
npm install
npm start
```

If you want to execute the backend with an empty database, run:

```bash
npm start reset
```

#### 2. TLManager

This module is an API that handles multiple Merkle-Trees. See the [documentation](https://redocly.github.io/redoc/?url=https://guilherme-fumagali.github.io/tlmanager-documentation/openapi.json&nocors).

To start the module, follow the instruction in [README](./tlmanager/readme.md).

#### 3. Front-end

In the terminal, run:

```bash
cd frontend/
npm install
npm start
```
### Populate tree and DB
The prototype supports real data from the Brazilian elections. For more instructions, consult the [documentation for real data entry](./bu_utils/ReadMe.md).
