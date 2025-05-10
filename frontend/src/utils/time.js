function getFormattedDateTime(date) {
  const now = new Date(date);

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}`;

  return formattedDateTime;
}

 export const calculateTimeLeft = () => {
  const now = new Date();
  const resetTime = new Date();
  resetTime.setHours(24, 0, 0, 0);
  const difference = resetTime - now;

  const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export default getFormattedDateTime;
