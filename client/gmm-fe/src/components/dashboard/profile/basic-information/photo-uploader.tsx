'use client';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { upload } from '@/lib/file-upload';
import {
  useCreateUploadUrlMutation,
  useCreateDownloadUrlMutation,
} from '@/lib/user/api';
import { cn } from '@/lib/utils';
import {
  faCirclePlay,
  faPlus,
  faStar,
  faTrashCan,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect } from 'react';

export interface PhotoUploaderProps {
  images: string[];
  video?: string;
  onChange: (images: string[]) => void;
  onVideoChange?: (video: string) => void;
}

export default function PhotoUploader({
  images,
  video,
  onChange,
  onVideoChange,
}: PhotoUploaderProps) {
  const [spotlightImage, setSpotlightImage] = React.useState<
    string | undefined
  >();
  const [defaultImage, setDefaultImage] = React.useState<string>();
  const [videoUrl, setVideoUrl] = React.useState<string | undefined>(undefined);
  const [imageMap, setImagesMap] = React.useState<{ [key: number]: string }>(
    {}
  );

  const [generateUploadUrl] = useCreateUploadUrlMutation();
  const [generateDownloadUrl] = useCreateDownloadUrlMutation();

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [seen, setSeen] = React.useState<string[]>([]);

  const isDuplicate = (file: File): boolean => {
    if (seen.includes(`${file.name}-${file.size}-${file.lastModified}`)) {
      toast({
        title: 'Duplicate Pictures',
        description: 'You have already uploaded this picture',
        variant: 'destructive',
      });
      return true;
    } else {
      setSeen((prev) => [
        ...prev,
        `${file.name}-${file.size}-${file.lastModified}`,
      ]);
      return false;
    }
  };

  useEffect(() => {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageIndex = images.findIndex((v) => v === image);
      if (imageIndex !== -1 && image !== '') {
        generateDownloadUrl(image)
          .unwrap()
          .then((url) => {
            setImagesMap((imageMap) => {
              return {
                ...imageMap,
                [imageIndex]: url,
              };
            });
          });
      }
    }
    if (images.length > 0) {
      setDefaultImage(images[0]);
      setSpotlightImage(images[0]);
    }
  }, [generateDownloadUrl, images]);

  useEffect(() => {
    if (video && !videoUrl) {
      generateDownloadUrl(video)
        .unwrap()
        .then((url) => {
          setVideoUrl(url);
        });
    }
  }, [generateDownloadUrl, video, videoUrl]);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);

      setVideoUrl(blobUrl);

      videoRef.current.onloadedmetadata = async () => {
        if (
          videoRef.current &&
          videoRef.current.duration <= 120 /* seconds */
        ) {
          try {
            const fileInfo = await upload(file, generateUploadUrl);

            if (onVideoChange) {
              onVideoChange(fileInfo.fileKey);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          toast({
            title: 'Invalid Video',
            description: 'Video should be less than 2 minutes long',
          });
          setVideoUrl(undefined);
          if (onVideoChange) {
            onVideoChange('');
          }
        }
      };
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isDuplicate(file)) {
        return;
      }

      const blobUrl = URL.createObjectURL(file);

      setImagesMap((imageMap) => {
        return {
          ...imageMap,
          [index]: blobUrl,
        };
      });

      try {
        const fileInfo = await upload(file, generateUploadUrl);

        onChange(
          images.map((image, i) => (i === index ? fileInfo.fileKey : image))
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDefaultImageChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    image: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDefaultImage(image);
    const defaultIndex = images.findIndex((v) => v === image);

    if (defaultIndex !== -1) {
      onChange([image, ...images.filter((v, i) => i !== defaultIndex)]);
    }
  };

  return (
    <Card className="shadow-none text-sm space-y-3">
      <div className="flex">
        <h1 className="font-bold">Your Photo and Introduction Video</h1>
      </div>

      <div className="flex gap-5 justify-between items-start lg:flex-col lg:gap-3">
        <div className="text-xs aspect-square flex items-center justify-center w-[225px] lg:w-full">
          {imageMap[images?.findIndex((v) => v === spotlightImage)] ? (
            <Image
              className="w-full overflow-hidden aspect-square object-cover"
              src={imageMap[images.findIndex((v) => v === spotlightImage)]}
              width={300}
              height={300}
              alt="User Profile"
            />
          ) : (
            <FontAwesomeIcon
              className="text-[6rem] text-muted-foreground"
              icon={faUser}
            />
          )}
        </div>

        <div className="flex flex-col gap-5 lg:gap-3 w-full">
          <div className="grid grid-cols-4 gap-1">
            {images.map((image, index) => (
              <Label
                key={index}
                className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square cursor-pointer overflow-clip"
              >
                {imageMap[index] ? (
                  <div
                    className="relative w-full h-full aspect-square"
                    onMouseEnter={() => setSpotlightImage(image)}
                    onMouseLeave={() => setSpotlightImage(defaultImage)}
                  >
                    <Image
                      className="object-cover h-full w-full"
                      src={imageMap[index]}
                      width={100}
                      height={100}
                      alt="User Profile"
                    />
                    <div
                      className={cn(
                        'absolute bottom-2 left-2',
                        defaultImage !== image
                          ? 'text-background opacity-70'
                          : 'text-yellow-400'
                      )}
                      onClick={(e) => handleDefaultImageChange(e, image)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                ) : (
                  <FontAwesomeIcon className="text-background" icon={faPlus} />
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </Label>
            ))}
          </div>

          {
            <video
              ref={videoRef}
              className={cn('aspect-video', videoUrl ? '' : 'hidden')}
              src={videoUrl}
              controls
            />
          }
          <div className="lg:w-full border border-secondary flex items-center bg-background h-8 px-3 justify-between gap-1 ">
            <Label className="text-nowrap font-normal text-xs line-clamp-1 cursor-pointer">
              <span>Introduction Video</span>
              <input
                type="file"
                className="hidden"
                accept="video/*"
                onChange={(e) => handleVideoChange(e)}
              />
            </Label>
            <div className="flex gap-2 text-nowrap font-normal text-xs line-clamp-1">
              <span
                className="cursor-pointer"
                onClick={() => console.log('play')}
              >
                <FontAwesomeIcon icon={faCirclePlay} />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => console.log('delete')}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
