module.exports ={
    HOST: "127.0.0.1",
    USER: "postgres",
    PORT: 5432,
    PASSWORD: "3008poli",
    DB: "bu_db",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        // acquire: 30000,
        idle: 10000
    }
}