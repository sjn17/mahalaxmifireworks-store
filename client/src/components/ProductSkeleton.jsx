import React from 'react';
import './ProductSkeleton.css';

const ProductSkeleton = ({ count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div key={index} className={`product-skeleton ${className}`}>
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-category"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  ));

  return <>{skeletons}</>;
};

export default ProductSkeleton;
