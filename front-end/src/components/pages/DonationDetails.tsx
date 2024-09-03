import Button from '@components/atoms/Button';
import ImageTab from '@components/atoms/ImageTab';
import DonationDetailsGrid from '@components/molecules/DonationDetailsGrid';
import SearchAppBar from '@components/molecules/SearchAppBar';
import { Donation, DonationStatus } from '@interfaces/donation';
import { RootState } from '@redux/store';
import { getStatusColor } from '@utils/utils';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

interface DonationProp {
  donation: Donation;
}

interface BtnAttributes {
  title: string;
  styles: string;
  onClick: () => void;
}

export default function DonationDetails() {
  const { state } = useLocation();
  const { donation }: DonationProp = state;

  const donations = useSelector((state: RootState) => state.donation);

  const btnAttributes: BtnAttributes = {
    title: 'Receive Donation',
    styles: '',
    onClick: () => alert(donation.status),
  };

  switch (donation.status) {
    case DonationStatus.CLOSED: {
      btnAttributes.title = 'This donation is closed now.';
      btnAttributes.styles = 'hover:cursor-auto';
      break;
    }
    case DonationStatus.PROCESSING: {
      btnAttributes.title = 'This donation is in processing phase';
      btnAttributes.styles = 'hover:cursor-auto';
      break;
    }
  }

  return (
    <>
      <SearchAppBar />
      <div className="flex max-w-full	py-24 pr-11">
        <div className="flex-1">
          <ImageTab url="" />
        </div>
        <div className="flex-1">
          <DonationDetailsGrid donation={donation} />
          <Button
            title={btnAttributes.title}
            onClick={btnAttributes.onClick}
            styles={`fixed	bottom-5 right-11 w-6/12 bg-${getStatusColor(
              donation.status
            )}-700	${btnAttributes.styles}`}
          />
        </div>
      </div>
    </>
  );
}
