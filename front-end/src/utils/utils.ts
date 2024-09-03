import { DonationStatus } from '@interfaces/donation';

export const getStatusColor = (status: DonationStatus ): string => {
  switch (status) {
    case DonationStatus.CLOSED:
      return 'red';
    case DonationStatus.PROCESSING:
      return 'purple';
    case DonationStatus.OPEN:
      return 'green';

    default:
      return 'blue';
  }
};
