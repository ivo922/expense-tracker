import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import Popup from '../Popup/Popup';

import './AccountsCategories.scss';

function AccountsCreate(props) {
  const [categories, setCategories] = useState(
    !!props.account
      ? props.account.categories
      : {
        deposit: ['General'],
        withdrawal: ['General'],
      }
  );

  const [name, setName] = useState(!!props.account ? props.account.name : '');

  /**
   * Add a category.
   *
   * @param {String} type - 'deposit' or 'withdrawal'
   */
  const onAdd = (type) => {
    // Copy state to prevent conflicts.
    const arr = categories[type].slice();

    // Get name for the category.
    const name = getNextCategoryName(arr);

    // Create deep copy of categories.
    const newCategories = JSON.parse(JSON.stringify(categories));

    newCategories[type].push(name);
    setCategories(newCategories);
  };

  /**
   * Remove a category.
   *
   * @param {String} type - 'deposit' or 'withdrawal'
   * @param {Number} index
   */
  const onRemove = (type, index) => {
    // Create deep copy of categories.
    const newCategories = JSON.parse(JSON.stringify(categories));

    newCategories[type].splice(index, 1);
    setCategories(newCategories);
  };

  /**
   * Handles form submit.
   *
   * @param {Object} data
   */
  const onSubmit = (event) => {
    event.preventDefault();
    const newName = new FormData(event.target).get('name');
    const deposit = new FormData(event.target).getAll('deposit');
    const withdrawal = new FormData(event.target).getAll('withdrawal');

    const newAccount = {
      name: newName,
      balance: 0,
      categories: {
        deposit,
        withdrawal,
      },
    };

    props.onSubmit(newAccount);
  };

  /**
   * Get next category name.
   *
   * @param {String} type
   * @param {Array} arr
   * @returns
   */
  const getNextCategoryName = (arr) => {
    for (let index = 1; index <= 9; index++) {
      const name = `New category ${index}`;

      if (arr.includes(name)) {
        continue;
      }

      return name;
    }
  };

  /**
   * Handles popup close.
   */
  const onClose = () => {
    props.onClose();
  };

  return (
    <Popup onClose={onClose}>
      <div className="AccountsCreate">
        <form className="form" onSubmit={onSubmit}>
          <div className="form__head">
            <h4 className="form__title">{!!props.account ? 'Edit' : 'Create new'} account</h4>
          </div>

          <div className="form__body">
            <div className="form__row">
              <div className="form__controls">
                <label htmlFor="name" className="form__label" hidden>
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  defaultValue={name}
                  className={`form__field${!!props.account ? ' hidden' : ''}`}
                  placeholder="Account name"
                  maxLength={15}
                  required
                />
              </div>
            </div>

            <div className="AccountsCategories">
              <div className="AccountsCategories__head">
                <h6>Deposit categories</h6>
              </div>

              <ul>
                {categories.deposit.map((item, index) => {
                  return (
                    <li key={`${item}-${index}`}>
                      <input
                        name="deposit"
                        className="form__field-alt"
                        defaultValue={item}
                        required
                      />

                      {categories.deposit.length > 1 && (
                        <span
                          onClick={() => {
                            onRemove('deposit', index);
                          }}
                        >
                          <Icon icon="delete" />
                        </span>
                      )}
                    </li>
                  );
                })}

                {categories.deposit.length < 10 && (
                  <li
                    onClick={() => {
                      onAdd('deposit');
                    }}
                  >
                    + Add category
                  </li>
                )}
              </ul>
            </div>

            <div className="AccountsCategories">
              <div className="AccountsCategories__head">
                <h6>Withdrawal categories</h6>
              </div>

              <ul>
                {categories.withdrawal.map((item, index) => {
                  return (
                    <li key={`${item}-${index}`}>
                      <input
                        name="withdrawal"
                        className="form__field-alt"
                        defaultValue={item}
                        required
                      />

                      {categories.withdrawal.length > 1 && (
                        <span
                          onClick={() => {
                            onRemove('withdrawal', index);
                          }}
                        >
                          <Icon icon="delete" />
                        </span>
                      )}
                    </li>
                  );
                })}

                {categories.withdrawal.length < 10 && (
                  <li
                    onClick={() => {
                      onAdd('withdrawal');
                    }}
                  >
                    + Add category
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="form__foot">
            <button type="submit" className="btn btn--base btn--green">
              {!!props.account ? 'Edit' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </Popup>
  );
}

export default AccountsCreate;
