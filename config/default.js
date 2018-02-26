module.exports = {
    database: {
        dialect: "mysql",
        dbname: "dbname",
        username: "username",
        password: "password",
        host: "localhost",
        port: 3306
    },
    web: {
        restUriPerfix: "/api/",
        staticFilesUriPerfix: "/assets/",
        port: 3000
    }
};
