import React from 'react';
import { useSelector } from 'react-redux';

import './History.scss';

function History() {
  const accounts = useSelector((state) => state.session.user.accounts);
  const activeAccount = useSelector((state) => state.session.activeAccount);
  const current = accounts[activeAccount];
  const allTransactions = useSelector((state) => state.session.user.transactions);

  const transactions = allTransactions.filter(t => {
    return t.account === current.name;
  })

  const isEmpty = transactions.length === 0;

  return <div className="History">
    {isEmpty && <h4>You haven't made any transactions yet.</h4>}

    {!isEmpty && transactions.map(transaction => {
      return <div>{transaction.value} {transaction.category}</div>
    })}
  </div>;
}

export default History;
