/**
 * @info - ResponseObject sent to the client in case of an error
 */

import {codes, keys} from "error-key";
import Generate from "../functions/generate";

export default class ErrorObject {
    statusCode: number; // status code
    eid: string; // unique error id
    key: string; // actual error key
    code: number; // error code
    details: any; // error details
    stack: string; // stack trace

    constructor(what: string, why: any) {
        this.eid = Generate.uniqueId();
        this.key = what;
        this.code = Number(keys()[what]);
        this.details = why;
        this.statusCode = codes(this.code).status;
        if (why instanceof Error) {
            this.stack = why.stack;
        }
    }

    /**
     * return a json formatted ResponseErrorObject
     *
     * @return object
     */
    json() {
        // get message from details
        let message = "";
        if (this.details)
            message =
                this.details instanceof Error ? this.details.message : this.details.toString();

        // get actual error code to send
        const actual = codes(this.code);

        // return the json to respond
        return {
            eid: this.eid,
            code: actual.error,
            message: message ? message.split(`\"`).join("") : "",
        };
    }
}
