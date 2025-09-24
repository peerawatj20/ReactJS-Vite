import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-gray-800 p-4 text-white">
    <h2 className="text-xl font-bold">Dashboard</h2>
    <nav className="mt-8">
      <ul>
        <li className="mb-2">
          <Link to="/home" className="hover:text-blue-300">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/products" className="hover:text-blue-300">
            Products
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);
export default Sidebar;
