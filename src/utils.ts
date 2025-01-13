export const calculatePercentageDifference = (firstNumber: number, secondNumber: number): number => {
  const difference = secondNumber - firstNumber;
  return +((difference / firstNumber) * 100).toFixed(2);
};

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export function disabledDateFunction(current: Date) : boolean {
  const currentDate = new Date();
  return current && current > currentDate;
}

export function isToday(dateObject: any): boolean { //! any
  const today = new Date();
  return (
    dateObject.$y === today.getFullYear() &&
    dateObject.$M === today.getMonth() &&
    dateObject.$D === today.getDate()
  );
}

export function getRemainingHours(): Array<number> {
  const currentHour = new Date().getHours();
  const hoursInDay = 24;
  const remainingHours = [];

  for (let hour = currentHour + 1; hour < hoursInDay; hour++) {
    remainingHours.push(hour);
  }

  return remainingHours;
}

export function validateTime(h: number, m: number, s: number): boolean {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  if (
    currentHours < h ||
    (currentHours === h && currentMinutes < m) ||
    (currentHours === h &&
      currentMinutes === m &&
      currentSeconds < s)
  ) {
    console.log("Текущее время больше желаемого времени.");
    return false
  } else {
    console.log("Текущее время меньше или равно равно желаемому времени.");
    return true
  }
}

export function getRandomColors(n: number): Array<string> {
  const colors = [];
  const letters = '0123456789ABCDEF';
  for (let j = 0; j < n; j++) {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
  }
  return colors;
}
