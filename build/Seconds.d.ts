export declare enum TimeTypes {
    MILLISECOND = 0,
    SECOND = 1,
    MINUTE = 2,
    HOUR = 3,
    DAY = 4,
    WEEK = 5,
    MONTH = 6,
    YEAR = 7
}
export declare class Seconds {
    private readonly value;
    constructor(seconds: number);
    static from(timeType: TimeTypes, amount?: number): Seconds;
    static milliseconds(amount?: number): Seconds;
    static seconds(amount?: number): Seconds;
    static minutes(amount?: number): Seconds;
    static hours(amount?: number): Seconds;
    static days(amount?: number): Seconds;
    static weeks(amount?: number): Seconds;
    static months(amount?: number): Seconds;
    static years(amount?: number): Seconds;
    milliseconds(): number;
    seconds(): number;
    minutes(): number;
    hours(): number;
    days(): number;
    weeks(): number;
    months(): number;
    years(): number;
    toDuration(): string;
    to(timeType: TimeTypes): number;
    toSeconds(): number;
}
