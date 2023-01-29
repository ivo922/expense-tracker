import React, { useEffect, useState } from 'react';

// Components
import Balance from '../components/balance/balance';
import { usePopupContext } from '../components/popup/use-popup-context';

// Styles
import '../assets/scss/components/overview.scss';
import Operation from '../components/operation/operation';

function Overview() {
  const { open } = usePopupContext();

  useEffect(() => {
    document.title = 'Overview';
  }, []);

  const openIncomePopup = () => {
    open(<Operation type="income" />);
  };

  const openExpensePopup = () => {
    open(<Operation type="expense" />);
  };

  const openTransferPopup = () => {};

  return (
    <div className="overview">
      <Balance />

      <div className="operations">
        <button onClick={openIncomePopup}>Income</button>

        <button onClick={openExpensePopup}>Expense</button>

        <button onClick={openTransferPopup}>Transfer</button>
      </div>
    </div>
  );
}

export default Overview;
