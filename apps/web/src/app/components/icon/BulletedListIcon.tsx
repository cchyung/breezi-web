const BulletedListIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_4030_7771)">
        <path
          d="M21.6127 5.99992C21.6127 5.82311 21.5424 5.65354 21.4174 5.52851C21.2924 5.40349 21.1228 5.33325 20.946 5.33325H6.66602V6.66659H20.946C21.1228 6.66659 21.2924 6.59635 21.4174 6.47132C21.5424 6.3463 21.6127 6.17673 21.6127 5.99992Z"
          fill="currentColor"
        />
        <path
          d="M20.946 10.6667H6.66602V12.0001H20.946C21.1228 12.0001 21.2924 11.9298 21.4174 11.8048C21.5424 11.6798 21.6127 11.5102 21.6127 11.3334C21.6127 11.1566 21.5424 10.987 21.4174 10.862C21.2924 10.737 21.1228 10.6667 20.946 10.6667Z"
          fill="currentColor"
        />
        <path
          d="M20.946 16H6.66602V17.3333H20.946C21.1228 17.3333 21.2924 17.2631 21.4174 17.1381C21.5424 17.013 21.6127 16.8435 21.6127 16.6667C21.6127 16.4899 21.5424 16.3203 21.4174 16.1953C21.2924 16.0702 21.1228 16 20.946 16Z"
          fill="currentColor"
        />
        <circle cx="3.60039" cy="6.00005" r="1.2" fill="currentColor" />
        <circle cx="3.60039" cy="11.4" r="1.2" fill="currentColor" />
        <circle cx="3.60039" cy="16.8001" r="1.2" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_4030_7771">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BulletedListIcon;
