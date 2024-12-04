import React from 'react';

const PrivateRoute = ({ element: Component }) => {
  // Удаляем проверку авторизации
  return <Component />;
};

export default PrivateRoute;