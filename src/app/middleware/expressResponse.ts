/**
 * @info - use to generalize responses (mainly errors)
 */
import ErrorObject from "../utils/errorObject";
import {Request, Response} from "express";

/**
 * default exported function
 * @public
 */
export default function (fn) {
    return async function (req: Request, resp: Response, next) {
        try {
            const response = await fn(req, resp, next);
            if (!resp.headersSent) resp.status(200).send(response);
        } catch (e) {
            if (e instanceof ErrorObject)
                resp.status(e.statusCode).send(e.json());
            else next(e);
        }
    };
}
