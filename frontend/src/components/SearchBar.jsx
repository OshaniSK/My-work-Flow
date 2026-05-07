// File: frontend/src/components/SearchBar.jsx

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full leading-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm transition-colors shadow-sm"
        placeholder="Search tasks..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
