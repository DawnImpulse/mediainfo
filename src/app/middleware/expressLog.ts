/**
 * @info express logging using log4js
 */

import chalk from "chalk";
import onHeaders from "on-headers";
import log from "../config/log";
import Generate from "../functions/generate";

export default function (req, resp, next) {
    req.start = Date.now();
    resp.set({
        "X-Powered-By": `MediaInfoApi by DawnImpulse`,
    });

    // for response time
    const start = Date.now();
    const unid = Generate.short();

    // utm handling
    let utm = null;
    if (req.query && req.query.utm_source) {
        utm = {
            source: req.query.utm_source,
            medium: req.query.utm_medium,
            campaign: req.query.utm_campaign,
            content: req.query.utm_content,
        };
    }

    // logging the incoming request
    log.info(`${chalk.gray(req.method)} ${req.originalUrl} :: ${unid} :: [Incoming]`, false, true);

    // logging the response time
    // and emit event
    onHeaders(resp, function () {
        const duration = Date.now() - start;

        // if response is success / info
        if (resp.statusCode >= 100 && resp.statusCode < 300) {
            return log.info(
                `${chalk.gray(req.method)} ${req.originalUrl} :: ${unid} :: [${chalk.green(
                    resp.statusCode,
                )}] :: ${duration} ms`,
                false,
                true,
            );
            // if response is redirect or similar
        } else if (resp.statusCode >= 300 && resp.statusCode < 400) {
            return log.warn(
                `${chalk.gray(req.method)} ${req.originalUrl} :: ${unid} :: [${chalk.yellow(
                    resp.statusCode,
                )}] :: ${duration} ms`,
                false,
                true,
            );
            // if it is error (>=400)
        } else {
            return log.error(
                `${chalk.gray(req.method)} ${req.originalUrl} :: ${unid} :: [${chalk.red(
                    resp.statusCode,
                )}] :: ${duration} ms`,
                false,
                true,
            );
        }
    });
    return next();
}
