import React, { useEffect } from 'react';
// import OperationEdit from '../Operation/OperationEdit';

import '../../assets/scss/components/history.scss';

import HistoryDay from './history-day';

import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';

function History() {
  const { user, account } = useUserContext();
  const { close } = usePopupContext();
  const activeAccount = user.accounts[account];
  const transactions = user.transactions.filter((item) => item.account === activeAccount.name);

  useEffect(() => {
    document.title = 'History';
  }, []);

  // Sort transactions by date.
  const sortedTransactions = {};
  for (const transaction of transactions.reverse()) {
    const key = transaction.date.replaceAll('/', '-');

    if (key in sortedTransactions) {
      sortedTransactions[key].push(transaction);
    } else {
      sortedTransactions[key] = [];
      sortedTransactions[key].push(transaction);
    }
  }

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
        Object.keys(sortedTransactions).map((key) => {
          return (
            <HistoryDay
              key={key}
              transactions={sortedTransactions[key]}
              onClick={editTransactionPopup}
            />
          )
        })
      }
    </div>
  );
}

export default History;
