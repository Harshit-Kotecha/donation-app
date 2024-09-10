interface DescriptionProps {
  text: string;
  className?: string;
}

export default function Description({ text, className }: DescriptionProps) {
  return (
    <p className={`text-xl font-semibold text-gray-300 ${className || ''}`}>
      {text.split('\n').map((line, index) => (
        <span key={index}>
          {line} <br /> <br />
        </span>
      ))}
    </p>
  );
}
