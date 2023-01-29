import React, { useState } from 'react';
// import OperationEdit from '../Operation/OperationEdit';

import '../../assets/scss/components/history.scss';
import HistoryEntry from './history-entry';
import HistoryDate from './history-date';

import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';

function History() {
  const { user, setUser, account } = useUserContext();
  const { close } = usePopupContext();
  const activeAccount = user.accounts[account];
  const transactions = user.transactions.filter((item) => item.account === activeAccount.name);
  let dateToSplitBy = '';

  /**
   * Opens edit transaction popup.
   */
  const editTransactionPopup = (data) => {
    // setPopupContent(
    //   <OperationEdit operation={data.type} onClose={onPopupClose} initialData={data} />
    // );
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
    close();
  };

  return (
    <div className="history">
      {transactions.length === 0 && <h4>You haven't made any transactions yet.</h4>}

      {transactions.length !== 0 &&
        transactions.reverse().map((transaction) => {
          const day = new Date(transaction.fullDate).getDate();
          if (dateToSplitBy === day) {
            return (
            <HistoryEntry
            key={transaction._id}
                data={transaction}
                onClick={editTransactionPopup}
              />
            );
          } else {
            dateToSplitBy = day;
            return (
              <div key={transaction.fullDate}>
                <HistoryDate key={transaction.fullDate} fullDate={transaction.fullDate} cls="history__date" />
                <HistoryEntry
                  key={transaction._id}
                  data={transaction}
                  onClick={editTransactionPopup}
                />
              </div>
            );
          }

        })}
    </div>
  );
}

export default History;
