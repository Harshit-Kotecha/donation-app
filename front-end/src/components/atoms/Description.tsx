interface DescriptionProps {
  text: string;
  className?: string;
}

export default function Description({ text, className }: DescriptionProps) {
  return (
    <p
      className={`sm:text-xl text-justify font-semibold text-gray-300 break-words overflow-hidden ${
        className || ''
      }`}
    >
      {text.split('\n').map((line, index) => (
        <span key={index}>
          {line} <br /> <br />
        </span>
      ))}
    </p>
  );
}
