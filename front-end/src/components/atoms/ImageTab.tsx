import img from '@assets/donation.jpg';

interface ImageTabProps {
  url: string;
}

export default function ImageTab({ url }: ImageTabProps) {
  console.log(url);
  return <img src={img} alt="Donation image" />;
}
