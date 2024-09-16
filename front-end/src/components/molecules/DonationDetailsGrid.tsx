import TitleSubtitle from '@components/atoms/TitleSubtitle';
import { Donation, DonationStatus } from '@interfaces/donation';

interface DonationDetailsGridProps {
  donation: Donation;
}

export default function DonationDetailsGrid({
  donation,
}: DonationDetailsGridProps) {
  let chipColor: string;
  switch (donation.status) {
    case DonationStatus.CLOSED:
      chipColor = 'red';
      break;
    case DonationStatus.PROCESSING:
      chipColor = 'purple';
      break;

    default:
      chipColor = 'green';
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="text-4xl">
          Posted by:{' '}
          <span className="font-bold">{donation.name.toUpperCase()}</span>
        </p>
        <p className={`px-5 py-1 bg-${chipColor}-700 rounded-full`}>
          {donation.status}
        </p>
      </div>
      <div className="flex flex-row justify-between	">
        <TitleSubtitle title="category" subtitle={donation.category} />
        <TitleSubtitle
          title="Expiry Time"
          subtitle={`${donation.expires_at} hours`}
        />
        <TitleSubtitle
          title="Phone number"
          subtitle={`${donation.phone_number}`}
        />
      </div>
      <TitleSubtitle title="Address" subtitle={`${donation.address}`} />
      <div className="flex flex-row justify-between	">
        <TitleSubtitle title="Pin Code" subtitle={`${donation.pin_code}`} />
        <TitleSubtitle title="region" subtitle={donation.region} />
        <TitleSubtitle title="District" subtitle={`${donation.district}`} />
        <TitleSubtitle title="State" subtitle={`${donation.state}`} />
      </div>
    </>
  );
}
