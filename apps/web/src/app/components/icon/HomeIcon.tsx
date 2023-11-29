const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 0.649998C8.5111 0.116668 9.4889 0.116668 10.2 0.649998L17.2 5.9C17.7036 6.27771 18 6.87049 18 7.5V17C18 18.1046 17.1046 19 16 19H11.1C10.4925 19 10 18.5075 10 17.9V12C10 11.4477 9.5523 11 9 11C8.4477 11 8 11.4477 8 12V17.9C8 18.5075 7.5075 19 6.9 19H2C0.89543 19 0 18.1046 0 17V7.5C0 6.87049 0.29639 6.27771 0.8 5.9L7.8 0.649998ZM9 2.25L2 7.5V17H6V12C6 10.3431 7.3431 9 9 9C10.6569 9 12 10.3431 12 12V17H16V7.5L9 2.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default HomeIcon;
