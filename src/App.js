import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Changed Switch to Routes
import RoutesComponent from './components/Routing/Routes'; // Rename for clarity
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Notification from './components/Layout/Notification';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes> {/* Updated this line */}
            <Route path="/*" element={<RoutesComponent />} /> {/* Updated Route usage */}
          </Routes>
          {/* <Footer /> */}
        </Fragment>
      </Router>
      <Notification />
    </Provider>
  );
};

export default App;
