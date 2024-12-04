import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    confirm: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    confirm: '',
  });

  const [message, setMessage] = useState('');

  // Обработчик изменения данных
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    validateField(name, value); // Валидация при изменении
  };

  // Валидация каждого поля
  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Имя обязательно';
        } else if (!/^[А-Яа-яЁё\s-]+$/.test(value)) {
          errorMessage = 'Имя может содержать только кириллицу, пробелы и дефисы';
        }
        break;
      case 'phone':
        if (!/^\+?\d{10,15}$/.test(value)) {
          errorMessage = 'Номер телефона должен содержать только цифры и быть в формате +XXXXXXXXXXX';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Некорректный email';
        }
        break;
      case 'password':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/.test(value)) {
          errorMessage = 'Пароль должен содержать минимум 7 символов, 1 цифру, 1 строчную и 1 заглавную букву';
        }
        break;
      case 'password_confirmation':
        if (formData.password !== value) {
          errorMessage = 'Пароли не совпадают';
        }
        break;
      case 'confirm':
        if (!value) {
          errorMessage = 'Необходимо согласие на обработку персональных данных';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Обработчик нажатия клавиш (Enter)
  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Проверка на ошибки в текущем поле
      const currentError = errors[e.target.name];
      if (currentError) {
        alert(currentError); // Если есть ошибка, показываем сообщение
      } else {
        // Переход к следующему полю, если ошибок нет
        const nextElement = document.getElementById(nextField);
        if (nextElement) {
          nextElement.focus();
        }
      }
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;
    let formErrors = {};

    // Валидация всей формы перед отправкой
    for (const field in formData) {
      const fieldValue = formData[field];
      if (!fieldValue) {
        formIsValid = false;
        formErrors[field] = 'Это поле обязательно';
      } else {
        validateField(field, fieldValue);
        if (errors[field]) {
          formIsValid = false;
          formErrors[field] = errors[field];
        }
      }
    }

    // Если есть ошибки, не отправляем форму
    if (!formIsValid) {
      setErrors(formErrors);
      setMessage('');
      alert('Пожалуйста, исправьте ошибки в форме');
    } else {
      setMessage('Регистрация успешна!');
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        confirm: false,
      });
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Регистрация</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'phone')}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Телефон</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'email')}
          />
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
        </div>

        <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'password')}
          autoComplete="off" // Отключаем автозаполнение
        />
        {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3">
        <label htmlFor="password" className="form-label">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyDown(e, 'password_confirmation')}
          autoComplete="new-password" // Указываем, что это новое поле для пароля
        />
        {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Подтвердите пароль</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            className="form-control"
            value={formData.password_confirmation}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'confirm')}
          />
          {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="confirm"
            name="confirm"
            className="form-check-input"
            checked={formData.confirm}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="confirm">
            Согласен на обработку персональных данных
          </label>
          {errors.confirm && <div className="text-danger">{errors.confirm}</div>}
        </div>

        <button type="submit" className="btn btn-primary btn-lg d-block mx-auto">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Registration;