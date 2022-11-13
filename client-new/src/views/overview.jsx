import React, { useEffect, useState } from 'react';
import { usePopupContext } from '../components/popup/use-popup-context';
// import Balance from '../Balance/Balance';
// import OperationCreate from '../Operation/OperationCreate';

import '../assets/scss/components/overview.scss';

function Overview() {
  const { popup, open } = usePopupContext();

  useEffect(() => {
    document.title = 'Overview';
  }, []);

  const openIncomePopup = () => {
    // open(<OperationCreate operation="income" />);
  };

  const openExpensePopup = () => {
    // open(<OperationCreate operation="expense" />);
  };

  // const openTransferPopup = () => {};

  return (
    <div className="Overview">
      {/* <Balance /> */}

      <div className="operations">
        <button onClick={openIncomePopup}>Income</button>

        <button onClick={openExpensePopup}>Expense</button>

        {/* <button onClick={openTransferPopup}>Transfer</button> */}
      </div>
    </div>
  );
}

export default Overview;
