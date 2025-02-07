'use client';

import * as UserAgent from '@/lib/user-agent';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCreateUploadUrlMutation } from '@/lib/user/api';
import { cn } from '@/lib/utils';
import {
  faCloudUpload,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import CaptureImage from './capture-image';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { upload } from '@/lib/file-upload';
import { toast } from '../ui/use-toast';
import Loading from '../ui/loading';

export default function PhotoUploader({ field }: { field: any }) {
  const [images, setImages] = React.useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [isImageUploading, setImageUploading] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const form = useFormContext();
  const [generateUploadUrl] = useCreateUploadUrlMutation();
  const [draggedOnTop, setDragOnTop] = React.useState(false);
  const [isCaptureImageOpen, setIsCaptureImageOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(UserAgent.isMobile.any());
  }, [setIsMobile]);

  const [seen, setSeen] = React.useState<Map<number, String>>(new Map());

  const isDuplicate = (file: File, index: number): boolean => {
    if (
      Array.from(seen.values()).includes(
        `${file.name}-${file.size}-${file.lastModified}`
      )
    ) {
      toast({
        title: 'Duplicate Pictures',
        description: 'You have already uploaded this picture',
        variant: 'destructive',
      });
      return true;
    } else {
      setSeen((prev) => {
        const newSeen = new Map(prev);
        newSeen.set(index, `${file.name}-${file.size}-${file.lastModified}`);
        return newSeen;
      });
      return false;
    }
  };

  const handleImageChange = async (files: FileList | null, index: number) => {
    const file = files?.[0];

    if (file) {
      if (!file.type.startsWith('image')) {
        form.setError('pictures', {
          type: 'invalidFileType',
          message: 'Invalid file type. Please upload an image file',
        });
        return;
      }

      if (isDuplicate(file, index)) {
        return;
      }

      const blobUrl = URL.createObjectURL(file);

      try {
        setImageUploading((uploading) => {
          return [
            ...uploading.slice(0, index),
            true,
            ...uploading.slice(index + 1),
          ];
        });

        const fileInfo = await upload(file, generateUploadUrl);

        const prevImageKeys = field.value as string[];

        while (prevImageKeys.length < 8) {
          prevImageKeys.push('');
        }

        field.onChange([
          ...prevImageKeys.slice(0, index),
          fileInfo.fileKey,
          ...prevImageKeys.slice(index + 1),
        ]);

        setImages((images) => {
          return [
            ...images.slice(0, index),
            blobUrl,
            ...images.slice(index + 1),
          ];
        });
      } catch (error) {
        console.error(error);
      } finally {
        setImageUploading((uploading) => {
          return [
            ...uploading.slice(0, index),
            false,
            ...uploading.slice(index + 1),
          ];
        });
      }
    } else {
      setImages((images) => {
        return [...images.slice(0, index), '', ...images.slice(index + 1)];
      });

      const prevImageKeys = field.value as string[];

      while (prevImageKeys.length < 8) {
        prevImageKeys.push('');
      }

      field.onChange([
        ...prevImageKeys.slice(0, index),
        '',
        ...prevImageKeys.slice(index + 1),
      ]);
      setSeen((prev) => {
        const imageUrl: string = prev.get(index)?.toString() || '';
        if (imageUrl) URL.revokeObjectURL(imageUrl);
        const newSeen = new Map(prev);
        newSeen.delete(index); // Remove the element at the specified index
        return newSeen;
      });
    }
  };

  const insertImage = (files: FileList | null) => {
    if (!files) return;

    if (files.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i] === '') {
          handleImageChange(files, i);
          break;
        }
      }
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  console.log(images, seen);
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOnTop(false);
    insertImage(e.dataTransfer.files);
  };

  const handleImageCapture = async (file: File) => {
    insertImage([file] as any);
    setIsCaptureImageOpen(false);
  };

  const showDragAndDropImage =
    images.find((image) => image === '') !== undefined;

  return (
    <Card className="shadow-none text-sm space-y-3">
      <div className="flex justify-between items-end">
        <h1 className="font-bold">Photo Upload</h1>
        <span className="text-destructive font-bold text-xs">Max 8</span>
      </div>

      <p className="text-md">
        Upload at least{' '}
        <span className="underline font-bold">
          5 clear pictures of yourself
        </span>{' '}
        (without filters).
      </p>
      <p className="underline font-bold">
        All media such as video and pictures of sisters will be approved by
        sister admin(s) only.
      </p>

      <div className="grid grid-cols-4 gap-1">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square"
            >
              {
                <Label className="flex flex-col items-center justify-center w-full h-full gap-y-2 cursor-pointer">
                  {image ? (
                    <HoverCard>
                      <HoverCardTrigger className="relative w-full h-full overflow-hidden">
                        {isImageUploading[index] ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Loading className="scale-50" />
                          </div>
                        ) : (
                          <Image
                            src={image}
                            className="object-cover w-full h-full"
                            width={100}
                            height={100}
                            alt="upload profile picture cell"
                          />
                        )}
                        <div
                          className="absolute bottom-1 right-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleImageChange(null, index);
                          }}
                        >
                          <FontAwesomeIcon
                            className="text-background"
                            icon={faTrashAlt}
                          />
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="aspect-square">
                        <Image
                          src={image}
                          className="object-cover w-full h-full"
                          width={100}
                          height={100}
                          alt="upload profile picture cell"
                        />
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <>
                      {isImageUploading[index] ? (
                        <Loading className="scale-50" />
                      ) : (
                        <FontAwesomeIcon
                          className="text-background"
                          icon={faUser}
                        />
                      )}
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleImageChange(e.target.files, index);
                      e.target.value = '';
                    }}
                  />
                </Label>
              }
            </div>
          );
        })}
      </div>

      {showDragAndDropImage && (
        <>
          <Label
            className={cn(
              'w-full h-20 border border-secondary border-dashed flex flex-col items-center justify-center bg-background cursor-pointer text-gray-500 gap-y-2',
              draggedOnTop ? 'border-primary' : 'border-secondary'
            )}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onDragEnter={() => setDragOnTop(true)}
            onDragLeave={() => setDragOnTop(false)}
          >
            <FontAwesomeIcon
              icon={faCloudUpload}
              className="text-2xl pointer-events-none"
            />
            {!draggedOnTop && (
              <span className="pointer-events-none">
                Drag &amp; Drop files here
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                insertImage(e.target.files);
                e.target.value = '';
              }}
            />
          </Label>

          <div className="flex flex-col sm:flex-row items-center gap-1 flex-wrap">
            <Label
              className={cn(
                buttonVariants({ variant: 'default' }),
                'bg-background border border-secondary rounded-full text-sm h-7 text-secondary'
              )}
            >
              Browse Files
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  insertImage(e.target.files);
                  e.target.value = '';
                }}
              />
            </Label>

            <span className="px-1">or</span>

            {isMobile ? (
              <Label
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'bg-background border border-secondary rounded-full text-md h-7 text-secondary'
                )}
              >
                Capture Image
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => {
                    insertImage(e.target.files);
                    e.target.value = '';
                  }}
                />
              </Label>
            ) : (
              <Dialog open={isCaptureImageOpen}>
                <DialogTrigger
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'bg-background border border-secondary rounded-full text-sm h-7 text-secondary'
                  )}
                  onClick={() => setIsCaptureImageOpen(true)}
                >
                  Capture Image
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Capture Image</DialogTitle>
                  </DialogHeader>

                  <CaptureImage onCapture={handleImageCapture} />
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div>
            <p className="text-xs">
              Female member(s) photos will be available to only View Once by
              matched male member(s) upon reaching the Marriage Talk, the 4th
              step of the Guardian Muslim Marriage Guided Matchmaking Process.
              Male member(s) photos are available to female member(s) from the
              onset of a match. Upload a minimum of 5 profile photos. All photos
              are subject to admin approval and Guardian Muslim Marriage data
              usage and privacy policies.
            </p>
          </div>
        </>
      )}
    </Card>
  );
}
