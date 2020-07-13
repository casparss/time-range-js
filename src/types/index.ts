export interface TimeRange {
    start: string;
    end: string;
}

export interface DateRange {
    start: Date;
    end: Date;
}

export interface DateYearMonth {
    date: number;
    year: number;
    month: number;
}

export interface TimeRangeParameters {
    start: string;
    end: string;
}

export type TimeArray = number[];