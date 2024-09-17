interface IconWithTextProp {
  icon: string;
  text: string;
  className?: string;
}
export default function IconWithText({
  icon,
  text,
  className,
}: IconWithTextProp) {
  return (
    <div className={`flex text-gray-50 items-center ${className || ''}`}>
      <img
        className="w-3 sm:w-5 mr-2 sm:mr-3 text-red-50"
        color="red"
        src={icon}
      />
      <p className="text-[10px] text-light-grey sm:text-[14px] xl:text-[16px]">
        {text}
      </p>
    </div>
  );
}
