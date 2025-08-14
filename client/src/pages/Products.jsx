import { useState } from 'react';
import { Search, SortAsc, SortDesc } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import AddToCartButton from '../components/AddToCartButton';
import './Products.css';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Use the API hook instead of hardcoded data
  const { products, loading, error } = useProducts(selectedCategory || null);

  const categories = ['all', 'rockets', 'crackers', 'bombs', 'sparklers', 'fountains', 'wheels', 'other'];

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category === selectedCategory ? '' : category);
    }
    setSearchTerm('');
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setSortOrder('asc');
  };

  // Filter and sort products
  const filteredAndSortedProducts = products.filter(product => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return product.name.toLowerCase().includes(searchLower) ||
             product.description.toLowerCase().includes(searchLower) ||
             product.category.toLowerCase().includes(searchLower);
    }
    return true;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  if (loading) {
    return (
      <div className="products">
        <section className="products-hero">
          <div className="container">
            <h1>Our Fireworks Collection</h1>
            <p>Discover our wide range of premium fireworks for every celebration</p>
          </div>
        </section>
        <div className="container">
          <div className="loading-state">
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products">
        <section className="products-hero">
          <div className="container">
            <h1>Our Fireworks Collection</h1>
            <p>Discover our wide range of premium fireworks for every celebration</p>
          </div>
        </section>
        <div className="container">
          <div className="error-state">
            <p>Error loading products: {error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products">
      {/* Products Hero */}
              <section className="products-hero">
          <div className="container">
            <h1>Our Fireworks Collection</h1>
            <p>Discover our wide range of premium fireworks for every celebration</p>
            
            {/* Debug test buttons */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={async () => {
                try {
                  console.log('Testing API connection...');
                  const response = await fetch('http://localhost:5000/api/products');
                  const data = await response.json();
                  console.log('API test successful:', data.length, 'products');
                  alert(`API connection successful! Found ${data.length} products.`);
                } catch (error) {
                  console.error('API test failed:', error);
                  alert(`API test failed: ${error.message}`);
                }
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test API Connection
            </button>
            
            <button 
              onClick={() => {
                console.log('Testing cart context...');
                // Test if we can access the cart context
                try {
                  const testProduct = {
                    _id: 'test123',
                    name: 'Test Firework',
                    price: 100,
                    category: 'test',
                    image: 'https://picsum.photos/400/300?random=999'
                  };
                  
                  // Try to add to cart using the hook
                  console.log('Test product:', testProduct);
                  alert('Check console for test product info. Try adding a real product to cart.');
                } catch (error) {
                  console.error('Cart context test failed:', error);
                  alert('Cart context test failed. Check console for details.');
                }
              }}
              style={{
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test Cart Context
            </button>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="products-filters">
        <div className="container">
          <div className="filters-container">
            <div className="search-container">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-right">
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`category-btn ${selectedCategory === (category === 'all' ? '' : category) ? 'active' : ''}`}
                  >
                    {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="sort-controls">
                <button
                  onClick={() => handleSortChange('name')}
                  className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />)}
                </button>
                <button
                  onClick={() => handleSortChange('price')}
                  className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                >
                  Price {sortBy === 'price' && (sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />)}
                </button>
              </div>

              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-main">
        <div className="container">
          <div className="products-stats">
            <p>Showing {filteredAndSortedProducts.length} products</p>
            {selectedCategory && (
              <span className="category-badge">
                Category: {selectedCategory}
              </span>
            )}
            {searchTerm && (
              <span className="search-badge">
                Search: "{searchTerm}"
              </span>
            )}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredAndSortedProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      loading="lazy"
                      onLoad={(e) => {
                        e.target.classList.add('loaded');
                      }}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        e.target.classList.add('loaded');
                      }}
                    />
                    {product.featured && (
                      <div className="featured-badge">Featured</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">₹{product.price}</p>
                                         <div className="product-actions">
                       <AddToCartButton product={product} />
                       <button className="btn btn-outline">View Details</button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
