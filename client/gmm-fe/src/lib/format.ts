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

export function cmToFeetInches(cm: number, round = true) {
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

export function kgToPounds(kg: number, round = true) {
  const kgPerPound = 2.20462;
  let pounds = kg * kgPerPound;

  if (round) {
    return `${Math.round(pounds)} lb`;
  }

  return `${pounds.toFixed(2)} lb`;
}

export function poundsToKg(pounds: number, round = true) {
  const poundsPerKg = 0.453592;
  let kg = pounds * poundsPerKg;

  if (round) {
    return `${Math.round(kg)} kg`;
  }

  return `${kg.toFixed(2)} kg`;
}

export const getEighteenYearsAgo = () => {
  const today = new Date();
  return new Date(today.setFullYear(today.getFullYear() - 18));
};

export const convertDateToAge = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
