import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Footer Content</h5>
            <p>
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-dark">Link 1</a></li>
              <li><a href="#" className="text-dark">Link 2</a></li>
              <li><a href="#" className="text-dark">Link 3</a></li>
              <li><a href="#" className="text-dark">Link 4</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#" className="text-dark">Facebook</a></li>
              <li><a href="#" className="text-dark">Twitter</a></li>
              <li><a href="#" className="text-dark">Instagram</a></li>
              <li><a href="#" className="text-dark">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 bg-dark text-light">
        © 2024 Copyright: <a className="text-light" href="https://example.com/">example.com</a>
      </div>
    </footer>
  );
};

export default Footer;
