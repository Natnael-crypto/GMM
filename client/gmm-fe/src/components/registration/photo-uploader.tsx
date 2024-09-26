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
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import CaptureImage from './capture-image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { upload } from '@/lib/file-upload';


export default function PhotoUploader() {
  const [images, setImages] = React.useState<string[]>(['', '', '', '', '', '', '', '']);
  const form = useFormContext()
  const [generateUploadUrl] = useCreateUploadUrlMutation();
  const [draggedOnTop, setDragOnTop] = React.useState(false);
  const [isCaptureImageOpen, setIsCaptureImageOpen] = React.useState(false)

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
      const blobUrl = URL.createObjectURL(file);

      setImages((images) => {
        return [
          ...images.slice(0, index),
          blobUrl,
          ...images.slice(index + 1)
        ]
      });

      try {
        const fileInfo = await upload(file, generateUploadUrl);

        const prevImageKeys = form.getValues('pictures') as string[]

        while (prevImageKeys.length < 8) {
          prevImageKeys.push('')
        }

        form.setValue('pictures', [...prevImageKeys.slice(0, index), fileInfo.fileKey, ...prevImageKeys.slice(index + 1)])

      } catch (error) {
        console.error(error);
      }
    }
    else {
      setImages((images) => {
        return [
          ...images.slice(0, index),
          '',
          ...images.slice(index + 1)
        ]
      });

      const prevImageKeys = form.getValues('pictures') as string[]

      while (prevImageKeys.length < 8) {
        prevImageKeys.push('')
      }

      form.setValue('pictures', [...prevImageKeys.slice(0, index), '', ...prevImageKeys.slice(index + 1)])
    }
  }

  const insertImage = (files: FileList | null) => {
    if (!files) return


    if (files.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i] === '') {
          handleImageChange(files, i)
          break;
        }
      }
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOnTop(false);
    insertImage(e.dataTransfer.files);
  }

  const handleImageCapture = async (file: File) => {
    insertImage([file] as any)
    setIsCaptureImageOpen(false)
  }

  const showDragAndDropImage = images.find((image) => image === '') !== undefined;

  return (
    <Card className="shadow-none text-sm space-y-3">
      <div className="flex justify-between items-end">
        <h1 className="font-bold">Photo Upload</h1>
        <span className="text-xs">Max 8</span>
      </div>

      <p className="text-xs">
        Upload at least 5 clear pictures of yourself (without filters). All
        media such as video and pictures of sisters will be approved by sister
        admin(s) only.
      </p>

      <div className="grid grid-cols-4 gap-1">
        {
          images.map((image, index) => {
            return (
              <div key={index} className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
                {
                  (
                    <Label className="flex flex-col items-center justify-center w-full h-full gap-y-2 cursor-pointer">
                      {
                        image ? (
                          <HoverCard>
                            <HoverCardTrigger className='relative w-full h-full overflow-hidden'>
                              <Image src={image} className="object-cover w-full h-full" width={100} height={100} alt="upload profile picture cell" />
                              <div className='absolute bottom-1 right-1' onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation();
                                handleImageChange(null, index)
                              }}>
                                <FontAwesomeIcon className="text-background" icon={faTrashAlt} />
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent className='aspect-square'>
                              <Image src={image} className="object-cover w-full h-full" width={100} height={100} alt="upload profile picture cell" />
                            </HoverCardContent>
                          </HoverCard>

                        ) :
                          <FontAwesomeIcon className="text-background" icon={faUser} />
                      }
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => { handleImageChange(e.target.files, index) }} />
                    </Label>
                  )
                }
              </div>
            )
          })
        }

      </div>

      {
        showDragAndDropImage &&
        <>
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
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { insertImage(e.target.files); e.target.value = '' }} />
          </Label>


          <div className="flex items-center justify-around">
            <Label className={cn(buttonVariants({ variant: "default" }), "bg-background border border-secondary rounded-full text-xs h-7 text-secondary")}>
              Browse Files
              <input type="file" accept="image/*" className='hidden' onChange={(e) => { insertImage(e.target.files); e.target.value = '' }} />
            </Label>
            <span>or</span>

            <Dialog open={isCaptureImageOpen}  >
              <DialogTrigger className={cn(buttonVariants({ variant: "default" }), "bg-background border border-secondary rounded-full text-xs h-7 text-secondary")} onClick={() => setIsCaptureImageOpen(true)}>
                Capture Image
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Capture Image</DialogTitle>
                </DialogHeader>

                <CaptureImage onCapture={handleImageCapture} />


              </DialogContent>
            </Dialog>
          </div>
        </>
      }
    </Card>
  );
}
