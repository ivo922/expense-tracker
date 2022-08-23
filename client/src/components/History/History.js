import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import OperationEdit from '../Operation/OperationEdit';

import './History.scss';
import HistoryEntry from './HistoryEntry';

function History() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const activeAccount = useSelector((state) => state.session.activeAccount);
  const current = accounts[activeAccount];
  const allTransactions = useSelector(
    (state) => state.session.user.transactions
  );
  const [popupContent, setPopupContent] = useState(null);

  const transactions = allTransactions.filter((t) => {
    return t.account === current.name;
  });

  const isEmpty = transactions.length === 0;

  /**
   * Opens edit transaction popup.
   */
  const editTransactionPopup = (data) => {
    setPopupContent(
      <OperationEdit operation={data.type} onClose={onPopupClose} initialData={data} />
    );
  };

  /**
   * Handles edit popup submit.
   *
   * @returns {Void}
   */
  const onEdit = () => {
    return;
  };

  /**
   * Handles popup close.
   */
  const onPopupClose = () => {
    setPopupContent(null);
  };

  return (
    <div className="History">
      {isEmpty && <h4>You haven't made any transactions yet.</h4>}

      {!isEmpty &&
        transactions.reverse().map((transaction) => {
          return (
            <HistoryEntry
              key={transaction._id}
              data={transaction}
              onClick={editTransactionPopup}
            />
          );
        })}

      {popupContent}
    </div>
  );
}

export default History;
