import React, { useState } from 'react';

const AddOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    register: false,
    password: '',
    password_confirmation: '',
    photo1: null,
    photo2: null,
    photo3: null,
    mark: '',
    description: '',
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    validateField(name, fieldValue);
  };

  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const currentError = errors[e.target.name];
      if (!currentError) {
        const nextElement = document.getElementById(nextField);
        if (nextElement) {
          nextElement.focus();
        }
      } else {
        alert(currentError);
      }
    }
  };

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
          errorMessage = 'Номер телефона должен быть в формате +XXXXXXXXXXX';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = 'Некорректный email';
        }
        break;
      case 'password':
        if (formData.register && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/.test(value)) {
          errorMessage = 'Пароль должен содержать минимум 7 символов, 1 цифру, 1 строчную и 1 заглавную букву';
        }
        break;
      case 'password_confirmation':
        if (formData.password !== value) {
          errorMessage = 'Пароли не совпадают';
        }
        break;
      case 'photo1':
        if (!value) {
          errorMessage = 'Фото 1 обязательно';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'phone', 'email', 'photo1', 'confirm'];
    const newErrors = {};

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (!value) {
        newErrors[field] = 'Это поле обязательно';
      } else {
        validateField(field, value);
        if (errors[field]) {
          newErrors[field] = errors[field];
        }
      }
    });

    if (formData.register) {
      if (!formData.password || formData.password.length < 7) {
        newErrors.password = 'Пароль должен содержать минимум 7 символов';
      }
      if (!formData.password_confirmation || formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Пароли не совпадают';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage('');
      alert('Пожалуйста, исправьте ошибки в форме');
      return;
    }

    setMessage('Объявление успешно добавлено!');
    setFormData({
      name: '',
      phone: '',
      email: '',
      register: false,
      password: '',
      password_confirmation: '',
      photo1: null,
      photo2: null,
      photo3: null,
      mark: '',
      description: '',
      confirm: false,
    });
    setErrors({});
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Добавить объявление</h2>
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
            onKeyDown={(e) => handleKeyDown(e, 'photo1')}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="register"
            name="register"
            className="form-check-input"
            checked={formData.register}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="register">Автоматическая регистрация</label>
        </div>

        {formData.register && (
          <>
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
                onKeyDown={(e) => handleKeyDown(e, 'photo1')}
              />
              {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
            </div>
          </>
        )}

        <div className="mb-3">
          <label htmlFor="photo1" className="form-label">Фото 1</label>
          <input
            type="file"
            id="photo1"
            name="photo1"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.photo1 && <div className="text-danger">{errors.photo1}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="photo2" className="form-label">Фото 2</label>
          <input
            type="file"
            id="photo2"
            name="photo2"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photo3" className="form-label">Фото 3</label>
          <input
            type="file"
            id="photo3"
            name="photo3"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mark" className="form-label">Клеймо</label>
          <input
            type="text"
            id="mark"
            name="mark"
            className="form-control"
            value={formData.mark}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Описание</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
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

        <button type="submit" className="btn btn-primary btn-lg d-block mx-auto">Добавить объявление</button>
      </form>
    </div>
  );
};

export default AddOrder;