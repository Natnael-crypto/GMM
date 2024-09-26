'use client'

import * as UserAgent from '@/lib/user-agent';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { upload } from '@/lib/file-upload';
import { useCreateUploadUrlMutation } from '@/lib/user/api';
import { cn } from '@/lib/utils';
import {
  faCirclePlay,
  faCloudUpload,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function VideoUploader({ field }: { field: any }) {
  const [videoUrl, setVideoUrl] = React.useState<string | undefined>(undefined);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const form = useFormContext();
  const [generateUploadUrl] = useCreateUploadUrlMutation();
  const [draggedOnTop, setDragOnTop] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(UserAgent.isMobile.any());
  }, [setIsMobile]);

  const handleVideoChange = async (files: FileList | null) => {
    if (!videoRef.current) return;

    const file = files?.[0];
    if (file) {
      if (!file.type.startsWith('video')) {
        form.setError('video', {
          type: 'invalidFileType',
          message: 'Invalid file type. Please upload a video file',
        });
        return;
      }
      const blobUrl = URL.createObjectURL(file);

      const prevVideoFile = videoUrl
      const prevFileName = fileName

      setVideoUrl(blobUrl);
      setFileName(file.name);

      videoRef.current.onloadedmetadata = async () => {
        if (videoRef.current && videoRef.current.duration <= 120 /* seconds */) {
          try {
            const fileInfo = await upload(file, generateUploadUrl);

            field.onChange(fileInfo.fileKey);
          } catch (error) {
            form.setError('video', {
              type: 'uploadFailed',
              message: 'Unable to upload video',
            });
            console.error(error);
          }
        } else {
          form.setError('video', {
            type: 'maxDuration',
            message: 'Video should be less than 2 minutes',
          });
          setVideoUrl(prevVideoFile);
          setFileName(prevFileName);
        }
      }
    };
  }

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOnTop(false);
    handleVideoChange(e.dataTransfer.files);
  }

  return (
    <Card className="shadow-none text-sm space-y-3">
      <h1 className="font-bold">Video Upload</h1>

      <p className="text-xs">
        Upload a minimum 1-2 min video introducing yourself. Make yourself
        clearly Audible and Visible. Without any filters, background music or
        any special effects. Videos with unreasonable amount of make up altering
        the appearance of any users will be rejected. All media such as videos
        and pictures of sisters will be approved by sister admin(s) only.
      </p>

      {
        videoUrl && <div className="border border-secondary flex items-center bg-background h-8 px-3 justify-between gap-1 w-full">
          <Label className="block text-nowrap font-normal text-xs line-clamp-1 max-w-36">
            <div className="w-full truncate">{fileName}</div>
          </Label>
          <div className='flex gap-2 text-nowrap font-normal text-xs line-clamp-1'>
            <span className="cursor-pointer" onClick={() => console.log('play')}>
              <FontAwesomeIcon icon={faCirclePlay} />
            </span>
            <span className="cursor-pointer" onClick={() => console.log('delete')}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        </div>
      }

      <video ref={videoRef} className={cn("aspect-video", videoUrl ? '' : 'hidden')} src={videoUrl} controls />

      <Label className=
        {cn("w-full h-20 border border-secondary border-dashed flex flex-col items-center justify-center bg-background cursor-pointer text-gray-300 gap-y-2",
          draggedOnTop ? "border-primary" : "border-secondary"
        )}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onDragEnter={() => setDragOnTop(true)}
        onDragLeave={() => setDragOnTop(false)}
      >
        <FontAwesomeIcon icon={faCloudUpload} className="text-2xl pointer-events-none" />
        {!draggedOnTop && <span className='pointer-events-none'>Drag &amp; Drop files here</span>}
        <input type="file" accept="video/*" className="hidden" onChange={(e) => { handleVideoChange(e.target.files); e.target.value = '' }} />
      </Label>

      <div className="flex flex-col sm:flex-row items-center gap-1 flex-wrap">
        <Label className={cn(buttonVariants({ variant: "default" }), "bg-background border border-secondary rounded-full text-xs h-7 text-secondary")}>
          Browse Files
          <input type="file" accept="video/*" className='hidden' onChange={(e) => { handleVideoChange(e.target.files); e.target.value = '' }} />
        </Label>
        {isMobile && <><span>or</span>
          <Label className={cn(buttonVariants({ variant: "default" }), "bg-background border border-secondary rounded-full text-xs h-7 text-secondary")}>
            Capture Video
            <input type="file" accept="video/*" capture className='hidden' onChange={(e) => { handleVideoChange(e.target.files); e.target.value = '' }} />
          </Label>
        </>}
      </div>
    </Card>
  );
}
