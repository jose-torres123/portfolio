export function formatDate(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
