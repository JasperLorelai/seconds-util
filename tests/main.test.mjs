import * as assert from "node:assert";
import {describe, test} from "node:test";

import {Seconds} from "../dist/Seconds.js";

describe("Conversion", () => {

    test("Years to ms", () => {
        assert.equal(Seconds.y().ms(), 31536000000);
    });

    test("Ms to days", () => {
        assert.equal(Seconds.ms(86400000).days(), 1);
    });

});

describe("Durations", () => {


    describe("Relative", () => {

        test("Minutes", () => {
            const date = new Date();
            date.setTime(date.getTime() + Seconds.d(5).ms() - 1);
            const duration = Seconds.delta(date).duration().min();

            assert.equal(duration, "In 4 days, 23 h, 60 min");
        });

        test('Days', () => {
            const date = new Date();
            date.setDate(date.getDate() + 5);
            const duration = Seconds.delta(date).duration().days();

            assert.equal(duration, "In 5 days");
        });

        test('Days lowercased', () => {
            const date = new Date();
            date.setDate(date.getDate() + 5);
            const duration = Seconds.delta(date).duration(false).days();

            assert.equal(duration, "in 5 days");
        });

        test("Date 'ago'", () => {
            const date = new Date();
            date.setDate(date.getDate() - 5);
            const duration = Seconds.delta(date).duration().days();

            assert.equal(duration, "5 days ago");
        });

    });

    describe("Non relative", () => {

        test('Days', () => {
            const duration = Seconds.days(5).duration().days();

            assert.equal(duration, "5 days");
        });

        test("0 s", () => {
            assert.equal(Seconds.s(0).toDuration(), "0 s");
        });

    });

});
