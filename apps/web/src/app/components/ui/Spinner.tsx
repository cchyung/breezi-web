const Spinner = () => {
  return (
    <div className="lds-ring inline-block relative [&>div]:absolute [&>div]:w-full [&>div]:h-full w-14 h-14 ">
      <div className="border-8 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin"></div>
      <div className="border-8 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-50"></div>
      <div className="border-8 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-100"></div>
      <div className="border-8 rounded-full border-[#fff_transparent_transparent_transparent] animate-spin delay-150"></div>
    </div>
  );
};
export default Spinner;
