export const upload = async (file: File, generateUploadUrl: any) => {
  const fileInfo = await generateUploadUrl({
    type: file.type,
    size: file.size,
    checksum: 'sha256',
  }).unwrap();

  const result = await fetch(fileInfo.url, {
    method: 'PUT',
    body: file,
  });

  if (!result.ok) {
    throw new Error('Failed to upload file');
  }

  return fileInfo;
};
