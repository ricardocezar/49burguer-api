export function parseDateFromDDMMYYYY(dateStr: string, separador: string = '-'): Date | null {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split(separador).map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}
