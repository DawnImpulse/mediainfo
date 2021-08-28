/**
 * @info - globally used variables
 */

import {EventEmitter} from "events";

export default class Global {
    public static events = new EventEmitter();
}
