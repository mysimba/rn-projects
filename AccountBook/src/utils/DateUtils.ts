export const covertToDateString = (time: number): string => {
  const date = new Date(time);

  const addZeroIfOneCharecter = (number: number, time?: boolean): string => {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  };

  if (time) {
    return `${date.getFullYear()}-${addZeroIfOneCharecter(
      date.getMonth() + 1,
    )}-${addZeroIfOneCharecter(date.getDate())}`;
  }

  return `${date.getFullYear()}-${addZeroIfOneCharecter(
    date.getMonth() + 1,
  )}-${addZeroIfOneCharecter(date.getDate())} ${addZeroIfOneCharecter(
    date.getHours(),
  )}: ${addZeroIfOneCharecter(date.getMinutes())}`;
};
