import React from "react";

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5 className="mb-3">GET PET BACK</h5>
                        <p>Поиск пропавших животных и помощь в их возвращении домой.</p>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                            <ul className="list-unstyled">
                                <li><a href="index.html" className="text-white text-decoration-none">Главная</a></li>
                                <li><a href="about.html" className="text-white text-decoration-none">О нас</a></li>
                                <li><a href="contact.html" className="text-white text-decoration-none">Контакты</a></li>
                                <li><a href="privacy.html" className="text-white text-decoration-none">Политика конфиденциальности</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 GET PET BACK. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;