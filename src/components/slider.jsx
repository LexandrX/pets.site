import React from 'react';
import dog1 from '../img/dog1.png';
import rat1 from '../img/rat1.png';
import gorilla from '../img/gorilla.png';

const Slider = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide m-auto w-75 p-0 mb-4"
      data-bs-ride="carousel"
      style={{ minHeight: '600px' }}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={dog1}
            className="d-block w-100"
            alt="Собака"
            style={{ height: '600px', objectFit: 'cover' }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-50 rounded">
            <h2 className="text-light">Найдена собака</h2>
            <p className="text-light">Собака белая, была утеряна в Красногвардейском районе</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={rat1}
            className="d-block w-100"
            alt="Мышь"
            style={{ height: '600px', objectFit: 'cover' }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-50 rounded">
            <h2 className="text-light">Найдена мышь</h2>
            <p className="text-light">Мышь серая, была утеряна в Центральном районе</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={gorilla}
            className="d-block w-100"
            alt="Горилла"
            style={{ height: '600px', objectFit: 'cover' }}
          />
          <div className="carousel-caption d-flex flex-column align-items-center justify-content-center bg-dark bg-opacity-50 rounded">
            <h2 className="text-light">Найдена горилла</h2>
            <p className="text-light">Горилла, была утеряна в Красногвардейском районе</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Предыдущий</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Следующий</span>
      </button>
    </div>
  );
};

export default Slider;