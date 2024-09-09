import { Link } from 'react-router-dom';

interface TitleLinkProps {
  title: string;
  link: string;
}

export default function TitleLink({ title, link }: TitleLinkProps) {
  return (
    <Link
      to={link}
      className="mr-6 text-white hover:text-green-500 font-bold tracking-wider"
    >
      {title.toUpperCase()}
    </Link>
  );
}
