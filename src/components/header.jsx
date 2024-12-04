import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'bootstrap';
import logo from '../img/logo.png';
import LoginForm from '../components/loginForm';
import { useNavigate } from 'react-router-dom';

const closeModal = (modalId) => {
    const modalElement = document.getElementById(modalId);
    const modalInstance = Modal.getInstance(modalElement);

    if (modalInstance) {
        modalInstance.hide();
    } else {
        new Modal(modalElement).hide();
    }

    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
};

const openModal = (modalId) => {
    const modalElement = document.getElementById(modalId);

    // Удаляем лишние backdrops перед открытием
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());

    // Инициализация и открытие модального окна
    const modalInstance = new Modal(modalElement);
    modalInstance.show();
};

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);

    const handleLoginSuccess = () => {
        // Закрыть модальное окно после успешного входа
        closeModal('loginModal');

        // Перенаправить пользователя на страницу профиля
        navigate('/profile');
    };

    // Обработчик изменения текста в поле поиска
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        // Здесь можно добавить логику для получения подсказок с сервера
        // Пока что добавим статичные подсказки для примера
        if (query.length > 2) {
            setSuggestions([
                { description: 'Объявление 1' },
                { description: 'Объявление 2' },
                { description: 'Объявление 3' },
            ]);
        } else {
            setSuggestions([]);
        }
    };

    // Обработчик клика вне поля поиска и подсказок
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSuggestions([]);
        }
    };

    // Добавляем и удаляем обработчик клика при монтировании компонента
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <nav className="navbar navbar-expand-lg bg-light py-2">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: '1.2rem' }}>
                            <img
                                src={logo}
                                className="logo-img me-2 rounded-3"
                                alt="logo"
                                style={{ height: '40px', width: 'auto' }}
                            />
                            <span>GET PET BACK</span>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" style={{ fontSize: '1rem' }}>Главная</Link>
                                </li>
                                <li className="nav-item">
                                <button
                                className="nav-link btn"
                                onClick={() => openModal("loginModal")}
                                style={{ fontSize: '1rem', background: 'transparent', border: 'none' }}
                                >
                                Личный кабинет
                                </button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/registration" className="nav-link" style={{ fontSize: '1rem' }}>Регистрация</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-order" className="nav-link" style={{ fontSize: '1rem' }}>Добавить объявление</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/search" className="nav-link" style={{ fontSize: '1rem' }}>Поиск по объявлениям</Link>
                                </li>
                            </ul>
                            {/* Поле поиска с подсказками */}
                            <div className="d-flex position-relative" ref={searchRef}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Быстрый поиск"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{ width: '250px' }}
                                />
                                <button className="btn btn-primary ms-2">Поиск</button>
                                {/* Подсказки */}
                                {suggestions.length > 0 && (
                                    <ul className="list-group position-absolute" style={{ zIndex: 10, width: '250px', marginTop: '50px' }}>
                                        {suggestions.map((suggestion, index) => (
                                            <li key={index} className="list-group-item list-group-item-action">
                                                {suggestion.description}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Модальное окно входа */}
            <div
                className="modal fade"
                id="loginModal"
                tabIndex="-1"
                aria-labelledby="loginModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Вход</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Передаем функцию для успешной авторизации */}
                            <LoginForm onLoginSuccess={handleLoginSuccess} />
                        </div>
                        <div className="modal-footer d-flex flex-column text-center">
                            <Link
                                to="/registration"
                                onClick={() => closeModal("loginModal")}
                            >
                                Регистрация
                            </Link>
                            <Link
                                to="/forgot-login"
                                onClick={() => closeModal("loginModal")}
                            >
                                Забыли логин?
                            </Link>
                            <Link
                                to="/forgot-password"
                                onClick={() => closeModal("loginModal")}
                            >
                                Забыли пароль?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;