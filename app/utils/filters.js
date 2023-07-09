export function yearOnly(startAt, endAt) {
  let year = '';
  if (startAt) {
    const startYear = new Date(startAt).getFullYear();

    year = startYear < 0 ? `${startYear} BCE` : startYear;
    if (endAt) {
      let endYear = new Date(endAt).getFullYear();
      endYear = endYear < 0 ? `${endYear} BCE` : endYear;
      if (startYear !== endYear) {
        year = `${startYear} to ${endYear}`;
      }
    }
  }
  return year;
}
