import SearchAppBar from '@components/molecules/SearchAppBar';
import { useLocation } from 'react-router-dom';

export default function DonationDetails() {
  const { state } = useLocation();
  const { donation } = state;
  console.log(donation, '-------- ');
  return <SearchAppBar />;
}
