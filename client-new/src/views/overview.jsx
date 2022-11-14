import React, { useEffect, useState } from 'react';

// Components
import Balance from '../components/balance/balance';
import { usePopupContext } from '../components/popup/use-popup-context';
// import OperationCreate from '../Operation/OperationCreate';

// Styles
import '../assets/scss/components/overview.scss';

function Overview() {
  const { open } = usePopupContext();

  useEffect(() => {
    document.title = 'Overview';
  }, []);

  const openIncomePopup = () => {
    // open(<OperationCreate operation="income" />);
  };

  const openExpensePopup = () => {
    // open(<OperationCreate operation="expense" />);
  };

  const openTransferPopup = () => {};

  return (
    <div className="Overview">
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
