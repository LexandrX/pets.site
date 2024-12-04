import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cat1 from '../img/cat1.png';
import cat2 from '../img/cat2.png';
import cat3 from '../img/cat3.png';
import cat4 from '../img/cat4.png';
import cat5 from '../img/cat5.png';
import cat6 from '../img/cat6.png';
import dog1 from '../img/dog1.png';
import dog2 from '../img/dog2.png';
import dog3 from '../img/dog3.png';
import dog4 from '../img/dog4.png';
import dog5 from '../img/dog5.png';
import dog6 from '../img/dog6.png';
import dog7 from '../img/dog7.png';
import dog8 from '../img/dog8.png';
import bird1 from '../img/bird1.png';
import bird2 from '../img/bird2.png';
import bird3 from '../img/bird3.png';
import rabbit1 from '../img/rabbit1.png';
import rabbit2 from '../img/rabbit2.png';
import rabbit3 from '../img/rabbit3.png';

const Search = () => {
  const [district, setDistrict] = useState('');
  const [kind, setKind] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');

  // Мемоизация функции поиска с помощью useCallback
  const handleSearch = useCallback(async () => {
    const params = new URLSearchParams();
    if (district) params.append('district', district);
    if (kind) params.append('kind', kind);

    // Симуляция данных
    const data = {
      data: {
        orders: [
          { id: 1, name: 'Иван', kind: 'кошка', description: 'Найдена кошка, порода Сфинкс, очень грустная', photos: cat1, district: 'Василеостровский', phone: '89112345678' },
          { id: 2, name: 'Мария', kind: 'собака', description: 'Собака, порода Лабрадор, дружелюбная', photos: dog1, district: 'Центральный', phone: '89112345679' },
          { id: 3, name: 'Петр', kind: 'попугай', description: 'Попугай, ара, веселый и громкий', photos: bird1, district: 'Петроградский', phone: '89112345680' },
          { id: 4, name: 'Оля', kind: 'кошка', description: 'Найдена кошка, порода Мейн-кун', photos: cat2, district: 'Калининский', phone: '89112345681' },
          { id: 5, name: 'Александр', kind: 'собака', description: 'Собака, порода Немецкая овчарка, очень умная', photos: dog2, district: 'Фрунзенский', phone: '89112345682' },
          { id: 6, name: 'Светлана', kind: 'кролик', description: 'Кролик, порода Ангорский, пушистый и спокойный', photos: rabbit1, district: 'Невский', phone: '89112345683' },
          { id: 7, name: 'Екатерина', kind: 'кошка', description: 'Найдена кошка, порода Британская короткошерстная', photos: cat3, district: 'Адмиралтейский', phone: '89112345684' },
          { id: 8, name: 'Михаил', kind: 'собака', description: 'Собака, порода Чихуахуа, маленькая и ласковая', photos: dog3, district: 'Калининский', phone: '89112345685' },
          { id: 9, name: 'Юлия', kind: 'попугай', description: 'Попугай, попугай жако, умный и общительный', photos: bird2, district: 'Василеостровский', phone: '89112345686' },
          { id: 10, name: 'Игорь', kind: 'собака', description: 'Собака, порода Бульдог, спокойный и добрый', photos: dog4, district: 'Центральный', phone: '89112345687' },
          { id: 11, name: 'Наталья', kind: 'кошка', description: 'Найдена кошка, порода Рэгдолл, очень ласковая', photos: cat4, district: 'Петроградский', phone: '89112345688' },
          { id: 12, name: 'Дмитрий', kind: 'кролик', description: 'Кролик, порода Фландр, большой и пушистый', photos: rabbit2, district: 'Невский', phone: '89112345689' },
          { id: 13, name: 'Анна', kind: 'собака', description: 'Собака, порода Хаски, энергичная и игривая', photos: dog5, district: 'Фрунзенский', phone: '89112345690' },
          { id: 14, name: 'Виктор', kind: 'кошка', description: 'Найдена кошка, порода Сиамская, активная и любопытная', photos: cat5, district: 'Адмиралтейский', phone: '89112345691' },
          { id: 15, name: 'Алёна', kind: 'собака', description: 'Собака, порода Боксер, добродушная и сильная', photos: dog6, district: 'Калининский', phone: '89112345692' },
          { id: 16, name: 'Леонид', kind: 'попугай', description: 'Попугай, амазон, живой и активный', photos: bird3, district: 'Василеостровский', phone: '89112345693' },
          { id: 17, name: 'Карина', kind: 'кошка', description: 'Найдена кошка, порода Абиссинская, веселая и игривая', photos: cat6, district: 'Центральный', phone: '89112345694' },
          { id: 18, name: 'Ирина', kind: 'собака', description: 'Собака, порода Далматин, энергичная и любознательная', photos: dog7, district: 'Петроградский', phone: '89112345695' },
          { id: 19, name: 'Сергей', kind: 'кролик', description: 'Кролик, порода Гигантский папа, очень добрый', photos: rabbit3, district: 'Невский', phone: '89112345696' },
          { id: 20, name: 'Татьяна', kind: 'собака', description: 'Собака, порода Пудель, очень активная и игривая', photos: dog8, district: 'Фрунзенский', phone: '89112345697' },
        ]
      }
    };

    try {
      if (data.data && data.data.orders.length > 0) {
        const filteredOrders = data.data.orders.filter(order => {
          const matchesDistrict = district ? order.district.toLowerCase() === district.toLowerCase() : true;
          const matchesKind = kind ? order.kind.toLowerCase().includes(kind.toLowerCase()) : true;
          return matchesDistrict && matchesKind;
        });

        setResults(filteredOrders);
        setTotalPages(Math.ceil(filteredOrders.length / 6)); // Пагинация на 6 элементов
      } else {
        setResults([]);
        setError('Нет результатов, соответствующих вашему запросу');
      }
    } catch (err) {
      setError('Ошибка при поиске');
    }
  }, [district, kind]); // добавьте зависимость от district и kind

  useEffect(() => {
    handleSearch(); // теперь этот useEffect будет срабатывать корректно
  }, [district, kind, page, handleSearch]);

  return (
    <div className="container">
      <h2 className="text-center mt-4">Поиск по объявлениям</h2>

      {/* Форма поиска */}
      <div className="row mb-4 mt-5">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Введите район"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Введите вид животного"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleSearch}>
            Поиск
          </button>
        </div>
      </div>

      {/* Ошибка или результаты */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mt-4">
        {results.length > 0 ? (
          results.slice((page - 1) * 6, page * 6).map((order) => (
            <div key={order.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={order.photos} className="card-img-top" alt="Animal" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{order.name} ({order.kind})</h5>
                  <p className="card-text">{order.description}</p>
                  <p className="card-text"><strong>Район:</strong> {order.district}</p>
                  <p className="card-text"><strong>Контакты:</strong> {order.phone}</p>
                  <Link to={`/profile/${order.id}`} className="btn btn-primary mt-auto">Подробнее</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">Нет объявлений для этого поиска</div>
        )}
      </div>

      {/* Пагинация */}
      {results.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                >
                  Назад
                </button>
              </li>
              <li className="page-item">
                <span className="page-link">
                  Страница {page} из {totalPages}
                </span>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                  disabled={page === totalPages}
                >
                  Вперед
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Search;