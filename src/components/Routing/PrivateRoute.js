import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ element: Component, auth: { isAuthenticated, loading } }) => {
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    Component
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  element: PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
