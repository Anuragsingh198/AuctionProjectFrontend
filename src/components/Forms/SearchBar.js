import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Correct for React Router v6
import { connect } from "react-redux";
import { getListings, clearListings } from "../../actions/listing";
import queryString from "query-string"; // Correct import
const AdvancedSearchForm = ({ getListings, clearListings }) => {
  const [formData, setFormData] = useState({
    condition: "",
    maxPrice: "",
    minPrice: "",
    sortBy: "",
    createdBy: "",
    limit: "",
  });

  const { condition, minPrice, maxPrice, sortBy, createdBy, limit } = formData;

  const navigate = useNavigate(); // For navigation (React Router v6)

  const parsed = queryString.parse(window.location.search);

  useEffect(() => {
    setFormData({
      condition: parsed.condition || "",
      maxPrice: parsed.maxPrice || "",
      minPrice: parsed.minPrice || "",
      sortBy: parsed.sortBy || "",
      createdBy: parsed.createdBy || "",
      limit: parsed.limit || "",
    });
  }, [parsed]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    clearListings();
    let search = "";

    if (parsed.query) {
      search = "?search=" + parsed.query.split(" ").join("+");
    }
    if (parsed.category) {
      search = search
        ? search + "&category=" + parsed.category
        : "?category=" + parsed.category;
    }
    if (condition) {
      search = search
        ? search + "&condition=" + condition
        : "?condition=" + condition;
    }
    if (minPrice) {
      search = search
        ? search + "&minPrice=" + minPrice
        : "?minPrice=" + minPrice;
    }
    if (maxPrice) {
      search = search
        ? search + "&maxPrice=" + maxPrice
        : "?maxPrice=" + maxPrice;
    }
    if (sortBy) {
      search = search ? search + "&sortBy=" + sortBy : "?sortBy=" + sortBy;
    }
    if (createdBy) {
      search = search
        ? search + "&createdBy=" + createdBy
        : "?createdBy=" + createdBy;
    }
    search = search
      ? search + `&limit=${limit || 10}&page=1`
      : `?limit=${limit || 10}&page=1`;

    navigate(`/listings${search}`); // Navigate to the updated URL
    getListings(search); // Fetch listings with the applied search
  };

  return (
    <div className="advanced-search-div">
      <h4 className="medium-heading">Refine Search</h4>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h3 className="small-heading">Condition</h3>
          {/* Radio buttons */}
        </div>
        <div className="form-group">
          <h3 className="small-heading">Created By</h3>
          <div>
            <input
              type="text"
              name="createdBy"
              value={createdBy}
              placeholder="Enter user id"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <h3 className="small-heading">Price Range</h3>
          <div>
            <label className="small-text">
              $
              <input
                type="text"
                name="minPrice"
                value={minPrice}
                placeholder=" min"
                className="price-range-inputs"
                onChange={onChange}
              />{" "}
              to $
              <input
                type="text"
                name="maxPrice"
                value={maxPrice}
                className="price-range-inputs"
                placeholder=" max"
                onChange={onChange}
              />
            </label>
          </div>
        </div>
        <div className="form-group">
          <h3 className="small-heading">Items Per Page</h3>
          {/* Radio buttons for limit */}
          {/* (same code as before) */}
        </div>
        <div className="form-group">
          <h3 className="small-heading">Sort By</h3>
          {/* Radio buttons for sortBy */}
          {/* (same code as before) */}
        </div>
        <input
          type="submit"
          className="btn-gray large"
          value="Apply Advanced Filters"
        />
      </form>
    </div>
  );
};

AdvancedSearchForm.propTypes = {};

export default connect(null, { getListings, clearListings })(
  AdvancedSearchForm
);
