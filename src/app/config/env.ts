/**
 * @info environment variables
 */
export default {
    package: {
        version: process.env.npm_package_version,
    },
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    log: {
        console: process.env.LOG_CONSOLE === "true",
        utc: process.env.LOG_UTC === "true",
    },
};
