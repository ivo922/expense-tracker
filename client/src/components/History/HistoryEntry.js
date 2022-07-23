import React from 'react';
import HistoryDate from './HistoryDate';

import './HistoryEntry.scss';

function HistoryEntry({ data, onClick }) {
  return (
    <div
      className={`HistoryEntry ${data.type}`}
      onClick={() => {
        onClick(data);
      }}
    >
      <HistoryDate fullDate={data.date} />

      <div className="HistoryEntry__content">
        <div className="HistoryEntry__title">
          <h4 className="HistoryEntry__account">{data.account}</h4>
          &nbsp;&#8212;&nbsp;
          <h4 className="HistoryEntry__category">{data.category}</h4>
        </div>

        <p className="HistoryEntry__description">{data.description}</p>
      </div>

      <div className="HistoryEntry__value">{data.value} BGN</div>
    </div>
  );
}

export default HistoryEntry;
