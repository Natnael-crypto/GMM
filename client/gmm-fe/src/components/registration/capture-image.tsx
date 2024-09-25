import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function CaptureImage({ onCapture }: { onCapture: (file: File) => void }) {
    const [stream, setStream] = React.useState<MediaStream | null>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)


    useEffect(() => {
        async function getStream() {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            setStream(stream)
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current) { videoRef.current.play() }
                }
            }
        }

        if (videoRef.current && !stream) {
            getStream()
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop()
                })
            }
        }

    }, [setStream, stream])


    const extractImageBlob = (
        video: HTMLVideoElement
    ): Promise<Blob | null> => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    };


    const capture = async () => {
        if (videoRef.current) {
            videoRef.current.pause()

            const blob = await extractImageBlob(videoRef.current)

            if (blob) {
                const file = new File(
                    [blob],
                    'image.jpg',
                    {
                        type: 'image/jpeg',
                    }
                );
                onCapture(file)
            }

            videoRef.current.play()
        }
    }

    return (
        <div>

            <div className='w-full rounded-lg aspect-video  overflow-hidden'>
                <video ref={videoRef} className='outline w-full'></video>
            </div>
            <div className='flex items-center justify-center w-full mt-5'>
                <Button variant='outline' onClick={capture}><FontAwesomeIcon icon={faCamera} /></Button>
            </div>
        </div>
    )

}