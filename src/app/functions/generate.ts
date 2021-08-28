/**
 * @info - use to generate various things like uuid
 */
import {generate} from "shortid";
import {randomBytes} from "crypto";

export default class Generate {
    /**
     * generate uuid
     * @param length
     */
    static uniqueId(length: number = 32): string {
        return randomBytes(length / 2).toString("hex");
    }

    /**
     * generate shortid
     */
    static short() {
        return generate();
    }
}
