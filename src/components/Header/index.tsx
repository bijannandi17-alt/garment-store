import React from 'react';

interface HeaderProps {
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">{logo}</div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:text-gray-300">Home</a></li>
          <li><a href="/products" className="hover:text-gray-300">Products</a></li>
          <li><a href="/cart" className="hover:text-gray-300">Cart</a></li>
          <li><a href="/checkout" className="hover:text-gray-300">Checkout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;