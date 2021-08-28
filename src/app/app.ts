/**
 * @info starting file
 */

import "dotenv/config"
import Server from "./service/server";
import {initO} from "error-key"
import keys from "./utils/keys";

(async ()=>{
    initO([],keys)
    await new Server().start()
})()