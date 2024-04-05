"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seconds = exports.TimeTypes = void 0;
var TimeTypes;
(function (TimeTypes) {
    TimeTypes[TimeTypes["MILLISECOND"] = 0] = "MILLISECOND";
    TimeTypes[TimeTypes["SECOND"] = 1] = "SECOND";
    TimeTypes[TimeTypes["MINUTE"] = 2] = "MINUTE";
    TimeTypes[TimeTypes["HOUR"] = 3] = "HOUR";
    TimeTypes[TimeTypes["DAY"] = 4] = "DAY";
    TimeTypes[TimeTypes["WEEK"] = 5] = "WEEK";
    TimeTypes[TimeTypes["MONTH"] = 6] = "MONTH";
    TimeTypes[TimeTypes["YEAR"] = 7] = "YEAR";
})(TimeTypes = exports.TimeTypes || (exports.TimeTypes = {}));
class SecondsIn {
    static getSecondsIn(type) {
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
SecondsIn.MILLISECOND = 1 / 1000;
SecondsIn.SECOND = 1;
SecondsIn.MINUTE = 60;
SecondsIn.HOUR = 60 * SecondsIn.MINUTE;
SecondsIn.DAY = 24 * SecondsIn.HOUR;
SecondsIn.WEEK = 7 * SecondsIn.DAY;
SecondsIn.MONTH = 30 * SecondsIn.DAY;
SecondsIn.YEAR = 365 * SecondsIn.DAY;
class Seconds {
    constructor(seconds) {
        this.value = seconds;
    }
    static from(timeType, amount) {
        return new Seconds(SecondsIn.getSecondsIn(timeType) * (amount || 1));
    }
    static milliseconds(amount = 1) {
        return this.from(TimeTypes.MILLISECOND, amount);
    }
    static seconds(amount = 1) {
        return new Seconds(amount);
    }
    static minutes(amount = 1) {
        return this.from(TimeTypes.MILLISECOND, amount);
    }
    static hours(amount = 1) {
        return this.from(TimeTypes.HOUR, amount);
    }
    static days(amount = 1) {
        return this.from(TimeTypes.DAY, amount);
    }
    static weeks(amount = 1) {
        return this.from(TimeTypes.WEEK, amount);
    }
    static months(amount = 1) {
        return this.from(TimeTypes.MONTH, amount);
    }
    static years(amount = 1) {
        return this.from(TimeTypes.YEAR, amount);
    }
    milliseconds() {
        return this.to(TimeTypes.MILLISECOND);
    }
    seconds() {
        return this.to(TimeTypes.SECOND);
    }
    minutes() {
        return this.to(TimeTypes.MILLISECOND);
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
        let tempSec = this.value;
        const elements = [];
        const lastTypeIndex = Object.keys(TimeTypes).length / 2 - 1;
        for (let i = lastTypeIndex; i >= 0; i--) {
            if (i < lastTypeIndex)
                tempSec %= Seconds.from(i + 1).toSeconds();
            const element = Math.floor(tempSec / Seconds.from(i).toSeconds());
            if (!element)
                continue;
            const elementName = `${TimeTypes[i].toLowerCase()}${element === 1 ? "" : "s"}`;
            elements.push(`${element} ${elementName}`);
        }
        return elements.join(", ");
    }
    to(timeType) {
        return timeType === TimeTypes.SECOND ? this.value : this.value / SecondsIn.getSecondsIn(timeType);
    }
    toSeconds() {
        return this.to(TimeTypes.SECOND);
    }
}
exports.Seconds = Seconds;
