import DonationCard from '@components/atoms/DonationCard';
import { Donation } from '@interfaces/donation';

interface DonationsViewProp {
  donations: Donation[];
  className?: string;
}

export default function DonationsView({
  donations,
  className,
}: DonationsViewProp) {
  return (
    <div
      className={`flex flex-wrap justify-center px-2 bg-background-dark py-5 sm:py-0 ${
        className || ''
      }`}
    >
      {donations.map((el, i) => (
        <DonationCard donation={el} key={i} />
      ))}
    </div>
  );
}
