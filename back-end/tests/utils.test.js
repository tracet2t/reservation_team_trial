const { formatDate, isDueDatePassed, calculateRemainingTime } = require('../utils/tools');

describe('formatDate', () => {
    it('should format the date as YYYY-MM-DD', () => {
      const inputDate = '2024-08-15T12:00:00Z'; 
      const expectedOutput = '2024-08-15';
      expect(formatDate(inputDate)).toBe(expectedOutput);
    });

    it('should handle invalid date strings', () => {
      const inputDate = 'invalid-date';
      const expectedOutput = 'NaN-NaN-NaN'; 
      expect(formatDate(inputDate)).toBe(expectedOutput);
    });
  });

describe('isDueDatePassed', () => {
    it('should return true if the due date has passed', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);       // Yesterday
        expect(isDueDatePassed(pastDate.toISOString())).toBe(true);
    });

    it('should return false if the due date is in the future', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);   // Tomorrow
        expect(isDueDatePassed(futureDate.toISOString())).toBe(false);
    });

    it('should return false if the due date is today', () => {
        const today = new Date().toISOString();
        expect(isDueDatePassed(today)).toBe(false);
    });
});

describe('calculateRemainingTime', () => {
    it('should return "Due Date Passed" if the due date is in the past', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);       // Yesterday
        expect(calculateRemainingTime(pastDate.toISOString())).toBe('Due Date Passed');
    });

    it('should calculate the correct remaining time', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 1);   // Tomorrow
        futureDate.setHours(futureDate.getHours() + 5); // 5 hours into tomorrow
        const expectedOutput = '1 days 5 hours remaining';
        expect(calculateRemainingTime(futureDate.toISOString())).toBe(expectedOutput);
    });
});