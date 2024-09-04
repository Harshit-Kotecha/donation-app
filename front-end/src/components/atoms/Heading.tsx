interface HeadingProps {
  title: string;
  styles?: string;
}

export default function Heading({ title, styles }: HeadingProps) {
  return <h1 className={`text-3xl font-medium ${styles || ''}`}>{title}</h1>;
}
