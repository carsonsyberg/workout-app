"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayOfWeek = exports.Rep = exports.Set = exports.Day = void 0;
var Day = /** @class */ (function () {
    function Day() {
        this.workoutId = "";
        this.name = "";
        this.order = undefined;
        this.dayOfWeek = "";
        this.sets = [];
    }
    return Day;
}());
exports.Day = Day;
var Set = /** @class */ (function () {
    function Set() {
        this.name = undefined;
        this.order = undefined;
        this.reps = [];
    }
    return Set;
}());
exports.Set = Set;
var Rep = /** @class */ (function () {
    function Rep() {
        this.numReps = undefined;
        this.weight = undefined;
    }
    return Rep;
}());
exports.Rep = Rep;
var DayOfWeek = /** @class */ (function () {
    function DayOfWeek(d, v) {
        this.dayName = d;
        this.dayValue = v;
    }
    return DayOfWeek;
}());
exports.DayOfWeek = DayOfWeek;
//# sourceMappingURL=day.js.map