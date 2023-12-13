const Spinner = ({ className = "h-14 w-14" }: { className?: string }) => {
  return (
    <div
      className={`${className} lds-ring inline-block relative [&>div]:absolute [&>div]:w-full [&>div]:h-full`}
    >
      <div className="border-2 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin"></div>
      <div className="border-2 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-50"></div>
      <div className="border-2 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-100"></div>
      <div className="border-2 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-150"></div>
    </div>
  );
};
export default Spinner;
