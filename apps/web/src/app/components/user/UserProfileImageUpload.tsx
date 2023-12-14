"use client";
import { User } from "@/lib/api";
import { FileDropzoneWrapper, UserAvatar } from "@/app/components/ui";
import { ImageIcon } from "@/app/components/icon";
import { useCallback, useRef, useState } from "react";

const UserProfileImageUpload = ({
  user,
  onFileDrop,
}: {
  user?: Partial<User> | null;
  onFileDrop: (file: File) => void;
}) => {
  const [imageURL, setImageURL] = useState<string | null>(
    user?.imageURL || null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((files: File[]) => {
    const imageURL = URL.createObjectURL(files[0]);
    setImageURL(imageURL);
    setImageFile(files[0]);
    onFileDrop(files[0]);
  }, []);

  return (
    <FileDropzoneWrapper onDrop={onDrop}>
      <button onClick={() => fileInputRef.current?.click()}>
        <div className="flex flex-col items-center rounded-full cursor-pointer">
          {imageURL ? (
            <UserAvatar user={{ imageURL }} size="lg" />
          ) : (
            <div className="w-32 h-32 md:w-36 md:h-36 aspect-square rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
              <ImageIcon className="text-gray-300 w-12 h-12" />
            </div>
          )}
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
