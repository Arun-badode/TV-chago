import React from 'react';
import Footer from '../Layout/Footer';
import { Link } from 'react-router-dom';

const products = [
  { title: 'Classic White T-Shirt', price: '$29.99', desc: 'Essential cotton tee for everyday comfort', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20a%20classic%20white%20t-shirt%20on%20a%20minimalist%20light%20gray%20background%2C%20clean%20styling%2C%20high-quality%20fabric%20texture%20visible%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting&width=400&height=400&seq=1&orientation=squarish' },
  { title: 'Slim Fit Jeans', price: '$59.99', desc: 'Modern slim fit with stretch comfort', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20slim%20fit%20blue%20jeans%20on%20a%20minimalist%20light%20gray%20background%2C%20detailed%20denim%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=2&orientation=squarish' },
  { title: 'Casual Blazer', price: '$89.99', desc: 'Versatile blazer for work and weekends', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20a%20casual%20navy%20blue%20blazer%20on%20a%20minimalist%20light%20gray%20background%2C%20detailed%20fabric%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=3&orientation=squarish' },
  { title: 'Summer Dress', price: '$49.99', desc: 'Light floral pattern for warm days', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20a%20light%20floral%20summer%20dress%20on%20a%20minimalist%20light%20gray%20background%2C%20flowing%20fabric%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=4&orientation=squarish' },
  { title: 'Leather Jacket', price: '$129.99', desc: 'Classic style with modern details', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20a%20black%20leather%20jacket%20on%20a%20minimalist%20light%20gray%20background%2C%20detailed%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=5&orientation=squarish' },
  { title: 'Knit Sweater', price: '$69.99', desc: 'Cozy knit for chilly evenings', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20a%20cozy%20knit%20sweater%20in%20beige%20on%20a%20minimalist%20light%20gray%20background%2C%20detailed%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=6&orientation=squarish' },
  { title: 'Cargo Pants', price: '$74.99', desc: 'Functional design with multiple pockets', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20khaki%20cargo%20pants%20on%20a%20minimalist%20light%20gray%20background%2C%20detailed%20fabric%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=7&orientation=squarish' },
  { title: 'Silk Blouse', price: '$79.99', desc: 'Elegant blouse for professional settings', img: 'https://readdy.ai/api/search-image?query=A%20professional%20product%20photography%20of%20an%20elegant%20silk%20blouse%20in%20cream%20color%20on%20a%20minimalist%20light%20gray%20background%2C%20luxurious%20fabric%20texture%2C%20fashion%20product%20photography%2C%20commercial%20quality%2C%20soft%20lighting%2C%20no%20people&width=400&height=400&seq=8&orientation=squarish' },
];

const LandingPage = () => {
  return (
    <>
    <div>

      {/* Hero Section */}
    
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
  {/* Background Image */}
  <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      background: 'url(https://i.postimg.cc/Hnqc2bxF/904885a821d0846fd0ceb528f65b4190.jpg) center/cover no-repeat',
      zIndex: 1,
    }}
  ></div>

  {/* Dark Overlay */}
  <div
    className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 2,
    }}
  ></div>

  {/* Content */}
  <div
    className="text-white text-center d-flex align-items-center justify-content-center"
    style={{ minHeight: '100vh', position: 'relative', zIndex: 3 }}
  >
    <div className="container px-3">
      <h1 className="fw-bold mb-4 display-5">Find Your Perfect Style</h1>

      {/* Responsive Input + Buttons */}
      <div className="row justify-content-center g-2">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control py-3"
            placeholder="Search for clothing, categories..."
          />
        </div>
        <div className="col-6 col-md-auto">
          <button className="btn btn-warning w-100 py-3">Search</button>
        </div>
        <div className="col-6 col-md-auto">
          <button className="btn btn-light text-dark w-100 py-3">All Products</button>
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Featured Products */}
     <div className="container py-5">
      <h4 className="fw-bold mb-2">Featured Products</h4>
      <p className="text-muted mb-4">Discover our latest collection of trendy clothing</p>
      <div className="row">
        {products.map((prod, idx) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={idx}>
            <div className="card h-100 border-0 shadow-sm rounded">
              <img
                src={prod.img}
                className="card-img-top"
                alt={prod.title}
                style={{ objectFit: 'cover', height: '250px' }}
              />
              <div className="card-body">
                <h6 className="fw-bold">{prod.title}</h6>
                <p className="text-muted small">{prod.desc}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold text-dark">{prod.price}</span>
                  <Link to='/Order'>
                  <button className="btn btn-warning btn-sm ">Buy Now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-outline-warning">View All Products</button>
      </div>
    </div>

      {/* blogs */}
 <div className="bg-light py-5">
  <div className="container">
    <h2 className="fw-bold mb-2 text-center">Latest From Our Blog</h2>
    <p className="text-muted mb-4 text-center">Stay updated with trends, tips & style inspiration</p>

    <div className="row">
      {[
        {
          title: "Top 5 Summer Fashion Essentials",
          desc: "Discover must-have summer pieces that combine comfort and style, perfect for the hot season.",
          img: "https://i.postimg.cc/nh6qHjtd/ww.jpg",
          date: "June 10, 2025",
        },
        {
          title: "How to Accessorize Like a Pro",
          desc: "Accessories can elevate any outfit. Learn the art of mixing and matching like a stylist.",
          img: "https://i.postimg.cc/1tKFcvVT/gg.png",
          date: "June 7, 2025",
        },
        {
          title: "Men’s Guide to Smart Casual Dressing",
          desc: "Step up your game with this guide to effortless, sharp, and comfortable looks for men.",
          img: "https://i.postimg.cc/0jWJhrf0/me.jpg",
          date: "June 5, 2025",
        },
      ].map((blog, idx) => (
        <div className="col-md-4 mb-4" key={idx}>
          <div className="card shadow-sm border-0 rounded-4 h-100 overflow-hidden">
            {/* Blog Image */}
            <div style={{ height: "200px", backgroundColor: "#fefae0" }}>
              <img
                src={blog.img}
                alt="Blog"
                className="w-100 h-100 object-fit-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="p-4">
              <h5 className="fw-bold text-dark mb-2">{blog.title}</h5>
              <p className="text-muted small mb-3">{blog.desc}</p>

              {/* Author Info */}
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center me-3"
                  style={{ width: "45px", height: "45px" }}
                >
                  <i className="bi bi-person-circle text-warning fs-5"></i>
                </div>
                <div>
                  <div className="fw-semibold text-dark small">By FashionHub Team</div>
                  <div className="text-muted small">{blog.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



      {/* Why Choose Us */}
      <div className="bg-light py-1 text-center">
  <div className="container">
    <h2 className="fw-bold mb-2">Why Choose Us</h2>
    <p className="text-muted mb-5">Experience the best in fashion retail</p>
    <div className="row justify-content-center">
      <div className="col-md-3 mb-4">
        <div className="mb-3 d-flex justify-content-center">
          <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-truck text-warning fs-2"></i>
          </div>
        </div>
        <h5 className="fw-bold">Fast Delivery</h5>
        <p className="text-muted">Free shipping on orders over $50</p>
      </div>
      <div className="col-md-3 mb-4">
        <div className="mb-3 d-flex justify-content-center">
          <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-award text-warning fs-2"></i>
          </div>
        </div>
        <h5 className="fw-bold">Quality Products</h5>
        <p className="text-muted">Curated selection of premium brands</p>
      </div>
      <div className="col-md-3 mb-4">
        <div className="mb-3 d-flex justify-content-center">
          <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-arrow-left-right text-warning fs-2"></i>
          </div>
        </div>
        <h5 className="fw-bold">Easy Returns</h5>
        <p className="text-muted">30-day return policy</p>
      </div>
      <div className="col-md-3 mb-4">
        <div className="mb-3 d-flex justify-content-center">
          <div className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
            <i className="bi bi-headset text-warning fs-2"></i>
          </div>
        </div>
        <h5 className="fw-bold">24/7 Support</h5>
        <p className="text-muted">Always here to help you</p>
      </div>
    </div>
  </div>
</div>


  

    </div>

    {/* footer */}
      <Footer/>
      </>
  );
};

export default LandingPage;
