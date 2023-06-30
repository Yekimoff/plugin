/**
 *
 * @param minutes number of minutes
 * @returns Formatted time
 * @example formattedTimeFromMinutes(125) //2ч 5мин
 */
 export function formatDuration(minutes) {
  let str = '';
  let days = 0;
  if (minutes >= 60 * 24) {
    days = Math.floor(minutes / (60 * 24));
    str += `${days} д `;
    minutes -= days * 60 * 24;
  }
  if (minutes >= 60 || days > 0) {
    const hours = Math.floor(minutes / 60);
    if (hours !== 0) {
      str += `${hours} ч `;
      minutes = Math.ceil(minutes - hours * 60);
    }
  }

  if (minutes > 0) {
    str += `${minutes} мин`;
  }
  return str;
}