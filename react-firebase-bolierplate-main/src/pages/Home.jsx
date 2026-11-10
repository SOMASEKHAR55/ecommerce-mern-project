
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { setCart } = useOutletContext();

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/fakestores'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error('Product fetching error:', err);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by gender and category
  const filtered = products.filter(product => {
    const genderMatch =
      selectedGender === 'All' ||
      product.gender?.toLowerCase() === selectedGender.toLowerCase();

    const categoryMatch =
      selectedCategory === 'All' ||
      product.category === selectedCategory;

    return genderMatch && categoryMatch;
  });

  // Get categories based on selected gender
  const categories = [
    'All',
    ...new Set(
      products
        .filter(product =>
          selectedGender === 'All' ||
          product.gender?.toLowerCase() === selectedGender.toLowerCase()
        )
        .map(product => product.category)
        .filter(Boolean)
    )
  ];

  // Change gender filter
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setSelectedCategory('All');
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.title} added to cart!`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="home-container">
        <h3>Loading products...</h3>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="home-container">
        <h3>{error}</h3>
        <button onClick={() => window.location.reload()}>
          Reload Products
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">

      <h2>Fashion Store</h2>

      {/* Gender Filters */}
      <div className="filter-buttons">
        <button
          className={selectedGender === 'All' ? 'active' : ''}
          onClick={() => handleGenderChange('All')}
        >
          All Products
        </button>

        <button
          className={selectedGender === 'Men' ? 'active' : ''}
          onClick={() => handleGenderChange('Men')}
        >
          Male Store
        </button>

        <button
          className={selectedGender === 'Women' ? 'active' : ''}
          onClick={() => handleGenderChange('Women')}
        >
          Female Store
        </button>

        <button
          className={selectedGender === 'Unisex' ? 'active' : ''}
          onClick={() => handleGenderChange('Unisex')}
        >
          Unisex
        </button>
      </div>

      {/* Category Filters */}
      <h3>Shop by Category</h3>

      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={
              selectedCategory === category ? 'active' : ''
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'All' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Product Count */}
      <p className="product-count">
        Showing {filtered.length} products
      </p>

      {/* Product Grid */}
      <div className="product-grid">

        {filtered.length > 0 ? (
          filtered.map(product => (
            <div
              key={product._id || product.id}
              className="product-card"
            >

              {/* Product Image with Fallback */}
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/no-image.png';
                  }}
                />
              </div>

              <h4>{product.title}</h4>

              <p>
                <strong>₹{product.price}</strong>
              </p>

              <p>
                {product.description?.slice(0, 60)}
                {product.description?.length > 60 ? '...' : ''}
              </p>

              <div className="rating">
                ⭐ {product.rating?.rate ?? 'New'}
                {product.rating?.count
                  ? ` (${product.rating.count} reviews)`
                  : ''}
              </div>

              <button
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

            </div>
          ))
        ) : (
          <h3 className="no-products">
            No products available in this category.
          </h3>
        )}

      </div>

    </div>
  );
};

export default Home;
