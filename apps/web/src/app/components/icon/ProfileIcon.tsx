const ProfileIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3871_573)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5ZM18.2579 16.9843C16.7921 18.8222 14.5336 20 12 20C9.46642 20 7.20792 18.8222 5.74212 16.9843C7.36304 15.8211 9.57493 15 12 15C14.4251 15 16.637 15.8211 18.2579 16.9843Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3871_573">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ProfileIcon;
