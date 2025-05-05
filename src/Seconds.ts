export enum TimeTypes {
    MILLISECOND,
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEK,
    MONTH,
    YEAR,
}

const TimeTypesOrdered: TimeTypes[] = [
    TimeTypes.YEAR,
    TimeTypes.MONTH,
    TimeTypes.WEEK,
    TimeTypes.DAY,
    TimeTypes.HOUR,
    TimeTypes.MINUTE,
    TimeTypes.SECOND,
    TimeTypes.MILLISECOND,
];

const aliases: Record<TimeTypes, string | undefined> = {
    [TimeTypes.MILLISECOND]: "ms",
    [TimeTypes.SECOND]: "s",
    [TimeTypes.MINUTE]: "min",
    [TimeTypes.HOUR]: "h",
    [TimeTypes.DAY]: undefined,
    [TimeTypes.WEEK]: undefined,
    [TimeTypes.MONTH]: undefined,
    [TimeTypes.YEAR]: undefined,
}

class SecondsIn {

    private static readonly MILLISECOND = 1 / 1_000;
    private static readonly SECOND = 1;
    private static readonly MINUTE = 60;
    private static readonly HOUR = 60 * SecondsIn.MINUTE;
    private static readonly DAY = 24 * SecondsIn.HOUR;
    private static readonly WEEK = 7 * SecondsIn.DAY;
    private static readonly MONTH = 30 * SecondsIn.DAY;
    private static readonly YEAR = 365 * SecondsIn.DAY;

    public static readonly MAP: Record<TimeTypes, number> = {
        [TimeTypes.MILLISECOND]: SecondsIn.MILLISECOND,
        [TimeTypes.SECOND]: SecondsIn.SECOND,
        [TimeTypes.MINUTE]: SecondsIn.MINUTE,
        [TimeTypes.HOUR]: SecondsIn.HOUR,
        [TimeTypes.DAY]: SecondsIn.DAY,
        [TimeTypes.WEEK]: SecondsIn.WEEK,
        [TimeTypes.MONTH]: SecondsIn.MONTH,
        [TimeTypes.YEAR]: SecondsIn.YEAR,
    };

}

export class Seconds {

    private readonly value: number;

    /**
     * Creates a {@link Seconds} object from the number of seconds passed.
     * @param seconds amount of seconds
     */
    public constructor(seconds: number) {
        this.value = seconds;
    }

    /**
     * Create a {@link Seconds} object from the number of time units passed.
     * @param timeType {@link TimeTypes} unit of time
     * @param amount amount of time units
     * @see Seconds#milliseconds
     * @see Seconds#seconds
     * @see Seconds#minutes
     * @see Seconds#days
     * @see Seconds#weeks
     * @see Seconds#months
     * @see Seconds#years
     */
    public static from(timeType: TimeTypes, amount?: number) {
        return new Seconds(SecondsIn.MAP[timeType] * (amount || 1));
    }

    public static milliseconds(amount: number = 1) {
        return this.from(TimeTypes.MILLISECOND, amount);
    }

    public static seconds(amount: number = 1) {
        return new Seconds(amount);
    }

    public static minutes(amount: number = 1) {
        return this.from(TimeTypes.MINUTE, amount);
    }

    public static hours(amount: number = 1) {
        return this.from(TimeTypes.HOUR, amount);
    }

    public static days(amount: number = 1) {
        return this.from(TimeTypes.DAY, amount);
    }

    public static weeks(amount: number = 1) {
        return this.from(TimeTypes.WEEK, amount);
    }

    public static months(amount: number = 1) {
        return this.from(TimeTypes.MONTH, amount);
    }

    public static years(amount: number = 1) {
        return this.from(TimeTypes.YEAR, amount);
    }

    public milliseconds() {
        return this.to(TimeTypes.MILLISECOND);
    }

    public seconds() {
        return this.to(TimeTypes.SECOND);
    }

    public toSeconds() {
        return this.seconds();
    }

    public minutes() {
        return this.to(TimeTypes.MINUTE);
    }

    public hours() {
        return this.to(TimeTypes.HOUR);
    }

    public days() {
        return this.to(TimeTypes.DAY);
    }

    public weeks() {
        return this.to(TimeTypes.WEEK);
    }

    public months() {
        return this.to(TimeTypes.MONTH);
    }

    public years() {
        return this.to(TimeTypes.YEAR);
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     */
    public toDuration() {
        let sec = Math.abs(this.value);
        const elements: string[] = [];

        for (const type of TimeTypesOrdered) {
            const unitSeconds = SecondsIn.MAP[type];
            const element = Math.floor(sec / unitSeconds);
            if (!element) continue;
            sec %= unitSeconds;

            const elementName = aliases[type] || `${TimeTypes[type].toLowerCase()}${element === 1 ? "" : "s"}`;
            elements.push(`${element} ${elementName}`);
        }

        if (!elements.length) return "now";
        const duration = elements.join(", ");
        return this.value < 0 ? `in ${duration}` : `${duration} ago`;
    }

    /**
     * Get the amount of time stored in the {@link Seconds} object in the time unit passed.
     * @param timeType Time unit
     * @see Seconds#milliseconds
     * @see Seconds#seconds
     * @see Seconds#minutes
     * @see Seconds#days
     * @see Seconds#weeks
     * @see Seconds#months
     * @see Seconds#years
     */
    public to(timeType: TimeTypes) {
        return timeType === TimeTypes.SECOND ? this.value : this.value / SecondsIn.MAP[timeType];
    }

}
