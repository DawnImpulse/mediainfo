/**
 * @info - custom logging solution
 * @info - generating node event for each log
 */
import env from "./env";
import Time from "../services/time";
import { inspect } from "util";
import { DEBUG, ERROR, EVENT, INFO, SUCCESS, WARN } from "../utils/constant";
import Global from "./global";
import { blue, gray, green, red, yellow } from "chalk";

// used for logging given data
export default class Log {
    /**
     * log event type
     * @param type
     * @private
     */
    private static logEventType(type) {
        switch (type) {
            case INFO:
                return EVENT.log.info;
            case WARN:
                return EVENT.log.warn;
            case DEBUG:
                return EVENT.log.debug;
            case ERROR:
                return EVENT.log.error;
            default:
                return EVENT.log.success;
        }
    }

    /**
     * send the log event
     * @param message
     * @param type
     * @param suppress
     * @private
     */
    private static logEvent(message, type, suppress = false) {
        if (Global.events && !suppress)
            Global.events.emit(this.logEventType(type), {
                time: Time.log(),
                type,
                message,
            });
    }

    /**
     * log message on console
     * @param message
     * @param type
     * @private
     */
    private static logConsole(message, type) {
        typeof message === "string"
            ? console.log(`${Time.log()} | ${type} | ${message}`)
            : console.log(`${Time.log()} | ${type} | ${inspect(message, false, 10, true)}`);
    }

    /**
     * log to console irrespective of options
     * will log as info only
     */
    public static all(message) {
        this.logConsole(message, gray(INFO));
    }

    /**
     * info log
     * @param message
     * @param silent
     * @param suppress - if no need to emit event
     * @public
     */
    public static info(message, silent = false, suppress = false) {
        if (env.log.console) if (!silent) this.logConsole(message, gray(INFO));
        this.logEvent(message, INFO, suppress);
    }

    /**
     * debug log
     * @param message
     * @param silent
     * @param suppress - if no need to emit event
     * @public
     */
    public static debug(message, silent = false, suppress = false) {
        if (env.log.console) if (!silent) this.logConsole(message, blue(DEBUG));
        this.logEvent(message, DEBUG, suppress);
    }

    /**
     * warn log
     * @param message
     * @param silent
     * @param suppress - if no need to emit event
     * @public
     */
    public static warn(message, silent = false, suppress = false) {
        if (env.log.console) if (!silent) this.logConsole(message, yellow(WARN));
        this.logEvent(message, WARN, suppress);
    }

    /**
     * error log
     * @param message
     * @param silent
     * @param suppress - if no need to emit event
     * @public
     */
    public static error(message, silent = false, suppress = false) {
        if (env.log.console) if (!silent) this.logConsole(message, red(ERROR));
        this.logEvent(message, ERROR, suppress);
    }

    /**
     * success log
     * @param message
     * @param silent
     * @param suppress - if no need to emit event
     * @public
     */
    public static success(message, silent = false, suppress = false) {
        if (env.log.console) if (!silent) this.logConsole(message, green(SUCCESS));
        this.logEvent(message, SUCCESS, suppress);
    }
}
