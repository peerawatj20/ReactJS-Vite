const Sidebar = () => (
  <aside className="w-64 bg-gray-800 p-4 text-white">
    <h2 className="text-xl font-bold">Dashboard</h2>
    <nav className="mt-8">
      <ul>
        <li className="mb-2">
          <a href="/home" className="hover:text-blue-300">
            Home
          </a>
        </li>
        <li className="mb-2">
          <a href="/products" className="hover:text-blue-300">
            Products
          </a>
        </li>
      </ul>
    </nav>
  </aside>
);
export default Sidebar;
