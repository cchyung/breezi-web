const PencilIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      className={className}
    >
      <g fill="none" fill-rule="evenodd">
        <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
        <path
          fill="currentColor"
          d="M19 19a1 1 0 0 1 .117 1.993L19 21h-7a1 1 0 0 1-.117-1.993L12 19h7ZM16.096 4.368a2.5 2.5 0 0 1 3.657 3.405l-.122.13L8.735 18.8a1.5 1.5 0 0 1-.32.244l-.12.06-3.804 1.73c-.808.367-1.638-.417-1.365-1.225l.04-.1 1.73-3.805a1.5 1.5 0 0 1 .213-.34l.09-.1L16.097 4.368Zm2.121 1.414a.5.5 0 0 0-.638-.057l-.069.057L6.678 16.614l-.589 1.297 1.296-.59L18.217 6.49a.5.5 0 0 0 0-.708Z"
        />
      </g>
    </svg>
  );
};
export default PencilIcon;