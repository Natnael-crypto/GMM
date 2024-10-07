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

export function cmToFeetInches(cm: number) {
  const cmPerInch = 2.54;
  const cmPerFoot = 30.48;

  let totalInches = cm / cmPerInch;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches % 12);

  if (inches === 12) {
    feet++;
    inches = 0;
  }

  return `${feet}'${inches}"`;
}

export function kgToPounds(kg: number) {
  const kgPerPound = 2.20462;
  let pounds = kg * kgPerPound;

  return `${pounds.toFixed(2)} lb`;
}

export function poundsToKg(pounds: number) {
  const poundsPerKg = 0.453592;
  let kg = pounds * poundsPerKg;

  return `${kg.toFixed(2)} kg`;
}
