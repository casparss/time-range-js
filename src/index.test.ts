import TimeRange from './';

describe('Time range object', () => {
    describe('toDateRange()', () => {
        it('should be 15:00 and 18:00 date objects.', () => {
            const baseDate = new Date(
                'Mon Jul 06 2020 18:00:00'
            );

            const timeRange = new TimeRange({
                start: '15:00',
                end: '18:00',
            });

            const { start, end } = timeRange.toDateRange(baseDate);
            expect(start.getTime()).toBe(
                new Date('Mon Jul 06 2020 15:00:00').getTime()
            );
            expect(end.getTime()).toBe(
                new Date('Mon Jul 06 2020 18:00:00').getTime()
            );
        });
    });

    describe('getMinutesFromTimeRange()', () => {
        it('should return 30.', () => {
            const timeRange = new TimeRange({
                start: '00:00',
                end: '00:30',
            });

            expect(timeRange.inMinutes).toBe(30);
        });

        it('should return 540.', () => {
            const timeRange = new TimeRange({
                start: '03:00',
                end: '12:00',
            });

            expect(timeRange.inMinutes).toBe(540);
        });

        it('should return 150.', () => {
            const timeRange = new TimeRange({
                start: '23:00',
                end: '00:30',
            });

            expect(timeRange.inMinutes).toBe(90);
        });
    });

    describe('mapTimeToObject()', () => {
        it('maps time to object correctly.', () => {
            const time = [4, 34, 23];
            const { hours, minutes, seconds } = TimeRange.timeToObject(time);
            expect(hours).toBe(4);
            expect(minutes).toBe(34);
            expect(seconds).toBe(23);
        });
    });

    describe('doesTimeRangeSpanMidnight()', () => {
        it('should be true with supplied hours.', () => {
            const timeRange = new TimeRange({
                start: '12:00',
                end: '00:00'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeTruthy();
        });

        it('should be true with supplied hours and minutes.', () => {
            const timeRange = new TimeRange({
                start: '15:46',
                end: '02:20'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeTruthy();
        });

        it('should be true even when hours are the same.', () => {
            const timeRange = new TimeRange({
                start: '12:30',
                end: '12:00'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeTruthy();
        });

        it('should be false with supplied hours.', () => {
            const timeRange = new TimeRange({
                start: '10:00',
                end: '12:00'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeFalsy();
        });

        it('should be false with supplied hours and minutes.', () => {
            const timeRange = new TimeRange({
                start: '10:30',
                end: '12:46'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeFalsy();
        });

        it('should be false when hours are the same.', () => {
            const timeRange = new TimeRange({
                start: '18:30',
                end: '18:46'
            });
            
            expect(timeRange.isOverlappingMidnight).toBeFalsy();
        });
    });

    describe('doTimeRangesOverlap()', () => {
        it('should be true as time ranges do overlap.', () => {
            const timeRange = new TimeRange({
                start: '18:30',
                end: '20:00'
            });

            const timeRangeB = new TimeRange({
                start: '19:00',
                end: '22:00'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeTruthy();
        });

        it('should be true as time ranges do overlap.', () => {
            const timeRange = new TimeRange({
                start: '00:30',
                end: '09:00'
            });

            const timeRangeB = new TimeRange({
                start: '06:00',
                end: '01:30'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeTruthy();
        });

        it('should be true as time ranges do not overlap.', () => {
            const timeRange = new TimeRange({
                start: '00:30',
                end: '09:00'
            });

            const timeRangeB = new TimeRange({
                start: '00:00',
                end: '10:30'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeTruthy();
        });

        it('should be false as time ranges do not overlap.', () => {
            const timeRange = new TimeRange({
                start: '18:30',
                end: '20:00'
            });

            const timeRangeB = new TimeRange({
                start: '15:00',
                end: '17:00'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeFalsy();
        });

        it('should be false as time ranges do not overlap.', () => {
            const timeRange = new TimeRange({
                start: '00:30',
                end: '14:00'
            });

            const timeRangeB = new TimeRange({
                start: '15:00',
                end: '00:00'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeFalsy();
        });

        it('should be false as time ranges do not overlap.', () => {
            const timeRange = new TimeRange({
                start: '21:30',
                end: '00:00'
            });

            const timeRangeB = new TimeRange({
                start: '00:00',
                end: '21:00'
            });

            expect(timeRange.isOverlap(timeRangeB)).toBeFalsy();
        });
    });    
});
