// frontend/src/components/UserList.jsx
import { Link } from 'react-router-dom';

const UserList = ({ users, onDelete }) => {
  if (users.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No users found. Please add a user.</div>;
  }

  return (
    <div className="mt-8 overflow-hidden bg-white shadow sm:rounded-md border border-gray-100">
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium text-indigo-600 truncate">{user.name}</p>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${user._id}`}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(user._id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
