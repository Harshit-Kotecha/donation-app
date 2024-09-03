interface ButtonProp {
  title: string;
  onClick: () => void;
  styles?: string;
}

export default function Button({ title, onClick, styles }: ButtonProp) {
  return (
    <div
      className={`px-7 py-3 rounded-full text-center bg-green-700 hover:bg-green-600 hover:cursor-pointer	 ${
        styles || ''
      }`}
      onClick={onClick}
    >
      <p className="font-bold tracking-wider">{title.toUpperCase()}</p>
    </div>
  );
}
