import { calculateDueDate } from './dueDateCalculator';

const testCases = [
  { submitDate: new Date('2025-03-04T16:36:24'), turnaroundTime: 3 },
  { submitDate: new Date('2025-03-04T16:36:32'), turnaroundTime: 48 },
  { submitDate: new Date('2025-03-01T16:36:04'), turnaroundTime: 8 },
  { submitDate: new Date('2025-03-04T16:36:00'), turnaroundTime: 0 },
  { submitDate: new Date('2025-03-04T16:36:21'), turnaroundTime: -3 },
];

testCases.forEach(({ submitDate, turnaroundTime }) => {
  const dueDate = calculateDueDate(submitDate, turnaroundTime);
  if (!dueDate) {
    console.log('Invalid input');
  } else {
    console.log(
      `The due date is: ${dueDate}. The hours to complete the task are: ${turnaroundTime}`
    );
  }
});
