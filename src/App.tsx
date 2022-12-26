import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { LogIn } from './components/LogIn';
import { UserContext } from './components/UserContext';
import { Catalog } from './pages/Catalog';
import Home from './pages/Home/Home';

import './styles/App.scss';

const App = () => {
  const { visibleModalLogin } = useContext(UserContext);

  return (
    <div className="App">
      <Header />
      <LogIn isOpen={visibleModalLogin} />

      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Home />}
            />
            <Route
              path="catalog"
              element={<Catalog />}
            />
          </Route>
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>

      <Footer />

    </div>
  );
};

export default App;
