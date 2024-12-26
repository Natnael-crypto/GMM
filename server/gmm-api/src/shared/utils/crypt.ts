import * as crypto from 'crypto';

export function encode(data: string, encryptionKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(encryptionKey, 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const ivHex = iv.toString('hex');
    resolve(`${ivHex}:${crypted}`);
  });
}

export function decode(data: string, encryptionKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(encryptionKey, 'hex');
    const [ivHex, encryptedData] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    resolve(decrypted);
  });
}


import * as crypto from 'crypto';

export function encryptText(plainText: string, encryptionKey: string): string {
  const key_in_bytes = Buffer.from(encryptionKey, 'base64');
  if (key_in_bytes.length !== 32) {
    throw new Error('Encryption key must be 32 bytes for AES-256.');
  }
  const iv = crypto.randomBytes(16); // Initialization Vector (16 bytes for AES)
  const cipher = crypto.createCipheriv('aes-256-ctr', key_in_bytes, iv);
  const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptText(encryptedText: string, encryptionKey: string): string {
  const key_in_bytes = Buffer.from(encryptionKey, 'base64');
  if (key_in_bytes.length !== 32) {
    throw new Error('Encryption key must be 32 bytes for AES-256.');
  }
  const [ivHex, encryptedHex] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-ctr', key_in_bytes, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString();
}
