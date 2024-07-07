import * as crypto from 'crypto';

export function encode(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(process.env.CRYPTO_KEY!, 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    const ivHex = iv.toString('hex');
    resolve(`${ivHex}:${crypted}`);
  });
}

export function decode(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const key = Buffer.from(process.env.CRYPTO_KEY!, 'hex');
    const [ivHex, encryptedData] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    resolve(decrypted);
  });
}