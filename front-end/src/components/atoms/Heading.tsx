interface HeadingProps {
  title: string;
  className?: string;
}

export default function Heading({ title, className: styles }: HeadingProps) {
  return (
    <h1 className={`text-xl sm:text-3xl font-medium ${styles || ''}`}>
      {title}
    </h1>
  );
}
