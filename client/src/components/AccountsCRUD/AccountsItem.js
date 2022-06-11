import React from 'react';
import Icon from '../Icon/Icon';

import './AccountsItem.scss';

function AccountsItem(props) {
  const onEdit = () => {};

  const onDelete = () => {};

  return (
    <div className="AccountsItem">
      <div className="AccountsItem__content">
        {props.account.name} - {props.account.balance} BGN
      </div>

      <div className="AccountsItem__actions">
        <button className="AccountsItem__edit btn" onClick={onEdit}>
          <Icon icon="edit" />
        </button>

        <button className="AccountsItem__delete btn" onClick={onDelete}>
          <Icon icon="delete" />
        </button>
      </div>
    </div>
  );
}

export default AccountsItem;
