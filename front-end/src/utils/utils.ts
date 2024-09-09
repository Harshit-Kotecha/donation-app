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
