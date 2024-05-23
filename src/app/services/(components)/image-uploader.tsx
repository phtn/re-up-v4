import { storage } from "@src/lib/db";
import { ref } from "firebase/storage";
import { useCallback, useMemo, type ChangeEvent } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import { CheckIcon, ImageUpIcon, LoaderIcon } from "lucide-react";
import { ImageFile } from "@src/app/(ui)/input";
import Image from "next/image";

import { Button } from "@src/app/(ui)/button";
import { useFileHandler } from "../@user/payments/(hooks)/file";
import { opts } from "@src/utils/helpers";
import { cn } from "@src/utils/cn";

type UploaderProps = {
  dir: string;
  filename: string | undefined;
  userId: string | undefined;
};
export const ImageUploader = (props: UploaderProps) => {
  const { dir, filename, userId } = props;
  const [uploadFile, uploading, snapshot] = useUploadFile();
  const storageRef = ref(storage, `${userId}/payments/${dir}/${filename}`);

  const { file, handleFileChange, imageData } = useFileHandler();

  const bytes = useMemo(
    () =>
      (Number(snapshot?.bytesTransferred) / Number(snapshot?.totalBytes)) * 100,
    [snapshot],
  );

  const ImageOptions = useCallback(() => {
    const upload = async () => {
      if (file) {
        const result = await uploadFile(storageRef, file);
        console.log(`Result: ${JSON.stringify(result)}`);
      }
    };
    const withImage = imageData !== null;
    const options = opts(
      <ImageViewer
        file={file}
        imageData={imageData}
        upload={upload}
        uploading={uploading}
        bytes={bytes}
      />,
      <Dropzone fileChange={handleFileChange} />,
    );
    return <>{options.get(withImage)}</>;
  }, [
    imageData,
    bytes,
    file,
    handleFileChange,
    uploading,
    storageRef,
    uploadFile,
  ]);

  return (
    <div className="flex h-full w-full cursor-pointer">
      <ImageOptions />
    </div>
  );
};

type DropzoneProps = {
  fileChange: (e: FileList | null) => void;
};
export const Dropzone = ({ fileChange }: DropzoneProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    fileChange(e.target.files);
  };
  return (
    <div>
      <ImageFile
        type="file"
        name="upload"
        icon={ImageUpIcon}
        onChange={onChange}
        placeholder="Product image"
      />
    </div>
  );
};

type ImageViewerProps = {
  file: File | undefined;
  imageData: string | null;
  upload: () => void;
  uploading: boolean;
  bytes: number;
};
export const ImageViewer = ({
  file,
  imageData,
  upload,
  uploading,
  bytes,
}: ImageViewerProps) => {
  const ImageOptions = useCallback(() => {
    const withImage = imageData !== null;
    const options = opts(
      <Image
        alt={file?.name ?? ""}
        className="absolute h-[175px] w-[200px] transition-all duration-500 ease-in-out hover:scale-[250%] portrait:h-[64px] portrait:w-[80px]"
        src={`${imageData}` ?? "/"}
        width={0}
        height={0}
      />,
      <div />,
    );
    return <>{options.get(withImage)}</>;
  }, [imageData, file?.name]);

  const BytesUploaded = useCallback(() => {
    const options = opts(
      <p className="flex h-[24px] w-[28px] items-center justify-center rounded bg-void px-1 text-center font-mono text-[10px] text-white">
        {bytes ?? 1}
        <span className="-mb-0.5 pl-[1px] text-[7px] opacity-50">%</span>
      </p>,
      <p />,
    );
    return <>{options.get(uploading)}</>;
  }, [bytes, uploading]);

  const StatusOptions = useCallback(() => {
    const options = opts(
      <LoaderIcon className="size-4 animate-spin text-white" />,
      <CheckIcon className="size-4 stroke-[2.5px] text-white" />,
    );
    return <>{options.get(uploading)}</>;
  }, [uploading]);
  return (
    <div className="portait:w-[80px] relative flex h-[175px] w-full items-center justify-center overflow-clip rounded-lg border bg-gradient-to-r from-gray-800/80 to-gray-800/40 shadow-inner portrait:h-[64px]">
      <ImageOptions />

      <div
        className={cn(
          uploading ? "left-[112px]" : "left-[142px]",
          "absolute top-1 flex items-center space-x-1",
        )}
      >
        <BytesUploaded />
        <Button
          onClick={upload}
          className="h-[24px] w-[24px] bg-emerald-500 p-0"
        >
          <StatusOptions />
        </Button>
      </div>
    </div>
  );
};

/**
<p>
        {error && <strong>Error: {error.message}</strong>}
        {uploading && <span>Uploading file...</span>}
        {snapshot && <span>Snapshot: {JSON.stringify(snapshot)}</span>}
        {selectedFile && <span>Selected file: {selectedFile.name}</span>}
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
        />
        <button onClick={upload}>Upload file</button>
      </p>
*/
