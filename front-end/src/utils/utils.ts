import { DonationStatus } from '@interfaces/donation';

export const getStatusColor = (status: DonationStatus): string => {
  switch (status) {
    case DonationStatus.CLOSED:
      return 'bg-red-700';
    case DonationStatus.PROCESSING:
      return 'bg-purple-700';
    case DonationStatus.OPEN:
      return 'bg-green-700';

    default:
      return 'bg-blue-700';
  }
};

export const debounce = (callback, wait: number) => {
  let timeoutId: NodeJS.Timeout;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log('inside debounce.......');
      callback();
    }, wait);
  };
};

export function getExpiryTimeDifference(time: string) {
  // Parse the input time string as UTC and convert to a Date object
  const inputDateUTC = new Date(time + ' UTC');

  // Get the current date in Asia/Kolkata time zone
  const currentDate = new Date();

  // Convert the input UTC date to Asia/Kolkata time zone
  const inputDateIST = new Date(
    inputDateUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Number(currentDate) - Number(inputDateIST);

  // Convert the difference to various units
  const seconds = Math.floor((differenceInMilliseconds / 1000) % 60);
  const minutes = Math.floor((differenceInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((differenceInMilliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (days < 0 || hours < 0 || minutes < 0 || seconds < 0) {
    return 'Already expired!';
  }

  if (days > 0) {
    return `Expires in ${days} ${days === 1 ? 'day' : 'days'}`;
  } else if (hours > 0) {
    return `Expires in ${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  } else if (minutes > 0) {
    return `Expires in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else {
    return `Expires in ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }
}
