/**
 * @info - process express unhandled errors
 */

import ErrorObject from "../utils/errorObject";
import keys from "../utils/keys";
import Log from "../config/log";

export default function (err, req, resp, next) {
    Log.error(err)
    if (resp.headersSent) {
        return next(err);
    }

    // if of type ErrorObject
    else if (err instanceof ErrorObject) {
        resp.status(err.statusCode).send(err.json());
    }
    // send user an undefined error
    else {
        //create error object
        err = new ErrorObject(keys["500"].undefined, err);
        resp.status(500).send(err.json());
    }
}
