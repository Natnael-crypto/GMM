'use client'

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
    faCirclePlay,
    faPlus,
    faStar,
    faTrashCan,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useEffect } from 'react';

export interface PhotoUploaderProps {
    prevImages?: string[];
}

export default function PhotoUploader({ prevImages = [] }: PhotoUploaderProps) {
    const [defaultImage, setDefaultImage] = React.useState<string>();
    const [images, setImages] = React.useState<string[]>(prevImages);

    const [imageMap, setImagesMap] = React.useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (images.length < 8) {
            setImages((images) => [...images, '']);
        }
    }, [images, setImages])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            setImages((images) => {
                const newImages = [...images];
                newImages[index] = file.name;
                return newImages;
            });

            const blobUrl = URL.createObjectURL(file);

            setImagesMap((imageMap) => {
                return {
                    ...imageMap,
                    [index]: blobUrl
                };
            });
        };

    }

    const handleDefaultImageChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, image: string) => {
        e.preventDefault()
        e.stopPropagation()
        setDefaultImage(image);
    }

    return (
        <Card className="shadow-none text-sm space-y-3">
            <div className="flex">
                <h1 className="font-bold">Your Photo and Introduction Video</h1>
            </div>

            <div className="text-xs aspect-square flex items-center justify-center">
                {defaultImage ? <Image
                    className="w-full overflow-hidden aspect-square"
                    src={imageMap[images.findIndex((v) => v === defaultImage)]}
                    width={300}
                    height={300}
                    alt="User Profile"
                /> :
                    <FontAwesomeIcon className="text-[6rem] text-muted-foreground" icon={faUser} />
                }
            </div>

            <div className="grid grid-cols-4 gap-1">
                {
                    images.map((image, index) => (
                        <Label key={index} className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square cursor-pointer overflow-clip">
                            {imageMap[index] ?
                                <div className='relative w-full h-full aspect-square'>
                                    <Image className='object-contain h-full w-full' src={imageMap[index]} width={100} height={100} alt="User Profile" />
                                    <div className={cn("absolute bottom-2 left-2", defaultImage !== image ? 'opacity-20' : '')} onClick={(e) => handleDefaultImageChange(e, image)}>
                                        <FontAwesomeIcon className="text-background" icon={faStar} />
                                    </div>
                                </div> :
                                <FontAwesomeIcon className="text-background" icon={faPlus} />}
                            <input type="file" className="hidden" onChange={(e) => handleImageChange(e, index)} />
                        </Label>
                    ))
                }
            </div>

            <div className="w-full border border-secondary flex items-center bg-background h-8 px-3 justify-between gap-1 ">
                <Label className="text-nowrap font-normal text-xs line-clamp-1 cursor-pointer">
                    <span>Introduction Video</span>
                    <input type="file" className="hidden" />
                </Label>
                <div className='flex gap-2 text-nowrap font-normal text-xs line-clamp-1'>
                    <span className="cursor-pointer" onClick={() => console.log('play')}>
                        <FontAwesomeIcon icon={faCirclePlay} />
                    </span>
                    <span className="cursor-pointer" onClick={() => console.log('delete')}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                </div>
            </div>

        </Card>
    );
}
