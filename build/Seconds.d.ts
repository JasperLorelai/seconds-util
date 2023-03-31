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
    private readonly seconds;
    constructor(seconds: number);
    static from(timeType: TimeTypes, amount?: number): Seconds;
    toDuration(): string;
    to(timeType: TimeTypes): number;
    toSeconds(): number;
}
