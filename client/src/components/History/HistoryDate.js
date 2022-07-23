import React from 'react';

function HistoryDate({ fullDate }) {
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
    <div className="HistoryEntry__date">
      {month} {date}
      <br />
      {year}
    </div>
  );
}

export default HistoryDate;
