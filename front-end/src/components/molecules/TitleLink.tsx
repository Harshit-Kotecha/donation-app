import { Link } from 'react-router-dom';

export interface TitleLinkProps {
  title: string;
  link: string;
}

export default function TitleLink({ title, link }: TitleLinkProps) {
  return (
    <Link
      to={link}
      className="mr-3 sm:mr-6 text-white hover:text-green-500 font-bold tracking-wider"
    >
      {title}
    </Link>
  );
}
