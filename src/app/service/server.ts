/**
 * @info - express server
 */

import express, {Request} from "express";
import expressParser from "@dawnimpulse/express-parser";
import {json, urlencoded} from "body-parser";
import cors from "cors";
import expressUnhandled from "../middleware/expressUnhandled";
import expressThrow from "../middleware/expressThrow";
import log from "../config/log";
import env from "../config/env";
import expressLog from "../middleware/expressLog";
import expressResponse from "../middleware/expressResponse";
import ErrorObject from "../utils/errorObject";
import keys from "../utils/keys";
import regex from "../utils/regex";
import mediainfo from "./mediainfo";

export default class Server {
    private rest = express();

    // constructor
    constructor() {
        this.beforeMiddleware();
        this.infoRoutes()
        this.routes();
        this.afterMiddleware();
    }

    /**
     * before middleware
     */
    private beforeMiddleware(): void {
        // trust first proxy on server
        if (env.environment === "production") this.rest.set("trust proxy", 1);

        this.rest.use(expressLog);
        this.rest.use(cors());
        this.rest.use(urlencoded({ extended: true }));
        this.rest.use(json());
        this.rest.use(expressParser);
    }

    /**
     * routes for mediainfo
     * @private
     */
    private infoRoutes(){
        // mediainfo route get
        this.rest.get("/info", expressResponse(async (req: Request)=>{
            // check if url is present
            if (req.query.url){
                // check if url is valid
                if (regex.url.test(req.query.url as string))
                    // run mediainfo
                    return mediainfo(req.query.url as string)
                // invalid url
                else throw new ErrorObject(keys["400"].invalidInfoGet, "kindly provide valid url")
            // url not provided
            }else throw new ErrorObject(keys["400"].invalidInfoGet, "kindly provide 'url' query parameter")
        }))

        // mediainfo route post
        this.rest.post("/info", expressResponse(async (req: Request)=>{
            // check if url is present
            if (req.body.url){
                // check if url is valid
                if (regex.url.test(req.body.url))
                    // run mediainfo
                    return mediainfo(req.body.url)
                // invalid url
                else throw new ErrorObject(keys["400"].invalidInfoGet, "kindly provide valid url")
                // url not provided
            }else throw new ErrorObject(keys["400"].invalidInfoGet, "kindly provide 'url' query parameter")
        }))
    }

    /**
     * various routes
     */
    private routes(): void {
        // check server is working
        this.rest.all(
            ["/", "/ping", "/health"],
            expressResponse(async ({ originalUrl }) => {
                return {
                    success: true,
                    message: "server working",
                    url: originalUrl,
                };
            }),
        );

        // unavailable routes
        this.rest.all(
            "*",
            expressResponse((req) => {
                throw new ErrorObject(
                    keys["404"].routeNotFound,
                    `given route [${req.method}] ${req.path} not found`,
                );
            }),
        );
    }

    /**
     * after middleware
     */
    private afterMiddleware(): void {
        this.rest.use(expressUnhandled);
        this.rest.use(expressThrow);
    }

    /**
     * start listening to the server
     */
    async start() {
        try {
            log.all("Starting Express Server");
            await this.rest.listen(env.port);
            log.all(`Actively listening on http://localhost:${env.port}`);
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
