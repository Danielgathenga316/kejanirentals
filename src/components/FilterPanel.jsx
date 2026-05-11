import React from 'react'

function FilterPanel({ filters, onChange, typeOptions, priceOptions, sortOptions }) {
  return (
    <section className="filter-panel bg-white rounded-4 shadow-sm p-4 mb-5">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Search homes</label>
          <input
            type="search"
            className="form-control"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search by city, neighborhood or street"
          />
        </div>

        

        <div className="col-md-2">
          <label className="form-label fw-semibold">Bedrooms</label>
          <select className="form-select" name="beds" value={filters.beds} onChange={onChange}>
            <option value="All">All</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label fw-semibold">Max budget</label>
          <select className="form-select" name="maxPrice" value={filters.maxPrice} onChange={onChange}>
            {priceOptions.map((price) => (
              <option key={price.value} value={price.value}>{price.label}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label fw-semibold">Sort by</label>
          <select className="form-select" name="sort" value={filters.sort} onChange={onChange}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default FilterPanel
