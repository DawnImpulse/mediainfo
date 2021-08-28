/**
 * @info - error thrown after response is sent
 */
import log from "../config/log";

export default function (err, req, resp, next) {
    log.error(err)
    next();
}
