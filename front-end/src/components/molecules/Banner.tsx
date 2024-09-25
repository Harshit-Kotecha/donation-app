export default function Banner({ src, title, subtitle, className = '' }) {
  return (
    <div className="flex flex-col lg:flex-row bg-background-dark items-center">
      <img src={src} className={`lg:w-[40%] xl:w-6/12 ${className}`} />
      <div className="mt-3 mx-4 lg:ml-11 justify-evenly">
        <p className="flex-1 text-center italic text-2xl font-bold text-white sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mb-2 sm:mb-5 xl:mb-9">
          {title}
        </p>
        <p className="flex-1 italic text-center text-xl sm:text-2xl 2xl:text-4xl font-medium text-gray-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
