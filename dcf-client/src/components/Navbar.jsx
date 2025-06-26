import React from 'react';

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">Jarvis</div>
    <div className="flex space-x-4">
      <a href="#" className="hover:underline">About</a>
      <a href="#" className="hover:underline">Learn More</a>
    </div>
  </nav>
);

export default Navbar;
