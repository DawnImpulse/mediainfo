/**
 * @info time utility
 */
import moment from "moment";
import env from "../config/env";

export default class Time {
    private static format = "YYYY-MM-DD[T]HH:mm:ssZ";
    /**
     * return current date time (UTC)
     * in platform generic format
     */
    public static currentUTC() {
        return env.log.utc ? moment().utc().format(this.format) : moment().format(this.format);
    }

    /**
     * return current date/time in pretty format
     */
    static log() {
        // return either in utc or system time (based on env var)
        return this.currentUTC();
    }

    /**
     * convert epoch to general format
     */
    public static formatEpoch(epoch: number): string {
        return moment.unix(epoch).format("DD MMM YYYY, hh:mm:ss");
    }

    /**
     * format given date to UTC
     * @param date
     */
    public static formatUTC(date: Date) {
        return moment(date).utc().format("YYYY-MM-DD[T]HH:mm:ssZ");
    }

    /**
     * add seconds to utc
     */
    public static addSecondsToUTC(seconds: number) {
        return moment().utc().add(seconds, "seconds").format(this.format);
    }
}
