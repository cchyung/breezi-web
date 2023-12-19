"use client";
import { User } from "@/lib/api";
import { FileDropzoneWrapper, Spinner, UserAvatar } from "@/app/components/ui";
import { ImageIcon } from "@/app/components/icon";
import { useCallback, useRef, useState } from "react";

const UserProfileImageUpload = ({
  user,
  onFileDrop,
  isOnUserProfile = false,
}: {
  user?: Partial<User> | null;
  onFileDrop: (file: File) => void;
  isOnUserProfile?: boolean;
}) => {
  const [imageURL, setImageURL] = useState<string | null>(
    user?.imageURL || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((files: File[]) => {
    const imageURL = URL.createObjectURL(files[0]);
    setImageURL(imageURL);
    onFileDrop(files[0]);
  }, []);

  return (
    <FileDropzoneWrapper onDrop={onDrop}>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="group relative"
      >
        <div className="flex flex-col items-center rounded-full cursor-pointer relative">
          {imageURL || isOnUserProfile ? (
            <UserAvatar user={{ imageURL }} size="lg" />
          ) : (
            <div className="w-32 h-32 md:w-36 md:h-36 aspect-square rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
              <ImageIcon className="text-gray-300 w-12 h-12" />
            </div>
          )}
        </div>

        <div className="absolute h-full w-full top-0 flex items-center justify-center invisible group-hover:visible">
          <span className="px-4 py-2 rounded-full bg-black text-white text-sm">
            {imageURL ? "Change" : "Upload"}
          </span>
        </div>
      </button>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files) {
            onDrop([e.target.files[0]]);
          }
        }}
      />
    </FileDropzoneWrapper>
  );
};
export default UserProfileImageUpload;
