import React from "react";
import dog1 from '../img/dog1.png';
import rat1 from '../img/rat1.png';
import gorilla from '../img/gorilla.png';
import cat1 from '../img/cat1.png';
import bird1 from '../img/bird1.png';
import chill from '../img/chill.png';

const Cards = () => {
  const animals = [
    {
      id: 1,
      phone: "89112345678",
      name: "Иван",
      kind: "кошка",
      photo: cat1,
      description: "Найдена кошка, порода Сфинкс, очень грустная",
      mark: "VL-0214",
      district: "Василеостровский",
      date: "2023-12-01",
      registred: true,
    },
    {
      id: 2,
      phone: "89223344556",
      name: "Мария",
      kind: "собака",
      photo: dog1,
      description: "Найдена белая собака с черными пятнами",
      mark: "KG-1011",
      district: "Красногвардейский",
      date: "2023-11-29",
      registred: true,
    },
    {
      id: 3,
      phone: "89556677889",
      name: "Алексей",
      kind: "горилла",
      photo: gorilla,
      description: "Горилла коричневая, найдена недалеко от зоопарка",
      mark: "ZN-2022",
      district: "Центральный",
      date: "2023-11-28",
      registred: false,
    },
    {
      id: 4,
      phone: "89334455667",
      name: "Екатерина",
      kind: "птица",
      photo: bird1,
      description: "Птица с ярким оперением, была замечена возле школы",
      mark: "PR-3344",
      district: "Приморский",
      date: "2023-11-27",
      registred: true,
    },
    {
      id: 5,
      phone: "89005553322",
      name: "Сергей",
      kind: "человек",
      photo: chill,
      description: "Человек с большим сердцем, найден в Ленинградской области",
      mark: "LO-8888",
      district: "Ленинградская область",
      date: "2023-11-26",
      registred: true,
    },
    {
      id: 6,
      phone: "89883337722",
      name: "Анна",
      kind: "мышь",
      photo: rat1,
      description: "Маленькая серая мышь, найдена в магазине",
      mark: "CN-1234",
      district: "Центральный",
      date: "2023-11-25",
      registred: false,
    },
  ];

  // Сортировка по убыванию даты
  const sortedAnimals = animals.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Недавно найденные животные</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {sortedAnimals.map((animal) => (
          <div className="col" id={`animal-${animal.id}`} key={animal.id}>
            <div className="card shadow-lg rounded h-100">
              <img
                src={animal.photo}
                className="card-img-top"
                alt={animal.kind}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {animal.kind.charAt(0).toUpperCase() + animal.kind.slice(1)}{" "}
                  ({animal.mark})
                </h5>
                <p className="card-text">{animal.description}</p>
                <ul className="list-unstyled">
                  <li>
                    <strong>Имя:</strong> {animal.name}
                  </li>
                  <li>
                    <strong>Район:</strong> {animal.district}
                  </li>
                  <li>
                    <strong>Дата:</strong> {animal.date}
                  </li>
                  <li>
                    <strong>Телефон:</strong> {animal.phone}
                  </li>
                  <li>
                    <strong>Регистрация:</strong>{" "}
                    {animal.registred ? "Зарегистрирован" : "Не зарегистрирован"}
                  </li>
                </ul>
                <a
                  href={`animal-detail.html?id=${animal.id}`}
                  className="btn btn-primary mt-auto"
                >
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;