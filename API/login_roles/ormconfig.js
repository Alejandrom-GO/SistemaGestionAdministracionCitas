module.exports = {
    "type": "mysql",
    "host": env.DB_HOST,
    "port": env.DB_PORT,
    "username": env.DB_USERNAME,
    "password": env.DB_PASSWORD,
    "database": env.DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
        "dist/entity/**/*.js"
    ],
    "migrations": [
        "dist/migration/**/*.js"
    ],
    "subscribers": [
        "dist/subscriber/**/*.js"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}