import React, { useState } from 'react';

const LoginForm = ({ onLoginSuccess }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
    
        // Очистка ошибок перед новой проверкой
        setLoginError('');
        setPasswordError('');
    
        // Простейшая проверка логина и пароля (для теста)
        if (login !== 'testuser') {
            setLoginError('Неверный логин');
        }
    
        if (password !== 'password123') {
            setPasswordError('Неверный пароль');
        }
    
        // Если ошибок нет — вызываем onLoginSuccess
        if (!loginError && !passwordError && login === 'testuser' && password === 'password123') {
            // Вызываем функцию для успешного входа
            onLoginSuccess();
        }
    };

    return (
        <form onSubmit={handleLoginSubmit}>
            <div className="mb-3 input-group">
                <span className="input-group-text">
                    <i className="bi bi-person"></i>
                </span>
                <input
                    type="text"
                    className={`form-control ${loginError ? 'is-invalid' : ''}`}
                    id="loginInput"
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <div className="invalid-feedback">
                    {loginError}
                </div>
            </div>
            <div className="mb-3 input-group">
                <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                </span>
                <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="passwordInput"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="invalid-feedback">
                    {passwordError}
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary w-100"
            >
                Войти
            </button>
        </form>
    );
};

export default LoginForm;