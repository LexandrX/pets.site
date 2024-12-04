import React, { useState } from 'react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных на сервер
    setSubmitted(true);
  };

  return (
    <div className="text-center">
      <h2 className="text-white bg-primary m-2">Подписка на новости</h2>
      <form
        className="w-50 m-auto p-3 mb-4"
        style={{ minWidth: '300px' }}
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Введите адрес электронной почты
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            Мы никогда не делимся Вашими e-mail ни с кем.
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Подписаться
        </button>
      </form>
      {submitted && (
        <div className="alert alert-success mt-4" role="alert">
          Спасибо за подписку! Мы отправим вам новости на указанный email.
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;