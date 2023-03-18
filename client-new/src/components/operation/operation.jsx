import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// Components
import { useUserContext } from '../user/use-user-context';
import { usePopupContext } from '../popup/use-popup-context';

function Operation({ type }) {
  // Datepicker state
  const [startDate, setStartDate] = useState(new Date());

  /**
   * Current user.
   */
  const { user, setUser, account } = useUserContext();
  const activeAccount = user.accounts[account];
  const { close } = usePopupContext();

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  /**
   * Handles form submit.
   *
   * @param {Object} data
   */
  const onSubmit = ({ category, description, value }) => {
    let finalValue = value;

    if (
      !activeAccount &&
      !activeAccount.categories[type].includes(category)
    ) {
      alert('Invalid transaction');
      return;
    }

    if (type === 'expense') {
      finalValue = -value;
    }

    const transaction = {
      type: type,
      account: activeAccount.name,
      category: category,
      date: formatShortDate(startDate),
      fullDate: startDate.toString(),
      value: finalValue,
      description: description,
    };

    const newAccount = {
      name: activeAccount.name,
      balance: Number(activeAccount.balance) + Number(finalValue),
    };

    fetch(`http://localhost:5000/api/users/${user._id}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newAccount, transaction }),
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      setUser(updatedUser);
      close();
    })
    .catch((error) => console.log(error));
  };

  /**
   * Formats a date into MM/dd/yyyy.
   *
   * @param {String} dateString
   * @returns {String}
   */
  const formatShortDate = (dateString) => {
    const date = new Date(dateString);
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  }

  return (
    <>
      <h3>
        {type} in {activeAccount.name}
      </h3>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="value">Value</label>

            <input
              type="number"
              id="value"
              className="form__field"
              min="0"
              placeholder="E.g. 100.50"
              step=".01"
              {...register('value', { required: true, min: 0 })}
            />

            {errors.value && <span>This field is required</span>}
          </div>

          <div className="form__controls">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              className="form__field"
              {...register('category', { required: true })}
            >
              <option value="" disabled>
                Select a category
              </option>
              {activeAccount.categories[type].map((category, index) => {
                return (
                  <option key={`${index}-${category}`} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>

            {errors.category && <span>This field is required</span>}
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="date">Date</label>

            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value, ref } }) => (
                <DatePicker
                  onChange={(date = Date) => {
                    setStartDate(date);
                    onChange(date);
                  }}
                  className="form__field"
                  id="date"
                  selected={startDate}
                />
              )}
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__controls">
            <label htmlFor="description">Description</label>

            <input
              placeholder="E.g. Food, Car, Clothes, etc."
              id="description"
              className="form__field"
              {...register('description', { maxLength: 50 })}
            />
          </div>
        </div>

        <div className="form__row">
          <div className="form__actions">
            <input
              type="submit"
              value={type}
              className={`btn btn--base ${
                type === 'income' ? 'btn--green' : 'btn--red'
              }`}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default Operation;
