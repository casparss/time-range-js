import { set, isBefore, addDays, differenceInMinutes, addMinutes, areIntervalsOverlapping } from "date-fns";
import { DateRange, TimeRangeParameters, TimeArray } from "./types";

export class TimeRange {
    private startString: string;
    private endString: string;

    constructor({ start, end }: TimeRangeParameters) {
        this.startString = start;
        this.endString = end;
    }

    get start(): TimeArray {
        return this.timeToNumberArray(this.startString);
    }

    get end(): TimeArray {
        return this.timeToNumberArray(this.endString);
    }

    static timeToObject(time: TimeArray) {
        const [hours, minutes, seconds] = time;
        return {
            hours,
            minutes,
            seconds,
        };
    }

    private timeToNumberArray(timeString: string): TimeArray {
        return timeString.split(':').map(Number);
    }

    get isOverlappingMidnight(): boolean {
        const [startHour, startMinutes] = this.start;
        const [endHour, endMinutes] = this.end;
    
        if(endHour < startHour) {
            return true;
        }
    
        if(endHour === startHour && endMinutes < startMinutes) {
            return true;
        }
    
        return false;
    }

    isOverlap(timeRange: TimeRange) {
        return areIntervalsOverlapping(
            this.toDateRange(),
            timeRange.toDateRange()
        );
    }

    get inMinutes(): number {
        const { start, end } = this.asObject;
        const startDate = set(new Date(), start);
        let endDate = set(new Date(), end);
        if (isBefore(endDate, startDate)) {
            endDate = addDays(endDate, 1);
        }
        return differenceInMinutes(endDate, startDate);
    }

    get asObject() {
        return {
            start: TimeRange.timeToObject(this.start),
            end: TimeRange.timeToObject(this.end)
        }
    }

    toDateRange(baseDate: Date = new Date()): DateRange {
        const start = set(baseDate, this.asObject.start);
        const end = addMinutes(start, this.inMinutes);
    
        return {
            start,
            end,
        };
    }
}

export default TimeRange;