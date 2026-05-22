// ==========================================================================
// CHRONOLUX E-COMMERCE SPA - CORE APPLICATION
// ==========================================================================

const { useState, useEffect } = React;

// 1. Sleek SVG Vector Icons (Lucide-based)
const Icons = {
    Cart: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
    ),
    User: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
    Logout: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    ),
    Search: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    ),
    Lock: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    Plus: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    ),
    Minus: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
    ),
    Trash: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
    ),
    Edit: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
    ),
    Calendar: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    ),
    Location: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    ),
    Watch: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="7"/><polyline points="12 9 12 12 13.5 13.5"/><path d="M16.51 7.16 18 3h-6l1.49 4.16"/><path d="M16.49 16.84 18 21h-6l1.51-4.16"/></svg>
    )
};

// 2. Unified Premium API Client
const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('chrono_token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
        localStorage.removeItem('chrono_token');
        localStorage.removeItem('chrono_user');
        localStorage.removeItem('chrono_role');
        window.location.reload();
        throw new Error('Session expired. Please login again.');
    }
    if (!response.ok) {
        let errMsg = 'API Request Failed';
        try {
            const errData = await response.json();
            errMsg = errData.message || errData.error || errMsg;
        } catch(e) {}
        throw new Error(errMsg);
    }
    if (response.status === 204) return null;
    return response.json();
};

// ==========================================================================
// SUBCOMPONENTS
// ==========================================================================

// 3. Navbar Component
function Navbar({ user, cartCount, currentView, onViewChange, onAuthTrigger, onLogout, onSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    return (
        <header className="navbar-wrapper">
            <div className="container navbar">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onViewChange('home'); }}>
                    <Icons.Watch /> CHRONO<span>LUX</span>
                </a>

                <nav className="nav-links">
                    <a href="#" className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onViewChange('home'); }}>Catalog</a>
                    {user && (
                        <a href="#" className={`nav-link ${currentView === 'orders' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onViewChange('orders'); }}>My Orders</a>
                    )}
                    {user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN') && (
                        <a href="#" className={`nav-link ${currentView === 'admin' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onViewChange('admin'); }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Icons.Settings /> Admin Panel
                            </span>
                        </a>
                    )}
                </nav>

                <div className="nav-actions">
                    <form className="search-box" onSubmit={handleSearchSubmit}>
                        <Icons.Search />
                        <input 
                            type="text" 
                            placeholder="Search luxury timepieces..." 
                            value={searchValue}
                            onChange={(e) => { setSearchValue(e.target.value); onSearch(e.target.value); }}
                        />
                    </form>

                    <div className="cart-trigger" onClick={() => onViewChange('cart')}>
                        <Icons.Cart />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </div>

                    {user ? (
                        <div className="user-menu-container">
                            <div className="user-profile-btn">
                                <Icons.User />
                                <span>{user.username}</span>
                            </div>
                            <div className="dropdown-menu">
                                <div className="dropdown-item" style={{ cursor: 'default', color: 'var(--primary)' }}>
                                    Role: {user.role.replace('ROLE_', '')}
                                </div>
                                <div className="dropdown-item" onClick={() => onViewChange('profile')} style={{ cursor: 'pointer' }}>
                                    My Profile
                                </div>
                                <div className="dropdown-divider"></div>
                                <div className="dropdown-item" onClick={onLogout}>
                                    <Icons.Logout /> Logout
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button className="btn btn-outline-gold btn-sm" onClick={() => onAuthTrigger('login')}>
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

// 4. Hero Component
function Hero({ onCtaClick }) {
    return (
        <section className="hero container">
            <div className="hero-content">
                <div className="hero-tag">Exquisite Craftsmanship</div>
                <h1>Defining <span>Precision</span> & Luxury</h1>
                <p>Explore an elite curation of high-end engineering, refined aesthetics, and timeless heritage. Secure your premium timepiece today.</p>
                <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={onCtaClick}>Explore Catalog</button>
                    <button className="btn btn-secondary" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>Our Heritage</button>
                </div>
            </div>
            <div 
                className="hero-backdrop" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop')` }}
            ></div>
        </section>
    );
}

// 5. Catalog Component
function Catalog({ query, onProductClick, onAddToCart, triggerToast }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCatalogData = async () => {
            try {
                setLoading(true);
                const [prodsData, catsData, brandsData] = await Promise.all([
                    apiFetch('/api/products'),
                    apiFetch('/api/products/categories'),
                    apiFetch('/api/products/brands')
                ]);
                setProducts(prodsData || []);
                setCategories(catsData || []);
                setBrands(brandsData || []);
            } catch (err) {
                console.error("Catalog load error", err);
                triggerToast(err.message || "Failed to load products", "error");
            } finally {
                setLoading(false);
            }
        };
        loadCatalogData();
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.categoryName === selectedCategory;
        const matchesBrand = selectedBrand === 'All' || p.brandName === selectedBrand;
        const matchesQuery = !query || 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brandName.toLowerCase().includes(query.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesBrand && matchesQuery;
    });

    const handleQuickAdd = async (e, product) => {
        e.stopPropagation();
        try {
            await onAddToCart(product.id, 1);
        } catch (err) {
            triggerToast(err.message || "Please log in to add items", "error");
        }
    };

    return (
        <section id="catalog" className="container" style={{ paddingTop: '4rem' }}>
            <div className="section-title-container">
                <span className="section-subtitle">ChronoLux Selection</span>
                <h2 className="section-title">The Watch Catalog</h2>
            </div>

            <div className="filters-section">
                <div className="filter-group">
                    <span className="filter-label">Categories</span>
                    <div className="filter-tabs">
                        <button 
                            className={`filter-tab ${selectedCategory === 'All' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('All')}
                        >
                            All Timepieces
                        </button>
                        {categories.map(c => (
                            <button 
                                key={c.id} 
                                className={`filter-tab ${selectedCategory === c.name ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(c.name)}
                            >
                                {c.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <span className="filter-label">Brands</span>
                    <div className="filter-tabs">
                        <button 
                            className={`filter-tab ${selectedBrand === 'All' ? 'active' : ''}`}
                            onClick={() => setSelectedBrand('All')}
                        >
                            All Brands
                        </button>
                        {brands.map(b => (
                            <button 
                                key={b.id} 
                                className={`filter-tab ${selectedBrand === b.name ? 'active' : ''}`}
                                onClick={() => setSelectedBrand(b.name)}
                            >
                                {b.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="spinner"></div>
            ) : filteredProducts.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">⏳</div>
                    <h3 className="empty-title">No timepieces found</h3>
                    <p className="empty-desc">We couldn't find any watches matching your search or filters. Try adjusting your filters.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(p => {
                        const inStock = p.stock > 0;
                        return (
                            <div key={p.id} className="product-card" onClick={() => onProductClick(p)}>
                                <div className="product-image-container">
                                    <img 
                                        className="product-card-img" 
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop" 
                                        alt={p.name} 
                                    />
                                    <span className={`product-badge ${inStock ? 'badge-instock' : 'badge-outofstock'}`}>
                                        {inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                <div className="product-info">
                                    <div className="product-meta">
                                        <span>{p.brandName}</span>
                                        <span>{p.categoryName}</span>
                                    </div>
                                    <h3 className="product-title">{p.name}</h3>
                                    <div className="product-footer">
                                        <span className="product-price">{p.price.toLocaleString()}</span>
                                        <button 
                                            className={`btn btn-primary btn-sm ${!inStock ? 'btn-secondary' : ''}`}
                                            disabled={!inStock}
                                            onClick={(e) => handleQuickAdd(e, p)}
                                            style={!inStock ? { cursor: 'not-allowed', opacity: 0.6 } : {}}
                                        >
                                            <Icons.Cart /> {inStock ? 'Add to Cart' : 'Sold Out'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

// 6. Product Detail Modal
function ProductDetailModal({ product, onClose, onAddToCart, triggerToast }) {
    const [quantity, setQuantity] = useState(1);
    const inStock = product.stock > 0;

    const handleAdd = async () => {
        try {
            await onAddToCart(product.id, quantity);
            onClose();
        } catch (err) {
            triggerToast(err.message || "Failed to add to cart", "error");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <div className="product-detail-layout">
                    <div className="product-detail-image-box">
                        <img 
                            className="product-detail-img" 
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop" 
                            alt={product.name} 
                        />
                    </div>
                    <div className="product-detail-info">
                        <span className="product-detail-brand">{product.brandName}</span>
                        <h2 className="product-detail-title">{product.name}</h2>
                        <span className="product-detail-category">Collections: {product.categoryName}</span>
                        
                        <div className="product-detail-price">{product.price.toLocaleString()}</div>
                        
                        <div className="product-specs">
                            <div className="spec-item">
                                <span className="spec-label">Availability</span>
                                <span className="spec-value" style={{ color: inStock ? 'var(--success)' : 'var(--danger)' }}>
                                    {inStock ? `${product.stock} pieces in stock` : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Shipping</span>
                                <span className="spec-value">Complimentary Overnight</span>
                            </div>
                        </div>

                        {inStock && (
                            <div className="qty-selector">
                                <span className="qty-label">Quantity:</span>
                                <div className="qty-controls">
                                    <button 
                                        className="qty-btn" 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                    >
                                        <Icons.Minus />
                                    </button>
                                    <span className="qty-value">{quantity}</span>
                                    <button 
                                        className="qty-btn" 
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        disabled={quantity >= product.stock}
                                    >
                                        <Icons.Plus />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button 
                            className="btn btn-primary" 
                            disabled={!inStock}
                            onClick={handleAdd}
                            style={!inStock ? { cursor: 'not-allowed', opacity: 0.6 } : { width: '100%' }}
                        >
                            <Icons.Cart /> {inStock ? 'Add to Cart Collection' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 7. Cart Page Component
function CartPage({ onOrderSuccess, triggerToast, onViewChange, refreshCartCount }) {
    const [cart, setCart] = useState(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [activePaymentTab, setActivePaymentTab] = useState('card'); // 'card' | 'wire' | 'momo'

    const loadCart = async () => {
        try {
            setLoading(true);
            const cartData = await apiFetch('/api/cart');
            setCart(cartData);
            const cards = await apiFetch('/api/payment-methods').catch(() => []);
            setPaymentMethods(cards || []);
            if (cards && cards.length > 0) {
                setSelectedCardId(cards[0].id);
            }
        } catch (err) {
            console.error("Cart load error", err);
            // If they are not logged in, cart loading will fail.
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateQuantity = async (productId, currentQty, amount) => {
        const newQty = currentQty + amount;
        if (newQty < 1) return;
        try {
            const updated = await apiFetch(`/api/cart/items/${productId}?quantity=${newQty}`, { method: 'PUT' });
            setCart(updated);
            refreshCartCount();
            triggerToast("Cart quantity updated", "success");
        } catch (err) {
            triggerToast(err.message || "Failed to update quantity", "error");
        }
    };

    const removeItem = async (productId) => {
        try {
            const updated = await apiFetch(`/api/cart/items/${productId}`, { method: 'DELETE' });
            setCart(updated);
            refreshCartCount();
            triggerToast("Item removed from cart", "success");
        } catch (err) {
            triggerToast(err.message || "Failed to remove item", "error");
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!shippingAddress.trim()) {
            triggerToast("Please enter a valid shipping address", "error");
            return;
        }
        
        let paymentMethod = "Bank Wire Transfer";
        if (activePaymentTab === 'card') {
            if (paymentMethods.length === 0) {
                triggerToast("Please add a credit card in your profile first, or choose another payment method.", "error");
                return;
            }
            const selectedCard = paymentMethods.find(c => c.id === selectedCardId);
            if (!selectedCard) {
                triggerToast("Please select a saved credit card to check out", "error");
                return;
            }
            paymentMethod = `Credit Card (${selectedCard.cardType} ending in ${selectedCard.cardNumber.slice(-4)})`;
        } else if (activePaymentTab === 'wire') {
            paymentMethod = "Bank Wire Transfer";
        } else if (activePaymentTab === 'momo') {
            paymentMethod = "MoMo E-Wallet";
        }

        try {
            setCheckoutLoading(true);
            const order = await apiFetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify({ 
                    shippingAddress,
                    paymentMethod
                })
            });
            triggerToast(`Order placed successfully via ${paymentMethod}! Stock reserved.`, "success");
            onOrderSuccess();
        } catch (err) {
            triggerToast(err.message || "Order failed", "error");
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '80px 0' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    const hasItems = cart && cart.items && cart.items.length > 0;

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <div className="page-header">
                <span className="section-subtitle">Your Collection</span>
                <h1 className="page-title">Shopping Cart</h1>
            </div>

            {!hasItems ? (
                <div className="empty-state">
                    <div className="empty-icon">🛒</div>
                    <h3 className="empty-title">Your cart is empty</h3>
                    <p className="empty-desc">You haven't added any luxury timepieces to your order. Browse our collections to select one.</p>
                    <button className="btn btn-primary" onClick={() => onViewChange('home')}>Browse Timepieces</button>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-container">
                        {cart.items.map(item => (
                            <div key={item.productId} className="cart-item">
                                <div className="cart-item-img-box">
                                    <img 
                                        className="cart-item-img" 
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop" 
                                        alt={item.productName} 
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-brand">Collection Piece</div>
                                    <h3 className="cart-item-title">{item.productName}</h3>
                                    <div className="cart-item-price">{item.productPrice.toLocaleString()}</div>
                                </div>
                                <div className="cart-item-action">
                                    <div className="qty-controls" style={{ height: '36px' }}>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity, -1)}>
                                            <Icons.Minus />
                                        </button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => updateQuantity(item.productId, item.quantity, 1)}>
                                            <Icons.Plus />
                                        </button>
                                    </div>
                                    <div className="cart-item-subtotal">
                                        {(item.productPrice * item.quantity).toLocaleString()}
                                    </div>
                                    <button className="remove-item-btn" onClick={() => removeItem(item.productId)}>
                                        <Icons.Trash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="summary-card">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cart.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Insured Delivery</span>
                            <span style={{ color: 'var(--success)' }}>Complimentary</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span className="summary-total-val">{cart.totalAmount.toLocaleString()}</span>
                        </div>

                        <form className="checkout-form" onSubmit={handleCheckout}>
                            <div className="form-group">
                                <label className="form-label">Shipping Address</label>
                                <textarea 
                                    className="form-input form-textarea" 
                                    placeholder="Enter physical delivery address..." 
                                    required
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-group" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-dark)' }}>
                                <label className="form-label">Payment Method</label>
                                
                                {/* 3-Tabs Header */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => setActivePaymentTab('card')}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem 0.4rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: activePaymentTab === 'card' ? '1px solid #bf953f' : '1px solid var(--border-dark)',
                                            backgroundColor: activePaymentTab === 'card' ? 'rgba(191,149,63,0.08)' : 'transparent',
                                            color: activePaymentTab === 'card' ? 'white' : 'var(--text-muted)',
                                            fontWeight: 600
                                        }}
                                    >
                                        💳 Card
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setActivePaymentTab('wire')}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem 0.4rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: activePaymentTab === 'wire' ? '1px solid #bf953f' : '1px solid var(--border-dark)',
                                            backgroundColor: activePaymentTab === 'wire' ? 'rgba(191,149,63,0.08)' : 'transparent',
                                            color: activePaymentTab === 'wire' ? 'white' : 'var(--text-muted)',
                                            fontWeight: 600
                                        }}
                                    >
                                        🏦 Wire
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setActivePaymentTab('momo')}
                                        style={{
                                            flex: 1,
                                            padding: '0.6rem 0.4rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            border: activePaymentTab === 'momo' ? '1px solid #bf953f' : '1px solid var(--border-dark)',
                                            backgroundColor: activePaymentTab === 'momo' ? 'rgba(191,149,63,0.08)' : 'transparent',
                                            color: activePaymentTab === 'momo' ? 'white' : 'var(--text-muted)',
                                            fontWeight: 600
                                        }}
                                    >
                                        📱 MoMo
                                    </button>
                                </div>

                                {/* Tab Content Area */}
                                {activePaymentTab === 'card' && (
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Saved Cards</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', cursor: 'pointer' }} onClick={() => onViewChange('profile')}>
                                                + Manage Cards
                                            </span>
                                        </div>
                                        {paymentMethods.length === 0 ? (
                                            <div style={{ 
                                                padding: '1rem', 
                                                borderRadius: '8px', 
                                                border: '1px dashed var(--border-dark)', 
                                                fontSize: '0.85rem', 
                                                color: 'var(--text-muted)', 
                                                textAlign: 'center' 
                                            }}>
                                                No saved cards. Add cards in profile to pay in 1-click.
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                {paymentMethods.map(card => (
                                                    <label 
                                                        key={card.id} 
                                                        style={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: '0.75rem', 
                                                            padding: '0.75rem 1rem', 
                                                            borderRadius: '8px', 
                                                            border: selectedCardId === card.id ? '1px solid #bf953f' : '1px solid var(--border-dark)', 
                                                            backgroundColor: selectedCardId === card.id ? 'rgba(191,149,63,0.05)' : 'transparent',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <input 
                                                            type="radio" 
                                                            name="selectedCard" 
                                                            checked={selectedCardId === card.id} 
                                                            onChange={() => setSelectedCardId(card.id)} 
                                                            style={{ accentColor: '#bf953f' }}
                                                        />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                            <div>
                                                                <strong style={{ color: 'white', fontSize: '0.85rem' }}>{card.cardType}</strong>
                                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{card.cardNumber}</span>
                                                            </div>
                                                            <span style={{ fontSize: '0.75rem', color: '#fcf6ba', fontWeight: 600 }}>{card.expiryDate}</span>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activePaymentTab === 'wire' && (
                                    <div style={{
                                        border: '1px solid var(--border-dark)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)',
                                        fontSize: '0.85rem'
                                    }}>
                                        <strong style={{ color: 'white', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>CHRONOLUX RESERVE BANK</strong>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-muted)' }}>
                                            <div>Bank: <span style={{ color: 'white' }}>Swiss Vaulting Trust, Zurich</span></div>
                                            <div>IBAN: <span style={{ color: '#fcf6ba', fontFamily: 'monospace', letterSpacing: '0.05em' }}>CH89 4001 0288 3878 9988 1</span></div>
                                            <div>Beneficiary: <span style={{ color: 'white' }}>ChronoLux AG</span></div>
                                            <div>Reference Code: <span style={{ color: '#bf953f', fontWeight: 'bold', fontFamily: 'monospace' }}>CLX-WIRE-{(Date.now() % 1000000).toString().padStart(6, '0')}</span></div>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', borderTop: '1px solid var(--border-dark)', paddingTop: '0.5rem', marginBottom: 0 }}>
                                            ⚠️ Luxury pieces will be reserved in custody for 24 hours pending transfer confirmation.
                                        </p>
                                    </div>
                                )}

                                {activePaymentTab === 'momo' && (
                                    <div style={{
                                        border: '1px solid var(--border-dark)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        backgroundColor: 'rgba(0,0,0,0.2)'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ 
                                                width: '130px', 
                                                height: '130px', 
                                                backgroundColor: 'white', 
                                                padding: '6px', 
                                                borderRadius: '8px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <svg width="118" height="118" viewBox="0 0 100 100">
                                                    <rect x="0" y="0" width="25" height="25" fill="#111" />
                                                    <rect x="2" y="2" width="21" height="21" fill="white" />
                                                    <rect x="6" y="6" width="13" height="13" fill="#a50064" />
                                                    
                                                    <rect x="75" y="0" width="25" height="25" fill="#111" />
                                                    <rect x="77" y="2" width="21" height="21" fill="white" />
                                                    <rect x="81" y="6" width="13" height="13" fill="#a50064" />
                                                    
                                                    <rect x="0" y="75" width="25" height="25" fill="#111" />
                                                    <rect x="2" y="77" width="21" height="21" fill="white" />
                                                    <rect x="6" y="81" width="13" height="13" fill="#a50064" />
                                                    
                                                    <rect x="35" y="5" width="10" height="10" fill="#111" />
                                                    <rect x="50" y="10" width="15" height="5" fill="#111" />
                                                    <rect x="40" y="20" width="5" height="15" fill="#111" />
                                                    <rect x="55" y="25" width="10" height="10" fill="#111" />
                                                    
                                                    <rect x="5" y="35" width="10" height="10" fill="#111" />
                                                    <rect x="15" y="50" width="15" height="5" fill="#111" />
                                                    <rect x="20" y="60" width="5" height="10" fill="#111" />
                                                    
                                                    <rect x="75" y="35" width="10" height="10" fill="#111" />
                                                    <rect x="85" y="50" width="10" height="15" fill="#111" />
                                                    <rect x="70" y="70" width="15" height="5" fill="#111" />
                                                    
                                                    <rect x="38" y="38" width="24" height="24" rx="4" fill="#a50064" />
                                                    <text x="50" y="52" fill="white" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="system-ui">momo</text>
                                                </svg>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <strong style={{ color: 'white', display: 'block', fontSize: '0.85rem', marginBottom: '0.15rem' }}>Scan MoMo QR Code</strong>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Amount: <strong style={{ color: '#fcf6ba' }}>{(cart.totalAmount * 24000).toLocaleString()} VND</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={checkoutLoading}
                                style={{ width: '100%', marginTop: '1rem' }}
                            >
                                {checkoutLoading ? "Reserving stock..." : "Complete Checkout"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// 8. Orders Page Component
function OrdersPage({ triggerToast }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const list = await apiFetch('/api/orders');
            setOrders(list || []);
        } catch (err) {
            triggerToast(err.message || "Failed to load orders", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order? Item inventory will be restored automatically.")) return;
        try {
            await apiFetch(`/api/orders/${orderId}/cancel`, { method: 'POST' });
            triggerToast("Order cancelled successfully. Stock restored.", "success");
            loadOrders();
        } catch (err) {
            triggerToast(err.message || "Failed to cancel order", "error");
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '80px 0' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <div className="page-header">
                <span className="section-subtitle">Purchase History</span>
                <h1 className="page-title">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3 className="empty-title">No orders placed yet</h3>
                    <p className="empty-desc">You haven't ordered any luxury timepieces yet. Placed orders will display here with tracking details.</p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => {
                        const isPending = order.status.toUpperCase() === 'PENDING';
                        return (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-meta-info">
                                        <div className="order-meta-item">
                                            <span className="order-meta-label">Order Number</span>
                                            <span className="order-meta-val">#CH-{order.id}</span>
                                        </div>
                                        <div className="order-meta-item">
                                            <span className="order-meta-label">Date Placed</span>
                                            <span className="order-meta-val">
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                                                    <Icons.Calendar /> {new Date(order.createdAt || order.orderDate).toLocaleDateString()}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="order-meta-item">
                                            <span className="order-meta-label">Total Cost</span>
                                            <span className="order-meta-val price">{(order.total || order.totalPrice).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <span className={`order-badge status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="order-body">
                                    <div className="order-items">
                                        {order.items && order.items.map(item => (
                                            <div key={item.id} className="order-item-row">
                                                <div className="order-item-img-box">
                                                    <img 
                                                        className="order-item-img" 
                                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop" 
                                                        alt={item.productName} 
                                                    />
                                                </div>
                                                <div className="order-item-details">
                                                    <h4 className="order-item-title">{item.productName}</h4>
                                                    <span className="order-item-meta">
                                                        Quantity: {item.quantity} × <span className="order-item-price-qty">{item.price.toLocaleString()}</span>
                                                    </span>
                                                </div>
                                                <div className="order-item-total">
                                                    {(item.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            <div className="order-shipping-addr" style={{ margin: 0 }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.5rem' }}>
                                                    <Icons.Location />
                                                </span>
                                                <strong>Shipped To:</strong> {order.shippingAddress || '123 Elite Avenue, Geneva, Switzerland'}
                                            </div>
                                            {order.paymentMethod && (
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                                                    <span>💳</span>
                                                    <span>Payment Method: <strong style={{ color: '#fcf6ba' }}>{order.paymentMethod}</strong></span>
                                                </div>
                                            )}
                                        </div>
                                        {isPending && (
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleCancelOrder(order.id)}
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// 9. Admin Dashboard Component
function AdminDashboard({ triggerToast }) {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [productModal, setProductModal] = useState({ open: false, isEdit: false, data: null });
    const [categoryModal, setCategoryModal] = useState({ open: false, isEdit: false, data: null });
    const [brandModal, setBrandModal] = useState({ open: false, isEdit: false, data: null });

    const loadData = async () => {
        try {
            setLoading(true);
            if (activeTab === 'products') {
                const prods = await apiFetch('/api/products');
                const cats = await apiFetch('/api/products/categories');
                const brs = await apiFetch('/api/products/brands');
                setProducts(prods || []);
                setCategories(cats || []);
                setBrands(brs || []);
            } else if (activeTab === 'orders') {
                const ords = await apiFetch('/api/admin/orders');
                setOrders(ords || []);
            } else if (activeTab === 'categories') {
                const cats = await apiFetch('/api/products/categories');
                setCategories(cats || []);
            } else if (activeTab === 'brands') {
                const brs = await apiFetch('/api/products/brands');
                setBrands(brs || []);
            }
        } catch (err) {
            triggerToast(err.message || "Failed to load admin panel data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [activeTab]);

    // Delete handlers
    const handleDeleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await apiFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            triggerToast("Product deleted successfully", "success");
            loadData();
        } catch (err) {
            triggerToast(err.message || "Delete failed", "error");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await apiFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            triggerToast("Category deleted", "success");
            loadData();
        } catch (err) {
            triggerToast(err.message || "Delete failed", "error");
        }
    };

    const handleDeleteBrand = async (id) => {
        if (!confirm("Are you sure you want to delete this brand?")) return;
        try {
            await apiFetch(`/api/admin/brands/${id}`, { method: 'DELETE' });
            triggerToast("Brand deleted", "success");
            loadData();
        } catch (err) {
            triggerToast(err.message || "Delete failed", "error");
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await apiFetch(`/api/admin/orders/${orderId}/status?status=${newStatus}`, { method: 'PUT' });
            triggerToast("Order status updated", "success");
            loadData();
        } catch (err) {
            triggerToast(err.message || "Status update failed", "error");
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '100px' }}>
            <div className="page-header">
                <span className="section-subtitle">ChronoLux Operations</span>
                <h1 className="page-title">Admin Operations Panel</h1>
            </div>

            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <button className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
                        🕒 Products Catalog
                    </button>
                    <button className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        📦 Customer Orders
                    </button>
                    <button className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
                        🏷️ Categories List
                    </button>
                    <button className={`admin-tab-btn ${activeTab === 'brands' ? 'active' : ''}`} onClick={() => setActiveTab('brands')}>
                        ⚜️ Luxury Brands
                    </button>
                </aside>

                <main className="admin-panel">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : (
                        <>
                            {activeTab === 'products' && (
                                <ProductsPanel 
                                    products={products} 
                                    categories={categories}
                                    brands={brands}
                                    onAdd={() => setProductModal({ open: true, isEdit: false, data: null })}
                                    onEdit={(p) => setProductModal({ open: true, isEdit: true, data: p })}
                                    onDelete={handleDeleteProduct}
                                />
                            )}
                            {activeTab === 'orders' && (
                                <OrdersPanel 
                                    orders={orders} 
                                    onStatusChange={handleUpdateOrderStatus}
                                />
                            )}
                            {activeTab === 'categories' && (
                                <CategoriesPanel 
                                    categories={categories}
                                    onAdd={() => setCategoryModal({ open: true, isEdit: false, data: null })}
                                    onEdit={(c) => setCategoryModal({ open: true, isEdit: true, data: c })}
                                    onDelete={handleDeleteCategory}
                                />
                            )}
                            {activeTab === 'brands' && (
                                <BrandsPanel 
                                    brands={brands}
                                    onAdd={() => setBrandModal({ open: true, isEdit: false, data: null })}
                                    onEdit={(b) => setBrandModal({ open: true, isEdit: true, data: b })}
                                    onDelete={handleDeleteBrand}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Admin Modals */}
            {productModal.open && (
                <ProductFormModal 
                    modal={productModal} 
                    categories={categories}
                    brands={brands}
                    onClose={() => setProductModal({ open: false, isEdit: false, data: null })}
                    onSuccess={() => { setProductModal({ open: false, isEdit: false, data: null }); loadData(); }}
                    triggerToast={triggerToast}
                />
            )}
            {categoryModal.open && (
                <CategoryFormModal 
                    modal={categoryModal} 
                    onClose={() => setCategoryModal({ open: false, isEdit: false, data: null })}
                    onSuccess={() => { setCategoryModal({ open: false, isEdit: false, data: null }); loadData(); }}
                    triggerToast={triggerToast}
                />
            )}
            {brandModal.open && (
                <BrandFormModal 
                    modal={brandModal} 
                    onClose={() => setBrandModal({ open: false, isEdit: false, data: null })}
                    onSuccess={() => { setBrandModal({ open: false, isEdit: false, data: null }); loadData(); }}
                    triggerToast={triggerToast}
                />
            )}
        </div>
    );
}

// 9a. Products Panel Inner
function ProductsPanel({ products, onAdd, onEdit, onDelete }) {
    return (
        <div>
            <div className="admin-panel-header">
                <h2 className="admin-panel-title">Product Catalog Inventory</h2>
                <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Watch</button>
            </div>
            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Watch Model</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td style={{ fontWeight: 600, color: 'white' }}>{p.name}</td>
                                <td>{p.brandName}</td>
                                <td>{p.categoryName}</td>
                                <td style={{ color: 'var(--primary)' }}>${p.price.toLocaleString()}</td>
                                <td style={{ color: p.stock > 0 ? 'var(--success)' : 'var(--danger)' }}>
                                    {p.stock}
                                </td>
                                <td>
                                    <div className="cell-actions">
                                        <button className="icon-btn" onClick={() => onEdit(p)}><Icons.Edit /></button>
                                        <button className="icon-btn btn-delete" onClick={() => onDelete(p.id)}><Icons.Trash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 9b. Product Form Modal
function ProductFormModal({ modal, categories, brands, onClose, onSuccess, triggerToast }) {
    const [name, setName] = useState(modal.isEdit ? modal.data.name : '');
    const [price, setPrice] = useState(modal.isEdit ? modal.data.price : '');
    const [stock, setStock] = useState(modal.isEdit ? modal.data.stock : '');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Pre-select category & brand IDs for Edit modal if they match name strings
        if (modal.isEdit) {
            const currentBrand = brands.find(b => b.name === modal.data.brandName);
            const currentCat = categories.find(c => c.name === modal.data.categoryName);
            if (currentBrand) setBrandId(currentBrand.id);
            if (currentCat) setCategoryId(currentCat.id);
        } else {
            if (brands.length > 0) setBrandId(brands[0].id);
            if (categories.length > 0) setCategoryId(categories[0].id);
        }
    }, [modal, brands, categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!brandId || !categoryId) {
            triggerToast("Please ensure brands and categories are set up first", "error");
            return;
        }
        const payload = {
            name,
            price: parseFloat(price),
            stock: parseInt(stock),
            brandId: parseInt(brandId),
            categoryId: parseInt(categoryId)
        };
        try {
            setLoading(true);
            if (modal.isEdit) {
                await apiFetch(`/api/admin/products/${modal.data.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                triggerToast("Watch updated", "success");
            } else {
                await apiFetch('/api/admin/products', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                triggerToast("New luxury timepiece created", "success");
            }
            onSuccess();
        } catch (err) {
            triggerToast(err.message || "Failed to save timepiece", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <div style={{ padding: '2rem' }}>
                    <h2 className="summary-title" style={{ borderBottom: 'none', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {modal.isEdit ? "Modify Watch Specifications" : "Register Luxury Timepiece"}
                    </h2>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label className="form-label">Watch Model Name</label>
                            <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="admin-form-grid">
                            <div className="form-group">
                                <label className="form-label">Price (USD)</label>
                                <input type="number" step="0.01" className="form-input" required value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Stock Units</label>
                                <input type="number" className="form-input" required value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Manufacturer Brand</label>
                            <select className="admin-form-select" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Collection Category</label>
                            <select className="admin-form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="form-footer" style={{ borderTop: 'none', marginTop: '1rem' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Saving..." : "Save Timepiece"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// 9c. Orders Panel
function OrdersPanel({ orders, onStatusChange }) {
    return (
        <div>
            <div className="admin-panel-header">
                <h2 className="admin-panel-title">Customer Transactions & Shipments</h2>
            </div>
            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total Cost</th>
                            <th>Shipping Address</th>
                            <th>Status</th>
                            <th>Modify Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id}>
                                <td>#CH-{o.id}</td>
                                <td style={{ color: 'white', fontWeight: 500 }}>{o.username || `User #${o.userId || 'Guest'}`}</td>
                                <td style={{ color: 'var(--primary)' }}>${(o.total || o.totalPrice).toLocaleString()}</td>
                                <td style={{ fontSize: '0.85rem', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {o.shippingAddress || '123 Elite Avenue, Geneva'}
                                </td>
                                <td>
                                    <span className={`order-badge status-${o.status.toLowerCase()}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                                        {o.status}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="admin-form-select" 
                                        style={{ padding: '0.25rem 0.5rem', width: '130px', fontSize: '0.85rem' }}
                                        value={o.status}
                                        onChange={(e) => onStatusChange(o.id, e.target.value)}
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="SHIPPING">SHIPPING</option>
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 9d. Categories Panel Inner
function CategoriesPanel({ categories, onAdd, onEdit, onDelete }) {
    return (
        <div>
            <div className="admin-panel-header">
                <h2 className="admin-panel-title">Collection Categories</h2>
                <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Category</button>
            </div>
            <div className="table-container">
                <table className="admin-table" style={{ maxWidth: '600px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td style={{ fontWeight: 600, color: 'white' }}>{c.name}</td>
                                <td>
                                    <div className="cell-actions">
                                        <button className="icon-btn" onClick={() => onEdit(c)}><Icons.Edit /></button>
                                        <button className="icon-btn btn-delete" onClick={() => onDelete(c.id)}><Icons.Trash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 9e. Category Form Modal
function CategoryFormModal({ modal, onClose, onSuccess, triggerToast }) {
    const [name, setName] = useState(modal.isEdit ? modal.data.name : '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (modal.isEdit) {
                await apiFetch(`/api/admin/categories/${modal.data.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ name })
                });
                triggerToast("Category updated", "success");
            } else {
                await apiFetch('/api/admin/categories', {
                    method: 'POST',
                    body: JSON.stringify({ name })
                });
                triggerToast("Collection category registered", "success");
            }
            onSuccess();
        } catch (err) {
            triggerToast(err.message || "Operation failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <div style={{ padding: '2rem' }}>
                    <h2 className="summary-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                        {modal.isEdit ? "Rename Collection" : "Define New Collection"}
                    </h2>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label className="form-label">Category Name</label>
                            <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-footer" style={{ borderTop: 'none' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Saving..." : "Save Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// 9f. Brands Panel Inner
function BrandsPanel({ brands, onAdd, onEdit, onDelete }) {
    return (
        <div>
            <div className="admin-panel-header">
                <h2 className="admin-panel-title">Manufacturer Luxury Brands</h2>
                <button className="btn btn-primary btn-sm" onClick={onAdd}>+ Add Brand</button>
            </div>
            <div className="table-container">
                <table className="admin-table" style={{ maxWidth: '600px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map(b => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td style={{ fontWeight: 600, color: 'white' }}>{b.name}</td>
                                <td>
                                    <div className="cell-actions">
                                        <button className="icon-btn" onClick={() => onEdit(b)}><Icons.Edit /></button>
                                        <button className="icon-btn btn-delete" onClick={() => onDelete(b.id)}><Icons.Trash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// 9g. Brand Form Modal
function BrandFormModal({ modal, onClose, onSuccess, triggerToast }) {
    const [name, setName] = useState(modal.isEdit ? modal.data.name : '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (modal.isEdit) {
                await apiFetch(`/api/admin/brands/${modal.data.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ name })
                });
                triggerToast("Brand updated", "success");
            } else {
                await apiFetch('/api/admin/brands', {
                    method: 'POST',
                    body: JSON.stringify({ name })
                });
                triggerToast("Luxury Brand registered", "success");
            }
            onSuccess();
        } catch (err) {
            triggerToast(err.message || "Operation failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>
                <div style={{ padding: '2rem' }}>
                    <h2 className="summary-title" style={{ borderBottom: 'none', textAlign: 'center' }}>
                        {modal.isEdit ? "Update Luxury Brand" : "Introduce Luxury Brand"}
                    </h2>
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label className="form-label">Brand Name</label>
                            <input type="text" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-footer" style={{ borderTop: 'none' }}>
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Saving..." : "Save Brand"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// ==========================================================================
// 8a. PROFILE & PAYMENT METHODS PAGE
// ==========================================================================
function ProfilePage({ triggerToast, onViewChange, user, setUser }) {
    const [profile, setProfile] = useState({ username: '', email: '' });
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const [savedCards, setSavedCards] = useState([]);
    const [profileLoading, setProfileLoading] = useState(true);
    const [saveProfileLoading, setSaveProfileLoading] = useState(false);
    
    // Credit Card Modal State
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [cardForm, setCardForm] = useState({ holderName: '', number: '', expiry: '', type: 'Visa' });
    const [saveCardLoading, setSaveCardLoading] = useState(false);

    const loadProfileAndCards = async () => {
        try {
            setProfileLoading(true);
            const prof = await apiFetch('/api/users/profile');
            setProfile(prof);
            const cards = await apiFetch('/api/payment-methods');
            setSavedCards(cards || []);
        } catch (err) {
            triggerToast(err.message || "Failed to load profile details", "error");
        } finally {
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        loadProfileAndCards();
    }, []);

    const handleCardNumberChange = (e) => {
        const val = e.target.value;
        let detectedType = 'Visa';
        const clean = val.replace(/\s+/g, '');
        if (clean.startsWith('4')) {
            detectedType = 'Visa';
        } else if (clean.startsWith('5')) {
            detectedType = 'Mastercard';
        } else if (clean.startsWith('34') || clean.startsWith('37')) {
            detectedType = 'Amex';
        } else if (clean.startsWith('6')) {
            detectedType = 'Discover';
        }
        setCardForm({ ...cardForm, number: val, type: detectedType });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            triggerToast("Passwords do not match", "error");
            return;
        }
        try {
            setSaveProfileLoading(true);
            const payload = {
                username: profile.username,
                email: profile.email
            };
            if (passwordData.newPassword) {
                payload.password = passwordData.newPassword;
            }
            const updated = await apiFetch('/api/users/profile', {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            triggerToast("Account information updated successfully!", "success");
            if (user && updated.username !== user.username) {
                localStorage.setItem('chrono_user', updated.username);
                setUser({ ...user, username: updated.username });
            }
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (err) {
            triggerToast(err.message || "Failed to update profile", "error");
        } finally {
            setSaveProfileLoading(false);
        }
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        if (!cardForm.holderName.trim() || !cardForm.number.trim() || !cardForm.expiry.trim()) {
            triggerToast("Please fill all card fields", "error");
            return;
        }
        try {
            setSaveCardLoading(true);
            const saved = await apiFetch('/api/payment-methods', {
                method: 'POST',
                body: JSON.stringify({
                    cardHolderName: cardForm.holderName,
                    cardNumber: cardForm.number,
                    expiryDate: cardForm.expiry,
                    cardType: cardForm.type
                })
            });
            triggerToast("New payment card saved to your collection!", "success");
            setSavedCards([...savedCards, saved]);
            setCardModalOpen(false);
            setCardForm({ holderName: '', number: '', expiry: '', type: 'Visa' });
        } catch (err) {
            triggerToast(err.message || "Failed to save card", "error");
        } finally {
            setSaveCardLoading(false);
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (!confirm("Are you sure you want to remove this saved payment method?")) return;
        try {
            await apiFetch(`/api/payment-methods/${cardId}`, { method: 'DELETE' });
            triggerToast("Saved card removed successfully", "success");
            setSavedCards(savedCards.filter(c => c.id !== cardId));
        } catch (err) {
            triggerToast(err.message || "Failed to delete card", "error");
        }
    };

    if (profileLoading) {
        return (
            <div className="container" style={{ padding: '80px 0' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
            <div className="page-header">
                <span className="section-subtitle">Account Management</span>
                <h1 className="page-title">Collector Profile</h1>
            </div>

            <div className="cart-layout" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
                {/* Account details form */}
                <div className="summary-card" style={{ padding: '2rem', height: 'fit-content' }}>
                    <h2 className="summary-title" style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        Account Credentials
                    </h2>
                    <form onSubmit={handleUpdateProfile} className="checkout-form">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                required 
                                value={profile.username} 
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })} 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input 
                                type="email" 
                                className="form-input" 
                                required 
                                value={profile.email || ''} 
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
                            />
                        </div>
                        
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-dark)' }}>
                            <h3 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>Change Password (Optional)</h3>
                            <div className="form-group">
                                <label className="form-label">New Password</label>
                                <input 
                                    type="password" 
                                    className="form-input" 
                                    placeholder="Leave blank to keep current password"
                                    value={passwordData.newPassword} 
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    className="form-input" 
                                    placeholder="Leave blank to keep current password"
                                    value={passwordData.confirmPassword} 
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} disabled={saveProfileLoading}>
                            {saveProfileLoading ? "Saving..." : "Update Account Details"}
                        </button>
                    </form>
                </div>

                {/* Saved payment methods */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="summary-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-dark)', paddingBottom: '1rem' }}>
                            <h2 className="summary-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                                Saved Payment Cards
                            </h2>
                            <button className="btn btn-primary btn-sm" onClick={() => setCardModalOpen(true)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                + Save Card
                            </button>
                        </div>

                        {savedCards.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💳</div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>No saved cards found</h4>
                                <p style={{ fontSize: '0.9rem' }}>Save your credit card details to enjoy lightning fast 1-click checkout options on your watch collections.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {savedCards.map(card => (
                                    <div key={card.id} className="payment-card-gold" style={{
                                        background: 'linear-gradient(135deg, #171d2b 0%, #0d121f 100%)',
                                        border: '1px solid #bf953f',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        position: 'relative',
                                        color: 'white',
                                        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                        overflow: 'hidden'
                                    }}>
                                        {/* Card gold highlight accents */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-50px',
                                            right: '-50px',
                                            width: '150px',
                                            height: '150px',
                                            background: 'radial-gradient(circle, rgba(191,149,63,0.1) 0%, transparent 70%)',
                                            pointerEvents: 'none'
                                        }}></div>

                                        {/* Delete button */}
                                        <button 
                                            className="icon-btn btn-delete" 
                                            onClick={() => handleDeleteCard(card.id)}
                                            style={{
                                                position: 'absolute',
                                                top: '1.5rem',
                                                right: '1.5rem',
                                                backgroundColor: 'rgba(235,87,87,0.1)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                zIndex: 10
                                            }}
                                        >
                                            <Icons.Trash />
                                        </button>

                                        {/* Card header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                            <div style={{
                                                width: '45px',
                                                height: '32px',
                                                backgroundColor: '#bf953f',
                                                borderRadius: '6px',
                                                position: 'relative',
                                                background: 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%)'
                                            }}>
                                                <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
                                                <div style={{ position: 'absolute', left: '22px', top: 0, width: '1px', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
                                            </div>
                                            <span style={{
                                                fontSize: '1rem',
                                                fontWeight: 800,
                                                letterSpacing: '0.1em',
                                                color: '#bf953f',
                                                textTransform: 'uppercase'
                                            }}>{card.cardType}</span>
                                        </div>

                                        {/* Card body */}
                                        <div style={{ fontSize: '1.3rem', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                            {card.cardNumber}
                                        </div>

                                        {/* Card footer */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Cardholder Name</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', color: '#fcf6ba' }}>{card.cardHolderName}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Expires</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', color: '#fcf6ba' }}>{card.expiryDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Credit Card Modal overlay */}
            {cardModalOpen && (
                <div className="modal-overlay" onClick={() => setCardModalOpen(false)}>
                    <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <button className="close-btn" onClick={() => setCardModalOpen(false)}>✕</button>
                        
                        <div style={{ padding: '2.5rem' }}>
                            <div className="auth-header">
                                <h2 className="auth-title">Register Payment Card</h2>
                                <p className="auth-subtitle">Add a credit card to secure your luxury order payments</p>
                            </div>

                            {/* Preview Virtual Card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #171d2b 0%, #0d121f 100%)',
                                border: '1px solid #bf953f',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                color: 'white',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                marginBottom: '2rem',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <div style={{
                                        width: '45px',
                                        height: '32px',
                                        backgroundColor: '#bf953f',
                                        borderRadius: '6px',
                                        background: 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%)'
                                    }}></div>
                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#bf953f', letterSpacing: '0.1em' }}>
                                        {cardForm.type.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '1.3rem', letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                                    {cardForm.number || '•••• •••• •••• ••••'}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Cardholder</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fcf6ba' }}>
                                            {cardForm.holderName || 'YOUR FULL NAME'}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Expires</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fcf6ba' }}>
                                            {cardForm.expiry || 'MM/YY'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleAddCard} className="checkout-form">
                                <div className="form-group">
                                    <label className="form-label">Cardholder Name</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        required 
                                        placeholder="e.g. JOHNATHAN DOE" 
                                        value={cardForm.holderName} 
                                        onChange={(e) => setCardForm({ ...cardForm, holderName: e.target.value.toUpperCase() })} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Card Number</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        required 
                                        maxLength="19"
                                        placeholder="e.g. 4000 1234 5678 9010" 
                                        value={cardForm.number} 
                                        onChange={handleCardNumberChange} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Expiration Date</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        required 
                                        maxLength="5"
                                        placeholder="MM/YY" 
                                        value={cardForm.expiry} 
                                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })} 
                                    />
                                </div>
                                
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={saveCardLoading}>
                                    {saveCardLoading ? "Saving Card..." : "Save Payment Card"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================================================
// 10. MAIN APP CONTROLLER
// ==========================================================================
function App() {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [currentView, setCurrentView] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // Auth Modal State
    const [authModal, setAuthModal] = useState({ open: false, mode: 'login' }); // login | register
    const [authUsername, setAuthUsername] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authRole, setAuthRole] = useState('ROLE_USER');
    const [authError, setAuthError] = useState('');
    const [authSuccess, setAuthSuccess] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Toast States
    const [toasts, setToasts] = useState([]);

    const triggerToast = (text, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter(t => t.id !== id));
        }, 3500);
    };

    // Load initial user session
    useEffect(() => {
        const token = localStorage.getItem('chrono_token');
        const username = localStorage.getItem('chrono_user');
        const role = localStorage.getItem('chrono_role');
        if (token && username && role) {
            setUser({ token, username, role });
        }
    }, []);

    // Load Cart Count
    const refreshCartCount = async () => {
        if (!localStorage.getItem('chrono_token')) {
            setCartCount(0);
            return;
        }
        try {
            const cartData = await apiFetch('/api/cart');
            if (cartData && cartData.items) {
                const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalItems);
            } else {
                setCartCount(0);
            }
        } catch (e) {
            setCartCount(0);
        }
    };

    useEffect(() => {
        refreshCartCount();
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('chrono_token');
        localStorage.removeItem('chrono_user');
        localStorage.removeItem('chrono_role');
        setUser(null);
        setCartCount(0);
        setCurrentView('home');
        triggerToast("Logged out successfully", "success");
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        setAuthSuccess('');
        setAuthLoading(true);

        try {
            if (authModal.mode === 'login') {
                const response = await apiFetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ username: authUsername, password: authPassword })
                });
                
                localStorage.setItem('chrono_token', response.token);
                localStorage.setItem('chrono_user', response.username);
                localStorage.setItem('chrono_role', response.role);
                
                setUser({ token: response.token, username: response.username, role: response.role });
                setAuthModal({ open: false, mode: 'login' });
                triggerToast(`Welcome back, ${response.username}!`, "success");
            } else {
                // Register
                await apiFetch('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        username: authUsername, 
                        password: authPassword, 
                        role: authRole.replace('ROLE_', '') 
                    })
                });
                setAuthSuccess('Registration completed! You can now sign in.');
                triggerToast('Account registered successfully!', "success");
                setAuthModal({ open: true, mode: 'login' });
            }
            // Clear fields
            setAuthUsername('');
            setAuthPassword('');
        } catch (err) {
            setAuthError(err.message || 'Authentication failed');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleAddToCart = async (productId, quantity) => {
        if (!user) {
            setAuthModal({ open: true, mode: 'login' });
            throw new Error("Authorization required");
        }
        const updatedCart = await apiFetch('/api/cart/items', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity })
        });
        refreshCartCount();
        triggerToast("Timepiece added to your collection", "success");
        return updatedCart;
    };

    const handleCtaClick = () => {
        const el = document.getElementById('catalog');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar 
                user={user} 
                cartCount={cartCount} 
                currentView={currentView}
                onViewChange={(view) => {
                    if (view === 'cart' && !user) {
                        setAuthModal({ open: true, mode: 'login' });
                        return;
                    }
                    setCurrentView(view);
                }}
                onAuthTrigger={(mode) => setAuthModal({ open: true, mode })}
                onLogout={handleLogout}
                onSearch={setSearchQuery}
            />

            <main style={{ flexGrow: 1 }}>
                {currentView === 'home' && (
                    <>
                        <Hero onCtaClick={handleCtaClick} />
                        <Catalog 
                            query={searchQuery}
                            onProductClick={setSelectedProduct}
                            onAddToCart={handleAddToCart}
                            triggerToast={triggerToast}
                        />
                    </>
                )}

                {currentView === 'cart' && (
                    <CartPage 
                        onOrderSuccess={() => { refreshCartCount(); setCurrentView('orders'); }}
                        triggerToast={triggerToast}
                        onViewChange={setCurrentView}
                        refreshCartCount={refreshCartCount}
                    />
                )}

                {currentView === 'orders' && (
                    <OrdersPage triggerToast={triggerToast} />
                )}

                {currentView === 'profile' && (
                    <ProfilePage 
                        triggerToast={triggerToast} 
                        onViewChange={setCurrentView}
                        user={user}
                        setUser={setUser}
                    />
                )}

                {currentView === 'admin' && user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN') && (
                    <AdminDashboard triggerToast={triggerToast} />
                )}
            </main>

            <footer style={{ 
                borderTop: '1px solid var(--border-dark)', 
                backgroundColor: 'var(--bg-darker)',
                padding: '2.5rem 0',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                <div className="container">
                    <p style={{ color: 'white', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>CHRONOLUX TIMEPIECES</p>
                    <p>© 2026 ChronoLux Corporation. Handcrafted in Geneva, Switzerland. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal 
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    triggerToast={triggerToast}
                />
            )}

            {/* Auth Modal overlay */}
            {authModal.open && (
                <div className="modal-overlay" onClick={() => setAuthModal({ open: false, mode: 'login' })}>
                    <div className="modal-content auth-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setAuthModal({ open: false, mode: 'login' })}>✕</button>
                        
                        <div style={{ padding: '2.5rem' }}>
                            <div className="auth-header">
                                <Icons.Watch />
                                <h2 className="auth-title">
                                    {authModal.mode === 'login' ? "Sign In to ChronoLux" : "Join the Elite Collection"}
                                </h2>
                                <p className="auth-subtitle">
                                    {authModal.mode === 'login' ? "Access your saved pieces and orders" : "Create an account to begin collecting"}
                                </p>
                            </div>

                            {authError && <div className="auth-error">{authError}</div>}
                            {authSuccess && <div className="auth-success">{authSuccess}</div>}

                            <form onSubmit={handleAuthSubmit} className="checkout-form">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        required 
                                        value={authUsername}
                                        onChange={(e) => setAuthUsername(e.target.value)}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-input" 
                                        required 
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>

                                {authModal.mode === 'register' && (
                                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                                        <label className="form-label">Account Type</label>
                                        <select 
                                            className="admin-form-select" 
                                            value={authRole}
                                            onChange={(e) => setAuthRole(e.target.value)}
                                        >
                                            <option value="ROLE_USER">Customer Collector</option>
                                            <option value="ROLE_ADMIN">Admin Specialist</option>
                                        </select>
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    disabled={authLoading}
                                    style={{ width: '100%', marginTop: '1rem' }}
                                >
                                    {authLoading ? "Verifying..." : authModal.mode === 'login' ? "Sign In" : "Register Account"}
                                </button>
                            </form>

                            <div className="auth-footer">
                                {authModal.mode === 'login' ? (
                                    <span>New to ChronoLux? <span className="auth-link" onClick={() => { setAuthModal({ open: true, mode: 'register' }); setAuthError(''); }}>Create an account</span></span>
                                ) : (
                                    <span>Already have an account? <span className="auth-link" onClick={() => { setAuthModal({ open: true, mode: 'login' }); setAuthError(''); }}>Sign in instead</span></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toasts Notification Portal */}
            <div className="toast-container">
                {toasts.map(t => (
                    <div key={t.id} className={`toast toast-${t.type}`}>
                        <span>{t.type === 'success' ? '✓' : '✕'}</span>
                        <span>{t.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Render the SPA Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
