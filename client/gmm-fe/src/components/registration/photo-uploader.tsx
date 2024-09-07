import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  faCloudUpload,
  faFileUpload,
  faUpload,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function PhotoUploader() {
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
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
        <div className="col-span-1 bg-gray-200 flex justify-center items-center aspect-square">
          <FontAwesomeIcon className="text-background" icon={faUser} />
        </div>
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
