import React from 'react';

import '../../assets/scss/components/history-entry.scss';
import HistoryDate from './history-date';

function HistoryEntry({ data, onClick }) {
  return (
    <div
      className={`history-entry ${data.type}`}
      onClick={() => {
        onClick(data);
      }}
    >
      <HistoryDate fullDate={data.date} cls="history-entry__date" />

      <div className="history-entry__content">
        <div className="history-entry__title">
          <h4 className="history-entry__account">{data.account}</h4>
          &nbsp;&#8212;&nbsp;
          <h4 className="history-entry__category">{data.category}</h4>
        </div>

        <p className="history-entry__description">{data.description}</p>
      </div>

      <div className="history-entry__value">{data.value} BGN</div>
    </div>
  );
}

export default HistoryEntry;
