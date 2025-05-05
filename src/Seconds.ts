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

    static getSecondsIn(type: TimeTypes) {
        switch (type) {
            case TimeTypes.MILLISECOND: return SecondsIn.MILLISECOND;
            case TimeTypes.SECOND: return SecondsIn.SECOND;
            case TimeTypes.MINUTE: return SecondsIn.MINUTE;
            case TimeTypes.HOUR: return SecondsIn.HOUR;
            case TimeTypes.DAY: return SecondsIn.DAY;
            case TimeTypes.WEEK: return SecondsIn.WEEK;
            case TimeTypes.MONTH: return SecondsIn.MONTH;
            case TimeTypes.YEAR: return SecondsIn.YEAR;
        }
    }

}

export class Seconds {

    private readonly value: number;

    constructor(seconds: number) {
        this.value = seconds;
    }

    static from(timeType: TimeTypes, amount?: number) {
        return new Seconds(SecondsIn.getSecondsIn(timeType) * (amount || 1));
    }

    static milliseconds(amount: number = 1) {
        return this.from(TimeTypes.MILLISECOND, amount);
    }

    static seconds(amount: number = 1) {
        return new Seconds(amount);
    }

    static minutes(amount: number = 1) {
        return this.from(TimeTypes.MINUTE, amount);
    }

    static hours(amount: number = 1) {
        return this.from(TimeTypes.HOUR, amount);
    }

    static days(amount: number = 1) {
        return this.from(TimeTypes.DAY, amount);
    }

    static weeks(amount: number = 1) {
        return this.from(TimeTypes.WEEK, amount);
    }

    static months(amount: number = 1) {
        return this.from(TimeTypes.MONTH, amount);
    }

    static years(amount: number = 1) {
        return this.from(TimeTypes.YEAR, amount);
    }

    milliseconds() {
        return this.to(TimeTypes.MILLISECOND);
    }

    seconds() {
        return this.to(TimeTypes.SECOND);
    }

    minutes() {
        return this.to(TimeTypes.MINUTE);
    }

    hours() {
        return this.to(TimeTypes.HOUR);
    }

    days() {
        return this.to(TimeTypes.DAY);
    }

    weeks() {
        return this.to(TimeTypes.WEEK);
    }

    months() {
        return this.to(TimeTypes.MONTH);
    }

    years() {
        return this.to(TimeTypes.YEAR);
    }

    toDuration() {
        let sec = Math.abs(this.value);
        const elements: string[] = [];

        for (const type of TimeTypesOrdered) {
            const unitSeconds = SecondsIn.getSecondsIn(type);
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

    to(timeType: TimeTypes) {
        return timeType === TimeTypes.SECOND ? this.value : this.value / SecondsIn.getSecondsIn(timeType);
    }

    toSeconds() {
        return this.to(TimeTypes.SECOND);
    }

}
