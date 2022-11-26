import React from 'react';

// Styles
import '../../assets/scss/components/accounts.scss';

// Components
import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';
import Popup from '../popup/popup';
import Icon from '../icon/icon';
import AccountsItem from './accounts-item';
import AccountsCreate from './accounts-create';
import AccountsEdit from './accounts-edit';

const Accounts = () => {
  const { user, setUser } = useUserContext();
  const { open } = usePopupContext();

  /**
   * Opens create account popup.
   */
  const createAccountPopup = () => {
    open(<AccountsCreate />);
  };

  /**
   * Opens edit account popup.
   *
   * @param {Object} account
   */
  const editAccountPopup = (account) => {
    open(<AccountsEdit account={account} />);
  };

  return (
    <div className="accounts">
      <h6>My accounts:</h6>

      <ul>
        {user.accounts.map((account, index) => {
          return (
            <li key={index}>
              <AccountsItem
                account={account}
                onEdit={() => {
                  editAccountPopup(account);
                }}
              />
            </li>
          );
        })}
      </ul>

      <button className="btn accounts__create" onClick={createAccountPopup}>
        <Icon icon="plus" /> <span>Create new account</span>
      </button>
    </div>
  );
};

export default Accounts;
