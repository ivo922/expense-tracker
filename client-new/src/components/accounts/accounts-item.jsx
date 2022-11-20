import React from 'react';

// Styles
import '../../assets/scss/components/accounts-item.scss';

// Components
import Icon from '../icon/icon';
import AccountsDelete from './accounts-delete';
import { usePopupContext } from '../popup/use-popup-context';

const AccountsItem = ({ account, onEdit }) => {
  const { open } = usePopupContext();

  const deleteAccountPopup = () => {
    open(<AccountsDelete account={account} />);
  };

  return (
    <div className="accounts-item">
      <div className="accounts-item__content">
        {account.name} - {account.balance} BGN
      </div>

      <div className="accounts-item__actions">
        <button
          className="accounts-item__edit btn"
          onClick={() => onEdit(account)}
        >
          <Icon icon="edit" />
        </button>

        <button
          className="accounts-item__delete btn"
          onClick={deleteAccountPopup}
        >
          <Icon icon="delete" />
        </button>
      </div>
    </div>
  );
};

export default AccountsItem;
