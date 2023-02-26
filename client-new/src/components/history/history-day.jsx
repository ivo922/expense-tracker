import React, { useState } from 'react'
import HistoryDate from './history-date';
import HistoryEntry from './history-entry';

const HistoryDay = ({ transactions, onClick }) => {
  let total = 0;

  const entries = transactions.map((transaction) => {
    total += Number(transaction.value);

    return (
      <HistoryEntry
        key={transaction._id}
        data={transaction}
        onClick={() => {
          onClick(transaction)
        }}
      />
    )
  });

  return (
    <div className="history__day">
      <HistoryDate
        key={transactions[0].fullDate}
        fullDate={transactions[0].fullDate}
        cls="history__date"
        total={total}
      />

      {entries}
    </div>
  )
}

export default HistoryDay;
