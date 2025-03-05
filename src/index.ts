import { calculateDueDate } from './dueDateCalculator';

const submitDate = new Date('2025-03-04T16:36:24');
const turnaroundTime = 3;
const dueDate = calculateDueDate(submitDate, turnaroundTime);
console.log(
  `The due date is: ${dueDate}. The hours to complete the task are: ${turnaroundTime}`
);

const submitDate2 = new Date('2025-03-04T16:36:32');
const turnaroundTime2 = 48;
const dueDate2 = calculateDueDate(submitDate2, turnaroundTime2);
console.log(
  `The due date is: ${dueDate2}. The hours to complete the task are: ${turnaroundTime2}`
);

const submitDate3 = new Date('2025-03-01T16:36:04');
const turnaroundTime3 = 8;
const dueDate3 = calculateDueDate(submitDate3, turnaroundTime3);
console.log(
  `The due date is: ${dueDate3}. The hours to complete the task are: ${turnaroundTime3}`
);

const submitDate4 = new Date('2025-03-04T16:36:00');
const turnaroundTime4 = 0;
const dueDate4 = calculateDueDate(submitDate4, turnaroundTime4);
console.log(
  `The due date is: ${dueDate4}. The hours to complete the task are: ${turnaroundTime4}`
);

const submitDate5 = new Date('2025-03-04T16:36:21');
const turnaroundTime5 = -3;
const dueDate5 = calculateDueDate(submitDate5, turnaroundTime5);
console.log(
  `The due date is: ${dueDate5}. The hours to complete the task are: ${turnaroundTime5}`
);
