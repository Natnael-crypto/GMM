import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  faCirclePlay,
  faCloudUpload,
  faFileUpload,
  faTrash,
  faTrashAlt,
  faUpload,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function VideoUploader() {
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

      <div className="px-3 py-1 bg-background text-xs border border-secondary flex justify-between items-center">
        <span>Introduction Video</span>
        <span className="flex gap-2 items-center justify-center">
          <FontAwesomeIcon icon={faCirclePlay} />
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>

      <Label className="w-full h-20 border border-secondary border-dashed flex flex-col items-center justify-center bg-background cursor-pointer text-gray-300 gap-y-2">
        <FontAwesomeIcon icon={faCloudUpload} className="text-2xl" />
        <span>Drag &amp; Drop files here</span>
        <input type="file" className="hidden" />
      </Label>

      <div className="flex items-center justify-around">
        <Button className="bg-background border border-secondary rounded-full text-xs h-7 text-secondary">
          Browse Files
        </Button>
        <span>or</span>
        <Button className="bg-background border border-secondary rounded-full text-xs h-7 text-secondary">
          Capture Image
        </Button>
      </div>
    </Card>
  );
}
