export function formatToAMPM(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatLocalizedDate(date: Date) {
  return date.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function uuidToEightDigitNumber(uuid: string) {
  const cleanedUuid = uuid.replace(/-/g, '');

  const num = BigInt(`0x${cleanedUuid}`);

  const min = BigInt(10000000);
  const max = BigInt(99999999);
  const range = max - min + BigInt(1);

  const randomNum = (num % range) + min;

  return randomNum.toString();
}
