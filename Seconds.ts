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
        return 0;
    }

}

export class Seconds {

    private readonly seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
    }

    static from(timeType: TimeTypes, amount?: number) {
        return new Seconds(SecondsIn.getSecondsIn(timeType) * (amount || 1));
    }

    toDuration() {
        let tempSec = this.seconds;
        const elements: string[] = [];
        const lastTypeIndex = Object.keys(TimeTypes).length / 2 - 1;
        for (let i = lastTypeIndex; i >= 0; i--) {
            if (i < lastTypeIndex) tempSec %= Seconds.from(i + 1).toSeconds();
            const element = Math.floor(tempSec / Seconds.from(i).toSeconds());
            if (!element) continue;
            const elementName = `${TimeTypes[i].toLowerCase()}${element === 1 ? "" : "s"}`;
            elements.push(`${element} ${elementName}`);
        }
        return elements.join(", ");
    }

    to(timeType: TimeTypes) {
        return this.seconds / SecondsIn.getSecondsIn(timeType);
    }

    toSeconds() {
        return this.to(TimeTypes.SECOND);
    }

}
