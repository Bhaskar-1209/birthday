import { useState } from 'react';
import axios from 'axios';
import { Sparkles } from 'lucide-react';

const Login = ({ onSuccess }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:7070/api/auth/keyword-check', { keyword });
      if (res.data.success) {
        onSuccess();
      } else {
        setError('Incorrect keyword');
      }
    } catch {
      setError('Error connecting to server');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center animate-fade-in">
        <h1 className="text-3xl font-extrabold mb-4 text-pink-600 flex items-center justify-center">
          <Sparkles className="mr-2 animate-spin" />💕 Enter The Magic Word 💕
        </h1>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border-2 border-pink-300 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Her cute nickname or secret"
        />
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-pink-400 to-red-400 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          💝 Unlock Surprise
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Login;