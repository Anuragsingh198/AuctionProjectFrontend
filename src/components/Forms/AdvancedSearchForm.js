import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Change useHistory to useNavigate
import { connect } from 'react-redux';
import { getListings, clearListings } from '../../actions/listing';
const queryString = require('query-string');

const AdvancedSearchForm = ({ getListings, clearListings }) => {
  const [formData, setFormData] = useState({
    condition: '',
    maxPrice: '',
    minPrice: '',
    sortBy: '',
    createdBy: '',
    limit: ''
  });

  const { condition, minPrice, maxPrice, sortBy, createdBy, limit } = formData;

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const parsed = queryString.parse(window.location.search);

  useEffect(() => {
    setFormData({
      condition: parsed.condition || '',
      maxPrice: parsed.maxPrice || '',
      minPrice: parsed.minPrice || '',
      sortBy: parsed.sortBy || '',
      createdBy: parsed.createdBy || '',
      limit: parsed.limit || ''
    });
  }, [parsed]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    clearListings();
    let search = '';

    if (parsed.query) {
      search = '?search=' + parsed.query.split(' ').join('+');
    }

    if (parsed.category !== undefined) {
      search = search
        ? search + '&category=' + parsed.category
        : '?category=' + parsed.category;
    }

    if (condition) {
      search = search ? search + '&condition=' + condition : '?condition=' + condition;
    }

    if (minPrice) {
      search = search ? search + '&minPrice=' + minPrice : '?minPrice=' + minPrice;
    }

    if (maxPrice) {
      search = search ? search + '&maxPrice=' + maxPrice : '?maxPrice=' + maxPrice;
    }

    if (sortBy) {
      search = search ? search + '&sortBy=' + sortBy : '?sortBy=' + sortBy;
    }

    if (createdBy) {
      search = search ? search + '&createdBy=' + createdBy : '?createdBy=' + createdBy;
    }

    search = search
      ? search + `&limit=${limit || 10}&page=${1}`
      : `?limit=${limit || 10}&page=${1}`;

    navigate(`/listings${search}`); // Use navigate instead of history.push
    getListings(search);
  };

  return (
    <div className='advanced-search-div'>
      <h4 className='medium-heading'>Refine Search</h4>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <h3 className='small-heading '>Condition</h3>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='condition'
                value='used'
                checked={condition === 'used'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              Used
            </label>
          </div>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='condition'
                value='new'
                checked={condition === 'new'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              Unused
            </label>
          </div>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='condition'
                value='unspecified'
                checked={condition === 'unspecified'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              Unspecified
            </label>
          </div>
        </div>
        <div className='form-group'>
          <h3 className='small-heading '>Created By</h3>
          <div>
            <input
              type='text'
              name='createdBy'
              value={createdBy}
              placeholder='Enter user id'
              onChange={e => onChange(e)}
            />
          </div>
        </div>
        <div className='form-group'>
          <h3 className='small-heading '>Price Range</h3>
          <div>
            <label className='small-text'>
              $
              <input
                type='text'
                name='minPrice'
                value={minPrice}
                placeholder=' min'
                className='price-range-inputs'
                onChange={e => onChange(e)}
              />{' '}
              to $
              <input
                type='text'
                name='maxPrice'
                placeholder=' max'
                value={maxPrice}
                className='price-range-inputs'
                onChange={e => onChange(e)}
              />
            </label>
          </div>
        </div>
        <div className='form-group'>
          <h3 className='small-heading '>Items Per Page</h3>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='limit'
                value='10'
                checked={limit === '10'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              10 items
            </label>
          </div>

          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='limit'
                value='25'
                checked={limit === '25'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              25 items
            </label>
          </div>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='limit'
                value='100'
                checked={limit === '100'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              100 items
            </label>
          </div>
        </div>
        <div className='form-group'>
          <h3 className='small-heading '>Sort By</h3>
          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='sortBy'
                value='priceAscending'
                checked={sortBy === 'priceAscending'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              Price: Lowest First
            </label>
          </div>

          <div className='form-check'>
            <label className='small-text'>
              <input
                type='radio'
                name='sortBy'
                value='priceDescending'
                checked={sortBy === 'priceDescending'}
                className='form-check-input'
                onChange={e => onChange(e)}
              />
              Price: Highest First
            </label>
          </div>
        </div>

        <input
          type='submit'
          className='btn-gray large'
          value='Apply Advanced Filters'
        />
      </form>
    </div>
  );
};

AdvancedSearchForm.propTypes = {};

export default connect(null, { getListings, clearListings })(AdvancedSearchForm);
