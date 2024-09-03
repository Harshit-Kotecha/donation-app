export interface TitleSubtitleProps {
  title: string;
  subtitle: string;
}

export default function TitleSubtitle({ title, subtitle }: TitleSubtitleProps) {
  return (
    <div className="flex flex-col text-xl mt-11 break-all">
      <p className="text-slate-500 mb-3">{title.toUpperCase()}</p>
      <p className="font-bold">{subtitle}</p>
    </div>
  );
}
