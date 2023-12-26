import knex from "knex";

export default knex({
    client: 'postgres',
    connection: {
        host: "db",
        user: "username",
        password: "password",
        database: "username",
    },
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
    pool: {
        min: 2,
        max: 10,
    },
});
