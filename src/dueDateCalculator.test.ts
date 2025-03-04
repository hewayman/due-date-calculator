import { dueDateCalculator } from './dueDateCalculator';

describe('dueDateCalculator', () => {
  it('returns a Date object', () => {
    expect(dueDateCalculator(new Date(), 1)).toBeInstanceOf(Date);
  });
});
