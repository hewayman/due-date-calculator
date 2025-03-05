import { calculateDueDate } from './dueDateCalculator';

describe('dueDateCalculator', () => {
  it('returns a Date object', () => {
    expect(calculateDueDate(new Date(), 1)).toBeInstanceOf(Date);
  });

  it('handles an invalid submit date', () => {
    expect(calculateDueDate(new Date('invalid date'), 1)).toBe(null);
    expect(calculateDueDate(undefined as unknown as Date, 10)).toBe(null);
  });

  it('handles a negative turnaround time', () => {
    expect(calculateDueDate(new Date(), -1)).toBe(null);
  });

  it('handles an invalid turnaround time', () => {
    expect(calculateDueDate(new Date(), 'string' as unknown as number)).toBe(
      null
    );
    expect(calculateDueDate(new Date(), undefined as unknown as number)).toBe(
      null
    );
  });

  describe('when the submit time is during working hours', () => {
    it('handles a turnaround time of 0', () => {
      const submitDate = new Date('2025-03-04T12:00:00');
      const turnaroundTime = 0;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T12:00:00')
      );
    });

    it('handles a turnaround time under 1 hour', () => {
      const submitDate = new Date('2025-03-04T12:00:00');
      const turnaroundTime = 0.5;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T12:30:00')
      );
    });

    it('calculates a due date within the same working day', () => {
      const submitDate = new Date('2025-03-04T09:32:04');
      const turnaroundTime = 6;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T15:32:04')
      );
    });

    it('calculates a due date for a turnaround time of exactly one workday', () => {
      const submitDate = new Date('2025-03-04T09:00:00');
      const turnaroundTime = 8;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T17:00:00')
      );
    });

    it('calculates a due date for multi-day turnaround', () => {
      const submitDate = new Date('2025-03-04T14:25:02');
      const turnaroundTime = 48;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-12T14:25:02')
      );
    });

    it('calculates a due date across a weekend', () => {
      const submitDate = new Date('2025-03-07T09:25:02');
      const turnaroundTime = 18;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-11T11:25:02')
      );
    });

    it('calculates a due date for a midnight submit date', () => {
      const submitDate = new Date('2025-03-04T00:00:00');
      const turnaroundTime = 8;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T17:00:00')
      );
    });

    it('calculates a due date into the next year', () => {
      const submitDate = new Date('2025-12-30T09:25:02');
      const turnaroundTime = 18;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2026-01-01T11:25:02')
      );
    });

    it('handles a leap year', () => {
      const submitDate = new Date('2024-02-28T09:25:02');
      const turnaroundTime = 18;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2024-03-01T11:25:02')
      );
    });

    it('handles submission on February 29th in a leap year', () => {
      const submitDate = new Date('2024-02-29T09:25:02');
      const turnaroundTime = 8;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2024-03-01T09:25:02')
      );
    });

    it('handles a non-leap year', () => {
      const submitDate = new Date('2025-02-28T09:25:02');
      const turnaroundTime = 18;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T11:25:02')
      );
    });
  });

  describe('when the submit time is during non-working hours', () => {
    it('adjusts a submit time before 9AM to 9AM of the same day', () => {
      const submitDate = new Date('2025-03-04T06:51:27');
      const turnaroundTime = 2;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-04T11:00:00')
      );
    });

    it('adjusts a submit time at 5PM to 9AM on the next business day', () => {
      const submitDate = new Date('2025-03-04T17:00:00');
      const turnaroundTime = 1;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-05T10:00:00')
      );
    });

    it('adjusts a submit date on Friday after 5PM to Monday at 9AM', () => {
      const submitDate = new Date('2025-03-07T22:36:47');
      const turnaroundTime = 2;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-10T11:00:00')
      );
    });

    it('adjusts a submit date on Saturday to Monday at 9AM', () => {
      const submitDate = new Date('2025-03-01T12:36:47');
      const turnaroundTime = 2;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-03T11:00:00')
      );
    });

    it('adjusts a submit date on Sunday to Monday at 9AM', () => {
      const submitDate = new Date('2025-03-02T12:36:47');
      const turnaroundTime = 2;
      expect(calculateDueDate(submitDate, turnaroundTime)).toEqual(
        new Date('2025-03-03T11:00:00')
      );
    });
  });
});
