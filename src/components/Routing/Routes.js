import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import { loadUser } from '../../actions/auth';
import { connect } from 'react-redux';
import Login from '../Auth/LoginPage';
import Register from '../Auth/RegisterPage';
import ListingsPage from '../Listings/ListingsPage';
import ListingPage from '../Listing/ListingPage';
import EditListingPage from '../Listing/EditListingPage';
import CreateListingPage from '../Listing/CreateListingPage';
import PrivateRoute from '../Routing/PrivateRoute';
import ProfilePage from '../Profile/ProfilePage';
import Dashboard from '../Dashboard/Dashboard';
import EditProfilePage from '../Profile/EditProfilePage';
import HomePage from '../Homepage/HomePage';
import YourListingsPage from '../Dashboard/YourListingsPage';
import BiddingHistoryPage from '../Dashboard/BiddingHistoryPage';
import YourReviewsPage from '../Dashboard/YourReviewsPage';
import PageNotFound from '../Layout/PageNotFound';

const Routes_user = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/listings' element={<ListingsPage />} />
        <Route path='/listings/:slug' element={<ListingPage />} />
        <Route path='/create' element={<PrivateRoute element={<CreateListingPage />} />} />
        <Route path='/listings/:slug/edit' element={<PrivateRoute element={<EditListingPage />} />} />
        <Route path='/profile/:id' element={<ProfilePage />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/dashboard/edit' element={<PrivateRoute element={<EditProfilePage />} />} />
        <Route path='/dashboard/listings' element={<PrivateRoute element={<YourListingsPage />} />} />
        <Route path='/dashboard/reviews' element={<PrivateRoute element={<YourReviewsPage />} />} />
        <Route path='/dashboard/bids' element={<PrivateRoute element={<BiddingHistoryPage />} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default connect(null, { loadUser })(Routes_user);
