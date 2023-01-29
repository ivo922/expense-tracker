import React from 'react';

// Components
import { useUserContext } from '../user/use-user-context';

// Styles
import '../../assets/scss/components/balance.scss';

function Balance() {
  const { user, account } = useUserContext();
  const activeAccount = user.accounts[account];
console.log(user);
  return (
    <div
      className={`balance${activeAccount.balance < 0 ? ' negative' : ' positive'}`}
    >
      <div className="balance__circle">
        <h1 className="balance__value">{activeAccount.balance} BGN</h1>
      </div>
    </div>
  );
}

export default Balance;
