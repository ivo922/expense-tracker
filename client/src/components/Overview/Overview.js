import React, { useEffect, useState } from 'react';
import Balance from '../Balance/Balance';
import OperationCreate from '../Operation/OperationCreate';

import './Overview.scss';

function Overview() {
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    document.title = 'Overview';
  }, []);

  const closePopup = () => {
    setPopupContent(null);
  };

  const openIncomePopup = () => {
    setPopupContent(<OperationCreate operation="income" onClose={closePopup} />);
  };

  const openExpensePopup = () => {
    setPopupContent(<OperationCreate operation="expense" onClose={closePopup} />);
  };

  const openTransferPopup = () => {
    // setPopupContent(<Income onClose={closePopup} />);
  };

  return (
    <div className="Overview">
      <Balance />

      <div className="operations">
        <button onClick={openIncomePopup}>Income</button>

        <button onClick={openExpensePopup}>Expense</button>

        {/* <button onClick={openTransferPopup}>Transfer</button> */}
      </div>

      {popupContent}
    </div>
  );
}

export default Overview;
