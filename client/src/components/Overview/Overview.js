import React, { useEffect, useState } from 'react';
import Balance from '../Balance/Balance';
import Operation from '../Operation/Operation';

import './Overview.scss';

function Overview() {
  const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    document.title = 'Overview';
  }, []);

  const closePopup = () => {
    setPopupContent(null);
  };

  const openDepositPopup = () => {
    setPopupContent(<Operation operation="deposit" onClose={closePopup} />);
  };

  const openWithdrawalPopup = () => {
    setPopupContent(<Operation operation="withdrawal" onClose={closePopup} />);
  };

  const openTransferPopup = () => {
    // setPopupContent(<Deposit onClose={closePopup} />);
  };

  return (
    <div className="Overview">
      <Balance />

      <div className="operations">
        <button onClick={openDepositPopup}>Deposit</button>

        <button onClick={openWithdrawalPopup}>Withdrawal</button>

        <button onClick={openTransferPopup}>Transfer</button>
      </div>

      {popupContent}
    </div>
  );
}

export default Overview;
