import { useState } from 'react';

export function useDateRange() {
  // Set initial start date to a year ago as a reasonable default
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  return {
    startDate,
    endDate,
    handleDateChange
  };
}