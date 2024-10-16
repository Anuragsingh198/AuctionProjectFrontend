import React from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string'; // Make sure to install this if not already installed

const PaginationButtons = ({
  parsed,
  numListings,
  getListings,
  clearListings
}) => {
  const limit = parsed.limit || 10;
  const lastPage = Math.ceil(numListings / limit);
  let navigate = useNavigate();
  let search = '';

  const onClick = num => {
    clearListings();
    parsed.page = num;
    parsed.limit = limit;
    search = '?' + queryString.stringify(parsed);
    navigate(`/listings${search}`);
    getListings(search);
  };

  return (
    <div className='pagination-buttons-div'>
      <span className='pagination-buttons small-text'>
        <button className='btn-gray large' onClick={() => onClick(1)}>
          First Page
        </button>
        {parsed.page > 1 && (
          <button
            className='btn-gray large'
            onClick={() => onClick(parseInt(parsed.page) - 1)}
          >
            <i className='fas fa-arrow-left'></i>
          </button>
        )}
        Page {parsed.page}
        {parseInt(parsed.page) < lastPage && (
          <button
            className='btn-gray large'
            onClick={() => onClick(parseInt(parsed.page) + 1)}
          >
            <i className='fas fa-arrow-right'></i>
          </button>
        )}
        <button className='btn-gray large' onClick={() => onClick(lastPage)}>
          Last Page
        </button>
      </span>
    </div>
  );
};

export default PaginationButtons;
