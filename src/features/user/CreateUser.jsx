import { useState } from 'react';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userName);
  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    dispatch(updateName(username));

    navigate('/menu');
  }

  if (userName) {
    return (
      <Button type="primary" to="/menu">
        Continue Ordering , {userName}
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm  text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
