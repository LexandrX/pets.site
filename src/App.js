import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Slider from './components/slider';
import Cards from './components/cards';
import SubscriptionForm from './components/subscribe';
import Registration from './pages/registration';
import Search from './pages/search';
import Profile from './pages/profile';
import AddOrder from './pages/addOrder';
import PrivateRoute from './components/privateRoute';

const App = () => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="text-center text-white bg-primary m-2">
                  Найденные животные
                </h2>
                <Slider />
                <h2 className="text-center text-white bg-primary m-3">
                  Карточки найденных животных
                </h2>
                <Cards />
                <SubscriptionForm />
              </>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          <Route path="/add-order" element={<AddOrder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;