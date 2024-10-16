import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listing';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import 'react-datepicker/dist/react-datepicker.css';

// import './CreateListingPage.css'; // Import custom styles for dropzone (optional)

const CreateListingPage = ({ createListing, history, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minIncrement: '',
    category: '',
    condition: 'used',
    startPrice: ''
  });

  let {
    title,
    description,
    minIncrement,
    category,
    condition,
    startPrice
  } = formData;

  const [pictures, setPictures] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [verified, setVerified] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onDrop = acceptedFiles => {
    setPictures(acceptedFiles);
  };

  const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    if (verified) {
      let img;
      if (pictures[0]) {
        let formData = new FormData();
        formData.append('image', pictures[0]);
        img = (await axios.post('/api/listings/upload/image', formData)).data.url;
      }
      createListing(
        title,
        description,
        minIncrement,
        category,
        endDate,
        condition,
        startPrice,
        img,
        history
      );
    } else {
      alert('Do the CAPTCHA');
    }
    setUploading(false);
  };

  const verifyCallback = () => {
    setVerified(true);
  };

  // Use Dropzone for image uploads
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Fragment>
      <Helmet>
        <title>Create Listing | Auction</title>
      </Helmet>
      <div className='row'>
        <form className='form' encType='multipart/form-data' onSubmit={onSubmit}>
          <h2 className='large-heading'>Create Listing</h2>
          <p className='small-text'>Put an item up for auction</p>

          <div className='form-group'>
            <h4 className='medium-heading'>Item name*</h4>
            <input
              type='text'
              placeholder='Required'
              name='title'
              value={title}
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Item description*</h4>
            <textarea
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Item category*</h4>
            <input
              type='text'
              placeholder='Required'
              name='category'
              value={category}
              onChange={onChange}
              required
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Minimum bid increment</h4>
            <input
              type='number'
              placeholder='Minimum Increment'
              name='minIncrement'
              value={minIncrement}
              step='0.01'
              onChange={e => {
                if (
                  /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setFormData({ ...formData, minIncrement: e.target.value });
                }
              }}
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Item starting price</h4>
            <input
              type='number'
              placeholder='Starting price'
              name='startPrice'
              value={startPrice}
              step='0.01'
              onChange={e => {
                if (
                  /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(e.target.value) ||
                  e.target.value === ''
                ) {
                  setFormData({ ...formData, startPrice: e.target.value });
                }
              }}
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Item image</h4>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag & drop some images here, or click to select images</p>
            </div>
            {pictures.length > 0 && (
              <ul>
                {pictures.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Item condition</h4>
            <select onChange={onChange} name='condition' value={condition}>
              <option value='used'>Used</option>
              <option value='new'>New</option>
            </select>
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Auction end date*</h4>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              minDate={new Date()}
              dateFormat='MMMM d, yyyy'
              required
            />
          </div>

          <div className='form-group'>
            <h4 className='medium-heading'>Captcha</h4>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey='YOUR_RECAPTCHA_SITE_KEY' // Replace with your actual site key
                onChange={verifyCallback}
              />
            </div>
          </div>

          <input
            type='submit'
            className='btn-gray large full'
            value={uploading ? 'Creating..' : 'Create listing'}
            disabled={uploading}
          />
        </form>
      </div>
    </Fragment>
  );
};

CreateListingPage.propTypes = {
  createListing: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(null, { createListing })(CreateListingPage);
