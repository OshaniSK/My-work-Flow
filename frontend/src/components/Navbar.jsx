// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-4xl">
        <Link to="/" className="text-xl font-bold">My CRUD App</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-200">Home</Link>
          <Link to="/add" className="hover:text-indigo-200 bg-indigo-700 px-3 py-1 rounded">Add User</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
