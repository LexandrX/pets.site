import React, { useState } from 'react';
import moment from 'moment';
import avatarImage from '../img/avatar.jpg';
import cat1 from '../img/cat1.png';
import cat2 from '../img/cat2.png';
import cat3 from '../img/cat3.png';
import { Modal, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    phone: '89112345678',
    email: 'mail@email.ru',
    name: 'Иван',
    registrationDate: '01-01-1970',
    ordersCount: 4,
    petsCount: 2,
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      kind: 'Кошка',
      photos: [cat1, cat2, cat3],
      mark: 'VL-1250',
      description: 'Найдена кошка, порода Сфинкс, очень грустная.',
      status: 'active',
    },
    {
      id: 2,
      kind: 'Собака',
      photos: [cat2, cat3, cat1],
      mark: 'HR-9281',
      description: 'Большая собака, порода Бультерьер, очень дружелюбная.',
      status: 'onModeration',
    },
    {
      id: 3,
      kind: 'Попугай',
      photos: [cat3, cat1, cat2],
      mark: 'JS-4000',
      description: 'Попугай, порода Амазон, умеет говорить.',
      status: 'active',
    },
    {
      id: 4,
      kind: 'Кролик',
      photos: [cat1, cat3, cat2],
      mark: 'KS-1240',
      description: 'Маленький кролик, порода Ангорский, очень пушистый.',
      status: 'active',
    },
  ]);
  
  const [editMode, setEditMode] = useState(false);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newEmail, setNewEmail] = useState(user.email);
  const [notification, setNotification] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const calculateRegistrationDays = (registrationDate) => {
    return moment().diff(moment(registrationDate, 'DD-MM-YYYY'), 'days');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdatePhone = () => {
    if (!newPhone) {
      showNotification('Номер телефона обязателен', 'danger');
      return;
    }
    setUser((prev) => ({ ...prev, phone: newPhone }));
    showNotification('Телефон успешно обновлен');
    setEditMode(false);
  };

  const handleUpdateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      showNotification('Некорректный email', 'danger');
      return;
    }
    setUser((prev) => ({ ...prev, email: newEmail }));
    showNotification('Email успешно обновлен');
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите удалить это объявление?')) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
      setUser((prev) => ({
        ...prev,
        ordersCount: updatedOrders.length,
      }));
      showNotification('Объявление удалено');
    }
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateOrder = () => {
    if (!selectedOrder.photos[0]) {
      alert('Фото 1 обязательно для заполнения!');
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? selectedOrder : order
    );
    setOrders(updatedOrders);
    setSelectedOrder(null);
    showNotification('Объявление успешно обновлено');
  };

  const handleCancelEditOrder = () => {
    setSelectedOrder(null);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotos = [...selectedOrder.photos];
      newPhotos[index] = URL.createObjectURL(file);
      setSelectedOrder({ ...selectedOrder, photos: newPhotos });
    }
  };

  return (
    <div className="container my-5">
    {/* Заголовок Личный кабинет */}
    <h2 className="text-center mb-5">Личный кабинет</h2>

    {notification && (
      <div className={`alert alert-${notification.type}`} role="alert">
        {notification.message}
      </div>
    )}

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center shadow">
            <img
              src={avatarImage}
              alt="Аватар"
              className="card-img-top rounded-circle mx-auto mt-3"
              style={{ width: '150px' }}
            />
            <div className="card-body">
              <h4 className="card-title">{user.name}</h4>
              <p className="text-muted">
                {calculateRegistrationDays(user.registrationDate)} дней с момента регистрации
              </p>
              <Button variant="danger" className="w-100" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title">Информация о пользователе</h5>
              <p><strong>Имя:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Телефон:</strong> {user.phone}</p>
              <p><strong>Дата регистрации:</strong> {user.registrationDate}</p>
              <p><strong>Количество объявлений:</strong> {orders.length}</p>
              <p><strong>Количество найденных животных:</strong> {user.petsCount}</p>
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mt-5">Ваши объявления</h4>
      <div className="row">
        {orders.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">У вас нет объявлений</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="col-md-4 mb-4" key={order.id}>
              <div className="card shadow h-100 d-flex flex-column">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {order.kind}
                    <span className="badge bg-primary">{order.mark}</span>
                  </h5>
                  <div className="row">
                    <div className="col-12 mb-2">
                      <img
                        src={order.photos[0]}
                        className="img-fluid"
                        alt={order.kind}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-4 mb-2">
                      {order.photos[1] && (
                        <img
                          src={order.photos[1]}
                          className="img-fluid"
                          alt={`${order.kind} фото 2`}
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <div className="col-4 mb-2">
                      {order.photos[2] && (
                        <img
                          src={order.photos[2]}
                          className="img-fluid"
                          alt={`${order.kind} фото 3`}
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                      )}
                    </div>
                  </div>
                  <p>{order.description}</p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-warning w-100 mb-2"
                      onClick={() => handleEditOrder(order)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDeleteOrder(order.id)}
                      disabled={order.status !== 'active' && order.status !== 'onModeration'}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal для редактирования профиля */}
      <Modal show={editMode} onHide={() => setEditMode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать профиль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhone">
              <Form.Label>Новый номер телефона</Form.Label>
              <Form.Control
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Новый email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleUpdatePhone}>
            Обновить телефон
          </Button>
          <Button variant="primary" onClick={handleUpdateEmail}>
            Обновить email
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal для редактирования объявления */}
      <Modal show={selectedOrder !== null} onHide={handleCancelEditOrder}>
      <Modal.Header closeButton>
        <Modal.Title>Редактировать объявление</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Фото 1 */}
          <Form.Group controlId="formPhoto1">
            <Form.Label>Фото 1</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleFileChange(e, 0)}
            />
            {selectedOrder?.photos[0] && (
              <img src={selectedOrder.photos[0]} alt="Фото 1" className="img-fluid mt-2" />
            )}
          </Form.Group>
          
          {/* Фото 2 */}
          <Form.Group controlId="formPhoto2" className="mt-3">
            <Form.Label>Фото 2</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleFileChange(e, 1)}
            />
            {selectedOrder?.photos[1] && (
              <img src={selectedOrder.photos[1]} alt="Фото 2" className="img-fluid mt-2" />
            )}
          </Form.Group>
          
          {/* Фото 3 */}
          <Form.Group controlId="formPhoto3" className="mt-3">
            <Form.Label>Фото 3</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleFileChange(e, 2)}
            />
            {selectedOrder?.photos[2] && (
              <img src={selectedOrder.photos[2]} alt="Фото 3" className="img-fluid mt-2" />
            )}
          </Form.Group>
          
          {/* Марка */}
          <Form.Group controlId="formMark" className="mt-3">
            <Form.Label>Марка</Form.Label>
            <Form.Control
              type="text"
              value={selectedOrder?.mark || ''}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, mark: e.target.value })}
            />
          </Form.Group>

          {/* Описание */}
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              type="text"
              value={selectedOrder?.description || ''}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, description: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancelEditOrder}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleUpdateOrder}>
          Обновить объявление
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default Profile;
