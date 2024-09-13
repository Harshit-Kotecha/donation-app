export interface ItemDetailsProp {
  title: string;
  subtitle: string;
}

export default function ItemDetails({ title, subtitle }: ItemDetailsProp) {
  return (
    <div className="flex flex-row p-4 sm:p-0 w-full sm:mt-5 justify-between border sm:border-0 rounded-md border-gray-500 mb-3 sm:mb-7">
      <p className="text-gray-400 flex-1 sm:text-xl">{title}:</p>
      <p className="font-bold flex-1 sm:text-xl break-words overflow-hidden sm:font-bold sm:tracking-wide">
        {subtitle}
      </p>
    </div>
  );
}
