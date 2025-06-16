export function formatDate(date: string, withTime = true) {
  const d = new Date(date);

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mmth = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = d.getFullYear();

  if (!withTime) {
    return `${dd}/${mmth}/${yyyy}`;
  }

  return `${hh}:${mm} ${dd}/${mmth}/${yyyy}`;
}
