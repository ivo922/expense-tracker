import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import { usePopupContext } from '../popup/use-popup-context';
import { useUserContext } from '../user/use-user-context';

function AccountsEdit({ account }) {
  const { user, setUser } = useUserContext();
  const { close } = usePopupContext();
  const [formData, setFormData] = useState(account);

  /**
   * Add a category.
   *
   * @param {String} type - 'income' or 'expense'
   */
  const addCategory = (type) => {
    const name = getNextCategoryName(type);

    setFormData((current) => {
      const categories = { ...current.categories };
      categories[type] = [...current.categories[type], name];
      return { ...current, categories };
    });
  };

  /**
   * Remove a category.
   *
   * @param {String} type - 'income' or 'expense'
   * @param {Number} index
   */
  const removeCategory = (type, index) => {
    setFormData((current) => {
      const categories = { ...current.categories };
      categories[type] = [
        ...current.categories[type].filter((category, i) => i !== index),
      ];
      return { ...current, categories };
    });
  };

  /**
   * Handles form submit.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    updateAccount(formData);
  };

  /**
   * Update account.
   *
   * @param {Object} account
   */
  const updateAccount = (formData) => {
    console.log(formData);

    fetch(`http://localhost:5000/api/users/${user._id}/accounts/${formData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        close();
      });
  };

  /**
   * Get next category name.
   *
   * @param {String} type
   * @returns
   */
  const getNextCategoryName = (type) => {
    for (let index = 1; index <= 9; index++) {
      const name = `New category ${index}`;

      if (formData.categories[type].includes(name)) {
        continue;
      }

      return name;
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__head">
        <h4 className="form__title">Update account</h4>
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
              className="form__field"
              placeholder="Account name"
              maxLength={15}
              required
              onChange={(event) => {
                setFormData((prevData) => {
                  return { ...prevData, ...{ name: event.target.value } };
                });
              }}
            />
          </div>
        </div>

        <div className="accounts-item__categories">
          <div className="accounts-item__categories-head">
            <h6>Income categories</h6>
          </div>

          <ul>
            {formData.categories.income.map((item, index) => {
              return (
                <li key={`${item}-${index}`}>
                  <input
                    name="income"
                    className="form__field-alt"
                    defaultValue={item}
                    required
                  />

                  {formData.categories.income.length > 1 && (
                    <span
                      onClick={() => {
                        removeCategory('income', index);
                      }}
                    >
                      <Icon icon="delete" />
                    </span>
                  )}
                </li>
              );
            })}

            {formData.categories.income.length < 10 && (
              <li
                onClick={() => {
                  addCategory('income');
                }}
              >
                + Add category
              </li>
            )}
          </ul>
        </div>

        <div className="accounts-item__categories">
          <div className="accounts-item__categories-head">
            <h6>Expense categories</h6>
          </div>

          <ul>
            {formData.categories.expense.map((item, index) => {
              return (
                <li key={`${item}-${index}`}>
                  <input
                    name="expense"
                    className="form__field-alt"
                    defaultValue={item}
                    required
                  />

                  {formData.categories.expense.length > 1 && (
                    <span
                      onClick={() => {
                        removeCategory('expense', index);
                      }}
                    >
                      <Icon icon="delete" />
                    </span>
                  )}
                </li>
              );
            })}

            {formData.categories.expense.length < 10 && (
              <li
                onClick={() => {
                  addCategory('expense');
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
          Update
        </button>
      </div>
    </form>
  );
}

export default AccountsEdit;
