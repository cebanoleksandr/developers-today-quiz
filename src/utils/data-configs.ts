export const formatDate = (date: Date, isHours: boolean | undefined = undefined): string => {
  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = new Date(date).toLocaleString('en-US', { month: 'short' });
  const year = new Date(date).getFullYear();

  let formattedDate = `${day} ${month}, ${year}`;

  if (isHours) {
    const time = new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
    formattedDate = `${formattedDate}, ${time}`;
  }

  return formattedDate;
};
