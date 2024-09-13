export default function PageContainer({ children }) {
  return (
    <div className="px-4 py-5 bg-background-dark sm:py-11 sm:px-10 ">
      {children}
    </div>
  );
}
