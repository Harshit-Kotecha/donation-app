import img from '@assets/donation.jpg';

interface ImageTabProps {
  url: string;
}

export default function ImageTab({ url }: ImageTabProps) {
  console.log(url);
  return (
    <img
      className="inline aspect-square w-full	min-w-3.5 px-24"
      src={img}
      alt="Donation image"
    />
  );
}
