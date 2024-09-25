export default function DonationQuote({ title, subtitle }) {
  return (
    <div className="max-w-xl mx-auto p-0 pb-0 sm:pb-4 bg-background-dark shadow-lg rounded-lg text-center text-white">
      <div className="text-3xl md:text-4xl font-serif text-white italic mb-6">
        <p>"{title}"</p>
      </div>

      <div className="text-lg font-light text-gray-300">
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
