import React from 'react';
import './style.css';

interface Props {
  content: string;
}

export default function RenderContent({ content }: Props) {
  return (
    <div
      className="blog bg-white"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
