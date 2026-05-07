// frontend/src/pages/AddUser.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { createUser } from '../services/api';

const AddUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createUser(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {error && <div className="max-w-md mx-auto mt-4 text-red-600 bg-red-50 p-3 rounded text-center">{error}</div>}
      <UserForm onSubmit={handleSubmit} title="Add New User" />
    </div>
  );
};

export default AddUser;
