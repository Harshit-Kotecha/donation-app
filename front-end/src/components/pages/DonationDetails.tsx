import Button from '@components/atoms/Button';
import ImageTab from '@components/atoms/ImageTab';
import DonationDetailsGrid from '@components/molecules/DonationDetailsGrid';
import SearchAppBar from '@components/molecules/SearchAppBar';
import { Donation, DonationStatus } from '@interfaces/donation';
import { RootState } from '@redux/store';
import { getStatusColor } from '@utils/utils';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

interface DonationProp {
  donation: Donation;
}

interface BtnAttributes {
  title: string;
  styles: string;
  onClick: () => void;
}

const getBtnAttributes = (status?: string) => {
  const btnAttributes: BtnAttributes = {
    title: 'Receive Donation',
    styles: '',
    onClick: () => alert(status),
  };

  switch (status) {
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

  return btnAttributes;
};

export default function DonationDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const donations = useSelector((state: RootState) => state.donation.value);
  console.log(donations, '+++++++++++++==');
  let donation: Donation;

  if (state) {
    const { donation: tmp }: DonationProp = state;
    donation = tmp;
  } else if (id) {
    donation = donations?.find((el) => el.id === parseInt(id));
  }

  console.log(state, id);
  console.log(donation, '--donation');

  const btnAttributes = getBtnAttributes(donation?.status);

  if (!donation) {
    return <h1>Invalid request</h1>;
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
            styles={`fixed	bottom-5 right-11 w-6/12 ${getStatusColor(
              donation?.status
            )}	${btnAttributes.styles}`}
          />
        </div>
      </div>
    </>
  );
}
