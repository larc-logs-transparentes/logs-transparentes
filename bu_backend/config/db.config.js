module.exports ={
     HOST: "localhost",
    USER: "postgres",
    PASSWORD: "3008poli",
    DB: "bu_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}