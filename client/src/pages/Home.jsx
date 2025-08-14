import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import AddToCartButton from '../components/AddToCartButton';
import './Home.css';

const Home = () => {
  // Use the API hook for featured products
  const { products: featuredProducts, loading, error } = useProducts(null, true);

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">
            Illuminate Your Celebrations with
            <span className="highlight"> Mahalaxmi Fireworks</span>
          </h1>
          <p className="hero-subtitle">
            Experience the magic of Diwali and every celebration with our premium collection 
            of safe, high-quality fireworks that light up the sky with joy and wonder.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get Quote
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="fireworks-animation">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Mahalaxmi Fireworks?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎆</div>
              <h3>Premium Quality</h3>
              <p>Only the finest fireworks sourced from trusted manufacturers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>All products meet safety standards and come with usage guidelines</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery across the region</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Best Prices</h3>
              <p>Competitive prices without compromising on quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          
          {loading ? (
            <div className="loading-state">
              <p>Loading featured products...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>Error loading featured products: {error}</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="no-products">
              <p>No featured products available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {featuredProducts.map((product) => (
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
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-category">{product.category}</p>
                      <p className="product-price">₹{product.price}</p>
                                             <div className="product-actions">
                         <AddToCartButton product={product} variant="compact" />
                         <Link to={`/products`} className="btn btn-outline">
                           View Details
                         </Link>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link to="/products" className="btn btn-primary">
                  View All Products
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Light Up Your Celebration?</h2>
            <p>Contact us today for the best fireworks experience!</p>
            <div className="cta-buttons">
              <a href="tel:+919876543210" className="btn btn-primary">
                <Phone size={20} /> Call Now
              </a>
              <a href="https://wa.me/919876543210" className="btn btn-whatsapp">
                <MessageCircle size={20} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
