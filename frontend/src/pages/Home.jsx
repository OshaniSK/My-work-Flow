// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import { getUsers, deleteUser } from '../services/api';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      </div>
      {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
