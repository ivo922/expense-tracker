import React from 'react';

// Styles
import '../../assets/scss/components/accounts-item.scss';

// Components
import Icon from '../Icon/Icon';

const AccountsItem = ({ account, onEdit, onDelete }) => {

  return (
    <div className="accounts-item">
      <div className="accounts-item__content">
        {account.name} - {account.balance} BGN
      </div>

      <div className="accounts-item__actions">
        <button className="accounts-item__edit btn" onClick={() => onEdit(account)}>
          <Icon icon="edit" />
        </button>

        <button className="accounts-item__delete btn" onClick={() => onDelete(account)}>
          <Icon icon="delete" />
        </button>
      </div>
    </div>
  );
};

export default AccountsItem;
