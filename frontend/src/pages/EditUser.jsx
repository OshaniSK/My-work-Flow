// frontend/src/pages/EditUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUser, updateUser } from '../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUser(id);
      setInitialData({
        name: response.data.name,
        email: response.data.email,
        age: response.data.age
      });
    } catch (err) {
      setError('Failed to fetch user data');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await updateUser(id, formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  if (!initialData && !error) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      {error && <div className="max-w-md mx-auto mt-4 text-red-600 bg-red-50 p-3 rounded text-center">{error}</div>}
      {initialData && <UserForm initialData={initialData} onSubmit={handleSubmit} title="Edit User" />}
    </div>
  );
};

export default EditUser;
