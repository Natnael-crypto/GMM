import React from 'react';
import './style.css';

interface Props {
  content: string;
  thumbnail: string;
}

export default function RenderContent({ thumbnail, content }: Props) {
  return (
    <div
      className="blog bg-white"
      dangerouslySetInnerHTML={{ __html: thumbnail + content }}
    />
  );
}
