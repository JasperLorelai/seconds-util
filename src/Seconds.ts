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

export default Seconds;
export class Seconds {

    /**
     * Creates a {@link Seconds} object from the number of seconds passed.
     * @param value amount of seconds
     */
    public constructor(
        private readonly value: number
    ) {}

    private static secFrom(timeType: TimeTypes, amount?: number) {
        return SecondsIn.MAP[timeType] * (amount || 1);
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
        return new Seconds(this.secFrom(timeType, amount));
    }

    /**
     * Create a {@link SecondsRelative} object from the amount of time passed between now and the passed date (or time until the passed date).
     * @param date date until/since
     */
    public static delta(date: Date) {
        return this.between(new Date(), date);
    }

    /**
     * Create a {@link SecondsRelative} object from the time between the two passed dates.
     * @param dateA first date
     * @param dateB second date
     */
    public static between(dateA: Date, dateB: Date) {
        const diff = dateA.getTime() - dateB.getTime();
        return new SecondsRelative(this.secFrom(TimeTypes.MILLISECOND, diff));
    }

    public static milliseconds(amount: number = 1) {
        return this.from(TimeTypes.MILLISECOND, amount);
    }

    /**
     * @see Seconds#milliseconds
     */
    public static ms(amount: number = 1) {
        return this.milliseconds(amount);
    }

    public static seconds(amount: number = 1) {
        return new Seconds(amount);
    }

    /**
     * @see Seconds#seconds
     */
    public static s(amount: number = 1) {
        return this.seconds(amount);
    }

    public static minutes(amount: number = 1) {
        return this.from(TimeTypes.MINUTE, amount);
    }

    /**
     * @see Seconds#minutes
     */
    public static min(amount: number = 1) {
        return this.minutes(amount);
    }

    public static hours(amount: number = 1) {
        return this.from(TimeTypes.HOUR, amount);
    }

    /**
     * @see Seconds#hours
     */
    public static h(amount: number = 1) {
        return this.hours(amount);
    }

    public static days(amount: number = 1) {
        return this.from(TimeTypes.DAY, amount);
    }

    /**
     * @see Seconds#days
     */
    public static d(amount: number = 1) {
        return this.days(amount);
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

    /**
     * @see Seconds#years
     */
    public static y(amount: number = 1) {
        return this.years(amount);
    }

    public milliseconds() {
        return this.to(TimeTypes.MILLISECOND);
    }

    /**
     * @see Seconds#milliseconds
     */
    public ms() {
        return this.milliseconds();
    }

    public seconds() {
        return this.to(TimeTypes.SECOND);
    }

    public toSeconds() {
        return this.seconds();
    }

    /**
     * @see Seconds#seconds
     */
    public s() {
        return this.seconds();
    }

    public minutes() {
        return this.to(TimeTypes.MINUTE);
    }

    /**
     * @see Seconds#minutes
     */
    public min() {
        return this.minutes();
    }

    public hours() {
        return this.to(TimeTypes.HOUR);
    }

    /**
     * @see Seconds#hours
     */
    public h() {
        return this.hours();
    }

    public days() {
        return this.to(TimeTypes.DAY);
    }

    /**
     * @see Seconds#days
     */
    public d() {
        return this.days();
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
     * @see Seconds#years
     */
    public y() {
        return this.years();
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * @param disallowedUnits used for rounding
     */
    public toDuration(disallowedUnits?: TimeTypes[]) {
        return this.duration().full(disallowedUnits);
    }

    /**
     * Creates a {@link Duration} object from the {@link Seconds} object.
     */
    public duration() {
        return new Duration(this);
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

class SecondsRelative extends Seconds {

    /**
     * Creates a duration string from the {@link SecondsRelative} object (e.g. "3 h, 4 min, 5 s ago").
     * @param disallowedUnits used for rounding
     * @param capitalised "In x days" (default) or "in x days"
     */
    public toDuration(disallowedUnits?: TimeTypes[], capitalised: boolean = true) {
        return this.duration(capitalised).full(disallowedUnits);
    }

    /**
     * Creates a {@link DurationRelative} object from the {@link SecondsRelative} object.
     * @param capitalised "In x days" (default) or "in x days"
     */
    public duration(capitalised: boolean = true): DurationRelative {
        return new DurationRelative(this, capitalised);
    }

}

class Duration {

    public constructor(
        protected readonly value: Seconds
    ) {}

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * @param disallowedUnits used for rounding
     * @see Seconds#toDuration
     */
    public full(disallowedUnits?: TimeTypes[]) {
        let sec = Math.abs(this.value.seconds());
        if (sec === 0) return "0 s";

        const units: TimeTypes[] = [];
        for (const type of TimeTypesOrdered) {
            if (disallowedUnits?.includes(type)) continue;
            units.push(type);
        }

        const elements: string[] = [];
        for (let i = 0; i < units.length; i++) {
            const type = units[i];
            const unitSeconds = SecondsIn.MAP[type];

            const div = sec / unitSeconds;
            const value = i === units.length - 1 ? div : Math.floor(div);
            if (value <= 0) continue;
            sec %= unitSeconds;

            const unit = aliases[type] || `${TimeTypes[type].toLowerCase()}${value === 1 ? "" : "s"}`;
            const x = Math.round(value * 100) / 100;
            elements.push(`${x % 1 ? x.toFixed(2) : x} ${unit}`);
        }

        return elements.join(", ");
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "seconds".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public seconds() {
        return this.full([TimeTypes.MILLISECOND]);
    }

    /**
     * @see Duration#seconds
     */
    public s() {
        return this.seconds();
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "minutes".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public minutes() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
        ]);
    }

    /**
     * @see Duration#minutes
     */
    public min() {
        return this.minutes();
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "hours".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public hours() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
            TimeTypes.MINUTE,
        ]);
    }

    /**
     * @see Duration#hours
     */
    public h() {
        return this.hours();
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "days".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public days() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
            TimeTypes.MINUTE,
            TimeTypes.HOUR,
        ]);
    }

    /**
     * @see Duration#days
     */
    public d() {
        return this.days();
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "weeks".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public weeks() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
            TimeTypes.MINUTE,
            TimeTypes.HOUR,
            TimeTypes.DAY,
        ]);
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "months".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public months() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
            TimeTypes.MINUTE,
            TimeTypes.HOUR,
            TimeTypes.DAY,
            TimeTypes.WEEK,
        ]);
    }

    /**
     * Creates a duration string from the {@link Seconds} object (e.g. "3 h, 4 min, 5 s ago").
     * This method stops at "years".
     * @see Duration#full
     * @see Seconds#toDuration
     */
    public years() {
        return this.full([
            TimeTypes.MILLISECOND,
            TimeTypes.SECOND,
            TimeTypes.MINUTE,
            TimeTypes.HOUR,
            TimeTypes.DAY,
            TimeTypes.WEEK,
            TimeTypes.MONTH,
        ]);
    }

    /**
     * @see Duration#years
     */
    public y() {
        return this.years();
    }

}

class DurationRelative extends Duration {

    public constructor(
        value: Seconds,
        private readonly capitalised: boolean = true,
    ) {
        super(value);
    }

    public full(disallowedUnits?: TimeTypes[]) {
        const sec = this.value.seconds();
        if (sec === 0) return (this.capitalised ? "N" : "n") + "ow";

        const duration = super.full(disallowedUnits);
        return sec < 0 ? `${this.capitalised ? "I" : "i"}n ${duration}` : `${duration} ago`;
    }

}
