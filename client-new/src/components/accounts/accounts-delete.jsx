import React from 'react';

// Components
import { usePopupContext } from '../popup/use-popup-context';
import { useUserContext } from '../user/use-user-context';

const AccountsDelete = ({ account }) => {
  const { user, setUser } = useUserContext();
  const { close } = usePopupContext();

  /**
   * Delete account.
   */
  const deleteAccount = () => {
    fetch(
      `http://localhost:5000/api/users/${user._id}/accounts/${account._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
        close();
      });
  };

  return (
    <>
      <h6 style={{ color: 'red' }}>
        Are you sure you want to delete{' '}
        <span style={{ color: 'black' }}>{account.name}</span>?
      </h6>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          className="btn btn--base btn--red"
          onClick={() => deleteAccount()}
        >
          Delete
        </button>

        <button className="btn btn--base btn--green">Cancel</button>
      </div>
    </>
  );
};

export default AccountsDelete;
