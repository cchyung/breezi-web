"use client";
import { PropsWithChildren, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzoneWrapper = ({
  children,
  onDrop,
  noClick = true,
}: PropsWithChildren<{
  onDrop: (files: File[]) => void;
  noClick?: boolean;
}>) => {
  const onDropInternal = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    onDrop(acceptedFiles);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: onDropInternal,
    noClick: noClick,
    onError(err) {
      console.error(err);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`relative ${!noClick && "cursor-pointer"}`}
    >
      {children}

      {isDragActive ? (
        <div className="absolute h-full w-full flex items-center justify-center top-0 bg-gray-100/80 rounded-2xl border-2 border-gray-100 border-dashed z-50">
          <span className="text-xs p-2 rounded-md bg-gray-400 text-white">
            Upload Image
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FileDropzoneWrapper;
