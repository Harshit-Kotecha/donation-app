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

export function getExpiryTime(expiryDateTimeStr: string): string {
  const now = new Date();
  const expiryDate = new Date(expiryDateTimeStr);

  // Calculate the time difference in milliseconds
  const diff = expiryDate.getTime() - now.getTime();

  // If the time has already passed
  if (diff <= 0) {
    return 'Already expired!';
  }

  // Calculate days, hours, minutes
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `Expires in ${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Expires in ${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `Expires in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return 'Expires in less than a minute';
  }
}

export function formatDateTime(dateTimeStr: string): string {
  if (dateTimeStr == null) {
    return '';
  }

  const date = new Date(dateTimeStr);

  // Array of month names to map the month index
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Extract date components
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Get the hour and minute in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'

  // Format the result as "23 March 2024, 11:11 PM"
  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

export function convertToISOFormat(dateStr: string): string {
  const date = new Date(dateStr);

  // Extract timezone offset in hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const hoursOffset = Math.floor(timezoneOffset / 60);
  const minutesOffset = timezoneOffset % 60;
  const timezoneSign = hoursOffset >= 0 ? '+' : '-';

  // Pad hours and minutes to always have two digits
  const pad = (num: number) => num.toString().padStart(2, '0');
  const formattedTimezone = `${timezoneSign}${pad(Math.abs(hoursOffset))}:${pad(
    minutesOffset
  )}`;

  // Format the date to match the required ISO format
  const isoString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}.${date.getMilliseconds().toString().padStart(6, '0')}${formattedTimezone}`;

  return isoString;
}
