import React from 'react';
import Popup from '../Popup/Popup';

function HistoryEdit({ data, onClose, onSubmit }) {
  return (
    <Popup onClose={onClose}>
      <div className="HistoryEdit">
        {data.value}
      </div>
    </Popup>
  );
}

export default HistoryEdit;
