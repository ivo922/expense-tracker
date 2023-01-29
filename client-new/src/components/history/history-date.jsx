import React from 'react';

function HistoryDate({ fullDate, cls }) {
  const parsedDate = new Date(fullDate);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[parsedDate.getMonth()];
  const date = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return (
    <div className={cls}>
      <span>{month} {date}</span>

      <span>{year}</span>
    </div>
  );
}

export default HistoryDate;
